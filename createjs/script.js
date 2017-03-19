canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
stage = new createjs.Stage(canvas);

var messageField;		//Message display field
messageField = new createjs.Text("Loading", "bold 24px Arial", "#000");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.textBaseline = "middle";
	messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
	stage.update();
var image = new Image();
	image.src = "http://pixeljoint.com/files/icons/spaceship.png";
image.onload = handleImageLoad;
var update = true;

function handleImageLoad(event) {
	var image = event.target;
	var bitmap;
	var container = new createjs.Container();
	stage.addChild(container);

	// create and populate the screen with random daisies:
	for (var i = 0; i < 100; i++) {
		bitmap = new createjs.Bitmap(image);
		container.addChild(bitmap);
		bitmap.x = canvas.width * Math.random() | 0;
		bitmap.y = canvas.height * Math.random() | 0;
		bitmap.rotation = 360 * Math.random() | 0;
		bitmap.regX = bitmap.image.width / 2 | 0;
		bitmap.regY = bitmap.image.height / 2 | 0;
		bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random() * 0.4 + 0.6;
		bitmap.name = "bmp_" + i;
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

		bitmap.on("rollover", function (evt) {
			this.scaleX = this.scaleY = this.scale * 1.2;
			update = true;
		});

		bitmap.on("rollout", function (evt) {
			this.scaleX = this.scaleY = this.scale;
			update = true;
		});

	}

	//examples.hideDistractor();
	createjs.Ticker.addEventListener("tick", tick);
}
function tick(event) {
	// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
	if (update) {
		update = false; // only update once
		stage.update(event);
	}
}