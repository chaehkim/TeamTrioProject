//Global Variables

var question
var correct = 0;
var incorrect = 0;
var rightAnswer;
var wrongAnswer;
var userGuess = "";
var gameScore;
var currentQuestion = 0;
var startButton;
var btn
var btn2
var btn3
var btn4
var historicalScore = 0;

var uCategory = localStorage.getItem("category");
var uLevel = localStorage.getItem("difficulty");
var qAmount = localStorage.getItem("amount");

// Get the activeName variable from UserRegistration
var activeName = localStorage.getItem("activeName");
var activeUID = localStorage.getItem("activeUID");

var config = {
    apiKey: "AIzaSyDJg6iGckNliThCVzR5jgjGtpp1w4FP3KE",
    authDomain: "triviagame-9a6cf.firebaseapp.com",
    databaseURL: "https://triviagame-9a6cf.firebaseio.com",
    storageBucket: "triviagame-9a6cf.appspot.com",
};

firebase.initializeApp(config);
var database = firebase.database();

// Firebase call to get the user's historical point total.....
function getHistoricalScore() {
    return firebase.database().ref('player/' + activeUID).once('value').then(function(snapshot) {
        historicalScore = (snapshot.val() && snapshot.val().score);
    });
};
// ...End of Firebase call to get the user's historical point total

// Firebase update to store the game's results...
function gameOver() {
    var updateScore = Number(historicalScore) + correct;
    firebase.database().ref('player/' + activeUID).set({
        name: activeName,
        score: updateScore
    });
    localStorage.setItem("correctScore", correct);
};

$(document).ready(function() {

    getHistoricalScore();

    // Ajax call to trivia api with user's selected variables plugged in.
    $.ajax({
        url: "https://opentdb.com/api.php?amount=" + qAmount + "&category=" + uCategory + "&difficulty=" + uLevel + "&type=multiple",
        type: "GET"
    }).done(function(response) {

        // These if statements make the background change depending on the category the user chooses. 
        if (uCategory == 11) {
            $('body').css('backgroundImage', 'url(assets/images/movies.jpg)');
            $('#title').html("<h1>Movie Trivia</h1>");
        } else if (uCategory == 12) {
            $('body').css('backgroundImage', 'url(assets/images/music.jpg)');
            $('#title').html("<h1>Music Trivia</h1>");
        } else if (uCategory == 14) {
            $('body').css('backgroundImage', 'url(assets/images/tv.jpg)');
            $('#title').html("<h1>TV Show Trivia</h1>");
        }

        gameStart();

        //This function creates a start button that calls the displayQuestion fucntion and the checkAnswer function.
        function gameStart() {

            //create a variable that holds the start button
            startButton = $("<btn>")
            //give it a class and add the text play to the button
            startButton.addClass("btn btn-danger col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2").text("Play");
            //push the button to the html question div
            $("#questions").html(startButton);
            //create a click event that calls the first question.
            $(startButton).on("click", function() {
                displayQuestion();
            });
        }

        //this function updates the score in the html
        function scoreValidation() {
            $("#correct").html(" Points: " + correct + "<br/>")
            $("#incorrect").html("Incorrect: " + incorrect)
        }


        function displayQuestion() {

            if (currentQuestion == 9) {}

            //create a variable that holds the first trivia question
            question = response.results[currentQuestion].question;

            //create a variable that holds the correct answer
            rightAnswer = response.results[currentQuestion].correct_answer;

            //create a variable that holds the wrong answers
            wrongAnswer = response.results[currentQuestion].incorrect_answers;


            //print one question out per page.
            $("#questions").html(question + "<br/><br/>");

            //put the answers in an array
            var choices = [response.results[currentQuestion].incorrect_answers[0], response.results[currentQuestion].incorrect_answers[1], response.results[currentQuestion].incorrect_answers[2], response.results[currentQuestion].correct_answer]

            //the sort method makes everything print out alphabetically, which automatically randomizes the order of the answers.
            var randomizeAnswers = choices.sort();

            //print each answer onto the screen in its own div.

            btn = $("<btn>");
            btn.addClass("btn btn-danger col-md-8 col-sm-8").html(randomizeAnswers[0]);

            $("#answer1").html(btn);

            btn2 = $("<btn>");
            btn2.addClass("btn btn-danger col-md-8 col-sm-8").html(randomizeAnswers[1]);


            $("#answer2").html(btn2)

            btn3 = $("<btn>");
            btn3.addClass("btn btn-danger col-md-8 col-sm-8").html(randomizeAnswers[2]);


            $("#answer3").html(btn3)

            btn4 = $("<btn>");
            btn4.addClass("btn btn-danger col-md-8 col-sm-8").html(randomizeAnswers[3]);


            $("#answer4").html(btn4)

        }

        //click events on each answer to determine the user's choice

        $("#answer1").on("click", function() {
            userGuess = $("#answer1").text().trim();
            score();
        });

        $("#answer2").on("click", function() {
            userGuess = $("#answer2").text().trim();
            score();
        });

        $("#answer3").on("click", function() {
            userGuess = $("#answer3").text().trim();
            score();
        });

        $("#answer4").on("click", function() {
            userGuess = $("#answer4").text().trim();
            score();

        });

        function nextQuestion() {
            if (currentQuestion < qAmount) {
                displayQuestion();
            } else {
                gameOver();
                location.href = "rankings.html";
            }
        }

        function score() {
            if (uLevel == "easy" && userGuess == rightAnswer) {
                correct++;
                currentQuestion++;
                userGuess = "";
                scoreValidation();
                nextQuestion();
            } else if (uLevel == "medium" && userGuess == rightAnswer) {
                correct += 2;
                currentQuestion++;
                userGuess = "";
                scoreValidation();
                nextQuestion();
            } else if (uLevel == "hard" && userGuess == rightAnswer) {
                correct += 3;
                currentQuestion++;
                userGuess = "";
                scoreValidation();
                nextQuestion();
            } else {
                incorrect++;
                currentQuestion++;
                userGuess = "";
                scoreValidation();
                nextQuestion();
            }
        }

    });

});