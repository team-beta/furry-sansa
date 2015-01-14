define(['Levels/BaseLevel', 'Levels/lvl3/layer-1', 'Levels/lvl3/layer-2', 'Game/Robot'],
        function(BaseLevel, layer1, layer2, Robot) {
    var Level = function(main) {
        this.init(main);
    }
    Level.prototype = new BaseLevel();

    Level.prototype.loadSettings = function() {
        this.settings.setWorldBounds(0, 0, 3240, 920);
        this.settings.playMusic('music_dododo');
        this.settings.drawBackground('background', true);
        this.settings.setSnowflake(true);
    }

    Level.prototype.createBackgroundLayer = function() {
        this.bgLayer = new layer1(this.main, this);
        this.bgLayer.create();
    }

    Level.prototype.createRobot = function() {
        this.main.robot = new Robot(this.main, 32, 21*32);
    }

    Level.prototype.createForegroundLayer = function() {
        this.fgLayer = new layer2(this.main)
        this.fgLayer.create();
    }

    Level.prototype.update = function() {
        this.fgLayer.update();
    }

    Level.prototype.help = function(subject) {
      switch (subject) {
        case 'world':
          return "This is world object, the common root of all objects in the game. Every object has methods and sub-objects. For example, world.mute() is a method that applies to the world object.\n"
          + "world.mute() mutes the world music, while world.play() plays the world music. \n"
          + "The world also has sub-classes. You can manipulate two of them:\n"
          + "world.robot - the robot object. Use help('robot') to learn more about yourself. \n"
          + "world.blocks - special blocks that can be manipulated. Use help('blocks') to learn more about blocks. \n"
          case 'blocks':
            return "This is the blocks object. Use world.listBlocks() to get a list of all blocks that can be manipulated."
            case 'robot':
              return "This is you! Use world.robot.dance() to dance and world.robot.stopDancing() to stop. Later in the game, we will reveal more features."
            }
            return "Hey there, need some help? Did you know that you can do more than just make blocks solid and unsolid? You can make them make them move as well :D \n"
            "Just type .moveRight() or .moveLeft() with the amount of spaces you want the block to move between the brackets. \n"
            + "Good luck!\n"

    return Level;
});
