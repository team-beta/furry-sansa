define(['jquery-terminal'], function () {
  var Block = function(main, name, x, y, width, height, group){

    // Quick references
    this.main = main;
    this.game = main.game;
    this.api = this.main.api;
    this.graphics = this.main.graphics;
    this.library = main.library;

    // Initialize variables
    this.name = name;
    this.selected = false;

    this.create(x, y, width, height, group)
  }

  Block.prototype.create = function (x, y, width, height, group) {
      var tile = 32;
      this.tileSprite = this.game.add.tileSprite(x, y, width*tile, height*tile, "solid_block", null, group);

      // Set properties
    //   tileSprite.body.gravity.y = 500;
      this.tileSprite.name = name;
      this.tileSprite.body.immovable = true;
      this.tileSprite.solid = true;
      this.tileSprite.body.collideWorldBounds = true;

      // Selection
      this.tileSprite.inputEnabled = true;
      this.tileSprite.hitArea = new PIXI.Rectangle(0,0, width*tile, height*tile);
      this.tileSprite.input.useHandCursor = true;
      this.tileSprite.events.onInputDown.add(function(){
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
    if(bool){
        this.tileSprite.alpha = 1;
        this.tileSprite.solid = true;
    } else {
        this.tileSprite.alpha = 0.5;
        this.tileSprite.solid = false;
    }
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
