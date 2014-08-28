document.body.style.backgroundColor = 'black';
var aspect = 16/9;
var height = 720;
var cx = document.createElement('canvas');
document.body.appendChild(cx);
cx = cx.getContext('2d');
cx.canvas.width = height*aspect;
cx.canvas.height = height;

var debug = new Debug();

var sprite = {
  cannon: loadImage('cannon.svg'),
  flare: loadImage('flare.svg'),
  player: loadImage('player.svg'),
};

var input = new Input();
document.body.addEventListener("keydown", function (e) { input.keyPress(e.keyCode); }, false);
document.body.addEventListener("keyup", function (e) { input.keyRelease(e.keyCode); }, false);

var entities = [];

var player;

entities.push(
  player = new Player(-128, 0),
  new Cannon(-128, 0, Math.PI / 4, 7),
  new Cannon(128, 0, -Math.PI / 4, 7)
)

var camera = new Vec2();

var timing = 0;

function main(t){
  input.update();
  
  for(var i in entities){
    entities[i].update(t);
  }
  cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height);
  cx.fillStyle='#6495ED';
  cx.fillRect(0, 0, cx.canvas.width, cx.canvas.height);


  cx.save();
  cx.translate((height*aspect/2), (height/2));
  cx.scale(3, 3);
  cx.translate(-camera.x, -camera.y);
  for(var i in entities){
    cx.save();
    cx.scale(1, -1);
    cx.translate(entities[i].position.x, entities[i].position.y);
    cx.scale(1, -1);
    cx.rotate(entities[i].rot);
    cx.translate(entities[i].offset.x, entities[i].offset.y);
    entities[i].draw(cx);
    cx.restore();
  }
  cx.restore();

  debug.draw(cx);
  debug.clear();

  ++timing;
  requestAnimationFrame(main);
}

setTimeout(main, 100);
