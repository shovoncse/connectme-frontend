// nav bar & left sidebar
try {
    const user = JSON.parse(localStorage.getItem("cm-data"));
    if (user.image) {
        document.querySelector('#nav-user-logo').src = user.image;

        const leftlogo = document.querySelector('.left .profile-photo img');
        if (leftlogo) {
            leftlogo.src = user.image;
        }
    }
}catch (e) {
    console.log(e);
}


// set loader function
function loader(status) {
    const loaderHtml = '<div class="loader"><img src="https://i.gifer.com/ZZ5H.gif"/></div>';

    const loader = document.querySelector('.loader');

    if (loader) {
        if (status) {
            loader.style.display = 'flex';
        } else {
            loader.style.display = 'none';
        }
    } else {
        const body = document.querySelector('body');
        body.insertAdjacentHTML('beforeend', loaderHtml);
    }
}


// function reset local storage and redirect to login page
function resetLocalStorage() {
    localStorage.removeItem("cm-data");
    localStorage.removeItem("cm-token");
    loader(false);
    window.location.href = "../connectme-frontend/login.html";
}

// function for api request
async function apiRequest(url, requestOptions) {
    try {
        let res = await fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                // resetLocalStorage();
                return error;
            });
        return res;
    } catch (error) {
        return error;
    }
}


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
        if (item.id != 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'none';
        }
        else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})

// home post html
function generatePostHtml({ image, postContent, updatedAt, user  }) {
    return `<div class="feeds"> <div class="feed"> <div class="head"> <div class="user"> <div class="profile-photo" onclick="window.location.href='profile.html?id=${user.username}'"> <img src="${user.image}" alt=""> </div> <div class="ingo"> <h3 class="c-pointer" onclick="window.location.href='profile.html?id=${user.username}'" >${user.name}</h3> <small> ${getRelativeTime(updatedAt)}</small> </div> </div> <span class="edit"> <i class="uil uil-ellipsis-h"></i> </span> </div> <div id="post-content" class="post-content"> <p>${postContent}</p> </div> <div class="photo"> ${image ? `<img src="${image}" alt="">` : ''} </div> <div class="action-buttons"> <div class="interation-button"> <span> <i class="uil uil-heart"></i></span> <span> <i class="uil uil-comment-dots"></i> </span> <span> <i class="uil uil-share-alt"></i></span> </div> <div class="bookmark"> <span> <i class="uil uil-bookmark"></i></span> </div> </div> <div> <div class="row"> <div class="col-md-12"> <div class="comment"> <div class="comment-body"> <input type="text" placeholder="Add a comment..." class="comment-box"> <span class="uil-message"></span> </div> </div> </div> </div> </div> </div> </div>`
}

// get relative time
function getRelativeTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days + " day" + (days > 1 ? "s" : "") + " ago";
    } else if (hours > 0) {
        return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
    } else if (minutes > 0) {
        return minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
    } else {
        return "just now";
    }
}

// image upload
function imageUploadInput(uploadBtnId = 'upload-btn', imagePreviewId = 'image-preview') {


    const uploadBtn = document.getElementById(uploadBtnId);
    const imagePreview = document.getElementById(imagePreviewId);
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '&times;';

    uploadBtn.addEventListener('change', () => {
        const file = uploadBtn.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const image = document.createElement('img');
            image.src = reader.result;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(image);
            imagePreview.style.display = 'block';
            imagePreview.appendChild(deleteBtn);
        };
    });

    deleteBtn.addEventListener('click', () => {
        imagePreview.innerHTML = '';
        imagePreview.style.display = 'none';
    });
}

// image host to cloud
async function imageHostToCloud(inputId) {
    const input = document.getElementById(inputId);

    const apiKey = '02598d03c9a3fd5b85ebb55a67fb5755';
    const apiUrl = 'https://api.imgbb.com/1/upload';
    let imageUrl = '';

    if (input.files[0]) {
        const formData = new FormData();
        formData.append('image', input.files[0]);
        formData.append('key', apiKey);

        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        imageUrl = data.data.url;
    }

    return imageUrl;
}
