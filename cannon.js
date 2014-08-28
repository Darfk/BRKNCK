var Cannon = function (x, y, r, pow) {
  this.position = new Vec2(x, y);
  this.origin = new Vec2(x, y);
  this.offset = new Vec2(-16, -16)
  this.pow = pow;
  this.rot = r;
  this.flare = 0;
};

Cannon.prototype = {
  draw:function(cx){
    if(this.flare){
      cx.drawImage(sprite.flare, 0, -44);
      this.flare -= 1;
    }
    cx.drawImage(sprite.cannon, 0, 0);
  },
  update:function (t) {
    //this.position.x = this.origin.x + Math.sin(t / 1000) * 32;
  },
};
