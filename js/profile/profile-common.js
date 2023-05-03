function generalProfileData(user) {
  console.log(user);
  const profileImage = document.getElementById("profile-image");
  const coverImage = document.getElementById("profile-cover-image");
  const profileName = document.getElementById("profile-name");
  const profileUsername = document.getElementById("profile-username");
  const profileLoaction = document.getElementById("profile-location");
  const profileCountry = document.getElementById("profile-country");
  const profileProfession = document.getElementById("profile-profession");
  const profileBio = document.getElementById("profile-bio");

  profileImage.src = user.image;
  coverImage.src = user.cover;
  profileName.innerHTML = user.name;
  profileUsername.innerHTML = '@' + user.username;
  profileLoaction.innerHTML = user.location;
  profileCountry.innerHTML = user.country;
  profileProfession.innerHTML = user.profession;
  profileBio.innerHTML = user.bio;
}