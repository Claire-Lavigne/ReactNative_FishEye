import Media from './media.js';

const dropdown = document.querySelector(".dropdown");
const sectionOne = document.querySelector('#photographer-infos');
const url = window.location.href;
const modal = document.querySelector('.modal');
const form = document.querySelector('form');
const modalTitle = document.querySelector('.modal-title');
const inputFirstname = document.querySelector('#first');
const inputLastname = document.querySelector('#last');
const inputEmail = document.querySelector('#email');
const inputMessage = document.querySelector('#msg');


fetch('./js/datas.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    const photographers = data[0].photographers;
    const medias = data[0].media;
    const getUrlId = window.location.search.substr(4);

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
        <div class="photographer-heading">
          <h1>${name}</h1>
          <button class="modal-btn btn">Contactez-moi</button>
        </div>
        <p>${city}, ${country}</p>
        <p>${tagline}</p>
        <div class="tags-container">
          ${tagLink}
        </div>
      </div>
      
      <img src="./assets/Photographers ID Photos/${portrait}" alt="${name}">
  `;

  sectionOne.innerHTML += content;

  modalTitle.innerHTML += `<br>${name}`;
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
  })
}

const workingLightbox = () => {
  const urlHash = window.location.hash;
  const currentLightbox = document.querySelector(urlHash);
  const arrowLeft = document.querySelector(`${urlHash} .arrow-left`);
  const arrowRight = document.querySelector(`${urlHash} .arrow-right`);
  if (currentLightbox.previousElementSibling !== null) {
    arrowLeft.href = `${url}#${currentLightbox.previousElementSibling.id}`;
  }
  if (currentLightbox.nextElementSibling !== null) {
    arrowRight.href = `${url}#${currentLightbox.nextElementSibling.id}`;
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
    if (event.target.classList == 'modal' || event.target.classList == 'modal-close') {
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
