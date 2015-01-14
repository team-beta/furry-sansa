define(['Game/API', 'Game/BlockManager'], function(API, BlockManager) {
    var BaseLevel = function() {}
    BaseLevel.prototype.init = function(main) {
        this.main = main;
        this.api = main.api;
        this.settings = main.settings;
        this.library = main.library;
        this.game = main.game;
        this.bg = null;

        // create and apply settings
        this.loadSettings();
        this.createBackgroundLayer();
        this.createRobot();

        // Start the API
        this.main.api = new API(main);
        // console.log("API started")

        // Start the BlockManager
        this.main.manager = new BlockManager(main);

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
        this.settings.destroy();
    }

    BaseLevel.prototype.update = function() {
        console.log('Implement the BaseLevel.update() method');
    }

    BaseLevel.prototype.help = function(subject) {
        return "Nope, not working";
    }


    return BaseLevel;
});
