define([], function () {
  var Block = function(main, name){
    this.main = main;
    this.game = main.game;
    this.blocks = this.game.add.group();
    this.blocks.enableBody = true;
    this.library = main.library;
    this.name = name;

    if(typeof this.main.library.blocks[name] === 'undefined'){
      console.log("Pushing: " + name);
      this.main.library.blocks[name] = this;
    }else{
      console.log("Pushing: " + name);
      this.main.library.blocks[name + '_' + this.main.library.blocks.length] = this;
    }

    console.log(this.main.library.blocks);
  }

  Block.prototype.create = function (x, y, width, height) {
    var tile = 32;

    var tileSprite = this.game.add.tileSprite(
      x, y, width * 32, height * 32, "solid_block", null, this.blocks
    );

    tileSprite.name = name;
    tileSprite.body.immovable = true;
    tileSprite.solid = true;
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

  return Block;
});
