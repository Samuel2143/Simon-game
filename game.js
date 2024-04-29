
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(".btn").on("click",function(){

  var userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

$(document).on("keydown",function(){
  if(!started){
    $("h1").text("Level " + level);

    nextSequence();

    started = true;
  }
});

function nextSequence(){

  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

}

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(name){
  $("#" + name).addClass("pressed");

  setTimeout(function(){
    $("#" + name).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence(level);
      },1000);

    }
    
  } else{
    console.log("wrong");

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game over, Press Any key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
