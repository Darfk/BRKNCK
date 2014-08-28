var Powerup = function (x, y, mb, ms, lipX, lipY, element) {
  this.position = new Vec2(x, y);
  this.origin = new Vec2(x, y);
  this.offset = new Vec2(-16, -16)
  this.mb = mb;
  this.ms = ms;
  this.lip = new Vec2(lipX, lipY);
  this.element = element;
};

Powerup.prototype = {
  draw:function(cx, t){
    //cx.translate(0, Math.sin(t / 20) * 4);
    cx.drawImage(sprite.powerup, 0, 0);
  },
  update:function (t) {
    if(this.mb){
      mb[this.mb-1](t, this.ms, this);
    }
  },
  type:'powerup',
};
