define([], function () {
    var API = function(main) {
        this.main = main;
        this.game = main.game;

        this.solid = this.game.add.group();
        this.solid.enableBody = true;

        this.airStatus = {
            'inAir': true,
        }

        this.collisionBlocks = []
    }

    API.prototype.addSolid = function (width, height, sprite) {
        this.game.add.sprite(width, height, sprite, 5, this.solid);
        this.solid.setAll('body.immovable', true);
    }

    API.prototype.createBlock = function (
        platform, x, y, width, height, spriteName) {

            // Create block
            var block = this.game.add.tileSprite(
                x, y, width, height, spriteName, null, platform
            );

            // Make block immovable
            block.body.immovable = true;
        }

    API.prototype.createPlatform = function(x, y, width, height, block) {
        var API = this;

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
            if (API.airStatus.inAir){
                block.land.play('', 0, 5, false, false);
            }
            API.setAirStatus(block.blockName);
        }

        // Add walking sound
        result.walk = function() {
            if (API.airStatus[block.blockName] && Math.abs(API.robot.sprite.body.velocity.x) > 0) {
                block.walk.play('', 0, 5, false, false);
            }
        }

        this.collisionBlocks.push(result);

        return result;
    }

    API.prototype.create = function() {

    }

    API.prototype.setAirStatus = function(position) {
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

    API.prototype.update = function(api) {
        // Determine collision for all platforms.
        api.collisionBlocks.forEach(function(elem){
            api.robot.collide(elem, function() {
                elem.land();
                elem.walk();
            }, null, this)
        })

        api.robot.collide(this.solid, function() {

        }, null, this)

        // Determine whether the robot is in air.
        if (!api.robot.sprite.body.touching.down) {
            api.setAirStatus("inAir");
        }
    }

    return API;
});
