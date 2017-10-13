$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyDJg6iGckNliThCVzR5jgjGtpp1w4FP3KE",
        authDomain: "triviagame-9a6cf.firebaseapp.com",
        databaseURL: "https://triviagame-9a6cf.firebaseio.com",
        storageBucket: "triviagame-9a6cf.appspot.com",
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    // Done initializing Firebase

    firebase.database().ref().orderByChild("score").limitToLast(1000).on("child_added", function(snapshot) {
        // Print the results to the HTML
        $("#ranking-table").append(snapshot.val().player.uid.name);
        $("#ranking-table").append(snapshot.val().player.uid.score);
    });

    $("#welcome-heading").append(localStorage.activeName);
    $("#game-points").append(localStorage.correctScore);


    // Add On-click of End Game (Log out and close browser)
    $("#end-game").on("click", function() {
        firebase.auth().signOut().then(function() {}).catch(function(error) {});
        location.href = "index.html"
    });

    // Add On-click of Play Again (redirect to UserInput).
    $("#play-again").on("click", function() {
        location.href = "gameRules.html"
    });
});