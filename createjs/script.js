canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
stage = new createjs.Stage(canvas);

var TO_RADIANS = Math.PI/180; 
var angle = 0;
var angleInDegrees;

var PrototipoNave = function(){
	this.image = new Image();
	this.image.src = "img/spaceship.png";
	this.bitmap = new createjs.Bitmap(this.image);
	this.container = new createjs.Container();
	this.container.addChild(this.bitmap);
	this.bitmap.x = canvas.width / 2;
	this.bitmap.y = canvas.height / 2;	
	this.bitmap.regX = this.image.width / 2 | 0;
	this.bitmap.regY = this.image.height / 2 | 0;
	stage.addChild(this.container);
}

var nuevaNave = new PrototipoNave();

canvas.addEventListener("mousemove", function(e){
	angle = Math.atan2( nuevaNave.bitmap.x - e.clientX , nuevaNave.bitmap.y -  e.clientY  )*-1;
	angleInDegrees = angle * (180 / Math.PI);
});

createjs.Ticker.addEventListener("tick", tick);
createjs.Ticker.setFPS(60);

function tick(event) {
	nuevaNave.bitmap.rotation = angleInDegrees;
	stage.update();
}