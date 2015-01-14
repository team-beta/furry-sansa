define(['Levels/BaseLevel', 'Levels/lvl4/layer-1', 'Levels/lvl4/layer-2', 'Game/Robot'],
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
        this.main.robot = new Robot(this.main, 32, 22*32);
    }

    Level.prototype.createForegroundLayer = function() {
        this.fgLayer = new layer2(this.main)
        this.fgLayer.create();
    }

    Level.prototype.update = function() {
        this.fgLayer.update();
    }

    Level.prototype.help = function(subject) {
            return "Let me just give you a little hint. Maybe you can move blocks in more ways than just Right or Left\n"
          }
    return Level;
});
