define([], function () {
    var Level = function(game, robot) {
        this.game = game;
        this.robot = robot;

        // Starting point in the air
        this.inAir = true;
    }

    Level.prototype.create = function() {
        this.platforms = this.game.add.group();

        // load platforms
        this.platforms.enableBody = true;

        // create the ground
        var ground = this.game.add.tileSprite(0, this.game.world.height - 32, this.game.world.width, 32, 'grass_block', null, this.platforms);
        ground.body.immovable = true;

        // create other platforms
        var ledge = this.game.add.tileSprite(32, 12*32, 10*32, 32, 'grass_block', null, this.platforms);
        ledge.body.immovable = true;
        // TODO: load this from a file instead

    }

    Level.prototype.update = function() {
        this.game.physics.arcade.collide(this.robot, this.platforms, function() {
            // The player is landing
            if (this.inAir){
                this.game.sound_land.play('', 0, 5, false, false);
            }
        }, null, this)

        // Determine whether the robot is in air.
        if (this.robot.body.touching.down) {
            this.inAir = false;
        } else {
            this.inAir = true;
        }
    }

    return Level;
});
