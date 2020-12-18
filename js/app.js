import datas from './datas.js';
// console.log(datas)

const photographers = datas.photographers;
const media = datas.media;

// Fetch API
// = promise-based JavaScript API for making asynchronous HTTP requests to fetch ressources from server
fetch('./js/datas.js')
  // Transform the data into json
  .then(response => {
    response.json()
  })
  // Get the results
  .then(
    photographers.forEach(photographer => {
    })
  )
//.catch (error => { console.log(error) })


function createArticle() {

  const container = document.querySelector('#container > section');

  photographers.forEach(photographer => {

    let tags = '';

    photographer.tags.forEach(tag => {
      tags += `<a href="#" aria-label="tag" class="tag ${tag}">#${tag}</a>`;
    })

    container.innerHTML += `
    <article>
      <a href="./photographer.html?id=${photographer.id}" aria-label="${photographer.name}">
        <img src="./assets/Photographers ID Photos/${photographer.portrait}" alt="">
        <h2>${photographer.name}</h2>
      </a>
      <div>
        <p>${photographer.city}, ${photographer.country}</p>
        <p>${photographer.tagline}</p>
        <p>${photographer.price}€/jour</p>
      </div>
      <div id="tags-container">
        ${tags}
      </div>
    </article>
    `;
  })
}
createArticle()

function createNav() {
  const array = [];
  const nav = document.querySelector('nav');

  // add all tags from photographers object into empty array
  photographers.forEach(photographer => {
    array.push(...photographer.tags);
  });

  // remove duplicate tags and for each tag remaining
  [...new Set(array)].forEach(tag => {
    nav.innerHTML += `<a id="${tag}" href="#" aria-label="tag" class="tag">#${tag}</a>`
  })
}
createNav()


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
