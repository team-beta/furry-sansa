define([], function () {
    var Level = function(main) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;

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

        // solid/unsolid block
        this.block = this.game.add.sprite(8* 32, 22*32, 'solid_block', null, this.platforms);
        this.block.body.immovable = false;
    }

    Level.prototype.update = function() {
        this.robot.collide(this.platforms, function() {
            // The player is landing
            if (this.inAir){
                this.main.sound_land_dirt.play('', 0, 5, false, false);
            }
        }, null, this)

        // Determine whether the robot is in air.
        if (this.robot.sprite.body.touching.down) {
            this.block.frame = 1;
            this.inAir = false;
        } else {
            this.block.frame = 0;
            this.inAir = true;
        }
    }

    return Level;
});
