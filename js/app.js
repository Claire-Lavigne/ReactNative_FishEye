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

    let tagClass = '';
    let tagLink = '';

    photographer.tags.forEach(tag => {
      tagClass += `${tag} `;
      tagLink += `<a href="#" aria-label="tag" class="tag">#${tag}</a>`;
    })

    container.innerHTML += `
    <article class="${tagClass}">
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

  // remove duplicate tags and for each tag remaining add element
  [...new Set(array)].forEach(tag => {
    nav.innerHTML += `<a id="${tag}" href="#" aria-label="tag" class="tag">#${tag}</a>`
  })
}
createNav()

// when I click on a tag (nav)
const tagsNav = document.querySelectorAll('nav > a');
tagsNav.forEach((tag) => tag.addEventListener('click', filterTag));

function filterTag() {
  // get id of target tag (nav)
  const selectedTag = this.id;
  
  // if article has same class as the id
  // keep it, if not hide it
  const articles = document.querySelectorAll('article');
  articles.forEach(article => {
    if (article.classList.contains(selectedTag)) {
      article.hidden = false;
    } else {
      article.hidden = true;
    }
  })
}

const anchorNav = document.querySelector('#anchor-nav');

anchorNav.hidden = true;

let scrollNav = function() {
  let y = window.scrollY;
  if (y > 50) {
    anchorNav.hidden = false;
  } else {
    anchorNav.hidden = true;
  }
};

window.addEventListener('scroll', scrollNav);

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
