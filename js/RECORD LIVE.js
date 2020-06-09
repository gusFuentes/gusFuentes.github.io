var mic;
var can;

function setup(){
  can = createCanvas(200, 200);
  amplitude = new p5.Amplitude();
  mic = new p5.AudioIn();
  can.id = "esteCan";

  document.getElementById("defaultCanvas0").addEventListener('click', function (event) {
       console.log("activado");
  //MICRO
  
  mic.start();
 });
}




function activar() {

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