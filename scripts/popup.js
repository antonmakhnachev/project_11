class Popup{
    open(popupName){
        popupName.classList.add('popup_is-opened')
    }

    close(popupName){
        popupName.classList.remove('popup_is-opened')
    }
};