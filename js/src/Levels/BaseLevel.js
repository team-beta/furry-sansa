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
        console.log("API started")

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
        switch (subject) {
            case 'world':
                return "This is world object, the common root of all objects in the game. Every object has methods and sub-objects. For example, world.mute() is a method that applies to the world object.\n"
                    + "world.mute() mutes the world music, while world.play() plays the world music. \n"
                    + "The world also has sub-classes. You can manipulate two of them:\n"
                    + "world.robot - the robot object. Use help('robot') to learn more about yourself. \n"
                    + "world.blocks - special blocks that can be manipulated. Use help('blocks') to learn more about blocks. \n"
            case 'blocks':
                    return "This is the blocks object. Use world.listBlocks() to get a list of all blocks that can be manipulated."
            case 'robot':
                        return "This is you! Use world.robot.dance() to dance and world.robot.stopDancing() to stop. Later in the game, we will reveal more features."
        }
        return "Who's calling for help? Wait... I did not know robots had access to the program?! Well, since you are already here, I suppose you are authorized... \n"
            + "Take this. It is the world object. Handle it with care, for it gives you the control over the entire world! Use help('world') to learn more about the world! \n"
    }


    return BaseLevel;
});
