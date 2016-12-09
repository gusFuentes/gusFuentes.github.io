var timeText = document.getElementById("timeIndicator");
var rangesText = document.getElementById("rangesIndicator");
var goodText = document.getElementById("goodIndicator");
var intervalText = document.getElementById("intervalIndicator");
var goodOrBadText = document.getElementById("goodOrBad");
var differenceText = document.getElementById("difference");

var beatTimes = [ 100, 200, 300, 400 ];
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
      rangesText.innerHTML = rangesText.innerHTML + ranges[i] + "<br>";
    }
    else if(i == beatTimes.length - 1){ //Last
      ranges[i][0] = beatTimes[i] - ((beatTimes[i] - beatTimes[i - 1])/2);
      ranges[i][1] = beatTimes[i] - percentage( (beatTimes[i] - beatTimes[i - 1]), goodRange);
      ranges[i][2] = beatTimes[i];
      ranges[i][3] = beatTimes[i] + percentage( (beatTimes[i] - beatTimes[i - 1]), goodRange);
      ranges[i][4] = beatTimes[i] + ((beatTimes[i] - beatTimes[i-1])/2) - 1;
      timeLimit = ranges[i][4];
      rangesText.innerHTML = rangesText.innerHTML + ranges[i] + "<br>";
    }    
    else{
      ranges[i][0] = beatTimes[i] - ((beatTimes[i] - beatTimes[i - 1])/2);
      ranges[i][1] = beatTimes[i] - percentage( (beatTimes[i] - beatTimes[i - 1]), goodRange);
      ranges[i][2] = beatTimes[i];
      ranges[i][3] = beatTimes[i] + percentage( (beatTimes[i + 1] - beatTimes[i]), goodRange);
      ranges[i][4] = beatTimes[i] + ((beatTimes[i + 1] - beatTimes[i])/2) - 1;
      rangesText.innerHTML = rangesText.innerHTML + ranges[i] + "<br>";
    }
  }
}
updateRanges();

var clock = setInterval(function() {
    prueba ++;
    var ellapsedTime = prueba;  
    globalEllapsedtime = ellapsedTime;
    timeText.innerHTML = ellapsedTime
  
    if (ellapsedTime >= timeLimit){
      console.log("stop");
      clearInterval(clock);
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
    }
    
}, 1);

function updateIntervalText(){
  intervalText.innerHTML = "Current interval: " + beatTimes[currentInterval];
}
updateIntervalText();

function takeHit(){
  var difference = Math.abs(beatTimes[currentInterval] - globalEllapsedtime);
  differenceText.innerHTML = difference;
  evalAccuracy(difference);
}

function evalAccuracy(dif){
  if(rangeState == 0){
    goodOrBadText.innerHTML = "Bad";
    document.getElementById("hitButton").style.backgroundColor = "Red";
  }else{
    goodOrBadText.innerHTML = "Good!";
    document.getElementById("hitButton").style.backgroundColor = "Green";
    navigator.vibrate(100);
  }
}