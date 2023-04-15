loader(true);
document.addEventListener("DOMContentLoaded", async function () {
  // get the user id from the url
  const urlParams = new URLSearchParams(window.location.search);
  let userId = urlParams.get("id");
  const user = JSON.parse(localStorage.getItem("cm-data"));

  const cmToken = localStorage.getItem("cm-token");
  
  if (cmToken) {
    generalProfileData(user)

  }else{
    resetLocalStorage();
  }

  loader(false);
});