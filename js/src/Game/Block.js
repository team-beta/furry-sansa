define(['jquery-terminal'], function () {
  var Block = function(main, name){

    // Quick references
    this.main = main;
    this.game = main.game;
    this.api = this.main.api;
    this.graphics = this.main.graphics;
    this.library = main.library;

    // Initialize variables
    this.name = name;
    this.selected = false;
  }

  Block.prototype.create = function (x, y, width, height, group) {
      var tile = 32;
      var tileSprite = this.game.add.tileSprite(x, y, width*tile, height*tile, "solid_block", null, group);

      // Set properties
    //   tileSprite.body.gravity.y = 500;
      tileSprite.name = name;
      tileSprite.body.immovable = true;
      tileSprite.solid = true;
      tileSprite.body.collideWorldBounds = true;

      // Selection
      tileSprite.inputEnabled = true;
      tileSprite.hitArea = new PIXI.Rectangle(0,0, width*tile, height*tile);
      tileSprite.input.useHandCursor = true;
      tileSprite.events.onInputDown.add(function(){
          document.terminal.insert('world.blocks.' + this.name);
          this.select();
      }, this);
  }


  Block.prototype.select = function(){
      this.graphics.clear();
      this.selected = true;
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
      this.tileSprite.body.velocity.x += x;
      this.tileSprite.body.velocity.y += y;
  }

  return Block;
});
