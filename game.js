var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var start = 0;
var level = 1;
var clicks = 0;

function nextSequence()
{
    clicks = 0;
    $('h1').text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4 );
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(randomChosenColour).fadeOut(100).fadeIn(100);
    var file = "./sounds/" + randomChosenColour + ".mp3";
    var audio = new Audio(file);
    audio.play();
    animatePress(randomChosenColour);
    level++;
    userClickedPattern = [];
}


$(".btn").click(function (e) 
{ 
    var userChosenColour = this.id;    
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    clicks++;
    // if(clicks === (level-1))
    //     checkAnswer(clicks);
    checkAnswer(clicks);
});

function playSound(name) 
{
    var file = "./sounds/" + name + ".mp3";
    var audio = new Audio(file);
    audio.play();
}

function animatePress(currentColour) 
{
    $("#"+ currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+ currentColour).removeClass("pressed");
    }, 100);    
}

$(document).keypress(function (e) 
{ 
    if(start===0)
    {
        nextSequence();
        start=1;
    }    
});

function checkAnswer(currentLevel) 
{
    var index = currentLevel - 1;
    if(userClickedPattern[index] === gamePattern[index])
    {
        // console.log("Correct");
        if(index === level-2)
        {
            debugger
            setTimeout(() => {
            nextSequence() 
            },1000);
        }    
    }    
    else
    {
        // console.log("Wrong");  
        var file = "./sounds/wrong.mp3";
        var audio = new Audio(file);
        audio.play();
        $('body').addClass("game-over");
        setTimeout(() => {
            $('body').removeClass("game-over");
        }, 100);  
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }    
}


function startOver() 
{
    level = 1;
    gamePattern = [];
    start = 0;
}