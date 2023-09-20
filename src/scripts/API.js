class API {
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Что-то пошло не так...");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    });
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    });
  }

  setUserInfo({newName, newJob}) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newJob
      })
    });
  }

  setAvatar({newAvatar}) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    });
  }

  postNewCard({cardName, cardLink}) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    });
  }

  deleteCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  likeCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
  }

  dislikeCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    
  }
}

export default API;