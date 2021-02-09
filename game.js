var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$("body").on("keydown", theThingsThatShouldHappen);

function theThingsThatShouldHappen() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
};


$(".btn").on("click",function(){

    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour); 
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();  
}

function animatePress(currentColour){

    var delayInMilliseconds = 100;
    $("." + currentColour).addClass("pressed");

    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, delayInMilliseconds);
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
  }
  
function startOver(){
    level = 0;
    gamePattern = [];
    started = [];  
}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){

        setTimeout(function() { nextSequence(); }, 1000);
        }
        
    }   
    else{
        var wrongAnimation = 200;

        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play(); 

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, wrongAnimation);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }
}
