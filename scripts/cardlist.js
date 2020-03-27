class CardList{
    constructor(container, card, api, userInfo){
        this.container = container;
        this.initialCards;
        this.card = card;
        this.api = api;
        this.userInfo = userInfo;
    };

    addCard(dataCard){        
        const cardElement = this.card.create(dataCard)
        this.container.appendChild(cardElement);
        cardElement
            .querySelector('.place-card__like-icon')
            .addEventListener('click',this.card.like.bind(this));
            
        cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click',this.card.remove.bind(this));        
                    
        if(dataCard.owner._id !== this.userInfo.userId){
            cardElement
                .querySelector('.place-card__delete-icon').classList.add('place-card__delete-icon_hide')
        }
        
        if(dataCard.likes.length>0){
            for(const likesData of dataCard.likes){                
                if(likesData._id === this.userInfo.userId){
                    cardElement
                        .querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked')
                }               
            }            
        }
    };   

    render(initialCards){        
        for(const dataCard of initialCards){            
            this.addCard(dataCard);
        }
    };
};