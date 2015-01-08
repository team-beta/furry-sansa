define(['Levels/BaseLevel', 'Levels/lvl2/settings', 'Levels/lvl2/layer-1', 'Levels/lvl2/layer-2', 'Game/Robot'],
        function(BaseLevel, Settings, layer1, layer2, Robot) {
    var Level = function(main) {
        this.init(main);
    }
    Level.prototype = new BaseLevel();

    Level.prototype.loadSettings = function() {
        this.settings.setWorldBounds(0, 0, 1620, 920);
        this.settings.playMusic('music_dododo');
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

    Level.prototype.destroy = function() {
        this.settings.destroy();
    }

    Level.prototype.update = function() {
        this.fgLayer.update();
    }

    return Level;
});
