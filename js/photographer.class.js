export default class Photographer {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.contry;
    this.tags = data.tags;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }

  generateArticle() {
    return `
    <article class="${this.generateTagsClass()}">
      <a href="./photographer.html?id=${this.id}" aria-label="${this.name}">
        <img src="./assets/Photographers ID Photos/${this.portrait}" alt="">
        <h2>${this.name}</h2>
      </a>
      <div>
        <p>${this.city}, ${this.country}</p>
        <p>${this.tagline}</p>
        <p>${this.price}€/jour</p>
      </div>
      <div class="tags-container">
        ${this.generateTagsLink()}
      </div>
    </article>
    `;
  }

  generateTagsLink() {

    let tagLink = '';

    this.tags.forEach(tag => {
      tagLink += `<a id="${tag}" href="#${tag}" aria-label="tag" class="tag">#${tag}</a>`;
    })

    return tagLink;
  }
  
  generateTagsClass() {

    let tagClass = '';

    this.tags.forEach(tag => {
      tagClass += `${tag} `;
    })

    return tagClass;
  }

  generateTotalPrice() {
    let totalPrice = `
      <div class="totalprice">${this.price}€ / jour</div>
    `;

    return totalPrice;
  }
}


