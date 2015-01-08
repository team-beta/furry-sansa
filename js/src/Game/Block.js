define(['jquery-terminal'], function () {
  var Block = function(main, name){
    this.main = main;
    this.game = main.game;
    this.api = this.main.api;
    this.blocks = this.game.add.group();
    this.blocks.enableBody = true;
    this.graphics = this.main.graphics;
    this.library = main.library;
    this.name = name;
    this.selected = false;

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

    // Enable physics between this tilesprite and every platform.
    var parent = this;

    this.api.collisionBlocks.forEach(function(colBlock){
        parent.game.physics.enable([ colBlock, parent.tileSprite ], Phaser.Physics.ARCADE);
    })

    this.tileSprite.body.gravity.y = 1500;
    this.tileSprite.name = name;
    this.tileSprite.body.immovable = true;
    this.tileSprite.solid = true;
    this.tileSprite.body.collideWorldBounds = true;

    this.tileSprite.inputEnabled = true;
    this.tileSprite.hitArea = new PIXI.Rectangle(0,0, width*tile, height*tile);
    this.tileSprite.input.useHandCursor = true;
    this.tileSprite.events.onInputDown.add(function(){
            console.log("Selected: " + this.name);
            document.terminal.insert('world.blocks.' + this.name);
            this.select();
    }, this);

  }


  Block.prototype.update = function(){
    // var api = this.api;
    // var block = this;
    var parent = this;
    var blocks = this.blocks;
    // console.log(blocks)

    //  Check physics between this tilesprite and every platform.
    this.api.collisionBlocks.forEach(function(colBlock){
        parent.game.physics.arcade.collide(parent.blocks, colBlock);
    })

    // Determine collision for all platforms.
    // colisionBlocks is a list of groups of tileSprites.
    // this.main.library.blocks is a dictionary of block names --> block objects.

    // console.log(this.main.library.blocks)
    // for (blockName in this.main.library) {
    //     var oneBlock = parent.main.library.blocks[blockName];
    //     parent.api.collisionBlocks.forEach(function(elem){
    //         parent.game.physics.arcade.collide(oneBlock, elem, function() {
    //             elem.land(this.api.intensity);
    //             elem.walk();
    //         }, null, this)
    //     })
    // }


    var robot = this.main.robot;
    this.blocks.forEach(function(elem){
      if (elem.solid == true) {
        // Well the robot collides with it
        robot.collide(elem, function() {
        }, null, this)

        // Now it should collide with the rest of the platforms right?
        parent.api.collisionBlocks.forEach(function(colB){
            parent.game.physics.arcade.collide(colB, elem, function(){
                console.log("Collision!")
            }, null, this);
        })


        // parent.api.collisionBlocks.forEach(function(colB)
        // console.log(Object.keys(parent.main.library.blocks).length + " blocks will collide with " + parent.api.collisionBlocks.length + " platforms.")
        // parent.api.collisionBlocks.forEach(function(colBlock){
        //     console.log(colBlock)
        //     console.log(elem)
        // throw new Error("my error message");
        //     parent.game.physics.arcade.collide(elem, colBlock, function() {
        //
        //     }, null, this)
        // })
      }
    })
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
    // x = x * 32;
    // y = y * 32;
    //
    // this.tileSprite.x += x;
    // this.tileSprite.y += y;
  }

  return Block;
});
