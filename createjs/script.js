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
	this.bitmap.width = 64;
	this.bitmap.height = 64;
	this.vx = 0;
	this.vy = 0;
	stage.addChild(this.container);
}

PrototipoNave.prototype.UpdatePosition = function (dt){ 
  this.bitmap.x = this.bitmap.x + this.vx * dt;
  this.bitmap.y = this.bitmap.y + this.vy * dt;

  if(this.bitmap.x < this.bitmap.width/2){
    this.vx = 0;
    this.bitmap.x = this.bitmap.width/2;
  }else if(this.bitmap.x > window.innerWidth - this.bitmap.width/2){
    this.vx = 0;
    this.bitmap.x = window.innerWidth - this.bitmap.width/2;
  };

  if(this.bitmap.y < this.bitmap.height/2){
    this.vy = 0;
    this.bitmap.y = this.bitmap.height/2;
  }else if(this.bitmap.y > window.innerHeight - this.bitmap.height/2){
    this.vy = 0;
    this.bitmap.y = window.innerHeight - this.bitmap.height/2;
  };
}

PrototipoNave.prototype.UpdateSpeed = function (axys, speed) {
  if(axys == "x"){
    this.vx += speed;
  }else{
    this.vy += speed;
  }
  console.log("h " + nuevaNave.vx);
}

var nuevaNave = new PrototipoNave();

document.addEventListener('keydown', function(event) {
    //left
    if(event.keyCode == 37) {
        nuevaNave.UpdateSpeed("x", -4);
    }
    //top
    else if(event.keyCode == 38) {
        nuevaNave.UpdateSpeed("y", -4);
    }
    //right
    else if(event.keyCode == 39) {
        nuevaNave.UpdateSpeed("x", 4);
    }
    //bottom
    else if(event.keyCode == 40) {
        nuevaNave.UpdateSpeed("y", 4);
    }
});



canvas.addEventListener("mousemove", function(e){
	angle = Math.atan2( nuevaNave.bitmap.x - e.clientX , nuevaNave.bitmap.y -  e.clientY  )*-1;
	angleInDegrees = angle * (180 / Math.PI);
});

createjs.Ticker.addEventListener("tick", tick);
createjs.Ticker.setFPS(60);

function tick(event) {
	nuevaNave.UpdatePosition(0.016);
	nuevaNave.bitmap.rotation = angleInDegrees;
	stage.update();
}