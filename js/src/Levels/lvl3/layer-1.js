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

        // Treegroups
        this.game.add.sprite(33*tile, 22*tile, 'tree_group');

        // Kevin's house sprite
         this.game.add.sprite(46.2*tile, -8*tile, 'kevin_house');


    }

    return Layer;
});
