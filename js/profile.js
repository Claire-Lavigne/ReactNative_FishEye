const dropdown = document.querySelector(".dropdown");
const sectionOne = document.querySelector('#photographer-infos');
const gallery = document.querySelector('.gallery-wrapper');
const lightboxes = document.querySelector('.gallery-lightboxes');
//
const modal = document.querySelector('.modal');
const form = document.querySelector('form');
const modalTitle = document.querySelector('.modal-title');
const inputFirstname = document.querySelector('#first');
const inputLastname = document.querySelector('#last');
const inputEmail = document.querySelector('#email');
const inputMessage = document.querySelector('#msg');
const modalClose = document.querySelector('.modal-close');

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
    createGallery(mediasById);
    createLightbox(mediasById);
    sortGallery(mediasById);
    removeOption();
    dropdown.addEventListener('change', removeOption);
    const modalOpen = document.querySelector('.modal-btn');
    modalOpen.addEventListener('click', displayModal);

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

const createGallery = (mediasById) => {
  mediasById.forEach(media => {
    if (media.image !== undefined) {
      let imageTitle = media.image.split('_').join(' ').replace(/\.[^/.]+$/, "");

      image = `
        <div class="image-wrapper">
          <a href="#lightbox-image-${media.id}">
            <img src="./assets/${media.photographerId}/${media.image}" alt="">
            <div class="image-infos">${imageTitle} <span>${media.price} € ${media.likes} ❤</span></div>
          </a>
        </div>
        `;
      gallery.innerHTML += image;
    }
  })
}

const createLightbox = (mediasById) => {
  mediasById.forEach(media => {
    if (media.image !== undefined) {
      lightbox = `
      <div class="image-lightbox" id="lightbox-image-${media.id}">
        <div class="image-lightbox-wrapper">
          <a href="#" class="close"></a>
          <a href="#lightbox-image-3" class="arrow-left"></a>
          <a href="#lightbox-image-2" class="arrow-right"></a>
          <img src="./assets/${media.photographerId}/${media.image}" alt="">
          <div class="image-infos">${imageTitle}</div>
        </div>
      </div>
      `;
      lightboxes.innerHTML += lightbox;
    }
  })
}


const sortGallery = (mediasById) => {
  mediasById.forEach(media => {
    if (media.image !== undefined) {
      const sortByDate = [media.date].sort((a, b) => a.valueOf() - b.valueOf());
      console.log(sortByDate);
      const sortByTitle = [media.title].sort((a, b) => a - b);
      console.log(sortByTitle);
      const sortByLikes = [media.likes].sort((a, b) => a - b);
      console.log(sortByLikes);
    }
  })
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





form.addEventListener('submit', validateForm);

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