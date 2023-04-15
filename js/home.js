// wait for the DOM to be loaded
loader(true);
document.addEventListener("DOMContentLoaded", function () {

    // get cm-data from local storage
    const cmData = localStorage.getItem("cm-data");
    const cmToken = localStorage.getItem("cm-token");

    let loggedInUser = "Demo User";
    if (cmData && cmToken) {
        try {
            const cmDataParsed = JSON.parse(cmData);
            const userName = document.getElementById("user-name");
            loggedInUser = cmDataParsed.name;
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
                        posts += generatePostHtml(post);
                    });
                    // add the posts to the posts container
                    postsArea.insertAdjacentHTML("afterend", posts);
                    loader(false);

                })
                .catch(error => {
                    localStorage.removeItem("cm-data");
                    localStorage.removeItem("cm-token");
                    // redirect to login page
                    window.location.href = "../connectme-frontend/login.html";
                });

        } catch (error) {
            resetLocalStorage();
        }
    } else {
        resetLocalStorage();
    }

    // logout button
    const logoutButton = document.getElementById("logout-button");

    // add event listener to logout button
    logoutButton.addEventListener("click", async function (e) {
        loader(true);
        // prevent default action
        e.preventDefault();

        // remove cm-data and cm-token from local storage
        localStorage.removeItem("cm-data");
        localStorage.removeItem("cm-token");
        await new Promise(r => setTimeout(r, 1000));
        loader(false);
        // redirect to login page
        window.location.href = "../connectme-frontend/login.html";
    });



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
        loader(true);
        event.preventDefault();

        const apiKey = '02598d03c9a3fd5b85ebb55a67fb5755';
        const apiUrl = 'https://api.imgbb.com/1/upload';
        let imageUrl = '';
        // if only text input
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


        // get the post text from the input field
        const postText = document.getElementById('post-text').value;

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
                postsArea.insertAdjacentHTML("afterend", generatePostHtml(data));

                document.getElementById("post-text").value = ""
                imagePreview.innerHTML = '';
                imagePreview.style.display = 'none';
                input.files[0] = null;
                loader(false);
            })
            .catch(error => {
                alert(error.message);
            });

    });
































































});