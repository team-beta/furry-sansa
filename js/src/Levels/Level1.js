define(['Levels/BaseLevel', 'Levels/lvl1/layer-1', 'Levels/lvl1/layer-2', 'Game/Robot'],
        function(BaseLevel, layer1, layer2, Robot) {
    var Level = function(main) {
        this.init(main);
    }
    Level.prototype = new BaseLevel();

    Level.prototype.loadSettings = function() {
        this.settings.setWorldBounds(0, 0, 1620, 920);
        this.settings.playMusic('music_dododo');
        this.settings.drawBackground('background_factory', true);
        this.settings.setSnowflake(false);
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
            return "Hey there, need some help? You see those blue blocks? You can make them unsolid by clicking on the block and typing .setSolidity(false) behind it and pushing eter. \n"
            + "To make it solid again use .setSolidity(true). Now keep going, you are almost out of here!\n"
          }
    return Level;
});
