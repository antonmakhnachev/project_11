class UserInfo{
    constructor(){
        this.userName;
        this.aboutUser;
        this.userAvatar;
        this.userId;         
    }

    updateUserInfo(userData){        
        this.userName = userData.name;
        this.aboutUser = userData.about;
        this.userAvatar = userData.avatar;
        this.userId = userData._id;        
    }

    getUserId(){
        console.log(this.userId)
        return this.userId;
    }

    setPopupUserInfo(form){        
        const userName = document.querySelector('.user-info__name');
        const aboutUser = document.querySelector('.user-info__job');       

        form.elements.user_name.value = userName.textContent;
        form.elements.about_user.value = aboutUser.textContent;

        form.elements.btn_save.disabled = false;
    }
        
    setUserInfo(){
        const userNameText = document.querySelector('.user-info__name');
        const aboutUserText = document.querySelector('.user-info__job');
        const userPhoto = document.querySelector('.user-info__photo'); 

        userNameText.textContent = this.userName;
        aboutUserText.textContent = this.aboutUser;
        userPhoto.style.backgroundImage = `url(${this.userAvatar})`;       
    }    
};