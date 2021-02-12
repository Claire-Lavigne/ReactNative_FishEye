import Photographer from './photographer.class.js';

const container = document.querySelector('#introduction > section');
const nav = document.querySelector('nav');
const anchorNav = document.querySelector('#anchor-nav');
anchorNav.hidden = true;

// Fetch API
// = promise-based JavaScript API for making asynchronous HTTP requests to fetch ressources from server
fetch('./js/datas.json')
  // Transform the data into json
  .then(response => {
    return response.json()
  })
  // Get the results
  .then(data => {
    const photographers = data[0].photographers;

    photographers.forEach(data => {
      const photographer = new Photographer(data);
      container.innerHTML += photographer.generateArticle();
    })

    displayNav(photographers);
    window.addEventListener('scroll', scrollNav);
    window.addEventListener('hashchange', filterArticles);
    window.addEventListener('popstate', filterArticles()); // execute immediately
  })
  .catch(error => { console.error('fetch error', error) })

const displayNav = (photographers) => {
  let tagsArray = [];
  photographers.forEach(photographer => {
    tagsArray.push(...photographer.tags); // add all tags into empty array
  });
  // remove duplicate tags
    // ('new') --> create new object 
    // ('Set') --> convert the array to a collection of unique values 
    // (spread operation '...') --> convert the result into an array 
  // then for each tag : create element
  [...new Set(tagsArray)].forEach(tag => {
    nav.innerHTML += `<a id="${tag}" href="#${tag}" aria-label="tag" class="tag">#${tag}</a>`
  })
}

const scrollNav = () => {
  const scrollY = window.scrollY;
  scrollY > 50 ? anchorNav.hidden = false : anchorNav.hidden = true;
};

const filterArticles = () => {
  const hash = window.location.hash;

  if (hash) {
    const tag = hash.replace('#', '');
    // if article has same class as the hash url keep it, if not hide it
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
      article.classList.contains(tag) ? article.hidden = false : article.hidden = true;
    })
  }
  return;
};