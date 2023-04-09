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


// main
// Replace 'TOKEN_VALUE' with your actual token value
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzFhNzBiMGJiNmRiMDRjYzkxY2RhYyIsImlhdCI6MTY4MTAyNzQ5NSwiZXhwIjoxNjgxMDI5Mjk1fQ.RFRJVbE9elnauIkfLgMcPsKU9mbjIz2SXgHpmeLoSyk';

// fetch('http://localhost:3001/api/posts/', {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   });