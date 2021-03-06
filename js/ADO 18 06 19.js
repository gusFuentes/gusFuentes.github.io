//VARIABLES CREATE JS
var liveMode = true;
var stage;
var spriteSheet;
var container;
var gus;
var mouth;
var teeth;
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
var gus_izq = false,
gus_up = false,
gus_down = false,
gus_der = false;

//VARIABLES P5 JS
var amplitude = new p5.Amplitude();
var mic = new p5.AudioIn();
var level;
var size;
var mySound;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/sounds/saludo.mp3');
}

function setup(){
  createCanvas(0, 0);
  mySound.setVolume(1);
}

function activateMic(){
	liveMode = true;
  	mic.start();
}

function keyPressed(event) {
	switch(event.keyCode) {
		case KEYCODE_A:
			brake();
			gus_izq = true;
			break
		case KEYCODE_D: 
			brake();
			gus_der = true;
			break
		case KEYCODE_W: 
			brake();
			gus_up = true;
			break
		case KEYCODE_S: 
			brake();
			gus_down = true;
			break
		case KEYCODE_X:
			activateMic();
			break
		case KEYCODE__: 
			brake();
			break
	}

	stage.update();
}

function brake(){
	gus_izq = false, gus_up = false, gus_down = false, gus_der = false;
}

//REPRODUCIR ANIMACIÓN

function animar(event){
	if(event.keyCode == KEYCODE_DOWN){
		gus.gotoAndPlay("miraCel");
	}else if(event.keyCode == KEYCODE_UP){
		mic.stop();
		liveMode = false;
		amplitude = new p5.Amplitude();
		mySound.play();
	}
}

createjs.Ticker.addEventListener("tick", stage);



function draw(){
}

function init() {

	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(document.getElementById("testCanvas"));

	// Define a spritesheet. Note that this data was exported by Zoë.
	spriteSheet = new createjs.SpriteSheet({
			framerate: 1,
			"images": ["assets/imgs/animation_gus2.png"],
			"frames": {"regX": 0, "height": 512, "count": 5, "regY": 0, "width": 512},
			// define animation, miraCel, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"miraCel": [0, 4, "idle"],
				"idle": [0, 0]
			}
		});

	// Events from SpriteSheet (not required for the demo)
	spriteSheet.on("complete", function(event) {
		console.log("Complete", event);
	});
	spriteSheet.on("error", function(event) {
		console.log("Error", event);
	});

	gus = new createjs.Sprite(spriteSheet, "idle");
	gus.x = 0;
	gus.y = 0;
	// Add gus to the container, and add it as a listener to Ticker to get updates each frame.
	stage.addChild(gus);
	container = new createjs.Container();
	container.x = 0;
	container.y = 0;
 	container.addChild(gus);
 	stage.addChild(container);
	
	//this.document.onkeydown = keyPressed;
	this.document.onkeydown = animar;


	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", stage);

}

function stage(event) {
	
	if (liveMode){
		level = mic.getLevel();
		size = map(level*20, 0, 1, 0, 200);
	}else{
		level = amplitude.getLevel();
		size = map(level, 0, 1, 0, 1000);
	}

	container.removeChild(mouth);
	container.removeChild(teeth);

	if(level > 0.0010){
		mouth = new createjs.Shape();
 		mouth.graphics.beginFill("#cc1111").drawRect(240, 104 + (height/2)-(size/2), 24, size);
		container.addChild(mouth);
	    
	}

	if(gus_izq){
		container.x-=2;
	}
	if(gus_up){
		container.y-=2;	
	}
	if(gus_down){
		container.y+=2;	
	}
	if(gus_der){
		container.x+=2;	
	}
	 
	//console.log("Hola Gus");

	 if (!event.paused) {
	     // Actions carried out when the Ticker is not paused.
	 }
 }