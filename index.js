// SIDEBAR
const menuItems = document.querySelectorAll('.menu-item');
const messages_notification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');



const changeActiveItem = () => {
    menuItems.forEach((item) => {
        item.classList.remove('active');
    });
};
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notifications-popup').style.display = 'none';
        }
        else{
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})

messages_notification.addEventListener('click', () => {
   messages.style.boxShadow = "3px 2px 4px rgba(0, 0, 0, 0.25)";
   setTimeout(() => {
         messages.style.boxShadow = 'none';
   }, 5000);
})


//search
const message = messages.querySelectorAll('.message');
const msgsearch = document.querySelector('#messages-search');

const searchMessage = () => {
    const searchValue = msgsearch.value.toLowerCase();
    
    message.forEach((message) => {
        const messageText = message.querySelector('h4').textContent.toLowerCase();
        if(messageText.indexOf(searchValue) != -1){
            message.style.display = 'flex';
        }
        else{
            message.style.display = 'none';
        }
    })
};

msgsearch.addEventListener('keyup', searchMessage);


//theme customization
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fonts = document.querySelectorAll('.choose-size span');

const openThemeModal = () => {
    themeModal.style.display = 'grid';
};

const closeThemeModal = (event) => {
    if (event.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
};

themeModal.addEventListener('click', closeThemeModal);
theme.addEventListener('click', openThemeModal);

const removeSizeSelector = () => {
    fonts.forEach((font) => {
        font.classList.remove('active');
    });
};

// Define the root variable
const root = document.documentElement;

fonts.forEach((font) => {
    font.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        if (font.classList.contains('font-size-1')) {
            fontSize = '10px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '5.4rem');
        } else if (font.classList.contains('font-size-2')) {
            fontSize = '13px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '-7rem');
        } else if (font.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('--sticky-top-left', '2rem');
            root.style.setProperty('--sticky-top-right', '-17rem');
        } else if (font.classList.contains('font-size-4')) {
            fontSize = '19';
            root.style.setProperty('--sticky-top-left', '-5rem');
            root.style.setProperty('--sticky-top-right', '-25rem');
        } else if (font.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('--sticky-top-left', '12rem');
            root.style.setProperty('--sticky-top-right', '-35rem');
        }
        font.classList.add('active');
        document.querySelector('html').style.fontSize = fontSize;
    });
});

//change colors
const colors = document.querySelectorAll('.choose-color span');




colors.forEach(color => {
    color.addEventListener('click', ()=> {
        let primary;

        if(color.classList.contains('color-1')){
            primaryHue = 252;
        }
        else if(color.classList.contains('color-2')){
            primaryHue = 52;
        }
        else if(color.classList.contains('color-3')){
            primaryHue = 352;
        }
        else if(color.classList.contains('color-4')){
            primaryHue = 152;
        }
        else if(color.classList.contains('color-5')){
            primaryHue = 202;
        }
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})


const bground_1 = document.querySelector('.bg-1');
const bground_2 = document.querySelector('.bg-2');
const bground_3 = document.querySelector('.bg-3');

let lightColorLightness;
let darkColorLightness;
let whiteColorLightness;

const changeBground = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
}
bground_1.addEventListener('click', () =>{
    bground_1.classList.add('active');
    bground_2.classList.remove('active');
    bground_3.classList.remove('active');
   window.location.reload(); 
})

bground_2.addEventListener('click', () => {
    lightColorLightness = '15%';
    darkColorLightness = '95%';
    whiteColorLightness = '20%';

    bground_2.classList.add('active');
    bground_1.classList.remove('active');
    bground_3.classList.remove('active');
    changeBground();
   
});   

bground_3.addEventListener('click', () => {
    lightColorLightness = '0%';
    darkColorLightness = '95%';
    whiteColorLightness = '10%';

    bground_3.classList.add('active');
    bground_1.classList.remove('active');
    bground_2.classList.remove('active');
    changeBground();
});










