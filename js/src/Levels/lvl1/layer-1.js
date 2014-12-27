define([], function () {
    var Layer = function(main) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;
    }

    Layer.prototype.create = function() {
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;

        // Add sprites
        this.game.add.sprite(0, height - 20*tile, 'crane');
        this.game.add.sprite(6*tile, height - 5*tile, 'tree_bg');
        this.game.add.sprite(8*tile, height - 20*tile, 'tree_bg');
        this.game.add.sprite(22*tile, height - 5*tile, 'rainbow')
    }

    return Layer;
});
