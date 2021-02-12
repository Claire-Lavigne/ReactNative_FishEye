export default class Image {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.tags = data.tags;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.image = data.image;
  }

  generateTitle() {
    let mediaTitle = this.image.split('_').join(' ').replace(/\.[^/.]+$/, "");
    return mediaTitle;
  }

  generatePreview() {
    let image = `
      <img src="./assets/${this.photographerId}/${this.image}" alt="${this.generateTitle()}">
      `;
    return image;
  }
  
  generateView() {
    return this.generatePreview();
  }
  
}