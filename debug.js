var Debug = function () {
  this.l = [];
};

Debug.prototype = {
  log:function (s){
    this.l.push(s);
  },
  clear:function(){
    this.l = [];
  },
  draw:function (cx) {
    cx.fillStyle='#ffffff';
    for(var i=0; i<this.l.length;++i){
      cx.fillText(this.l[i], 0, i*10+10);
    }
  },
};
