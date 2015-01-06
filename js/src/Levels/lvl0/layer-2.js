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
        this.API.createPlatform(0, height - 1*tile, width, tile, this.main.metalBlock);
        this.game.add.sprite(15*tile, height - 15*tile, 'lamp');
        this.game.add.sprite(15*tile, height - 2*tile, 'matras');
    }

    Layer.prototype.update = function() {

    }

    return Layer;
});
