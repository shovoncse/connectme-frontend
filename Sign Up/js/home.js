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
                    const postsArea = document.querySelector("form.create-post");
                    let posts = "";
                    // loop through the posts
                    data.forEach(post => {
                        posts += generatePostHtml(post.user.name, post.postContent);
                    });
                    // add the posts to the posts container
                    postsArea.insertAdjacentHTML("afterend", posts);

                })
                .catch(error => {
                    alert(error.message);
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

    if (!cmToken) {
        // if user is not logged in, redirect to login page
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


    // create a post

    const postBtn = document.getElementById("post-btn");
    postBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let postTxt = document.getElementById("post-text").value;
        if (!postTxt) {
            alert("Please enter post content.");
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cmToken
            },
            body: JSON.stringify({
                postContent: postTxt
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
                console.log(data);
                // get the posts container
                const postsArea = document.querySelector("form.create-post");

                // add the posts to the posts container
                postsArea.insertAdjacentHTML("afterend", generatePostHtml(loggedInUser, data.postContent));

                document.getElementById("post-text").value = ""
            })
            .catch(error => {
                alert(error.message);
            });
    });

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
function generatePostHtml(name, content) {

    return `<div class="feeds">
    <div class="feed">
        <div class="head">
            <div class="user">
                <div class="profile-photo">
                    <img src="img/profile-12.jpg" alt="">
                </div>
                <div class="ingo">
                    <h3>${name}</h3>
                    <small> UK, 40 MINUTES AGE</small>
                </div>

            </div>
            <span class="edit">
                <i class="uil uil-ellipsis-h"></i>
            </span>
        </div>
        <div id="post-content" class="post-content">
            <p>${content}</p>
        </div>

    </div>
</div>`
}