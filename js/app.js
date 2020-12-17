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

    tags.classList.add('card__tags');
    photographer.tags.forEach(tag => {
      tags.innerHTML += `<a>#${tag}</a>`
    })

    text.classList.add('card__text');
    text.innerHTML += `<p>${photographer.city}, ${photographer.country}</p>`
    text.innerHTML += `<p>${photographer.tagline}</p>`
    text.innerHTML += `<p>${photographer.price}€/jour</p>`

    articleLink.classList.add('card__link');
    articleLink.setAttribute('aria-label', photographer.name);
    articleLink.innerHTML += `<h2>${photographer.name}</h2>`
    articleLink.innerHTML += `<img src="${photographer.name}" alt=""/>`

    article.classList.add('card');
    article.appendChild(articleLink);
    article.appendChild(text);
    article.appendChild(tags);

    container.appendChild(article);
  })
}
createArticle()

function createNav() {

  const tagsArray = [];


  photographers.forEach(photographer => {
    tagsArray.push(...photographer.tags);
  })

  const tagsNav = [...new Set(tagsArray)];
  const nav = document.querySelector('nav');

  tagsNav.forEach(tag => {
    const a = document.createElement('a');
    const span = document.createElement('span');

    span.setAttribute('role', 'link');
    span.innerHTML += `#${tag}`;

    a.appendChild(span);
    nav.appendChild(a);
  })
}
createNav()


/*
  const photographers = data.results;
  return photographers.map(function(photographer) { // Map through the results and for each run the code below
    const li = createNode('li'), //  Create the elements we need
        img = createNode('img'),
        span = createNode('span');
    img.src = photographer.picture.medium;  // Add the source of the image to be the src of the img element
    span.innerHTML = `${photographer.name.first} ${photographer.name.last}`; // Make the HTML of our span to be the first and last name of our photographer
    append(li, img); // Append all our elements
    append(li, span);
    append(ul, li);
  }
*/