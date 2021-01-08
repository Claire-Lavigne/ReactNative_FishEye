const dropdown = document.querySelector(".dropdown select");

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


function removeOption() {
  let option = document.querySelectorAll(".dropdown option");
  option.forEach(e => {
    e.selected
  })
  console.log(option)
}

const sectionOne = document.querySelector('#photographer-infos');
const album = document.querySelector('.album');

function createProfile(photographersById) {
  let tag = '';
  const name = photographersById[0].name;
  const city = photographersById[0].city;
  const country = photographersById[0].country;
  const tagline = photographersById[0].tagline;
  const tags = photographersById[0].tags;
  const portrait = photographersById[0].portrait;

  tags.forEach(tag => {
    tag += `<a id="${tag}" href="./index.html#${tag}" aria-label="tag" class="tag">#${tag}</a>`;
  })

  const content = `
      <div>
        <h2>${name}</h2>
        <p>${city}, ${country}</p>
        <p>${tagline}</p>
        <div class="tags-container">
          ${tag}
        </div>
      </div>
      <button>Contactez-moi</button>
      <img src="./assets/Photographers ID Photos/${portrait}" alt="${name}">
  `;

  sectionOne.innerHTML += content;

}

function createAlbum(mediasById) {
  let images = '';
  mediasById.forEach(media => {
    if (media.image !== undefined) {
      images = `<img src="./assets/${media.photographerId}/${media.image}" alt="">`;
      album.innerHTML += images;
    }
  })
}



  /*
    photographers.forEach(photographer => {
  
      let tagClass = '';
      let tagLink = '';
  
      photographer.tags.forEach(tag => {
        tagClass += `${tag} `;
        tagLink += `<a href="#" aria-label="tag" class="tag">#${tag}</a>`;
      })
  
      container.innerHTML += `
      <div class="${tagClass}">
        <a href="./photographer.html?id=${photographer.id}" aria-label="${photographer.name}">
          <img src="./assets/Photographers ID Photos/${photographer.portrait}" alt="">
          <h2>${photographer.name}</h2>
        </a>
        <div>
          <p>${photographer.city}, ${photographer.country}</p>
          <p>${photographer.tagline}</p>
          <p>${photographer.price}€/jour</p>
        </div>
        <div class="tags-container">
          ${tagLink}
        </div>
      </div>
      `;
    })
    */

/*
   return photographers.map(function(photographer) { // Map through the results and for each run the code below
    const li = createNode('li'), //  Create the elements we need
        img = createNode('img'),
        span = createNode('span');
   append(li, img); // Append all our elements
    append(li, span);
    append(ul, li);
  }
*/
