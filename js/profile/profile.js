loader(true);
document.addEventListener("DOMContentLoaded", async function () {
  // get the user id from the url
  const urlParams = new URLSearchParams(window.location.search);
  let userId = urlParams.get("id");
  const user = JSON.parse(localStorage.getItem("cm-data"));
  const cmToken = localStorage.getItem("cm-token");

  if (cmToken) {

    if (!userId) {
      userId = user.username || user.email;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + cmToken
      }
    };

    const userData = await apiRequest(`http://localhost:3001/api/users/${userId}`, requestOptions);

    if (userData) {
      console.log(userData);
      populateProfile(userData);
    }
  } else {
    resetLocalStorage();
  }
  loader(false);
  imageUploadInput('upload-btn', 'image-preview');

  // new post
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

    const postData = await apiRequest(`http://localhost:3001/api/posts/`, requestOptions);

    if (postData) {
      const postContainer = document.getElementById('profile-posts');
      postContainer.insertAdjacentHTML('afterend', generateProfilePostHtml(postData));
      resetForm('post-text', 'image-preview', 'upload-btn')
    }
    loader(false);
  });

});

// profile dom manupulation
function populateProfile({ user, posts }) {
  generalProfileData(user);
  const profilePosts = document.getElementById("profile-posts");
  const profileName2 = document.getElementById("profile-name-2");
  profileName2.innerHTML = user.name;
  const profileImage2 = document.getElementById("profile-image-2");
  profileImage2.src = user.image;
  
  if (posts.length) {
    profilePosts.insertAdjacentHTML("afterend", profilePostHtml(posts));
  } else {
    profilePosts.insertAdjacentHTML("afterend", `<p class="no-post-found">No posts found</p>`);
  }
  
}

// generate multiple profile post html
function profilePostHtml(posts) {
  let html = "";
  posts.forEach(post => {
    html += generateProfilePostHtml(post);
  });
  return html;
}

// generate single profile post html
function generateProfilePostHtml(post) {
  return `
  <div class="post-container">
                    <div class="post-row">
                        <div class="user-profile">
                            <img src="${post.user.image}">
                            <div>
                                <p>${post.user.name}</p>
                                <span>${getRelativeTime(post.createdAt)}</span>
                            </div>
                        </div>
                        <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                    </div>
                    <p class="post-text">${post.postContent}</p>
                    ${post.image ? `<img src="${post.image}" class="post-img">` : ''}
                    <div class="post-row">
                        <div class="activity-icons">
                            <div><img src="assets/profile/Images/Likebutton.png">${Math.floor(Math.random() * 28)}</div>
                            <div><img src="assets/profile/Images/commentbtn.png">${Math.floor(Math.random() * 12)}</div>
                            <div><img src="assets/profile/Images/sharebutton.png">${Math.floor(Math.random() * 5)}</div>

                        </div>

                        <div class="post-profile-icon">
                            <img src="${post.image}">
                        </div>

                    </div>
                </div>`
}