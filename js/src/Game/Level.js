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

    Level.prototype.createBlock = function (
        platform, x, y, width, height, spriteName) {

            // Create block
            var block = this.game.add.tileSprite(
                x, y, width, height, spriteName, null, platform
            );

            // Make block immovable
            block.body.immovable = true;
        }

    Level.prototype.createPlatform = function(x, y, width, height, spriteName) {
        // Create a group
        var result = this.game.add.group();

        // Make block solid
        result.enableBody = true;

        // Create the block
        this.createBlock(
            result, x, y, width, height, spriteName
        )

        // Return the result :D
        return result;
    }

    Level.prototype.create = function() {
        // Create platforms
        this.dirtPlatform = this.createPlatform(0, this.game.world.height - 32,
            this.game.world.width, 32, this.main.grassBlock.spriteName);
        this.metalPlatform = this.createPlatform(0, this.game.world.height - 400,
            this.game.world.width - 400, 32, this.main.metalBlock.spriteName);
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
