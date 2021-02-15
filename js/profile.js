import Photographer from './photographer.class.js';
import Media from './media.class.js';

const dropdown = document.querySelector(".dropdown");
const sectionOne = document.querySelector('#photographer-infos');
const urlOrigin = window.origin;
const urlPath = window.location.pathname;
const urlID = window.location.search;
const fullURL = urlOrigin + urlPath + urlID;
const modal = document.querySelector('.modal');
const form = document.querySelector('form');
const modalTitle = document.querySelector('.modal-title');
const inputFirstname = document.querySelector('#first_name');
const inputLastname = document.querySelector('#last_name');
const inputEmail = document.querySelector('#email');
const inputMessage = document.querySelector('#your_message');

fetch('./js/datas.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    const photographers = data[0].photographers;
    const medias = data[0].media;
    const getUrlId = window.location.search.substr(4); // get id from url

    const photographersById = photographers.filter(photographer => {
      return photographer.id == getUrlId;
    });

    const mediasById = medias.filter(media => {
      if (media.photographerId == getUrlId) {
        return media;
      };
    });


    createProfile(photographersById)
    createGalleryAndLightbox(mediasById);
    window.addEventListener('popstate', workingLightbox);
    removeOption();
    dropdown.addEventListener('change', removeOption);
    sortGallery(mediasById)
    dropdown.addEventListener('change', () => { sortGallery(mediasById) });

    const modalOpen = document.querySelector('.modal-btn');
    modalOpen.addEventListener('click', displayModal);
    form.addEventListener('submit', validateForm);

    generateTotalLikes()
    generateTotalPrice(photographersById)
    generateLikesCounter()

    let likesCounter = document.querySelectorAll('.likesCounter');
    likesCounter.forEach(counter => {
      counter.addEventListener('click', generateTotalLikes)
    })

  })
  .catch(error => { console.log(error) })



const removeOption = () => {
  let options = document.querySelectorAll(".dropdown-option");
  let selectedOption = document.querySelector("option:checked");

  Array.from(options).map(option => option.style.display = 'block');
  selectedOption.style.display = 'none';

  let filteredOptions = Array.from(options).filter(elt => elt.id != selectedOption.id);
  filteredOptions.map(option => option.style.display = 'block');
}

const createProfile = (photographersById) => {
  let tagLink = '';
  const name = photographersById[0].name;
  const city = photographersById[0].city;
  const country = photographersById[0].country;
  const tagline = photographersById[0].tagline;
  const tags = photographersById[0].tags;
  const portrait = photographersById[0].portrait;


  tags.forEach(tag => {
    tagLink += `<a id="${tag}" href="./index.html#${tag}" aria-label="tag" class="tag">#${tag}</a>`;
  })

  const content = `
      <div class="photographer-infos">
        <h1>${name}</h1>
        <p>${city}, ${country}</p>
        <p>${tagline}</p>
        <div class="tags-container">
          ${tagLink}
        </div>
      </div>
      <button class="modal-btn btn">Contactez-moi</button>
      <img src="./assets/Photographers ID Photos/${portrait}" alt="${name}">
  `;

  sectionOne.innerHTML += content;

  modalTitle.innerHTML += `<br>${name}`;
  modalTitle.id = `Contact\ me\ ${name}`;
  modal.setAttribute('aria-labelledby', `Contact me ${name}`);
}

const createGalleryAndLightbox = (mediasById) => {
  let gallery = document.querySelector('.gallery-wrapper');
  let lightboxes = document.querySelector('.gallery-lightboxes');
  gallery.innerHTML = '';
  lightboxes.innerHTML = ''
  mediasById.forEach(item => {
    const media = new Media(item);

    gallery.innerHTML += media.generateCard();
    lightboxes.innerHTML += media.generateLightbox();
    // add smthg in datas.json :
    // item.alt = media.generateMediaTitle();
  })

}

