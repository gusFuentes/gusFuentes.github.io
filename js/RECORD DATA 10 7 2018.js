var mic;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/sounds/saludo.mp3');
}

function setup(){
  createCanvas(200, 200);
  amplitude = new p5.Amplitude();
  mySound.setVolume(0.1);
  mySound.play();
  
}

function draw(){

  background('#FFD8B9');

  var level = amplitude.getLevel();
  var size = map(level*200, 0, 1, 0, 200);

  if(level > 0.0005){
  	fill('#990000');
	noStroke();
	rect(0, 0, 200, size);

	fill('#ffffff');
	noStroke();
	rect(0, 0, 200, 10);
  }

  //console.log(level);
}