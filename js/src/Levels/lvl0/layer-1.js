define([], function () {
    var Layer = function(main, level) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;
        this.level = level;
    }

    Layer.prototype.create = function() {
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;
        this.level.room = this.game.add.sprite(15*tile, height - 19*tile, 'factory_room');
        this.level.room.animations.add('blink', [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 0, 3, 3, 3, 3, 3, 2, 1, 2, 2], 20, true);
        this.level.room.animations.add('blinky', [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], 3, true);
        this.level.room.animations.add('blink_once', [0,1], 8, true);
        this.level.room.animations.play('blinky');

    }

    return Layer;
});
