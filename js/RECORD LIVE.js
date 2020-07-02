console.log("v.10")
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
  mic = new p5.AudioIn();
  mic.start();

  //Audio from file
  /*amplitude = new p5.Amplitude();
  mySound.setVolume(0.1);
  mySound.play();*/
}

function draw(){

  background('#FAA284');

  //Audio from mic
  var level = mic.getLevel();

  //Audio from file
  //var level = amplitude.getLevel();

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
    fill('#89493D');
    noStroke();
    rect(0, (height/2)-(mouthHeight/2), 200, 10);
  }

  //console.log(level);
}

var KEYCODE_LEFT = 37, 
KEYCODE_RIGHT = 39,
KEYCODE_UP = 38, 
KEYCODE_DOWN = 40,
KEYCODE_W = 87,
KEYCODE_A = 65,
KEYCODE_D = 68,
KEYCODE_S = 83;
KEYCODE_X = 88;
KEYCODE__ = 32;

function keyPressed(event) {
  switch(event.keyCode) {
    case KEYCODE_UP:
      mostrarImagen("url('img/EcosystemMapOSP.png')");
      break
    case KEYCODE_DOWN: 
      mostrarImagen("url('img/participantes.png')");
      break
  }
}

function mostrarImagen(imgurl) {
  var x = document.getElementById("imagen");
  x.style.backgroundImage = imgurl;

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}