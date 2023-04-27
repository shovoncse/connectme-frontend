// wait for the DOM to be loaded
loader(true);
document.addEventListener("DOMContentLoaded", async function () {

    // get cm-data from local storage
    const cmData = localStorage.getItem("cm-data");
    const cmToken = localStorage.getItem("cm-token");

    if (cmData && cmToken) {
        try {
            // create the API request options object
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + cmToken
                }
            };
            const allPosts = await apiRequest("http://localhost:3001/api/posts/", requestOptions);
            console.log(allPosts);
            const postsArea = document.querySelector(".create-post");
            if (allPosts.length > 0) {
                let posts = "";
                allPosts.forEach(post => {
                    posts += generatePostHtml(post);
                });
                postsArea.insertAdjacentHTML("afterend", posts);
                loader(false);
            } else {
                postsArea.insertAdjacentHTML("afterend", `<p class="no-post-found">No posts found</p>`);
                loader(false);
            }

        } catch (error) {
            console.log(error);
            resetLocalStorage();
        }
    } else {
        resetLocalStorage();
    }

    // logout button
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", async function (e) {
        loader(true);
        e.preventDefault();
        await new Promise(r => setTimeout(r, 1000));
        resetLocalStorage();
    });

    imageUploadInput('upload-btn', 'image-preview');
    // make a new post
    const postBtn = document.getElementById('post-btn');
    postBtn.addEventListener('click', async (event) => {
        loader(true);
        event.preventDefault();

        let imageUrl = await imageHostToCloud('upload-btn');
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

        const newPost = await apiRequest("http://localhost:3001/api/posts/", requestOptions);
        const postsArea = document.querySelector(".create-post");
        if (newPost.createdAt) {
            postsArea.insertAdjacentHTML("afterend", generatePostHtml(newPost));
            loader(false);
            resetForm('post-text', 'image-preview', 'file-input')
        } else {
            loader(false);
        }
    });






























































});