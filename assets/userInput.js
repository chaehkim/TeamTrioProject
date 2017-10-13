$(document).ready(function() {

    //global variables
    var URL = "https://opentdb.com/api.php?";
    //clear previous local storage game data.
    localStorage.removeItem("amount");
    localStorage.removeItem("category");
    localStorage.removeItem("difficulty");

    $("#welcome-heading").append(localStorage.activeName);

    var responseData;
    $("#btnSubmit").on("click", function(event) {
        //when the button is clicked, the parameters are stored in the following variables:
        var qAmount = $("#trivia_amount").val();
        var uCategory = $("#trivia_category").val();
        var uLevel = $('#trivia_difficulty').val();
        event.preventDefault();

        //if the user's parameters are not correct a modal will appear else, the game will start. 
        if (uLevel == "any" || uCategory == "any" || qAmount == "" || qAmount < 1 || qAmount > 50) {
            $('.modal').modal('show');

        } else {

            //set the game Parameter data to local storage
            localStorage.setItem("amount", qAmount);
            localStorage.setItem("category", uCategory);
            localStorage.setItem("difficulty", uLevel);

            //turns the submit button into a link for the game page.
            location.href = "game.html";
        }
    });
});