const workingLightbox = () => {
  const urlHash = window.location.hash;
  const currentLightbox = document.querySelector(urlHash);
  const arrowLeft = document.querySelector(`${urlHash} .arrow-left`);
  const arrowRight = document.querySelector(`${urlHash} .arrow-right`);
  if (currentLightbox.previousElementSibling !== null) {
    arrowLeft.href = `${fullURL}#${currentLightbox.previousElementSibling.id}`;
    arrowLeft.title = `Previous image`;
    arrowLeft.addEventListener("keyup", (e) => {
      if (e.key == "ArrowLeft") {
        window.location.href = `${fullURL}#${currentLightbox.previousElementSibling.id}`;
      }
    });
  } else {
    arrowLeft.style.display = 'none';
  }

  if (currentLightbox.nextElementSibling !== null) {
    arrowRight.href = `${fullURL}#${currentLightbox.nextElementSibling.id}`;
    arrowRight.title = `Next image`;
    arrowRight.addEventListener("keyup", (e) => {
      if (e.key == "ArrowRight") {
        window.location.href = `${fullURL}#${currentLightbox.nextElementSibling.id}`;
      }
    });
  } else {
    arrowRight.style.display = 'none';
  }


}



const sortGallery = (mediasById) => {
  const dropdownOption = dropdown.options[dropdown.selectedIndex].innerHTML;
  let sortedMedias = [];
  switch (dropdownOption) {
    case "Titre":
      sortedMedias = mediasById.sort((a, b) => {
        if (a.image && b.image) {
          return a.image.localeCompare(b.image)
        }
      })
      console.log(sortedMedias)
      break;
    case "Date":
      // Timestamp
      sortedMedias = mediasById.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      console.log(sortedMedias)
      break;
    default:
      // Popularité
      sortedMedias = mediasById.sort((a, b) => b.likes - a.likes);
      console.log(sortedMedias)
      break;
  }
  createGalleryAndLightbox(sortedMedias);
}

// display & hide form
const displayModal = () => {
  modal.style.display = 'block';

  window.onclick = (event) => {
    if (event.target.classList == 'modal' || event.target.classList == 'icon-close') {
      modal.style.display = 'none';
    }
  }
}

////// --VALIDATION FUNCTIONS-- //////
function validateInput(input) {
  if (input.value.toString().trim().length < 2) {
    input.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  } else {
    input.parentElement.removeAttribute('data-error-visible');
    return true;
  }
}

// submit form
function validateForm(event) {
  let isFormOk = [];
  event.preventDefault(); // disable redirect + keep form datas if invalid

  isFormOk.push(validateInput(inputFirstname));
  isFormOk.push(validateInput(inputLastname));
  isFormOk.push(validateInput(inputMessage));
  isFormOk.push(validateInput(inputEmail));

  // if form doesn't return any 'false'
  if (!isFormOk.includes(false)) {
    // get every valid keys/values
    let datas = new FormData(form);
    for (let entry of datas.entries()) {
      console.log(entry[0], ':', entry[1]);
    }
    modal.style.display = 'none';
    form.reset();
  }
}


const generateLikesCounter = () => {
  let likesCounter = document.querySelectorAll('.likesCounter');

  likesCounter.forEach(counter => {
    counter.addEventListener('click', (event) => {
      let targetNumber = parseInt(event.target.childNodes[0].nodeValue); // get number without <i> child
      targetNumber++;
      counter.childNodes[0].nodeValue = targetNumber;
    })
  })
}

const generateTotalLikes = () => {
  let likesCounter = document.querySelectorAll('.likesCounter');
  let totalLikes = document.querySelector('.totalLikes');
  let arr = [];
  likesCounter.forEach(counter => {
    let number = parseInt(counter.innerText.slice(0, -3));
    arr.push(number);
  })
  let totalLikesCounter = arr.reduce((a, b) => a + b);
  totalLikes.innerHTML = `${totalLikesCounter}<i> ❤ </i>`;
}


const generateTotalPrice = (photographersById) => {
  let totalPrice = document.querySelector('.totalPrice');
  totalPrice.innerHTML = `${photographersById[0].price}€ / jour`;
}