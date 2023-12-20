document.addEventListener("DOMContentLoaded", function(){
    // listen for auth status changes
    auth.onAuthStateChanged(user => {
        if (user) {
            setupUI(user);
            var uid = user.uid;
        } else {
            setupUI();
        }
    });

    // login
    const loginForm = document.querySelector('#login-form');
    const loginErrorAlert = document.querySelector('#login-error-alert');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get user info
        const email = loginForm['input-email'].value;
        const password = loginForm['input-password'].value;
        // log the user in
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            // close the login modal & reset form
            $('#login-modal').modal("hide");
            loginForm.reset();
            loginErrorAlert.style.display = "none";
        })
        .catch((error) => {
            let errorMessage = "An error occurred.";
            if (error && error.message) {
                try {
                    const errorData = JSON.parse(error.message);
                    if (errorData && errorData.error && errorData.error.message) {
                        errorMessage = errorData.error.message;
                    }
                } catch (e) {
                    errorMessage = error.message;
                }
            }
            loginErrorAlert.textContent = errorMessage;
            loginErrorAlert.style.display = "block";
        });
    });

    // logout
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut();
        location.reload();
    });

    const resetPassword = document.querySelector('#password-reset');
    resetPassword.addEventListener('click', (e) => {
        e.preventDefault();
        // get user info
        const email = loginForm['input-email'].value;
        firebase.auth().sendPasswordResetEmail(email).then(() => {
                loginErrorAlert.textContent = "A password reset message was sent to your email address."; // Set the error message in the alert
                loginErrorAlert.style.display = "block"; // Display the error alert
        }).catch((error) => {
                loginErrorAlert.textContent = error.message;
                loginErrorAlert.style.display = "block"; // Display the error alert
        });
    });
});