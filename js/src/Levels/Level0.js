define(['Levels/BaseLevel', 'Levels/lvl0/settings', 'Levels/lvl0/layer-1', 'Levels/lvl0/layer-2', 'Game/Robot'],
        function(BaseLevel, Settings, layer1, layer2, Robot) {
    var Level = function(main) {
        this._base = BaseLevel;
        this._base(main);
    }
    Level.prototype = BaseLevel;

    Level.prototype.loadSettings = function() {
        this.settings = new Settings(this.main);
        this.main.settings = this.settings;
    }

    Level.prototype.createBackgroundLayer = function() {
        this.bgLayer = new layer1(this.main, this);
        this.bgLayer.create();
    }

    Level.prototype.createRobot = function() {
        this.main.robot = new Robot(this.main, 17*32, this.game.world.height - 128);
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
