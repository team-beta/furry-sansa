define(['Levels/BaseLevel', 'Levels/lvl0/layer-1', 'Levels/lvl0/layer-2', 'Game/Robot'],
        function(BaseLevel, layer1, layer2, Robot) {
    var Level = function(main) {
        this.init(main);
    }
    Level.prototype = new BaseLevel();

    Level.prototype.loadSettings = function() {
        this.settings.setWorldBounds(0, 0, 1620, 920);
        this.settings.playMusic('music_thinking-back');
        this.settings.drawBackground('metal_block_dark', false);
    }

    Level.prototype.createBackgroundLayer = function() {
        this.bgLayer = new layer1(this.main, this);
        this.bgLayer.create();
    }

    Level.prototype.createRobot = function() {
        this.main.robot = new Robot(this.main, 25*32, this.game.world.height - 128);
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

    Level.prototype.help = function(subject) {
        world.blocks.block_1.setSolidity(false);
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
        return "Who's calling for help? Wait... I did not know testing robots had access to the program?! Well, since you are already here, I suppose you are authorized... \n"
            + "I am the Main Inteligence Program of this Testing facility. But you can call me MIP. Whenever you need my help, just type help().   \n"
            + "Let me start by getting you out of here, I might be albe to make a piece of the the wall unsolid. There, you are free! Good luck out there! \n"
    }

    return Level;
});
