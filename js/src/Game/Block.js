define(['jquery-terminal', 'Game/Task','jquery'], function (terminal, Task) {
  var Block = function(main, name, x, y, width, height, group){

    // Quick references
    this.main = main;
    this.game = main.game;
    this.api = this.main.api;
    this.graphics = this.main.graphics;
    this.library = main.library;
    this.taskList = [];

    // Initialize variables
    this.name = name;
    this.selected = false;

    this.create(x, y, width, height, group)
  }

  Block.prototype.create = function (x, y, width, height, group) {
      var tile = 32;
      this.tileSprite = this.game.add.tileSprite(x, y, width*tile, height*tile, "solid_block", null, group);

      // Set properties
      this.tileSprite.body.gravity.y = 500;
      this.game.physics.enable(this.tileSprite, Phaser.Physics.ARCADE);

      this.tileSprite.name = name;
      this.tileSprite.solid = true;
      this.tileSprite.body.collideWorldBounds = true;

      // Selection
      this.tileSprite.inputEnabled = true;
      this.tileSprite.hitArea = new PIXI.Rectangle(0,0, width*tile, height*tile);
      this.tileSprite.input.useHandCursor = true;
      this.tileSprite.events.onInputUp.add(function(){
          if (this.main.gui) {
              $('.menu').html("");

              var name = this.name;

              window.choose = function(option, name) {
                  var command = $(option).html()
                //   document.terminal.clear()
                  document.terminal.exec('world.blocks.' + name + command);
                  closeMenu();
              }

              window.closeMenu = function() {
                //   console.log("hmm?")
                  $('.menu').html("").hide();
              }


              window.selectThing = function(name) {
                  closeMenu();
                  document.terminal.insert('world.blocks.' + name);
                  $('#term .cmd').click();
                //   block.select();

              }

              $('.menu').append("<a href='javascript:void(0)' onclick='selectThing(\"" + name + "\")'>select</a>")

              if (this.main.levelNum >= 2) {
                  $('.menu').append("<a href='javascript:void(0)' onclick='choose(this, \"" + name + "\")'>" + ".setSolidity(" + !this.tileSprite.solid + ")" + "</a>")
              }

              if (this.main.levelNum >= 3) {
                  $('.menu').append("<a href='javascript:void(0)' onclick='choose(this, \"" + name + "\")'>" + ".moveLeft(" + 1 + ")" + "</a>")
                  $('.menu').append("<a href='javascript:void(0)' onclick='choose(this, \"" + name + "\")'>" + ".moveLeft(" + 5 + ")" + "</a>")
                  $('.menu').append("<a href='javascript:void(0)' onclick='choose(this, \"" + name + "\")'>" + ".moveLeft(" + 10 + ")" + "</a>")

                  $('.menu').append("<a href='javascript:void(0)' onclick='choose(this, \"" + name + "\")'>" + ".moveRight(" + 1 + ")" + "</a>")
                  $('.menu').append("<a href='javascript:void(0)' onclick='choose(this, \"" + name + "\")'>" + ".moveRight(" + 5 + ")" + "</a>")
                  $('.menu').append("<a href='javascript:void(0)' onclick='choose(this, \"" + name + "\")'>" + ".moveRight(" + 10 + ")" + "</a>")
              }
              if (this.main.levelNum >= 3) {
                  $('.menu').append("<a href='javascript:void(0)' onclick='choose(this, \"" + name + "\")'>" + ".moveUp()" + "</a>")
              }
                  $('.menu').append("<a href='javascript:void(0)' onclick='closeMenu()'> close </a>")

              $('.menu').css("left", this.game.input.x).css("top", this.game.input.y).show();
          } else {
              document.terminal.insert('world.blocks.' + this.name);
              $('#term .cmd').click();
              this.select();
          }
      }, this);
  }



  Block.prototype.select = function(){
      this.graphics.clear();
      this.selected = true;
      this.graphics.lineStyle(2, 0xFFFFFF, 1);
      this.graphics.drawRect(this.tileSprite.x, this.tileSprite.y, this.tileSprite.width, this.tileSprite.height);
  }

  Block.prototype.setSolidity = function(bool) {
    this.main.sound_unsolid.play('', 0, 5, false, false);
    if(bool){
        this.tileSprite.alpha = 1;
        this.tileSprite.solid = true;
    } else {
        this.tileSprite.alpha = 0.3;
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
      if (typeof y === "undefined") {
          y = 1;
      }
      this.move(0, -y);
  }

  Block.prototype.move = function(x, y) {
      var position = this.tileSprite.position;
      var x = x*32 + position.x;
      var y = y*32 + position.y;
      this.taskList.push(new Task(this.tileSprite, x, y));
      //this.tileSprite.body.velocity.x += x;
      //this.tileSprite.body.velocity.y += y;
  }

  Block.prototype.update = function() {
      var parent = this;

      // Set body to immovable, so that the robot can't move it.
      parent.tileSprite.body.immovable = true;

      // Detect collisions between this block and the robot.
      if (parent.tileSprite.solid) {
          parent.main.robot.collide(parent.tileSprite, function() {

          }, null, this)
      }

      //  Set body to movable, so that collision with platform works.
      parent.tileSprite.body.immovable = false;

      // Detect collision between the block and all the platforms.
      parent.api.collisionBlocks.forEach(function(platform){
          parent.game.physics.arcade.collide(parent.tileSprite, platform, function(){

          }, null, this);
      });

      // Detect collision between the block and all solid objects
      parent.api.solid.forEachAlive(function(solid){
          parent.game.physics.arcade.collide(parent.tileSprite, solid, function(){

          }, null, this);
      })

      // Detect collision between this block and mattresses
      parent.api.mattresses.forEach(function(mattress){
          parent.game.physics.arcade.collide(parent.tileSprite, mattress, function(){
              mattress.animations.play('jump');
              parent.tileSprite.body.velocity.y = -500;

          }, null, this);
      })

      // Detect collision between this block and conveyor belts
      parent.api.tracks.forEach(function(track){
          parent.game.physics.arcade.collide(parent.tileSprite, track, function(){
              parent.tileSprite.body.velocity.x = -track.conveyorBeltSpeed;
          }, null, this);
      })

      // Detect collision between this block and all other blocks
      for (k in parent.library.blocks) {
          if (this.tileSprite != parent.library.block) {
              var collideWith = parent.library.blocks[k].tileSprite;
              collideWith.body.immovable = true;
              parent.game.physics.arcade.collide(parent.tileSprite, collideWith, function(){

              }, null, this)
          collideWith.body.immovable = false;
        }
      }

      this.updateTasks();





  }

  Block.prototype.updateTasks = function(){
      this.taskList.forEach(function(task){
          if(task.finished == false){
            task.update();
          }
      });

  }

  return Block;
});
