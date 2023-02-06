var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(
    function() {
        if (!started) {
            started = true;
            nextSequence();
        }
    }
)


$(".btn").click(
    function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        if (checkAnswer(userClickedPattern.length - 1)) {
            playSound(userChosenColour);
        }
        else {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(
                function() {
                    $("body").removeClass("game-over");
                },
                200
            );
            $("#level-title").text("Game over! Press any key to restart.");

            gamePattern = [];
            userClickedPattern = [];
            started = false;
            level = 0;
        }
    }
)


function nextSequence() {
    level += 1;
    $("#level-title").text("Level " + level);
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
    userClickedPattern = [];
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(
        function() {
            $("." + currentColour).removeClass("pressed");
        },
        100
    );
}


function checkAnswer(currLevel) {
    if (userClickedPattern[currLevel] == gamePattern[currLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(
                function() {
                    nextSequence();
                },
                1000
            );
        }
        return true;
    }
    else {
        return false;
    }
}
