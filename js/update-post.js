loader(true);
document.addEventListener("DOMContentLoaded", async function () {
  // get the user id from the url
  const urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get("id");
  const user = JSON.parse(localStorage.getItem("cm-data"));
  let tempImg = '';
  const cmToken = localStorage.getItem("cm-token");

  if (cmToken) {
    generalProfileData(user)
    initialPostData(postId);

    // update post
    const updateBtn = document.getElementById("update-post");

    updateBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      loader(true);

      const postContent = document.getElementById("post-content").value;
      const image = document.getElementById("profile-upload-btn").files[0];

      if (!postContent && !image && !tempImg) {
        loader(false);
        showAlert("Please add something!", "error", 8000, true);
        return;
      }

      let imageUrl = '';
      console.log(1, image);
      console.log(2, tempImg);
      console.log(3, imageUrl);
      if (image) {
        imageUrl = await imageHostToCloud('profile-upload-btn');
      }

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + cmToken
        },
        body: JSON.stringify({
          postContent,
          image: imageUrl ? imageUrl : tempImg
        })
      };

      const updatePost = await apiRequest(`http://localhost:3001/api/posts/${postId}`, requestOptions);

      if (updatePost && updatePost.status !== 404) {
        showAlert("Post updated successfully", "success", 8000, true);
        window.location.href = `../connectme-frontend/profile.html?id=${user.username}`;
      } else {
        showAlert("Something went wrong", "error", 8000, true);
      }


    });

  } else {
    resetLocalStorage();
  }

  loader(false);


  // initial update form Data 
  async function initialPostData(id) {

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.accessToken
      }
    };

    const getPostById = await apiRequest(`http://localhost:3001/api/posts/${id}`, requestOptions);
    if (getPostById && getPostById.status !== 404) {
      if (getPostById.user._id !== user._id) {
        showAlert("You are not authorized to edit this post", "error", 8000, true);
        return;
      }

      document.getElementById("post-content").value = getPostById.postContent;

      if (getPostById.image) {
        getInitialImage(getPostById.image);
      }
      imageUploadInputPost('profile-upload-btn', 'profile-image-preview', 'profile-image-area');
    } else {
      showAlert("Post Not Found", "error", 8000, true);
      return;
    }
  }

  // image upload input 
  function imageUploadInputPost(uploadBtnId, imagePreviewId, imageAreaId) {

    const uploadBtn = document.getElementById(uploadBtnId);
    const imagePreview = document.getElementById(imagePreviewId);
    const deleteBtn = document.createElement('div');
    const imageArea = document.querySelector(`.${imageAreaId}`);
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

        // hide the image area
        imageArea.style.display = 'none';
      };
    });

    deleteBtn.addEventListener('click', () => {
      imagePreview.innerHTML = '';
      imagePreview.style.display = 'none';
      imageArea.style.display = 'flex';
      document.getElementById('post-edit-form').reset();
    });
  }

  // get initial image
  function getInitialImage(imageUrl) {
    const imagePreview = document.getElementById('profile-image-preview');
    const deleteBtn = document.createElement('div');
    const imageArea = document.querySelector(`.profile-image-area`);
    deleteBtn.classList.add('delete-btn-temp');
    deleteBtn.innerHTML = '&times;';
    const image = document.createElement('img');
    image.src = imageUrl;
    tempImg = imageUrl;
    imagePreview.innerHTML = '';
    imagePreview.appendChild(image);
    imagePreview.style.display = 'block';
    imagePreview.appendChild(deleteBtn);

    // hide the image area
    imageArea.style.display = 'none';

    deleteBtn.addEventListener('click', () => {
      tempImg = '';
      imagePreview.innerHTML = '';
      imagePreview.style.display = 'none';
      imageArea.style.display = 'flex';
    });
  }


});