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
    const form = document.getElementById('post-form');
    form.addEventListener('submit', async (event) => {
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
            resetForm('post-text', 'image-preview', 'upload-btn')
        } else {
            loader(false);
        }
    });
  // Theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');

// function to open theme modal
const openThemeModal = () => {
  themeModal.style.display = 'grid';
}

// function to close theme modal
const closeThemeModal = (e) => {
  if (e.target.classList.contains('customize-theme')) {
    themeModal.style.display = 'none';
  }
}

// add event listener to close theme modal when user clicks outside of it
themeModal.addEventListener('click', closeThemeModal);

// add event listener to open theme modal when user clicks on theme button
theme.addEventListener('click', openThemeModal);

// function to remove active class from all size selectors
const removeSizeSelector = () => {
  fontSizes.forEach(size => {
    size.classList.remove('active');
  });
}

// add event listeners to size selectors to change font size
fontSizes.forEach(size => {
  size.addEventListener('click', () => {
    removeSizeSelector();
    let fontSize;

    // toggle active class on clicked size selector
    size.classList.toggle('active');

    // set font size and sticky top left and right values based on clicked size selector
    if (size.classList.contains('font-size-1')) {
      fontSize = '10px';
      root.style.setProperty('--sticky-top-left', '5.4rem');
      root.style.setProperty('--sticky-top-right', '5.4rem');
    } else if (size.classList.contains('font-size-2')) {
      fontSize = '13px';
      root.style.setProperty('--sticky-top-left', '5.4rem');
      root.style.setProperty('--sticky-top-right', '-7rem');
    } else if (size.classList.contains('font-size-3')) {
      fontSize = '16px';
      root.style.setProperty('--sticky-top-left', '5.4rem');
      root.style.setProperty('--sticky-top-right', '-17rem');
    } else if (size.classList.contains('font-size-4')) {
      fontSize = '19px';
      root.style.setProperty('--sticky-top-left', '5.4rem');
      root.style.setProperty('--sticky-top-right', '-19rem');
    } else if (size.classList.contains('font-size-5')) {
      fontSize = '22px';
      root.style.setProperty('--sticky-top-left', '5.4rem');
      root.style.setProperty('--sticky-top-right', '-22rem');
    }

    // change font size
    document.querySelector('html').style.fontSize = fontSize;
  });
});
// Get the color palette container element
const colorPalette = document.querySelector('.choose-color span');

// Add click event listeners to each color option
colorPalette.forEach(color => {
  color.addEventListener('click', () => {
    // Define the primary hue value based on the clicked color option
    let primaryHue;
    if (color.classList.contains('color-1')) {
      primaryHue = 252;
    } else if (color.classList.contains('color-2')) {
      primaryHue = 52;
    } else if (color.classList.contains('color-3')) {
      primaryHue = 352;
    } else if (color.classList.contains('color-4')) {
      primaryHue = 152;
    } else if (color.classList.contains('color-5')) {
      primaryHue = 202;
    }
    color.classList.add('active');

    // Set the primary color hue value as a CSS variable
    root.style.setProperty('--primary-color-hue', primaryHue);
  });
});


        































































});