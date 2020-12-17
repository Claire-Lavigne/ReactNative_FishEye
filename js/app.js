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
    const article = document.createElement('article');
    const articleLink = document.createElement('a');
    const text = document.createElement('div');
    const tags = document.createElement('div');

    photographer.tags.forEach(tag => {
      tags.innerHTML += `<a class="tag">#${tag}</a>`
    })

    text.innerHTML += `<p>${photographer.city}, ${photographer.country}</p>`
    text.innerHTML += `<p>${photographer.tagline}</p>`
    text.innerHTML += `<p>${photographer.price}€/jour</p>`

    articleLink.setAttribute('aria-label', photographer.name);
    articleLink.innerHTML += `<img src="${photographer.portrait}" alt=""/>`
    articleLink.innerHTML += `<h2>${photographer.name}</h2>`

    article.appendChild(articleLink);
    article.appendChild(text);
    article.appendChild(tags);

    container.appendChild(article);
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

  // remove duplicate tags and for each tag remaining,
  // create elements : (a[aria-label] > span)
  // and append them into the nav
  [...new Set(array)].forEach(tag => {
    const a = document.createElement('a');
    const span = document.createElement('span');
    span.innerHTML += `#${tag}`;
    a.classList.add('tag');
    a.setAttribute('aria-label', 'tag');
    a.appendChild(span);
    nav.appendChild(a);
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