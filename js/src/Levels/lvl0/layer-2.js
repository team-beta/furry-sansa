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
        this.spawnMattress();
        this.API.createPlatform(14*tile, height - 19*tile, tile, 18*tile, this.main.specialBlock);
        this.API.createPlatform(35*tile, height - 19*tile, tile, 18*tile, this.main.specialBlock);
    }

    Layer.prototype.spawnMattress = function() {
        this.matras = this.game.add.sprite(37*32, this.game.world.height - 2*32, 'mattress');
        this.game.physics.enable(this.matras, Phaser.Physics.ARCADE);
        this.matras.body.velocity.x=-150;
        this.matras.body.immovable = true;
        this.matras.animations.add('jump', [1,0], 10, false);
    }

    Layer.prototype.update = function() {
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;

        if (this.matras.body.position.x < 14*tile) {
            this.spawnMattress();
        }

        this.robot.collide(this.matras, function() {
            this.robot.sprite.body.velocity.y = -800;
            this.main.sound_jump.play();
            this.matras.animations.play('jump');
        }, null, this)
    }

    return Layer;
});
