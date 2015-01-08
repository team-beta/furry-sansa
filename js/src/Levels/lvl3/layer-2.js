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
