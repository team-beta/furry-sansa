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
        this.API.createPlatform(0, 26*tile, 9*tile, tile, this.main.grassBlock);
        this.API.createPlatform(0, 27*tile, 102*tile, 2*tile, this.main.dirtBlock);
        this.API.createPlatform(16*tile, 24*tile, 102*tile, tile, this.main.grassBlock);
        this.API.createPlatform(16*tile, 25*tile, 102*tile, 4*tile, this.main.dirtBlock);
        this.API.createPlatform(9*tile, 27*tile, 6*tile, tile, this.main.grassBlock);

        // Create hills
        this.API.createPlatform(15*tile, 8*tile, 12*tile, tile, this.main.grassBlock);
        this.API.createPlatform(15*tile, 9*tile, 12*tile, 20*tile, this.main.dirtBlock);

        this.API.createPlatform(47*tile, 12*tile, 12*tile, tile, this.main.grassBlock);
        this.API.createPlatform(47*tile, 13*tile, 12*tile, 16*tile, this.main.dirtBlock);

        // Create platforms
        this.API.createPlatform(10*tile, 24*tile, 5*tile, tile, this.main.woodBlock);


        // Create matras
        this.API.createMattress(11*tile, 23*tile, function(){})

        //Create blocks
        this.main.manager.create(17*tile, 3*tile, 2, 5, "block_1");
        this.main.manager.create(27*tile, 21*tile, 20, 2, "block_2");

        this.end = this.game.add.sprite(96*tile, 21*tile, 'end_level');
        this.game.physics.enable(this.end, Phaser.Physics.ARCADE);
    }

    Layer.prototype.update = function() {
        this.robot.collide(this.end, function() {
            this.main.changeLevel(4);
        }, null, this);
    }

    return Layer;
});
