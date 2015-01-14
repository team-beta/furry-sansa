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


        // Create grassy ground
        this.API.createPlatform(0, 26*tile, 102*tile, tile, this.main.grassBlock);
        this.API.createPlatform(0, 27*tile, 102*tile, 2*tile, this.main.dirtBlock);


        // Create matras
        this.API.createMattress(57*tile, (25*tile)-10, function(){})
        this.API.createMattress(71*tile, 24*tile, function(){})

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
            this.main.changeLevel(4);
        }, null, this);
    }

    return Layer;
});
