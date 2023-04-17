loader(true);
document.addEventListener("DOMContentLoaded", async function () {
  // get the user id from the url
  const urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get("id");
  const user = JSON.parse(localStorage.getItem("cm-data"));

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

      if (!postContent && !image) {
        loader(false);
        showAlert("Please add something!", "error", 8000, true);
        return;
      }

      let imageUrl = '';

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
          image: imageUrl
        })
      };

      const updatePost = await apiRequest(`http://localhost:3001/api/posts/${postId}`, requestOptions);

      if (updatePost && updatePost.status !== 404) {
        showAlert("Post updated successfully", "success", 8000, true);
        window.location.href = `../connectme-frontend/profile.html?id=${user._id}`;
      }else{
        showAlert("Something went wrong", "error", 8000, true);
      }


    });

  } else {
    resetLocalStorage();
  }

  loader(false);