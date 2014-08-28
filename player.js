var Player = function (x, y, t) {
  this.position = new Vec2(x, y);
  this.offset = new Vec2(-8, -8)
  this.type = t;
  this.diff = new Vec2();
  this.pb = this.cb = null;
  this.pbc = true;
  this.velocity = new Vec2(0, 4);
  this.gravTime = 0;
  this.element = 0;
  this.cd = 0;
};

Player.prototype = {
  pow:7,
  draw:function(cx){
    cx.drawImage(sprite.player, 0, 0);
    debug.log(this.element);
  },
  update:function (t) {
    var o;
    for(var i in entities){
      o = entities[i]
      if(o===this||o===this.cb)continue;
      this.diff.sub(this.position, o.position)
      if(this.diff.magSq() < 128){
        if(o.type==='powerup'){
          this.element = o.element | this.element;
          o.trash=true;
          continue;
        }else if(o.type==='rock'){
          if(this.element&8){
            o.trash=true;
            continue;
          }
          this.velocity.x *=-1;
          this.velocity.y *=-1;
          continue;
        }else if(o.type==='cannon'){
          if(this.cd>0)continue;
          this.cb = o;
          this.pb = o;
          this.cd = 10;
        }
      }
    }

    if(!this.cb){
      this.cd-=1;
    }

    if(this.gravTime <= 0){
      this.velocity.y -= 0.2;
    }
    this.gravTime -= 1;
    this.velocity.y = Math.min(8, Math.max(-8, this.velocity.y));

    if(!this.cb) {
      if(input.keys[37]){
        this.velocity.x = -this.pow;
        this.velocity.y = 0;
        this.gravTime = 10;
      }
      if(input.keys[39]){
        this.velocity.x = this.pow;
        this.velocity.y = 0;
        this.gravTime = 10;
      }
      if(input.keys[38]){
        this.velocity.x = 0;
        this.velocity.y = this.pow;
        this.gravTime = 10; 
     }
      if(input.keys[40]){
        this.velocity.x = 0;
        this.velocity.y = -this.pow;
        this.gravTime = 10;
      }
    }

    if(input.keys[90]===1&&this.cb){
      var r = Math.round(this.cb.rot * 4/Math.PI) / (4 / Math.PI);
      this.velocity.x = Math.sin(r) * this.cb.pow;
      this.velocity.y = Math.cos(r) * this.cb.pow;
      this.cb.flare = 3;
      this.cb=null;
    }

    if(this.cb){
      this.velocity.x = this.velocity.y = 0;
      this.position.copy(this.cb.position);
      this.rot = this.cb.rot;
    }else{
      this.rot = Math.atan2(this.velocity.x, this.velocity.y);
      this.position.add(this.position, this.velocity);
    }
  },
};
