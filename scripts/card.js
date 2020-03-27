class Card{
    constructor(api){
        this.api = api;
    }


    like(event){        
        const imageId = event.target.closest('.place-card').getElementsByClassName('place-card__image')[0].id
        const counter = event.target.closest('.place-card').getElementsByClassName('place-card__like-counter')[0]        
        
        if(event.target.classList.contains('place-card__like-icon_liked')){
            this.api.dislikeCard(imageId)
                .then((dataCard)=>{
                    event.target.classList.remove('place-card__like-icon_liked');
                    counter.textContent = dataCard.likes.length;
                })
                .catch((err)=>{
                    console.log(err);
                })
        }else{
            this.api.likeCard(imageId)        
                .then((dataCard)=>{
                    event.target.classList.add('place-card__like-icon_liked');
                    counter.textContent = dataCard.likes.length;
                })
                .catch((err)=>{
                    console.log(err);
                })
        };        
    };

    remove(event){
        const imageId = event.target.closest('.place-card__image').id        
        this.api.deleteCard(imageId)
            .then(()=>{
                document.getElementById(imageId).closest('.place-card').remove()
            })            
            .catch((err)=>{
                console.log(err)
            })       
    };

    create(dataCard){
        const placeCard = document.createElement('div');
        const placeCardImage = document.createElement('div');
        const placeCardDeleteBtn = document.createElement('button');
        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const placeCardLikeData = document.createElement('div');
        const placeCardLikeBtn  =document.createElement('button');
        const placeCardLikeCounter = document.createElement('p');

        placeCard.classList.add('place-card');
        placeCardImage.classList.add('place-card__image');
        placeCardDeleteBtn.classList.add('place-card__delete-icon');
        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');
        placeCardLikeData.classList.add('place-card__like-data');
        placeCardLikeBtn.classList.add('place-card__like-icon');
        placeCardLikeCounter.classList.add('place-card__like-counter')


        placeCard.appendChild(placeCardImage);
        placeCardImage.appendChild(placeCardDeleteBtn);
        placeCard.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placeCardLikeData);
        placeCardLikeData.appendChild(placeCardLikeBtn);
        placeCardLikeData.appendChild(placeCardLikeCounter);

        placeCardImage.style.backgroundImage=`url(${dataCard.link})`
        placeCardImage.style.cursor = 'pointer';
        placeCardImage.id = `${dataCard._id}`;
        placeCardName.textContent = dataCard.name;
        placeCardLikeCounter.textContent = dataCard.likes.length;
        

        return placeCard;
    };
};