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

  

  //console.log(level);
}