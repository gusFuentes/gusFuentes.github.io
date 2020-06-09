var mic;

function setup(){
  createCanvas(200, 200);
  amplitude = new p5.Amplitude();
  
  //MICRO
  mic = new p5.AudioIn();
  mic.start();

}

function draw(){

  background('#FFD8B9');

  var level = mic.getLevel();
  var size = map(level*45, 0, 1, 0, 200);

  if(level > 0.0015){
  fill('#990000');
	noStroke();
	rect(0, (height/2)-(size/2), 200, size);

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