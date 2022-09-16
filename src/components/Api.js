export default class Api {
  constructor(options) {
    this._adress = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._adress}/cards`,
      {headers: this._headers})
      .then(res => this._checkServerAnswer(res));
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`,
      {headers: this._headers})
      .then(res => this._checkServerAnswer(res));
  }

  setUserInfo(userName, userJob) {
    return fetch(`${this._adress}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userJob
      })
    })
      .then(res => this._checkServerAnswer(res));
  }

  setNewCard(cardName, cardLink) {
    return fetch(`${this._adress}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(res => this._checkServerAnswer(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkServerAnswer(res));

  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(res => this._checkServerAnswer(res));
    } else {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._checkServerAnswer(res));
    }
  }

  setUserAvatar(avatarLink) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => this._checkServerAnswer(res));
  }

  _checkServerAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
