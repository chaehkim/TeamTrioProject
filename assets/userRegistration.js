    $(document).ready(function() {

        var activeName = "";
        var activeEmail = "";
        var gameScore = 0;
        var name = "";
        var email = "";
        var password = "";

        var config = {
            apiKey: "AIzaSyDJg6iGckNliThCVzR5jgjGtpp1w4FP3KE",
            authDomain: "triviagame-9a6cf.firebaseapp.com",
            databaseURL: "https://triviagame-9a6cf.firebaseio.com",
            storageBucket: "triviagame-9a6cf.appspot.com",
        };

        firebase.initializeApp(config);

        var database = firebase.database();

        localStorage.removeItem("activeName");
        localStorage.removeItem("activeUID");
        localStorage.removeItem("correctScore");
        localStorage.removeItem("amount");
        localStorage.removeItem("category");
        localStorage.removeItem("difficulty");

        // Function to clear form
        function resetForm() {
            name = "";
            email = "";
            password = "";
            $("#name-input", "#email-input", "#password-input").html(""); // FIX THIS!
            localStorage.setItem("activeName", "");
            localStorage.setItem("activeUID", "");
        };

        // Start page by resetting form
        resetForm();

        $("#start-game").on("click", function() {
            location.href = "gameRules.html";
        });

        $("#add-user").on("click", function() {
            event.preventDefault();

            var errorCode = "";
            name = $("#name-input").val().trim();
            email = $("#email-input").val().trim();
            password = $("#password-input").val().trim();

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == "auth/email-already-in-use") {
                    $("#login-message").html("You're already registered.  Please sign-in to play.");
                    resetForm();
                    console.log("Duplicate email.  ResetForm Function called.")
                }
            });

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    $("#login-message").html("Thanks for signing-up! Shall we play a game!");
                    var firebaseAuthenticateduser = firebase.auth().currentUser;
                    if (firebaseAuthenticateduser) {
                        // Enable Start Game button
                        $("#start-game").prop("disabled", false);
                        localStorage.setItem("activeName", name);
                        localStorage.setItem("activeUID", user.uid);
                    } else {
                        $("#login-message").html("You're not signed-in. Please sign-in!");
                    }
                } else {
                    $("#login-message").html("You're not signed-in. Please sign-in!");
                }
            });
        });

        // Sign-in an existing user with Firebase Authentication

        $("#sign-in").on("click", function() {
            event.preventDefault();
            name = $("#name-input").val().trim();
            email = $("#email-input").val().trim();
            password = $("#password-input").val().trim();

            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == "auth/wrong-password") {
                    $("#login-message").html("Your password is incorrect.  Please enter the correct password and try again.");
                    resetForm();
                    console.log("Bad password.  ResetForm Function called.")
                };
                if (errorCode == "auth/user-not-found") {
                    $("#login-message").html("You must be a new player.  Please click on the Register New Player button.");
                    resetForm();
                };
            });

            // Existing user signs-in...

            var activeName = name;
            var activeEmail = email;
            var gameScore = 0;

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    $("#login-message").html("Welcome Back! Click on Let's Start button to begin!");
                    var firebaseAuthenticateduser = firebase.auth().currentUser;
                    if (firebaseAuthenticateduser) {
                        $("#start-game").prop("disabled", false);
                        localStorage.setItem("activeName", name);
                        localStorage.setItem("activeUID", user.uid);
                    } else {
                        $("#login-message").html("You're not signed-in. Please sign-in!");
                    }
                } else {
                    $("#login-message").html("You're not signed-in. Please sign-in!");
                }
            });
        });
    });