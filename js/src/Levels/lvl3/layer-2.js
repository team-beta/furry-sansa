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
        this.API.createPlatform(70*tile, 24*tile, 11*tile, tile, this.main.woodBlock);
        this.API.createPlatform(70*tile, 23*tile, tile, tile, this.main.woodBlock);

        // Create right side of house
        this.API.createPlatform(79*tile, 11*tile, 2*tile, 13*tile, this.main.woodBlock);
        this.API.createPlatform(78*tile, 11*tile, tile, 6*tile, this.main.woodBlock);
        this.API.createPlatform(68*tile, 15*tile, 10*tile, tile, this.main.woodBlock);
        this.API.createPlatform(69*tile, 16*tile, 9*tile, tile, this.main.woodBlock);



        // Add interactable blocks
        //this.block = new iBlock(this.main);

        //this.block.make("block", 30*tile, height - 19*tile, 3, 3, "block_1");
        //this.block.make("block", 15*tile, height - 17*tile, 1, 1, "block_2");

        new Block(this.main, "block_1").create(15*tile, height - 17*tile, 1, 1);
        new Block(this.main, "block_2").create(30*tile, height - 19*tile, 3, 3);
    }

    Layer.prototype.update = function() {

    }

    return Layer;
});