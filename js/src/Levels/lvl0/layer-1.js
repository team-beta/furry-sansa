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

        this.level.glitch1 = this.game.add.sprite(35*tile, height - 10*32, 'glitch');
        this.level.glitch1.animations.add('start', [1,0,0,0], 6, true);
        this.level.glitch1.animations.play('start');

        this.level.glitch2 = this.game.add.sprite(39*tile, height - 10*32, 'glitch');
        this.level.glitch2.animations.add('start', [0,1,0,0], 6, true);
        this.level.glitch2.animations.play('start');

        this.level.glitch3 = this.game.add.sprite(43*tile, height - 10*32, 'glitch');
        this.level.glitch3.animations.add('start', [0,0,1,0], 6, true);
        this.level.glitch3.animations.play('start');

        this.level.glitch4 = this.game.add.sprite(47*tile, height - 10*32, 'glitch');
        this.level.glitch4.animations.add('start', [0,0,0,1], 6, true);
        this.level.glitch4.animations.play('start');

        this.level.glitch1.alpha = 0;
        this.level.glitch2.alpha = 0;
        this.level.glitch3.alpha = 0;
        this.level.glitch4.alpha = 0;

        window.levelGlitch = this.level;
    }

    return Layer;
});
