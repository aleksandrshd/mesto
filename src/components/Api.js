export default class Api {
  constructor(options) {
    this._adress = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._adress}/cards`,
      {headers: this._headers})
      .then(res => res.json());
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`,
      {headers: this._headers})
      .then(res => res.json());
  }

  setUserInfo(userName, userJob) {
    fetch(`${this._adress}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userJob
      })
    });
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
      .then(res => res.json());
  }

  deleteCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers})
      .then(res => res.json());

  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(res => res.json());
    }
    else {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => res.json());
    }
  }
}
