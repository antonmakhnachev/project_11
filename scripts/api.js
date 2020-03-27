class Api{
    constructor(options){
        this.options = options;        
    }

    _getResponseData(res){
        if(!res.ok){
            return Promise.reject(`Ошибка: ${res.status}`);
        }

        return res.json();
    };

    getUserData(){        
        return fetch(`${this.options.baseUrl}/users/me`, {
        headers: {
            authorization: this.options.headers.authorization
            }
        })
        
        .then(res=>this._getResponseData(res)) 
    };

    getInitialCards(){
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: {
                authorization: this.options.headers.authorization
            }
        })

        .then(res=>this._getResponseData(res))       
    };

    updateUserData(userName, userAbout){
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })

        .then(res=>this._getResponseData(res))        
    };

    addNewCard(dataCard){
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: dataCard.name,
                link: dataCard.link
            })
        })

        .then(res=>this._getResponseData(res))        
    };

    deleteCard(cardId){        
        if(window.confirm('Удалить карточку?')){
            return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this.options.headers.authorization,
                    'Content-Type': 'application/json'
                }
            })

            .then(res=>this._getResponseData(res))            
        };
    };

    likeCard(cardId){
        return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            }
        })

        .then(res=>this._getResponseData(res))
    };

    dislikeCard(cardId){
        return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            }
        })

        .then(res=>this._getResponseData(res))        
    };

    addAvatar(userData){
        return fetch(`${this.options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: userData.avatar
            })                
        })

        .then(res=>this._getResponseData(res))        
    };    
};