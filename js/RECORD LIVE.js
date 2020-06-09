console.log("v.02")
var mic;
var can;

function setup(){
  var cnv = createCanvas(200, 200);
  cnv.mousePressed(userStartAudio);
  mic = new p5.AudioIn();
  mic.start();
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
  }

  console.log(level);
}