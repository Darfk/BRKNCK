var Rock = function (x, y, mb, ms, lipX, lipY) {
  this.position = new Vec2(x, y);
  this.origin = new Vec2(x, y);
  this.offset = new Vec2(-16, -16)
  this.mb = mb;
  this.ms = ms;
  this.lip = new Vec2(lipX, lipY);
};

Rock.prototype = {
  draw:function(cx){
    cx.drawImage(sprite.rock, 0, 0);
  },
  update:function (t) {
    if(this.mb){
      mb[this.mb-1](t, this.ms, this);
    }
  },
  type:'rock',
};
