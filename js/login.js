// wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function () {
    // check if any user already logged in
    if (localStorage.getItem("cm-token")) {
        // if user is already logged in, redirect to home page
        window.location.href = "../connectme-frontend/index.html";
    } else {
        // else continue with the login process
        // get the login button element
        const loginButton = document.getElementById("login-button");
        // add event listener to login button
        loginButton.addEventListener("click", function (e) {
            // prevent default action
            e.preventDefault();
            // get the values from the form
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            // check for empty values
            if (!email || !password) {
                showAlert("Please fill in all the fields.", "warning", 5000, true);
                return;
            }
            // check the format of email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert("Please enter a valid email address.", "warning", 5000, true);
                return;
            }
            // create the API request options object
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            };
            // send the API request
            fetch("http://localhost:3001/api/users/login", requestOptions)
                .then(response => {
                    if (response.ok) {
                        // handle success
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
                    showAlert("Login successful.", "success", 1000, true);
                    // redirect to home page
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                        }, 1000);
                    }).then(() => {
                        window.location.href = "../connectme-frontend/index.html";
                    });
                })
                .catch(error => {
                    // handle errors
                    showAlert(error.message, "error", 8000, true);
                });
        });
    }
});


// alert
function showAlert(txt, icon, timer = 3000, showConfirmButton = false) {
    Swal.fire({
        icon: icon,
        text: txt,
        showConfirmButton: showConfirmButton,
        timer: timer
    })
}