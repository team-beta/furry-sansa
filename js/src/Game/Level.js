define([], function () {
    var Level = function(main) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;

        this.airStatus = {
            'inAir': true,
            'onMetal': false,
            'onDirt': false,
        }
    }

    Level.prototype.create = function() {
        // this.platforms = this.game.add.group();
        //
        // // load platforms
        // this.platforms.enableBody = true;

        // create the ground
        this.metalPlatform = this.game.add.group();
        this.metalPlatform.enableBody = true;
        var metal = this.game.add.tileSprite(0, this.game.world.height - 32, this.game.world.width, 32, this.main.metalBlock.spriteName, null, this.metalPlatform);
        metal.body.immovable = true;

        // create other platforms
        this.dirtPlatform = this.game.add.group();
        this.dirtPlatform.enableBody = true;
        var dirt = this.game.add.tileSprite(0, this.game.world.height - 400, this.game.world.width - 400, 32, this.main.grassBlock.spriteName, null, this.dirtPlatform);
        dirt.body.immovable = true;

        // TODO: load this from a file instead

        // solid/unsolid block
        // this.block = this.game.add.sprite(8* 32, 22*32, 'solid_block', null, this.platforms);
        // this.block.body.immovable = false;
    }

    Level.prototype.setAirStatus = function(position) {
        var airStatus = this.airStatus
        Object.keys(this.airStatus).forEach(function (key) {
            if (key == position) {
                airStatus[key] = true;
            } else {
                airStatus[key] = false;
            }
        })
    }

    Level.prototype.update = function() {
        this.robot.collide(this.metalPlatform, function() {
            // The player is landing
            if (this.airStatus.inAir){
                this.main.metalBlock.land.play('', 0, 5, false, false);
            }

            this.setAirStatus("onMetal");
        }, null, this)

        this.robot.collide(this.dirtPlatform, function(){

            if (this.airStatus.inAir){
                this.main.grassBlock.land.play('', 0, 5, false, false);
            }
            this.setAirStatus("onDirt");
        }, null, this)

        // Determine whether the robot is in air.
        if (!this.robot.sprite.body.touching.down) {
            this.setAirStatus("inAir");
        }
    }

    return Level;
});
