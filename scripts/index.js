import '../pages/index.css';
import {Api} from './api.js';
import {Card} from './card.js';
import {CardList} from './cardlist.js';
import {FormValidator} from './formvalidator.js';
import {Popup} from './popup.js';
import {UserInfo} from './userinfo.js';



(function(){
  

  const root=document.querySelector('.root');
  const placesList=document.querySelector('.places-list');  

  const newPlaces=document.forms.new_place;
  const editProfile=document.forms.edit_profile;
  const editUserAvatar = document.forms.new_avatar;

  const forms = document.querySelectorAll('.popup__form')

  const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort8' : 'https://praktikum.tk/cohort8';

  const api = new Api({
    baseUrl: serverUrl,
    headers: {
      authorization: '47dcf786-51a8-479f-be0a-1c9390074f6c',
      'Content-Type': 'application/json'
    }
  });

  const popup = new Popup();
  const userInfo = new UserInfo();
  const card = new Card(api);
  const formValidator = new FormValidator(); 
  const cardList = new CardList(placesList, card, api, userInfo);  

  //загрузка данных о пользователе и карточек
  Promise.all([
    api.getUserData(),
    api.getInitialCards()
  ])    
    .then((values)=>{
      const [userData, initialCards] = values;
      userInfo.updateUserInfo(userData),
      cardList.render(initialCards)
    })
    .then(()=>{
      userInfo.setUserInfo()      
    })
    .catch((err)=>{
      console.log(err);
    })
    
    

  //удаление сообщений об ошибках на формах
  function clearErrMsg(popupName){
    const errMsgList = popupName.getElementsByTagName('p');

    for(const elem of errMsgList){
      elem.textContent='';
    }
  };  

  //управление формами
  root.addEventListener('click',function(event){
      const popupNewPlace = document.querySelector('.popup__new-place');
      const popupEditProfile = document.querySelector('.popup__edit-profile');
      const viewImage = document.querySelector('.popup__image');
      const viewPopup = document.querySelector('.popup__view-image');
      const popupEditUserPhoto = document.querySelector('.popup__edit-photo');

      switch(true){
        case event.target.classList.contains('user-profile__button'):
          clearErrMsg(popupEditProfile);
          userInfo.setPopupUserInfo(editProfile);
          popup.open(popupEditProfile);
          break;
        case event.target.classList.contains('user-info__button'):
          clearErrMsg(popupNewPlace);
          popup.open(popupNewPlace);
          break;
        case event.target.classList.contains('new-place__close'):
          newPlaces.reset();
          popup.close(popupNewPlace);
          break;
        case event.target.classList.contains('edit-profile__close'):
          popup.close(popupEditProfile);
          break;
        case event.target.classList.contains('place-card__image'):
          viewImage.style.backgroundImage=event.target.style.backgroundImage;
          popup.open(viewPopup);
          break;
        case event.target.classList.contains('view-image__close'):
          popup.close(viewPopup);
          break;
        case event.target.classList.contains('user-info__photo'):
          clearErrMsg(popupEditUserPhoto);
          popup.open(popupEditUserPhoto);
          break;
        case event.target.classList.contains('edit-photo__close'):
          editUserAvatar.reset();
          popup.close(popupEditUserPhoto);
          break;
      };
    });


  //редактирование профиля
  editProfile.addEventListener('submit',function(event){
    event.preventDefault();

    const form = event.currentTarget;
    const popupEditProfile = document.querySelector('.popup__edit-profile');     
    
    api.updateUserData(form.elements.user_name.value, form.elements.about_user.value)
      .then(userData=>{
        userInfo.updateUserInfo(userData)
      })
      .then(()=>{
        userInfo.setUserInfo()
        popup.close(popupEditProfile);
      })      
      .catch((err)=>{
        console.log(err);
      })
    });


  //добавляем новую картинку
  newPlaces.addEventListener('submit',function(event){
    event.preventDefault();

    const form=event.currentTarget;
    const dataCard = {link: form.elements.link.value, name: form.elements.name.value};      
    const popupNewPlace = document.querySelector('.popup__new-place');

    api.addNewCard(dataCard)
      .then((dataCard)=>{
        cardList.addCard(dataCard);
        popup.close(popupNewPlace);
        form.reset();
      })
      .catch((err)=>{
        console.log(err);
      })
    });
    
  
  editUserAvatar.addEventListener('submit', function(event){
    event.preventDefault();

    const form=event.currentTarget;
    const userData = {avatar: form.elements.link.value};      
    const popupEditUserPhoto = document.querySelector('.popup__edit-photo');

    api.addAvatar(userData)
      .then((userData)=>{
        userInfo.updateUserInfo(userData)
      })
      .then(()=>{
        userInfo.setUserInfo();
        popup.close(popupEditUserPhoto);
        form.reset();
      })
      .catch((err)=>{
        console.log(err);
      })
  });

  /* 
    Можно лучше: при каждой отправке на элементы формы вызывается навешивание новых обработчиков
  */
  for(const form of forms){      
      formValidator.setEventListiner(form);
  };

}());


/*
  Хорошая работа, класс Api создан и обеспечивает необходимые запросы для доступа к серверу
  Отлично что параметры сервера передаются в его конструктор и сделано также дополнительное задание

  Но по работе есть несколько замечаний:

  Надо исправить:
  - + обработчик catch должен быть в самом конце цепочки обработки промиса, а не в классе Api
  - + класс Api не должен отвечать за удаление карточки со страницы

  Можно лучше: 
  - + проверка ответа сервера и преобразование из json дублируется во всех методах класса Api, лучше вынести в отдельный метод
  - + закрывать попап также только если запрос выполнился успешно
  - + не нужно передавать Path как параметр метода Api, можно прописать этот адрес прям в самом классе т.к.
  именно класс Api скрывать внутри себя как к серверу происходит запрос, карточке не обязательно
  знать что они находятся именно по эндпоинту card
  - + убрать лишние обработчики вида 
  .then((userData)=>{                        
            return userData;           
        })


*/

/*
  Отлично, все замечания исправлены

  Можно лучше: при отправке формы аватара зачем то вызывается setEventListiner, навешивание
  лишних обработчиков может привести к утечки памяти или некорректной работе программы

  Если у Вас будет свободное время попробуйте переписать работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/

