define([], function () {
  var Block = function(main, name){
    this.main = main;
    this.game = main.game;
    this.blocks = this.game.add.group();
    this.blocks.enableBody = true;
    this.library = main.library;
    this.name = name;
    this.object = null;

    if(typeof this.main.library.blocks[name] === 'undefined'){
      console.log("Pushing: " + name);
      this.main.library.blocks[name] = this;
    }else{
      console.log("Pushing: " + name);
      this.main.library.blocks[name + '_' + this.main.library.blocks.length] = this;
    }
  }

  Block.prototype.create = function (x, y, width, height) {
    var tile = 32;

    var tileSprite = this.game.add.tileSprite(
      x, y, width * 32, height * 32, "solid_block", null, this.blocks
    );

    tileSprite.name = name;
    tileSprite.body.immovable = true;
    tileSprite.solid = true;
    this.object = tileSprite;
  }


  Block.prototype.update = function(){
    var blockGroup = this;
    this.blocks.forEach(function(elem){
      if (elem.solid == true) {
        blockGroup.main.robot.collide(elem, function() {
          console.log("coliding");
        }, null, this)
      }
    })
  }

  Block.prototype.setSolidity = function(bool) {
    this.blocks.forEach(function(elem){
      if(bool){
        elem.alpha = 1;
        elem.solid = true;
      } else {
        elem.alpha = 0.5;
        elem.solid = false;
      }
    })
  }

  Block.prototype.moveRight = function(x){
      this.move(x, 0);
  }

  Block.prototype.moveLeft = function(x){
      this.move(-x, 0);
  }

  Block.prototype.moveDown = function(y){
      this.move(0, y);
  }

  Block.prototype.moveUp = function(y){
      this.move(0, -y);
  }

  Block.prototype.move = function(x, y) {
    x = x * 32;
    y = y * 32;

    this.object.x += x;
    this.object.y += y;
  }

  return Block;
});
