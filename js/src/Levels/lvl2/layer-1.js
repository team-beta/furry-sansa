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
        this.game.add.sprite(50*tile, 2*tile, 'house');

        // Background trees
        this.game.add.sprite(29*tile, 14*tile, 'tree_bg');
        this.game.add.sprite(11*tile, 19*tile, 'tree_bg');



    }

    return Layer;
});
