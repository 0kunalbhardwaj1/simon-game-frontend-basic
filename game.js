//user's pattern
let userClickedPattern = [];

//actual game's pattern
let gamePattern = [];

//array of colours to choose from
let buttonColours = ["red", "blue", "green", "yellow"];

//initialize level value at 0
let level = 0;

//as game hasn't started yet, put this as false
let gameStart = false;

//playing the sound
function playSound(name){
    //making the sound
    switch (name) {
        case 'red':
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;

        case 'blue':
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;

        case 'green':
            var green = new Audio("./sounds/green.mp3");
            green.play();
            break;
            
        case 'yellow':
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;

        case 'wrong':
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
            break;
    }
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

    
    //flash animation
    $("#" + currentColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });   
}


//generating the sequence
function nextSequence(){
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random()*4);
    //choosing the colour
    let randomChosenColour = buttonColours[randomNumber];

    //appending the pattern
    gamePattern.push(randomChosenColour);

    //flash animation
    $("." + randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });

    playSound(randomChosenColour);

    level ++;

    $("h1").text(`Level ${level}`);
}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence ,1000);
        }
    } else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } ,200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

//handler function
$(".btn").on("click", function(event) {
    let userChosenColour = $(this).attr("id");

    //appending user's pattern
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);

    playSound(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});


$(document).keypress(function(){

    if(!gameStart){
        startOver();
        gameStart = true;
        nextSequence();
    }
});


function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart = false;
}