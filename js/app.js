import datas from './datas.js';
console.log(datas)

let photographers = datas.photographers;
let media = datas.media;

// Fetch API
// = promise-based JavaScript API for making asynchronous HTTP requests to fetch ressources from server
fetch('./js/datas.js')
  // Transform the data into json
  .then(response => response.json())
  // Get the results
  .then(
    photographers.forEach(photographer => {
      console.log(photographer.name);
      console.log(photographer.city);
      console.log(photographer.country);
      console.log(photographer.price);
      console.log(photographer.tagline);
      console.log(photographer.tags);
    })
  )
  //.catch (error => { console.log(error) })


/*
  let photographers = data.results;
  return photographers.map(function(photographer) { // Map through the results and for each run the code below
    let li = createNode('li'), //  Create the elements we need
        img = createNode('img'),
        span = createNode('span');
    img.src = photographer.picture.medium;  // Add the source of the image to be the src of the img element
    span.innerHTML = `${photographer.name.first} ${photographer.name.last}`; // Make the HTML of our span to be the first and last name of our photographer
    append(li, img); // Append all our elements
    append(li, span);
    append(ul, li);
  }
*/