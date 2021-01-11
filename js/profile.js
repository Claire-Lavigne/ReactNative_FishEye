const dropdown = document.querySelector(".dropdown");
const sectionOne = document.querySelector('#photographer-infos');
const album = document.querySelector('.album');

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
    createAlbum(mediasById);

    dropdown.addEventListener('change', removeOption);

  })
  .catch(error => { console.log(error) })



const removeOption = () => {
  let options = document.querySelector(".dropdown");
  let option = document.querySelector("option:checked");
  /*
  switch (option.value) {
    case "popular":
      option
      break;
    case "date":
      option
      break;
    case "title":
      option
      break;
    default:
      options
      break;
  }
  */

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
      <div>
        <h1>${name}</h1>
        <p>${city}, ${country}</p>
        <p>${tagline}</p>
        <div class="tags-container">
          ${tagLink}
        </div>
      </div>
      <button>Contactez-moi</button>
      <img src="./assets/Photographers ID Photos/${portrait}" alt="${name}">
  `;

  sectionOne.innerHTML += content;

}

const createAlbum = (mediasById) => {
  let images = '';
  mediasById.forEach(media => {
    if (media.image !== undefined) {
      images = `<img src="./assets/${media.photographerId}/${media.image}" alt="">`;
      album.innerHTML += images;
    }
  })
}