import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
constructor(popupSelector) {
  super(popupSelector);
  this._imagePicture = this._popup.querySelector('.popup__img');
  this._imageCaption = this._popup.querySelector('.popup__caption');
}
  open(name, link) {
    this._imagePicture.src = link;
    this._imagePicture.alt = name;
    this._imageCaption.textContent = name;
    super.open();
  }

}
