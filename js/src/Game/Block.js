define([], function () {
  var Block = function(main, name){
    this.main = main;
    this.game = main.game;
    this.api = this.main.api;
    this.blocks = this.game.add.group();
    this.blocks.enableBody = true;
    this.graphics = this.main.graphics;
    this.library = main.library;
    this.name = name;

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

    this.tileSprite = this.game.add.tileSprite(
      x, y, width * 32, height * 32, "solid_block", null, this.blocks
    );

    this.tileSprite.name = name;
    this.tileSprite.body.immovable = true;
    this.tileSprite.solid = true;

    this.tileSprite.inputEnabled = true;
    this.tileSprite.input.useHandCursor = true;
    this.tileSprite.events.onInputOver.add(function(){
            console.log("Selected: " + this.name);
            this.select();
    }, this);

  }


  Block.prototype.update = function(){
    var robot = this.main.robot;
    this.blocks.forEach(function(elem){
      if (elem.solid == true) {
        robot.collide(elem, function() {
        }, null, this)
      }
    })
  }

  Block.prototype.select = function(){
      this.graphics.clear();
      this.graphics.lineStyle(2, 0xFFFFFF, 1);
      this.graphics.drawRect(this.tileSprite.x, this.tileSprite.y, this.tileSprite.width, this.tileSprite.height);
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

    this.tileSprite.x += x;
    this.tileSprite.y += y;
  }

  return Block;
});
