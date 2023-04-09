// wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function() {

  // check if any user already logged in
  if(localStorage.getItem("cm-token")){
      // if user is already logged in, redirect to home page
      window.location.href = "../connectme-frontend/index.html";
  } else {
      // else continue with the registration process
      // get the register button element
      const registerButton = document.getElementById("register-button");

      // add event listener to register button
      registerButton.addEventListener("click", function(e) {
          // prevent default action
          e.preventDefault();
          // get the values from the form
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          // check for empty values
          if (!name || !email || !password) {
              alert("Please fill in all the fields.");
              return;
          }

          // check the format of email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
              alert("Please enter a valid email address.");
              return;
          }

          // create the API request options object
          const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        };

        // send the API request
        fetch("http://localhost:3001/api/users/", requestOptions)
            .then(response => {

                if (response.ok) {
                    // handle success
                    alert("Registration successful. Please login to continue.");
                    return response.json();
                } else {
                    // handle errors
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
            })
            .then(data => {
                // save the token in local storage
                localStorage.setItem("cm-token", data.accessToken);
                localStorage.setItem("cm-data", JSON.stringify(data));
                // redirect to home page
                window.location.href = "../connectme-frontend/index.html";
            })
            .catch(error => {
                alert(error.message);
            });
      });
  }
});
