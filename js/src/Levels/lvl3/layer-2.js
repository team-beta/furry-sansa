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

        // Create left wall
        this.API.createPlatform(0, 0, 3*tile, 18*tile, this.main.fullMetalBlock);
        this.API.createPlatform(0, 23*tile, 4*tile, tile, this.main.metalBlock);
        this.API.createPlatform(0, 24*tile, 5*tile, tile, this.main.fullMetalBlock);
        this.API.createPlatform(0, 25*tile, 6*tile, 4*tile, this.main.fullMetalBlock);

        // Create grassy ground
        this.API.createPlatform(6*tile, 26*tile, 4*tile, tile, this.main.grassBlock);
        this.API.createPlatform(10*tile, 25*tile, tile, tile, this.main.grassBlock);
        this.API.createPlatform(11*tile, 24*tile, tile, tile, this.main.grassBlock);
        this.API.createPlatform(12*tile, 23*tile, 4*tile, tile, this.main.grassBlock);
        this.API.createPlatform(16*tile, 22*tile, 5*tile, tile, this.main.grassBlock);
        this.API.createPlatform(21*tile, 23*tile, 4*tile, tile, this.main.grassBlock);
        this.API.createPlatform(25*tile, 24*tile, tile, tile, this.main.grassBlock);
        this.API.createPlatform(26*tile, 25*tile, tile, tile, this.main.grassBlock);
        this.API.createPlatform(27*tile, 26*tile, 23*tile, tile, this.main.grassBlock);
        this.API.createPlatform(81*tile, 26*tile, 21*tile, tile, this.main.grassBlock);

        // Create left side house
        this.API.createPlatform(50*tile, 11*tile, tile, 14*tile, this.main.woodBlock);
        this.API.createPlatform(51*tile, 11*tile, tile, tile, this.main.woodBlock);
        this.API.createPlatform(51*tile, 18*tile, tile, tile, this.main.woodBlock);

        // Create bottom of house
        this.API.createPlatform(50*tile, 25*tile, 31*tile, 2*tile, this.main.woodBlock);
        this.API.createPlatform(61*tile, 24*tile, 7*tile, tile, this.main.woodBlock);
        this.API.createPlatform(61*tile, 23*tile, 2*tile, tile, this.main.woodBlock);
        this.API.createPlatform(61*tile, 22*tile, tile, tile, this.main.woodBlock);
        this.API.createPlatform(74*tile, 24*tile, 7*tile, tile, this.main.woodBlock);
        this.API.createPlatform(70*tile, 23*tile, tile, 2*tile, this.main.woodBlock);

        // Create right side of house
        this.API.createPlatform(79*tile, 11*tile, 2*tile, 13*tile, this.main.woodBlock);
        this.API.createPlatform(78*tile, 11*tile, tile, 6*tile, this.main.woodBlock);
        this.API.createPlatform(68*tile, 15*tile, 10*tile, tile, this.main.woodBlock);
        this.API.createPlatform(69*tile, 16*tile, 9*tile, tile, this.main.woodBlock);

        // Create roof of house
        this.API.createPlatform(50*tile, 7*tile, 31*tile, tile, this.main.woodBlock);
        this.API.createPlatform(51*tile, 6*tile, 29*tile, tile, this.main.woodBlock);
        this.API.createPlatform(52*tile, 5*tile, 27*tile, tile, this.main.woodBlock);
        this.API.createPlatform(53*tile, 4*tile, 25*tile, tile, this.main.woodBlock);
        this.API.createPlatform(54*tile, 3*tile, 23*tile, tile, this.main.woodBlock);
        this.API.createPlatform(55*tile, 2*tile, 21*tile, tile, this.main.woodBlock);

        // Create platforms inside house
        this.API.createPlatform(61*tile, 18*tile, 2*tile, tile, this.main.woodBlock);
        this.API.createPlatform(62*tile, 15*tile, tile, tile, this.main.woodBlock);
        this.API.createPlatform(65*tile, 19*tile, 2*tile, tile, this.main.woodBlock);

        // Create platforms outside house
        this.API.createPlatform(27*tile, 19*tile, tile, tile, this.main.grassBlock);
        this.API.createPlatform(28*tile, 18*tile, 4*tile, tile, this.main.grassBlock);
        this.API.createPlatform(32*tile, 19*tile, tile, tile, this.main.grassBlock);

        this.API.createPlatform(35*tile, 16*tile, tile, tile, this.main.grassBlock);
        this.API.createPlatform(36*tile, 15*tile, 4*tile, tile, this.main.grassBlock);
        this.API.createPlatform(40*tile, 16*tile, tile, tile, this.main.grassBlock);

        this.API.createPlatform(43*tile, 13*tile, tile, tile, this.main.grassBlock);
        this.API.createPlatform(44*tile, 12*tile, 4*tile, tile, this.main.grassBlock);
        this.API.createPlatform(48*tile, 13*tile, tile, tile, this.main.grassBlock);

        // Create middel part of house
        this.API.createPlatform(62*tile, 8*tile, tile, 4*tile, this.main.woodBlock);
        this.API.createPlatform(56*tile, 11*tile, 6*tile, tile, this.main.woodBlock);
        this.API.createPlatform(55*tile, 12*tile, 3*tile, tile, this.main.woodBlock);
        this.API.createPlatform(54*tile, 13*tile, 3*tile, tile, this.main.woodBlock);
        this.API.createPlatform(53*tile, 14*tile, 3*tile, tile, this.main.woodBlock);
        this.API.createPlatform(52*tile, 15*tile, 4*tile, tile, this.main.woodBlock);
        this.API.createPlatform(53*tile, 16*tile, 6*tile, 2*tile, this.main.woodBlock);
        this.API.createPlatform(53*tile, 18*tile, tile, 4*tile, this.main.woodBlock);
        this.API.createPlatform(52*tile, 21*tile, tile, tile, this.main.woodBlock);

        // Create matras
        this.API.createMattress(57*tile, (25*tile)-10, function(){})
        this.API.createMattress(71*tile, 24*tile, function(){})

        // Lower two layers dirt fill up
        this.API.createPlatform(6*tile, 27*tile, 96*tile, 2*tile, this.main.dirtBlock);
        this.API.createPlatform(10*tile, 26*tile, 17*tile, tile, this.main.dirtBlock);
        this.API.createPlatform(11*tile, 25*tile, 15*tile, tile, this.main.dirtBlock);
        this.API.createPlatform(12*tile, 24*tile, 13*tile, tile, this.main.dirtBlock);
        this.API.createPlatform(16*tile, 23*tile, 5*tile, tile, this.main.dirtBlock);

        // I made this block a non-gravity block, just for testing purposes.
        this.block_1 = this.main.manager.create(18*tile, 20*tile, 2, 2, "block_1");
        this.main.manager.enableFloating(this.block_1);

        this.main.manager.create(52*tile, 11*tile, 4, 1, "block_2");
        this.main.manager.create(68*tile, 20*tile, 2, 5, "block_3");
        this.main.manager.create(71*tile, 23*tile, 5, 1, "block_4");
        this.main.manager.create(69*tile, 12*tile, 3, 3, "block_5");
        this.main.manager.create(73*tile, 14*tile, 4, 1, "block_6");

        this.end = this.game.add.sprite(96*tile, height-6*tile+16, 'end_level');
        this.game.physics.enable(this.end, Phaser.Physics.ARCADE);
    }

    Layer.prototype.update = function() {
        this.robot.collide(this.end, function() {
            this.main.changeLevel(99);
        }, null, this);
    }

    return Layer;
});
