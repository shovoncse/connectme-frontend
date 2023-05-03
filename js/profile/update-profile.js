loader(true);
document.addEventListener("DOMContentLoaded", async function () {
  // get the user id from the url
  const urlParams = new URLSearchParams(window.location.search);
  let userId = urlParams.get("id");
  const user = JSON.parse(localStorage.getItem("cm-data"));

  const cmToken = localStorage.getItem("cm-token");

  if (cmToken) {
    generalProfileData(user)
    initialProfileData(user);
    imageUploadInputProfile('profile-upload-btn', 'profile-image-preview', 'profile-image-area');
    imageUploadInputProfile('cover-upload-btn', 'cover-image-preview', 'cover-image-area');

    // update profile form
    document.getElementById("update-profile").addEventListener("click", async (event) => {
      loader(true);
      // retrieve form data
      event.preventDefault();
      const name = document.getElementById("name").value;
      const bio = document.getElementById("bio").value;
      const profession = document.getElementById("profession").value;
      const education = document.getElementById("education").value;
      const location = document.getElementById("location").value;
      const country = document.getElementById("country").value;
      const username = document.getElementById("username").value;


      // Check if required fields are filled
      if (!name || !bio || !profession || !education || !location || !country || !username) {
        loader(false);
        showAlert("Please fill all fields", "error", 8000, true);
        return;
      }

      // Validate inputs
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!nameRegex.test(name)) {
        loader(false);
        showAlert("Name should contain only letters", "warning", 8000, true);
        return;
      }

      let uniqueUsername = await validateUsername(username);

      if (uniqueUsername === false) {
        loader(false);
        return;
      }

      let profileImageUrl = await imageHostToCloud('profile-upload-btn');
      let coverImageUrl = await imageHostToCloud('cover-upload-btn');

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + cmToken
        },
        body: JSON.stringify({
          id: user._id,
          name: name,
          bio: bio,
          profession: profession,
          education: education,
          location: location,
          country: country,
          username: username,
          image: profileImageUrl ? profileImageUrl : user.image,
          cover: coverImageUrl ? coverImageUrl : user.cover
        })
      };

      const updateData = await apiRequest(`http://localhost:3001/api/users/`, requestOptions);

      loader(false);
      if (updateData) {
        showAlert("Updated Successfully!", "success", 1000);
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        }).then(() => {
          localStorage.setItem("cm-data", JSON.stringify(updateData));
          window.location.href = "../connectme-frontend/profile.html";
        });
      }

    });

  } else {
    resetLocalStorage();
  }

  loader(false);


  // initial update form Data 
  function initialProfileData(user) {
    const name = document.getElementById("name");
    name.value = user.name;

    const bio = document.getElementById("bio");
    bio.innerHTML = user.bio;

    const profession = document.getElementById("profession");
    profession.value = user.profession;

    const education = document.getElementById("education");
    education.value = user.education;

    const location = document.getElementById("location");
    location.value = user.location;

    const country = document.getElementById("country");
    country.value = user.country;

    const username = document.getElementById("username");
    username.value = user.username;

    const profileImagePreview = document.querySelector('.profile-image-area');
    if (user.image) {
      profileImagePreview.style.backgroundImage = `url('${user.image}')`;
    }

    const coverImagePreview = document.querySelector('.cover-image-area');
    if (user.cover) {
      coverImagePreview.style.backgroundImage = `url('${user.cover}')`;
    }
  }


  // image upload input 
  function imageUploadInputProfile(uploadBtnId, imagePreviewId, imageAreaId) {
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
    });
  }

  // function to check if the username input is valid
  async function validateUsername(username) {
    username = username.trim();

    // check if the username is between 6-20 characters long
    if (username.length < 6 || username.length > 20) {
      showAlert("Username must be between 6-20 characters", "info", 8000, true);
      return false;
    }

    // check if the username contains only alphanumeric characters and underscores
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      showAlert("Username can only contain alphanumeric characters and underscores", "info", 8000, true);
      return false;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + cmToken
      }
    };
    if (username === user.username) {
      return true;
    }
    const checkUsername = await apiRequest(`http://localhost:3001/api/users/verify_username/${username}`, requestOptions);

    if (checkUsername && checkUsername.available) {
      return true;
    } else {
      showAlert("Username already taken", "warning", 8000, true);
      return false;
    }
  }

});