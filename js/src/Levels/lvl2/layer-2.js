define(["Game/Block"], function (Block) {
    var Layer = function(main) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;
        this.API = main.api;
        this.library = main.library;
    }

    Layer.prototype.create = function() {
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;

        // Create ceiling and walls
        this.API.createPlatform(0,0, width, 2*tile, this.main.fullMetalBlock);
        this.API.createPlatform(0,2*tile, 3*tile, 18*tile, this.main.fullMetalBlock);
        this.API.createPlatform(0,26*tile, width, 3*tile, this.main.fullMetalBlock);

        // Create weird wall on the left
        this.API.createPlatform(3*tile, 8*tile, tile, 12*tile, this.main.fullMetalBlock);
        this.API.createPlatform(4*tile, 8*tile, tile, 11*tile, this.main.fullMetalBlock);
        this.API.createPlatform(5*tile, 8*tile, tile, 10*tile, this.main.fullMetalBlock);
        this.API.createPlatform(6*tile, 9*tile, tile, 8*tile, this.main.fullMetalBlock);
        this.API.createPlatform(7*tile, 10*tile, tile, 7*tile, this.main.fullMetalBlock);
        this.API.createPlatform(8*tile, 11*tile, tile, 5*tile, this.main.fullMetalBlock);
        this.API.createPlatform(9*tile, 12*tile, tile, 4*tile, this.main.fullMetalBlock);
        this.API.createPlatform(10*tile, 13*tile, 8*tile, 2*tile, this.main.fullMetalBlock);

        // Create weird wall on the right
        this.API.createPlatform(18*tile, 22*tile, 33*tile, 4*tile, this.main.fullMetalBlock);
        this.API.createPlatform(23*tile, 21*tile, 28*tile, tile, this.main.fullMetalBlock);
        this.API.createPlatform(24*tile, 20*tile, 27*tile, tile, this.main.fullMetalBlock);
        this.API.createPlatform(25*tile, 19*tile, 26*tile, tile, this.main.fullMetalBlock);
        this.API.createPlatform(26*tile, 18*tile, 25*tile, tile, this.main.fullMetalBlock);
        this.API.createPlatform(27*tile, 17*tile, 24*tile, tile, this.main.fullMetalBlock);
        this.API.createPlatform(28*tile, 10*tile, 23*tile, 7*tile, this.main.fullMetalBlock);
        this.API.createPlatform(27*tile, 8*tile, 24*tile, 2*tile, this.main.fullMetalBlock);
        this.API.createPlatform(32*tile, 7*tile, 3*tile, tile, this.main.metalBlock);
        this.API.createPlatform(43*tile, 7*tile, 3*tile, tile, this.main.metalBlock);

        // Create platforms
        this.API.createPlatform(9*tile, 6*tile, 3*tile, tile, this.main.metalBlock);
        this.API.createPlatform(15*tile, 6*tile, 3*tile, tile, this.main.metalBlock);
        this.API.createPlatform(22*tile, 7*tile, 2*tile, tile, this.main.metalBlock);
        this.API.createPlatform(21*tile, 15*tile, 3*tile, tile, this.main.metalBlock);

        // Create walkways on blocks
        this.API.createPlatform(0, 26*tile, 18*tile, tile, this.main.metalBlock);
        this.API.createPlatform(18*tile, 22*tile, 5*tile, tile, this.main.metalBlock);
        this.API.createPlatform(23*tile, 21*tile, tile, tile, this.main.metalBlock);
        this.API.createPlatform(24*tile, 20*tile, tile, tile, this.main.metalBlock);
        this.API.createPlatform(25*tile, 19*tile, tile, tile, this.main.metalBlock);
        this.API.createPlatform(26*tile, 18*tile, tile, tile, this.main.metalBlock);
        this.API.createPlatform(27*tile, 17*tile, tile, tile, this.main.metalBlock);
        this.API.createPlatform(27*tile, 8*tile, 5*tile, tile, this.main.metalBlock);
        this.API.createPlatform(35*tile, 8*tile, 8*tile, tile, this.main.metalBlock);
        this.API.createPlatform(46*tile, 8*tile, 5*tile, tile, this.main.metalBlock);
        this.API.createPlatform(3*tile, 8*tile, 3*tile, tile, this.main.metalBlock);
        this.API.createPlatform(6*tile, 9*tile, tile, tile, this.main.metalBlock);
        this.API.createPlatform(7*tile, 10*tile, tile, tile, this.main.metalBlock);
        this.API.createPlatform(8*tile, 11*tile, tile, tile, this.main.metalBlock);
        this.API.createPlatform(9*tile, 12*tile, tile, tile, this.main.metalBlock);
        this.API.createPlatform(10*tile, 13*tile, 8*tile, tile, this.main.metalBlock);

        // Create matras
        this.API.createMattress(14*tile, 25*tile, function(){})

        // Add interactable blocks
        this.main.manager.create(18*tile, 17*tile, 2, 5, "block_1");
        this.main.manager.create(37*tile, 4*tile, 4, 4, "block_2");

        this.end = this.game.add.sprite(48*tile, height-24*tile + 16, 'end_level');
        this.game.physics.enable(this.end, Phaser.Physics.ARCADE);
    }

    Layer.prototype.update = function() {
        this.robot.collide(this.end, function() {
            this.main.changeLevel(3);
        }, null, this);
    }

    return Layer;
});
