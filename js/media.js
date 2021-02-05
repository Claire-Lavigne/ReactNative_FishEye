export default class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.tags = data.tags;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.image = data.image;
    this.video = data.video;

  }

  generateMediaTitle() {
    if (this.image !== undefined) {
      let mediaTitle = this.image.split('_').join(' ').replace(/\.[^/.]+$/, "");
      // add smthg in datas.json : this.alt = mediaTitle;
      return mediaTitle;
    } else if (this.video !== undefined) {
      let mediaTitle = this.video.split('_').join(' ').replace(/\.[^/.]+$/, "");
      return mediaTitle;
    }
  }

  generateMedia() {
    if (this.image !== undefined) {
      let image = `
      <img src="./assets/${this.photographerId}/${this.image}" alt="${this.generateMediaTitle()}">
      `;
      return image;
    } else if (this.video !== undefined) {
      let video = `
      <video controls>
      <source src="./assets/${this.photographerId}/${this.video}" type='video/mp4' />
      Your browser does not support the video tag.
    </video>
    `;
      return video;
    }
  }

  generateCard() {
    let media = `
      <div class="media-wrapper">
        <a href="#lightbox-media-${this.id}">
        ${this.generateMedia()}
        </a>
        <div class="media-infos">
          <div>${this.generateMediaTitle()}</div> 
          <div>
            <span class="likesCounter">${this.likes}<i> ❤ </i></span>
            <span>${this.price}€</span>
          </div>
        </div>
      </div>
    `;

    return media;

  }

  generateLightbox() {
    // lightbox from https://codepen.io/ind88/pen/MzoKzP?editors=1100
    let mediaLightbox = `
      <div class="media-lightbox" id="lightbox-media-${this.id}">
        <div class="media-lightbox-wrapper">
          <a href="" class="close"></a>
          <a href="" class="arrow-left"></a>
          <a href="" class="arrow-right"></a>
          ${this.generateMedia()}
          <div class="media-infos">${this.generateMediaTitle()}</div>
        </div>
      </div>
      `;

    return mediaLightbox;
  }


}


