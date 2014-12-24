define([], function () {
    var Level = function(main) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;

        this.airStatus = {
            'inAir': true,
        }

        this.collisionBlocks = []
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
            if (level.airStatus[block.blockName] && Math.abs(level.robot.sprite.body.velocity.x) > 0) {
                block.walk.play('', 0, 5, false, false);
            }
        }

        this.collisionBlocks.push(result);

        return result;
    }

    Level.prototype.create = function() {
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;

        // Create platforms
        this.createPlatform(0, height - tile, width, tile, this.main.grassBlock);
        this.createPlatform(width - 16*tile, height - 14*tile, 2*tile, tile, this.main.grassBlock);

        // Path down
        this.createPlatform(width - 12*tile, height - 12*tile, 2*tile, tile, this.main.grassBlock);
        this.createPlatform(width - 14*tile, height - 10*tile, 2*tile, tile, this.main.metalBlock);
        this.createPlatform(width - 18*tile, height - 8*tile, 2*tile, tile, this.main.metalBlock);

        this.createPlatform(width - 14*tile, height - 6*tile, 2*tile, tile, this.main.grassBlock);
        this.createPlatform(width - 12*tile, height - 4*tile, 2*tile, tile, this.main.metalBlock);
        this.createPlatform(width - 8*tile, height - 2*tile, 2*tile, tile, this.main.grassBlock);

        this.createPlatform(0, height - 16*tile, width - 16*tile, tile, this.main.metalBlock);

        // Add sprites
        this.game.add.sprite(0, height - 20*tile, 'crane');
        this.game.add.sprite(6*tile, height - 5*tile, 'tree');
        this.game.add.sprite(5*tile, height - 20*tile, 'tree');
        this.game.add.sprite(8*tile, height - 20*tile, 'tree');
        this.game.add.sprite(11*tile, height - 20*tile, 'tree');
        this.game.add.sprite(22*tile, height - 5*tile, 'rainbow')
        // Add solid objects
        this.walls = this.game.add.group();
        this.walls.enableBody = true;
        this.game.add.sprite(width - 4*tile, height - 5*tile, 'building_1', 0, this.walls);
        this.game.add.sprite(4*tile, height - 5*tile, 'building_1', 0, this.walls)
        this.game.add.sprite(10*tile, height - 5*tile, 'building_3', 0, this.walls)
        this.game.add.sprite(9*tile, height - 9*tile, 'building_2', 0, this.walls)
        this.game.add.sprite(25*tile, height - 5*tile, 'building_3', 0, this.walls)
        this.walls.setAll('body.immovable', true);
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
        // Determine collision for all platforms.
        var level = this;
        this.collisionBlocks.forEach(function(elem){
            level.robot.collide(elem, function() {
                elem.land();
                elem.walk();
            }, null, this)
        })

        level.robot.collide(this.walls, function() {
            console.log("collision!")
        }, null, this)

        // Determine whether the robot is in air.
        if (!this.robot.sprite.body.touching.down) {
            this.setAirStatus("inAir");
        }
    }

    return Level;
});
