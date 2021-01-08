
function removeOption() {
  let option = document.querySelectorAll(".dropdown option");
  option.forEach(e => {
    e.selected
  })
  console.log(option)
}
dropdown.addEventListener('change', removeOption)

function createPage() {

  let getUrlID = window.location.search.substr(4);
  let photographersByID = photographers.filter(photographer => {
    return photographer.id == getUrlID;
  });
  console.log(photographersByID[0].name)
  //const container = document.querySelector('#photographer > section');





  /*
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
    */
}
createPage()

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
