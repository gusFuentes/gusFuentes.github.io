canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
stage = new createjs.Stage(canvas);

var TO_RADIANS = Math.PI/180; 
var angle = 0;
var angleInDegrees;
var ship_coords = [canvas.width/2, canvas.height/2];

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
	//console.log("angle" + angle);
});

var messageField;		//Message display field
messageField = new createjs.Text("Gus Game", "bold 24px Arial", "#000");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.textBaseline = "middle";
	messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
	stage.update();
createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(60);


function handleImageLoad(event) {
	//var image = event.target;
	var container = new createjs.Container();
	//stage.addChild(container);

	// create and populate the screen with random daisies:
		
		container.addChild(bitmap);
		bitmap.x = canvas.width / 2;
		bitmap.y = canvas.height / 2;
		
		bitmap.regX = bitmap.image.width / 2 | 0;
		bitmap.regY = bitmap.image.height / 2 | 0;
		//bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random() * 0.4 + 0.6;
		bitmap.name = "bmp_";
		bitmap.cursor = "pointer";

		// using "on" binds the listener to the scope of the currentTarget by default
		// in this case that means it executes in the scope of the button.
		bitmap.on("mousedown", function (evt) {
			this.parent.addChild(this);
			this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
		});

		// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
		bitmap.on("pressmove", function (evt) {
			this.x = evt.stageX + this.offset.x;
			this.y = evt.stageY + this.offset.y;
			// indicate that the stage should be updated on the next tick:
			update = true;
		});

	
}
function tick(event) {
	nuevaNave.bitmap.rotation = angleInDegrees;
	stage.update();
}