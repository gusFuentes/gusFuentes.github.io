console.log("v.07")
var mic;
var can;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/sounds/total.mp3');
}

function setup(){
  var cnv = createCanvas(130, 80);
  cnv.mousePressed(userStartAudio);
  
  //Audio from mic
  //mic = new p5.AudioIn();
  //mic.start();

  //Audio from file
  amplitude = new p5.Amplitude();
  mySound.setVolume(0.1);
  mySound.play();
}

function draw(){

  background('#FAA284');

  var level = mic.getLevel();
  var mouthHeight = map(level*45, 0, 1, 0, 200);

  if(level > 0.0015){
  fill('#990000');
	noStroke();
	rect(0, (height/2)-(mouthHeight/2), 200, mouthHeight);

	/*//Dientes
	fill('#ffffff');
	noStroke();
	rect(0, 0, 200, 10);
	*/

	/*//Boca circular
	ellipse(100,100,200,level*1600);
	*/
  } else {
    fill('#990000');
    noStroke();
    rect(0, (height/2)-(mouthHeight/2), 200, 10);
  }

  //console.log(level);
}