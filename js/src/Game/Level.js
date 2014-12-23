define([], function () {
    var Level = function(main) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;

        this.airStatus = {
            'inAir': true,
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

    Level.prototype.createPlatform = function(x, y, width, height, block) {
        var level = this;

        // Create a group
        var result = this.game.add.group();

        // Make block solid
        result.enableBody = true;

        // Create the block
        this.createBlock(
            result, x, y, width, height, block.blockName
        )

        // Add landing sound
        result.land = function() {
            if (level.airStatus.inAir){
                block.land.play('', 0, 5, false, false);
            }
            level.setAirStatus(block.blockName);
        }

        // Add walking sound
        result.walk = function() {
            if (level.airStatus[block.blockName]) {
                block.walk.play('', 0, 5, false, false);
            }
        }

        return result;
    }

    Level.prototype.create = function() {
        // Create platforms
        this.dirtPlatform = this.createPlatform(0, this.game.world.height - 32,
            this.game.world.width, 32, this.main.grassBlock);
        this.metalPlatform = this.createPlatform(0, this.game.world.height - 400,
            this.game.world.width - 400, 32, this.main.metalBlock);
    }

    Level.prototype.setAirStatus = function(position) {
        var airStatus = this.airStatus

        // Automatically add new air-statusses.
        if (!(position in airStatus)) {
            airStatus[position] = false;
        }

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
            this.metalPlatform.land()
        }, null, this)

        this.robot.collide(this.dirtPlatform, function() {
            this.dirtPlatform.land()
        }, null, this)

        // Determine whether the robot is in air.
        if (!this.robot.sprite.body.touching.down) {
            this.setAirStatus("inAir");
        }
    }

    return Level;
});
