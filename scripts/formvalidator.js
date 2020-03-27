class FormValidator{    

    checkInputValidity(event){
        const description=event.target.nextElementSibling;
        
        switch (true){
            case event.target.validity.valueMissing:
                description.textContent='Это обязательное поле';
                break;
            case event.target.validity.tooShort || event.target.validity.tooLong:
                description.textContent='Должно быть от 2 до 30 символов';
                break;
            case event.target.validity.typeMismatch:
                description.textContent='Здесь должна быть ссылка';
                break;
            default:
                description.textContent='';
        };
    }

    setSubmitButtonState(event){
        const form=event.target.closest('.popup__form'); 
        if(form.checkValidity()){
            form.elements.btn_save.disabled=false;
        }else{
            form.elements.btn_save.disabled=true;    
        };
    }

    setEventListiner(form){
        form.addEventListener('input',this.checkInputValidity);
        form.addEventListener('input',this.setSubmitButtonState);
    }
};