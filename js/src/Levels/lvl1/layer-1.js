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
        this.game.add.sprite(23*tile, height - 5*tile, 'tree_group');
        this.game.add.sprite(10*tile, height - 5*tile, 'tree_group');
        this.game.add.sprite(8*tile, height - 20*tile, 'tree_group');

        // Add dancers
        this.dancers = []
        this.dancers[1] =  this.game.add.sprite(17*tile, height - 18*tile, 'dancer_blue');
        this.dancers[2] =  this.game.add.sprite(19*tile, height - 18*tile, 'dancer_red');
        this.dancers[3] =  this.game.add.sprite(21*tile, height - 18*tile, 'dancer_green');
        this.dancers[4] =  this.game.add.sprite(23*tile, height - 18*tile, 'dancer_orange');

        // Set animations for dancers
        this.dancers.forEach(function(dancer){
            dancer.frame = 2;
            dancer.animations.add('dance', [0,1,2,3,4,3,2,1], 10, true);
            dancer.animations.play('dance');
        })

        // Add background sprites
        this.game.add.sprite(0, height - 20*tile, 'crane');
        this.game.add.sprite(6*tile, height - 5*tile, 'tree_bg');
        this.game.add.sprite(8*tile, height - 20*tile, 'tree_bg');
        this.game.add.sprite(22*tile, height - 5*tile, 'rainbow');

    }

    return Layer;
});
