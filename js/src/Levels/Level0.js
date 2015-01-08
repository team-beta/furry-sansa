define(['Levels/BaseLevel', 'Levels/lvl0/layer-1', 'Levels/lvl0/layer-2', 'Game/Robot'],
        function(BaseLevel, layer1, layer2, Robot) {
    var Level = function(main) {
        this.init(main);
    }
    Level.prototype = new BaseLevel();

    Level.prototype.loadSettings = function() {
        this.settings.setWorldBounds(0, 0, 1620, 920);
        this.settings.playMusic('music_thinking-back');
    }

    Level.prototype.createBackgroundLayer = function() {
        this.bgLayer = new layer1(this.main, this);
        this.bgLayer.create();
        console.log('test');
    }

    Level.prototype.createRobot = function() {
        this.main.robot = new Robot(this.main, 17*32, this.game.world.height - 128);
    }

    Level.prototype.createForegroundLayer = function() {
        this.fgLayer = new layer2(this.main)
        this.fgLayer.create();
    }

    Level.prototype.update = function() {
        this.fgLayer.update();
    }

    return Level;
});
