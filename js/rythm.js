var timeText = document.getElementById("timeIndicator");
var rangesText = document.getElementById("rangesIndicator");
var goodText = document.getElementById("goodIndicator");
var intervalText = document.getElementById("intervalIndicator");
var goodOrBadText = document.getElementById("goodOrBad");
var differenceText = document.getElementById("difference");
var hitButton = document.getElementById("hitButton");

var beatTimes = [ 250, 500, 750, 1000 ];
var ranges = [];
var prueba = 0;
var timeLimit;
var currentInterval = 0;
var globalEllapsedtime = 0;
var goodRange = 30;
var rangeState;

function percentage(num, per)
{
  return (num/100)*per;
}

function updateRanges(){
  for (i = 0; i < beatTimes.length; i++) {
    ranges.push([]);
    if(i == 0){ //First
      ranges[i][0] = (beatTimes[i] - beatTimes[i]);
      ranges[i][1] = beatTimes[i] - percentage(beatTimes[i], goodRange);
      ranges[i][2] = beatTimes[i];
      ranges[i][3] = beatTimes[i] + percentage(beatTimes[i], goodRange);
      ranges[i][4] = beatTimes[i] + ((beatTimes[i + 1] - beatTimes[i])/2) - 1;
      //rangesText.innerHTML = rangesText.innerHTML + ranges[i] + "<br>";
    }
    else if(i == beatTimes.length - 1){ //Last
      ranges[i][0] = beatTimes[i] - ((beatTimes[i] - beatTimes[i - 1])/2);
      ranges[i][1] = beatTimes[i] - percentage( (beatTimes[i] - beatTimes[i - 1]), goodRange);
      ranges[i][2] = beatTimes[i];
      ranges[i][3] = beatTimes[i] + percentage( (beatTimes[i] - beatTimes[i - 1]), goodRange);
      ranges[i][4] = beatTimes[i] + ((beatTimes[i] - beatTimes[i-1])/2) - 1;
      timeLimit = ranges[i][4];
      //rangesText.innerHTML = rangesText.innerHTML + ranges[i] + "<br>";
    }    
    else{
      ranges[i][0] = beatTimes[i] - ((beatTimes[i] - beatTimes[i - 1])/2);
      ranges[i][1] = beatTimes[i] - percentage( (beatTimes[i] - beatTimes[i - 1]), goodRange);
      ranges[i][2] = beatTimes[i];
      ranges[i][3] = beatTimes[i] + percentage( (beatTimes[i + 1] - beatTimes[i]), goodRange);
      ranges[i][4] = beatTimes[i] + ((beatTimes[i + 1] - beatTimes[i])/2) - 1;
      //rangesText.innerHTML = rangesText.innerHTML + ranges[i] + "<br>";
    }
  }
}

var setClock;

function initClock() {
    setClock = setInterval(clock, 5);
}

function clock() {
    
    prueba ++;
    var ellapsedTime = prueba;
    globalEllapsedtime = ellapsedTime;
    timeText.innerHTML = ellapsedTime
  
    if (ellapsedTime >= timeLimit){
      clearInterval(setClock);
    }
    
    for(i = 0; i < ranges.length; i++){
      if(ellapsedTime >= ranges[i][0] && ellapsedTime <= ranges[i][1]){
         //console.log("back " + currentInterval);
         rangeState = 0;
       }else if( ellapsedTime >= ranges[i][1] && ellapsedTime <= ranges[i][3]){
         //console.log("good " + currentInterval);
         rangeState = 1;
       }else if(ellapsedTime > ranges[i][3] && ellapsedTime <= ranges[i][4]){
         //console.log("front" + currentInterval);
         rangeState = 0;
       }      
      
       if(ellapsedTime == ranges[i][4] && ellapsedTime != timeLimit){
         console.log("interval" + i);
         currentInterval ++;
         updateIntervalText()
       }
      
       if(ellapsedTime == ranges[i][2]){
         hitButton.innerHTML = i + 1;
         var beat = new Audio("https://gusfuentes.github.io/sound/4d.wav");
         beat.play();
       }
    }
}

function updateIntervalText(){
  intervalText.innerHTML = "Current interval: " + beatTimes[currentInterval];
}

function takeHit(){
  var difference = Math.abs(beatTimes[currentInterval] - globalEllapsedtime);
  differenceText.innerHTML = difference;
  evalAccuracy(difference);
}

function evalAccuracy(dif){
  if(rangeState == 0){
    goodOrBadText.innerHTML = "Bad";
    removeHitBtnClasses();
    hitButton.classList.add("badAnimate");
  }else{
    goodOrBadText.innerHTML = "Good!";
    removeHitBtnClasses();
    hitButton.classList.add("goodAnimate");
    navigator.vibrate(100);
  }
}

function removeHitBtnClasses(){
  hitButton.classList.remove("goodAnimate");
  hitButton.classList.remove("badAnimate");
  void hitButton.offsetWidth;
}

//INITIAL SETTINGS
document.getElementById("preload").style.visibility = "hidden";
document.getElementById("playground").style.visibility = "hidden";

var countdownNumber = 1000;
var innerCountdownNumber = countdownNumber;
var countdownInterval;

function startCountdown(){
  document.getElementById("selectTempo").style.visibility = "hidden";
  document.getElementById("playground").style.visibility = "visible";
  updateRanges();
  countdownInterval = setInterval(countdown, 5);
}

function countdown() { 
  if(countdownNumber > 0){
    countdownNumber--;
  }else if(countdownNumber == 0){
    updateIntervalText();
    initClock();
    clearInterval(countdownInterval);
  }
  var beat = new Audio("https://gusfuentes.github.io/sound/4d.wav");

  if(countdownNumber == (innerCountdownNumber/4) * 3){
    hitButton.innerHTML = "1";
    beat.play();
  }else if(countdownNumber == (innerCountdownNumber/4) * 2){
    hitButton.innerHTML = "2";
    beat.play();
  }else if(countdownNumber == (innerCountdownNumber/4)){
    hitButton.innerHTML = "3";
    beat.play();
  }else if(countdownNumber == 0){
    hitButton.innerHTML = "4";
    beat.play();
  }
}