var aspect = 16/9;
var height = 720;
var cx = document.createElement('canvas');
document.body.style.backgroundColor = 'black';
document.body.appendChild(cx);
cx = cx.getContext('2d');
cx.canvas.width = height*aspect;
cx.canvas.height = height;
cx.canvas.oncontextmenu = function () {return false;};

var debug = new Debug();

var sprite = {
  cannon: loadImage('cannon.svg'),
  flare: loadImage('flare.svg'),
  player: loadImage('player.svg'),
  rock: loadImage('rock.svg'),
  powerup: loadImage('powerup.svg'),
};

var input = new Input();
document.body.addEventListener("keydown", function (e) { input.keyPress(e.keyCode); }, false);
document.body.addEventListener("keyup", function (e) { input.keyRelease(e.keyCode); }, false);

var entities = [];

var mb = [
  function (t, s, o) {
    s*=60;
    t=t%s;
    if(t>0&&t<s/2){ o.position.lerp(o.lip, t*2/s); }else{ o.position.lerp(o.origin, (t*2-s)/s); }
  },
  function (t, s, o) {
    s*=60;
    t=t%s;
    if(t>0&&t<s/2){
      o.rot = bananaSmoothie(o.rot, Math.PI / 4, t*2/s);
    }else{
      o.rot = bananaSmoothie(o.rot, -Math.PI / 4, (t*2-s)/s);
    }
  },
];

var player;
var camera = new Vec2();
var timing = 0;

var start = function () {

  entities.push(player = new Player(-128, 0));
  entities.push(new Cannon(-128, 0, -Math.PI / 4, 7, 2, 2, -64, 0));
  entities.push(new Cannon(128, 0, 0, 7, 0, 2, 64, 0));
  entities.push(new Powerup(128, 64, 0, 1, 0, 0, 8));
  entities.push(new Cannon(128, 128, -Math.PI/2, 3, 0, 2, 64, 0));
  entities.push(new Cannon(0, -64, -Math.PI/4, 7, 0, 2, 64, 0));

  entities.push(new Rock(-224, 64));

  var main = function(t){
    input.update();
    
    for(var i in entities){
      var e = entities[i];
      if(e.trash){
        if(e.destroy){e.destroy();}
        delete entities[i];
      }
      e.update(timing);
    }
    cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height);
    cx.fillStyle='#6495ED';
    cx.fillRect(0, 0, cx.canvas.width, cx.canvas.height);

    cx.save();
    cx.translate((height*aspect/2), (height/2));
    cx.scale(2, 2);
    cx.translate(-camera.x, camera.y);
    for(var i in entities){
      var e = entities[i];
      cx.save();
      cx.scale(1, -1);
      cx.translate(e.position.x, e.position.y);
      cx.scale(1, -1);
      cx.rotate(e.rot);
      cx.translate(e.offset.x, e.offset.y);
      e.draw(cx, timing);
      cx.restore();
    }
    cx.restore();

    camera.x += (player.position.x - camera.x) / 10;
    camera.y += (player.position.y - camera.y) / 10;

    debug.draw(cx);
    debug.clear();

    ++timing;
    requestAnimationFrame(main);
  }
  setTimeout(main, 100);
};
