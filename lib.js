var Vec2 = function(x, y){
  this.x = x || 0;
  this.y = y || 0;
};

Vec2.prototype = {
  add: function(a, b){
    this.x = a.x + b.x;
    this.y = a.y + b.y;
  },
  sub: function(a, b){
    this.x = a.x - b.x;
    this.y = a.y - b.y;
  },
  magSq: function () {
    return this.x * this.x + this.y * this.y;
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
  },
  lerp:function(v, a){
    this.x += ( v.x - this.x ) * a;
    this.y += ( v.y - this.y ) * a;
  },
  dot:function(v){
    return this.x * v.x + this.y * v.y;
  }
};

function    lerpScalar(a, b, v){
  return ( a - b ) * v;
}

function loadImage(src){var i = new Image(); i.src=src; return i;}

Input = function() {
  this.keys = []; this.keyPressFrame = []; this.keyReleaseFrame = [];
  
  for(var i=0;i<255;i++) {
    this.keys[i] = 0;
  }

  for(var i=0;i<255;i++) {
    this.keyReleaseFrame[i] = 0;
  }

  for(var i=0;i<255;i++) {
    this.keyPressFrame[i] = 0;
  }
  
}

Input.prototype = {
  keyPress:function (c) { this.keyPressFrame[c] = true; },
  keyRelease:function (c) { this.keyPressFrame[c] = false; },
  update:function() {
    for(var i=0;i<255;i++) { if(this.keyPressFrame[i]) { ++this.keys[i]; }else{ this.keys[i] = 0; } }
  }
};

Camera = function(aspec) {
  this.position = new Vec2();
  this.zoom = 1;
};

Camera.prototype.draw = function(cx) {
  cx.translate((cx.canvas.width * 0.5), -(cx.canvas.height * 0.5))
  cx.scale(this.zoom, this.zoom);
  cx.translate(-this.position.x, -this.position.y);
};

