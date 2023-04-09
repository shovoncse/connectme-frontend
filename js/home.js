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



// wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function() {

    // get cm-data from local storage
    const cmData = localStorage.getItem("cm-data");
    const cmToken = localStorage.getItem("cm-token");

    if(cmData){
        try {
        // parse the cm-data
        const cmDataParsed = JSON.parse(cmData);
        // get the user name element
        const userName = document.getElementById("user-name");

        // set the user name
        userName.innerHTML = cmDataParsed.name;
        } catch (error) {
            // if there is an error, remove cm-data and cm-token from local storage
            localStorage.removeItem("cm-data");
            localStorage.removeItem("cm-token");
            // redirect to login page
            window.location.href = "../connectme-frontend/login.html";
        }
    }

    if(!cmToken){
        // if user is not logged in, redirect to login page
        window.location.href = "../connectme-frontend/login.html";
    }


    // logout button
    const logoutButton = document.getElementById("logout-button");

    // add event listener to logout button
    logoutButton.addEventListener("click", function(e) {
        // prevent default action
        e.preventDefault();

        // remove cm-data and cm-token from local storage
        localStorage.removeItem("cm-data");
        localStorage.removeItem("cm-token");

        // redirect to login page
        window.location.href = "../connectme-frontend/login.html";
    });

});