var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0


// Clicking Sound and Animation
$(".btn").click(function() {
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  numberOfButtonsClicked = userClickedPattern.length - 1;
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(numberOfButtonsClicked);

})
// Starting the game by only detecting one keydown
var started = false;
$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level)
    nextSequence();
    started = true;
  }
})



function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success")
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1200);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3")
    wrong.play();
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over! Press any key to restart!")
    startOver();
  };


}

function startOver() {
level = 0;
gamePattern=[];
started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function() {
    $(".btn").removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level = level + 1;
  $("h1").text("Level " + level);

}
