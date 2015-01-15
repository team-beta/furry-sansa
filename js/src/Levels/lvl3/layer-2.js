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

        // Flowers
        this.game.add.sprite(5*tile, 23*tile, 'flower_2');
        this.game.add.sprite(6*tile, 23*tile, 'flower_2');
        this.game.add.sprite(12*tile, 25*tile, 'flower_1');
        this.game.add.sprite(14*tile, 25*tile, 'flower_2');
        this.game.add.sprite(16*tile, 25*tile, 'flower_1');



        // Create grassy ground
        this.API.createPlatform(0, 25*tile, 10*tile, tile, this.main.grassBlock); // moved
        this.API.createPlatform(0, 26*tile, 10*tile, tile, this.main.dirtBlock); // moved
        this.API.createPlatform(0, 27*tile, 102*tile, 2*tile, this.main.dirtBlock);
        this.API.createPlatform(27*tile, 24*tile, 97*tile, tile, this.main.grassBlock);
        this.API.createPlatform(19*tile, 25*tile, 4*tile, 4*tile, this.main.dirtBlock);
        this.API.createPlatform(10*tile, 27*tile, 9*tile, tile, this.main.grassBlock);

        // Path up
        this.API.createPlatform(16*tile, 28*tile - 12*tile, 2*tile, tile, this.main.grassBlock);
        this.API.createPlatform(18*tile, 28*tile - 10*tile, 2*tile, tile, this.main.metalBlock);
        this.API.createPlatform(22*tile, 28*tile - 8*tile, 2*tile, tile, this.main.metalBlock);
        this.API.createPlatform(20*tile, 28*tile - 6*tile, 2*tile, tile, this.main.grassBlock);
        this.API.createPlatform(16*tile, 28*tile - 5*tile, tile, tile, this.main.grassBlock);

        // Create hill
        this.API.createPlatform(15*tile, 12*tile, 12*tile, tile, this.main.grassBlock);
        this.API.createPlatform(15*tile, 15*tile, tile, 10*tile, this.main.dirtBlock);
        this.API.createPlatform(26*tile, 13*tile, tile, 12*tile, this.main.dirtBlock);

        // Small block on the bottom-left
        // this.API.createPlatform(15*tile, 22*tile, tile, 3*tile, this.main.dirtBlock);

        // Create other hill
        this.API.createPlatform(47*tile, 12*tile, 12*tile, tile, this.main.grassBlock);
        this.API.createPlatform(47*tile, 13*tile, 12*tile, 12*tile, this.main.dirtBlock);

        this.API.createPlatform(79*tile, 14*tile, 30*tile, tile, this.main.grassBlock);
        this.API.createPlatform(79*tile, 15*tile, 30*tile, 14*tile, this.main.dirtBlock);

        // Create platforms
        this.API.createPlatform(10*tile, 24*tile, 5*tile, tile, this.main.woodBlock);


        // Create matras and conveyor belt
        this.API.createMattress(11*tile, 23*tile, function(){})
        this.API.createMattress(59*tile, 23*tile, function(){})
        this.API.createMattress(63*tile, 23*tile, function(){})
        this.API.createMattress(67*tile, 23*tile, function(){})
        this.API.createMattress(71*tile, 23*tile, function(){})
        this.API.createMattress(75*tile, 23*tile, function(){})

        this.API.createTracks(75*tile, 22*tile, 150);

        //Create blocks
        this.main.manager.create(17*tile, 3*tile, 2, 4, "block_1");
        this.main.manager.create(27*tile, 21*tile, 20, 2, "block_2");
        this.main.manager.create(79*tile, 13*tile, 4, 1, "block_3");
        this.main.manager.create(84*tile, 13*tile, 4, 1, "block_4");


        //Level end
        this.end = this.game.add.sprite(96*tile, 11*tile, 'end_level');
        this.end.alpha=0;
        this.game.physics.enable(this.end, Phaser.Physics.ARCADE);
    }

    Layer.prototype.update = function() {
        this.robot.collide(this.end, function() {
            this.main.changeLevel(99);
        }, null, this);
    }

    return Layer;
});
