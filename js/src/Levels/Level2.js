define(['Levels/BaseLevel', 'Levels/lvl2/layer-1', 'Levels/lvl2/layer-2', 'Game/Robot'],
        function(BaseLevel, layer1, layer2, Robot) {
    var Level = function(main) {
        this.init(main);
    }
    Level.prototype = new BaseLevel();

    Level.prototype.loadSettings = function() {
        this.settings.setWorldBounds(0, 0, 1620, 920);
        this.settings.playMusic('music_dododo');
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
        // Make a group for all platforms.
        this.main.platformGroup = this.game.add.group();
        this.main.platformGroup.enableBody = true;

        this.fgLayer = new layer2(this.main)
        this.fgLayer.create();
    }

    Level.prototype.update = function() {
        this.fgLayer.update();
    }

    return Level;
});