define(['Levels/BaseLevel', 'Levels/lvl2/layer-1', 'Levels/lvl2/layer-2', 'Game/Robot'],
        function(BaseLevel, layer1, layer2, Robot) {
    var Level = function(main) {
        this.init(main);
    }
    Level.prototype = new BaseLevel();

    Level.prototype.loadSettings = function() {
        this.settings.setWorldBounds(0, 0, 3240, 920);
        this.settings.playMusic('music_dododo');
        this.settings.drawBackground('background', true);
    }

    Level.prototype.createBackgroundLayer = function() {
        this.main.api.snowflake()
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
            return "Hey there, need some help? Did you know that you can do more than just make blocks solid and unsolid? You can make them make them move as well :D \n"
          + "Just type .moveRight() or .moveLeft() with the amount of spaces you want the block to move between the brackets. \n"
            + "Good luck!\n"
          }
    return Level;
});
