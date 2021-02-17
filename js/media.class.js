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
        <a class="media-link" href="#${this.media.id}">
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

  /*
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
  */


  generateLightbox() {
    let mediaLightbox = `
      <div id="${this.media.id}" class="lightbox-content">
        <button class="lightbox-close" title="Close modal lightbox">
          <img class="icon-close" src="./assets/cross-alt.png" alt="icon close">
        </button>
        <div class="lightbox-body">${this.media.generateView()}
          <div class="media-infos">${this.media.generateTitle()}</div>
        </div>
        <a class="lightbox__prev" title="Previous image">
          <img class="icon-prev" src="./assets/prev.png" alt="previous arrow">
        </a>
        <a class="lightbox__next" title="Next image">
          <img class="icon-next" src="./assets/next.png" alt="next arrow">
        </a>
      </div>
      `;
    return mediaLightbox;
  }
}


