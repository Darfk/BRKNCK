var Cannon = function (x, y, r, pow, mb, ms, lipX, lipY) {
  this.position = new Vec2(x, y);
  this.origin = new Vec2(x, y);
  this.offset = new Vec2(-16, -16)
  this.pow = pow;
  this.flare = 0;
  this.mb = mb;
  this.ms = ms;
  this.rot = r;
  this.originRot = r;
  this.rotLip = Math.PI / 2;
  this.lip = new Vec2(lipX, lipY);
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
    debug.log(this.rot);
    if(this.mb){
      mb[this.mb-1](t, this.ms, this);
    }
  },
  type:'cannon',
};
