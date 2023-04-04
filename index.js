// SIDEBAR
const menuItems = document.querySelectorAll('.menu-item');
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

const messages_notification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
messages_notification.addEventListener('click', () => {
   messages.style.boxShadow = "2px 2px 4px rgba(0, 0, 0, 0.25)";
   setTimeout(() => {
         messages.style.boxShadow = 'none';
   }, 2000);
})


//theme customiztion
const theme = document.querySelector('#theme');
const themeIcon = document.querySelector('#theme-icon');


