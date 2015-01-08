define(['Game/API'], function(API) {
    var BaseLevel = function(main) {
        this.main = main;
        this.api = main.api;
        this.library = main.library;
        this.game = main.game;
        this.bg = null;

        // create and apply settings
        this.loadSettings();
        this.createBackgroundLayer();
        this.createRobot();

        this.main.api = new API(this.main);

        this.main.graphics = this.game.add.graphics(0, 0);

        this.createForegroundLayer();

        this.main.library.robot = this.main.robot;

    }

    BaseLevel.prototype.loadSettings = function() {
        console.log('Implement the BaseLevel.loadSettings() method');
    }

    BaseLevel.prototype.createBackgroundLayer = function() {
        console.log('Implement the BaseLevel.createBackgroundLayer() method');
    }

    BaseLevel.prototype.createRobot = function() {
        console.log('Implement the BaseLevel.createRobot() method');
    }

    BaseLevel.prototype.createForegroundLayer = function() {
        console.log('Implement the BaseLevel.createForegroundLayer() method');
    }

    BaseLevel.prototype.destroy = function() {
        console.log('Implement the BaseLevel.destroy() method');
    }

    BaseLevel.prototype.update = function() {
        console.log('Implement the BaseLevel.update() method');
    }


    return BaseLevel;
});
