define(['Levels/BaseLevel', 'Levels/lvl1/layer-1', 'Levels/lvl1/layer-2', 'Game/Robot'],
        function(BaseLevel, layer1, layer2, Robot) {
    var Level = function(main) {
        this.init(main);
        this.main = main;
    }
    Level.prototype = new BaseLevel();

    Level.prototype.loadSettings = function() {
        this.settings.setWorldBounds(0, 0, 1620, 920);
        this.settings.playMusic('music_thinking-back');
        this.settings.drawBackground('background_factory', true);
    }

    Level.prototype.createBackgroundLayer = function() {
        this.bgLayer = new layer1(this.main, this);
        this.bgLayer.create();
    }

    Level.prototype.createRobot = function() {
        this.main.robot = new Robot(this.main, 32, 24*32);
    }

    Level.prototype.createForegroundLayer = function() {
        this.fgLayer = new layer2(this.main)
        this.fgLayer.create();
    }

    Level.prototype.update = function() {
        this.fgLayer.update();
    }

    Level.prototype.help = function(subject) {
        world.main.sound_help.play('', 0, 5, false, false);
            return "Hey there, need some help? You see those blue blocks? \n"
            + "You can make them unsolid by clicking on the block and typing .setSolidity(false) behind it and pushing enter. \n"
            + "To make it solid again use .setSolidity(true). Press enter to input commands!\n"
            + "Remember, if you are stuck, you can always reset the game with reset()"
          }
    return Level;
});
