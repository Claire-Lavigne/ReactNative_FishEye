import Image from './Image.class.js';
import Video from './Video.class.js';

export default class Media {
  constructor(data) {
    this.media = this.createMedia(data)
  }

  createMedia(data) {
    if (data.image) {
      return new Image(data)
    } else if (data.video) {
      return new Video(data)
    } else {
      console.error('Erreur')
    }
  }

  generateCard() {
    let media = `
      <div class="media-wrapper">
        <a href="#lightbox-media-${this.media.id}">
        ${this.media.generatePreview()}
        </a>
        <div class="media-infos">
          <div>${this.media.generateTitle()}</div> 
          <div>
            <span class="likesCounter">${this.media.likes}<i> ❤ </i></span>
            <span>${this.media.price}€</span>
          </div>
        </div>
      </div>
    `;

    return media;
  }


  generateLightbox() {
    // lightbox from https://codepen.io/ind88/pen/MzoKzP?editors=1100
    let mediaLightbox = `
      <div class="media-lightbox" id="lightbox-media-${this.media.id}">
        <div class="media-lightbox-wrapper">
          <a href="" class="close"></a>
          <a href="" class="arrow-left"></a>
          <a href="" class="arrow-right"></a>
          ${this.media.generateView()}
          <div class="media-infos">${this.media.generateTitle()}</div>
        </div>
      </div>
      `;

    return mediaLightbox;
  }

}


