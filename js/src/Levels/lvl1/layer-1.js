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
      this.dancer1 =  this.game.add.sprite(17*tile, height - 18*tile, 'dancer');
      this.dancer2 =  this.game.add.sprite(19*tile, height - 18*tile, 'dancer');
      this.dancer3 =  this.game.add.sprite(21*tile, height - 18*tile, 'dancer');
        this.game.add.sprite(0, height - 20*tile, 'crane');
        this.game.add.sprite(6*tile, height - 5*tile, 'tree_bg');
        this.game.add.sprite(8*tile, height - 20*tile, 'tree_bg');
        this.game.add.sprite(22*tile, height - 5*tile, 'rainbow');

        // Animate sprites

        //dancing robots [pretty sure this is not a nice way of doing it ;D]
        this.dancer1.frame = 2;
        this.dancer1.animations.add('dance', [0,1,2,3,4,3,2,1], 10, true);
        this.dancer1.animations.play('dance');

        this.dancer2.frame = 2;
        this.dancer2.animations.add('dance2', [2,3,4,3,2,1,0,1], 10, true);
        this.dancer2.animations.play('dance2');

        this.dancer3.frame = 2;
        this.dancer3.animations.add('dance', [0,1,2,3,4,3,2,1], 10, true);
        this.dancer3.animations.play('dance');

    }

    return Layer;
});
