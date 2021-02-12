export default class Image {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.tags = data.tags;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.video = data.video;
    this.image = data.image;
  }

  generateTitle() {
    let mediaTitle = this.video.split('_').join(' ').replace(/\.[^/.]+$/, "");
    return mediaTitle;
  }

  generatePreview() {
    let title = this.video.slice(0, -3) + 'jpg';
    let image = `
      <img src="./assets/${this.photographerId}/${title}" alt="${this.generateTitle()}">
    `;
    return image;
  }

  generateView() {
    let video = `
      <video controls>
        <source src="./assets/${this.photographerId}/${this.video}" type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    `;
    return video;
  }

}