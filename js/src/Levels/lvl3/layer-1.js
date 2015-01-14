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
        this.game.add.sprite(59*tile, 22*tile, 'tree_group');

        // Add dancers
        this.dancers = []
        this.dancers[1] =  this.game.add.sprite(49*tile, 10*tile, 'dancer_blue');
        this.dancers[2] =  this.game.add.sprite(51*tile, 10*tile, 'dancer_red');
        this.dancers[3] =  this.game.add.sprite(53*tile, 10*tile, 'dancer_green');
        this.dancers[4] =  this.game.add.sprite(55*tile, 10*tile, 'dancer_orange');

        // Set animations for dancers
        this.dancers.forEach(function(dancer){
          dancer.frame = 2;
          dancer.animations.add('dance', [0,1,2,3,4,3,2,1], 10, true);
          dancer.animations.play('dance');
        })

        // Hollow hill
        this.game.add.tileSprite(15*tile, 12*tile, 12*tile, 15*tile, "dirt_block_dark");
        this.game.add.tileSprite(10*tile, 25*tile, 5*tile, 2*tile, "dirt_block_dark");
    }

    return Layer;
});
