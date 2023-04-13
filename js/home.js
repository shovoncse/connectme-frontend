// wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function () {

    // get cm-data from local storage
    const cmData = localStorage.getItem("cm-data");
    const cmToken = localStorage.getItem("cm-token");

    let loggedInUser = "Demo User";
    if (cmData && cmToken) {
        try {
            // parse the cm-data
            const cmDataParsed = JSON.parse(cmData);
            // get the user name element
            const userName = document.getElementById("user-name");
            loggedInUser = cmDataParsed.name;
            // set the user name
            userName.innerHTML = cmDataParsed.name;


            // create the API request options object
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + cmToken
                }
            };

            // get all post from database
            fetch("http://localhost:3001/api/posts/", requestOptions)
                .then(response => {

                    if (response.ok) {
                        return response.json();
                    } else {
                        // handle errors
                        return response.json().then(error => {
                            throw new Error(error.message);
                        });
                    }
                })
                .then(data => {
                    // get the posts container
                    const postsArea = document.querySelector(".create-post");
                    let posts = "";
                    // loop through the posts
                    data.forEach(post => {
                        posts += generatePostHtml(post.user.name, post.postContent, post.updatedAt, post.image);
                    });
                    // add the posts to the posts container
                    postsArea.insertAdjacentHTML("afterend", posts);

                })
                .catch(error => {
                    localStorage.removeItem("cm-data");
                    localStorage.removeItem("cm-token");
                    // redirect to login page
                    window.location.href = "../connectme-frontend/login.html";
                });

        } catch (error) {
            // if there is an error, remove cm-data and cm-token from local storage
            localStorage.removeItem("cm-data");
            localStorage.removeItem("cm-token");
            // redirect to login page
            window.location.href = "../connectme-frontend/login.html";
        }
    } else {
        localStorage.removeItem("cm-data");
        localStorage.removeItem("cm-token");
        window.location.href = "../connectme-frontend/login.html";
    }

    // logout button
    const logoutButton = document.getElementById("logout-button");

    // add event listener to logout button
    logoutButton.addEventListener("click", function (e) {
        // prevent default action
        e.preventDefault();

        // remove cm-data and cm-token from local storage
        localStorage.removeItem("cm-data");
        localStorage.removeItem("cm-token");

        // redirect to login page
        window.location.href = "../connectme-frontend/login.html";
    });


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

    // post html
    function generatePostHtml(name, content, time, image) {
        return `<div class="feeds"> <div class="feed"> <div class="head"> <div class="user"> <div class="profile-photo"> <img src="img/profile-1.jpg" alt=""> </div> <div class="ingo"> <h3>${name}</h3> <small> ${getRelativeTime(time)}</small> </div> </div> <span class="edit"> <i class="uil uil-ellipsis-h"></i> </span> </div> <div id="post-content" class="post-content"> <p>${content}</p> </div> <div class="photo"> ${image ? `<img src="${image}" alt="">` : ''} </div> <div class="action-buttons"> <div class="interation-button"> <span> <i class="uil uil-heart"></i></span> <span> <i class="uil uil-comment-dots"></i> </span> <span> <i class="uil uil-share-alt"></i></span> </div> <div class="bookmark"> <span> <i class="uil uil-bookmark"></i></span> </div> </div> <div> <div class="row"> <div class="col-md-12"> <div class="comment"> <div class="comment-body"> <input type="text" placeholder="Add a comment..." class="comment-box"> <span class="uil-message"></span> </div> </div> </div> </div> </div> </div> </div>`
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

    /**
     * Image upload
     */

    const uploadBtn = document.getElementById('upload-btn');
    const imagePreview = document.querySelector('.image-preview');
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


    /**
     * Post image
     *  */

    const form = document.getElementById('post-form');
    const input = document.getElementById('upload-btn');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const apiKey = '02598d03c9a3fd5b85ebb55a67fb5755';
        const apiUrl = 'https://api.imgbb.com/1/upload';

        const formData = new FormData();
        formData.append('image', input.files[0]);
        formData.append('key', apiKey);

        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        const imageUrl = data.data.url;

        // get the post text from the input field
        const postText = document.getElementById('post-text').value;

        // do something with the post object, e.g. send it to your backend server
        console.log(imageUrl);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cmToken
            },
            body: JSON.stringify({
                postContent: postText,
                image: imageUrl ? imageUrl : ''
            })
        };
        fetch("http://localhost:3001/api/posts/", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    // handle errors
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
            })
            .then(data => {
                // get the posts container
                const postsArea = document.querySelector(".create-post");

                // add the posts to the posts container
                postsArea.insertAdjacentHTML("afterend", generatePostHtml(loggedInUser, data.postContent, data.updatedAt, data.image));

                document.getElementById("post-text").value = ""
                imagePreview.innerHTML = '';
                imagePreview.style.display = 'none';
            })
            .catch(error => {
                alert(error.message);
            });
    });


































































});