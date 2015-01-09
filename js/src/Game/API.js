define([], function () {
    var API = function(main) {
        this.main = main;
        this.game = main.game;

        // A group to add building and stuff to.
        this.solid = this.game.add.group();
        this.solid.enableBody = true;

        // Dust particle
        this.emitter = this.game.add.emitter(0, 0, 1500);
        this.emitter.makeParticles('particle_dust', [0,1,2,3], 1500, true, true);
        this.emitter.gravity = 200;
        this.emitter.width = 32;

        // Intensity for screenshake
        this.intensity = 0;

        // Dictionary for air status
        this.airStatus = {
            'inAir': true,
        }

        // List of collision blocks
        this.collisionBlocks = []

        // Snowflake settings
        this.max = 0;
        this.front_emitter;
        this.mid_emitter;
        this.back_emitter;
        this.update_interval = 4 * 60;
        this.i = 0;
        if (this.main.settings.snowflake) {
            this.snowflake()
        }
    }

    API.prototype.snowflake = function() {
        this.back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
        this.back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
        this.back_emitter.maxParticleScale = 0.6;
        this.back_emitter.minParticleScale = 0.2;
        this.back_emitter.setYSpeed(20, 100);
        this.back_emitter.gravity = 0;
        this.back_emitter.width = this.game.world.width * 1.5;
        this.back_emitter.minRotation = 0;
        this.back_emitter.maxRotation = 40;

        this.mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
        this.mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
        this.mid_emitter.maxParticleScale = 1.2;
        this.mid_emitter.minParticleScale = 0.8;
        this.mid_emitter.setYSpeed(50, 150);
        this.mid_emitter.gravity = 0;
        this.mid_emitter.width = this.game.world.width * 1.5;
        this.mid_emitter.minRotation = 0;
        this.mid_emitter.maxRotation = 40;

        this.front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
        this.front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
        this.front_emitter.maxParticleScale = 1;
        this.front_emitter.minParticleScale = 0.5;
        this.front_emitter.setYSpeed(100, 200);
        this.front_emitter.gravity = 0;
        this.front_emitter.width = this.game.world.width * 1.5;
        this.front_emitter.minRotation = 0;
        this.front_emitter.maxRotation = 40;

        this.changeWindDirection();

        this.back_emitter.start(false, 14000, 20);
        this.mid_emitter.start(false, 12000, 40);
        this.front_emitter.start(false, 6000, 1000);

    }

    API.prototype.changeWindDirection = function() {

        var multi = Math.floor((this.max + 200) / 4),
            frag = (Math.floor(Math.random() * 100) - multi);
        this.max = this.max + frag;

        if (this.max > 200) this.max = 150;
        if (this.max < -200) this.max = -150;

        this.setXSpeed(this.back_emitter, this.max);
        this.setXSpeed(this.mid_emitter, this.max);
        this.setXSpeed(this.front_emitter, this.max);

    }

    API.prototype.setXSpeed = function(emitter, max) {

        emitter.setXSpeed(this.max - 20, this.max);
        emitter.forEachAlive(this.setParticleXSpeed, this, this.max);

    }

    API.prototype.setParticleXSpeed = function(particle, max) {

        particle.body.velocity.x = max - Math.floor(Math.random() * 30);

    }

    API.prototype.screenshake = function(target, shakes) {
        var shake = 200;

        $(target).removeClass("shake");
        $(target).addClass("shake");
        setTimeout(function(){
            $(target).removeClass("shake");
        }, shake * shakes);
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

    API.prototype.makeDust = function () {
        var API = this;

        API.emitter.x = API.main.robot.sprite.x + API.main.robot.sprite.width /2;
        if (API.main.robot.sprite.body.touching.down) {
            API.emitter.y = API.main.robot.sprite.y + API.main.robot.sprite.height;
            API.emitter.start(true, 500, null, 15);
        } else if (API.main.robot.sprite.body.touching.up) {
            API.emitter.y = API.main.robot.sprite.y;
            API.emitter.start(true, 500, null, 15);
        }
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
        result.land = function(intensity) {
            if (API.airStatus.inAir){
                block.land.play('', 0, 5, false, false);
                var factor = Math.pow(intensity/500, 3);
                API.screenshake("canvas", 0.1 * factor);
                API.makeDust();
            }
            API.setAirStatus(block.blockName);
        }

        // Add walking sound
        result.walk = function() {
            if (API.airStatus[block.blockName] && Math.abs(API.main.robot.sprite.body.velocity.x) > 0) {
                block.walk.play('', 0, 5, false, false);
            }
        }

        this.collisionBlocks.push(result);

        // Add result group to the platform group
        this.main.platformGroup.add(result);

        return result;
    }

    API.prototype.create = function() {
        API.emitter.start(true, 2000, null, 15);
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

    API.prototype.update = function() {
        var api = this;

        // Determine collision for all platforms.
        api.collisionBlocks.forEach(function(elem){
            api.game.physics.arcade.collide(api.main.controlBlocks, elem, function() {

            }, null, this)
            api.main.robot.collide(elem, function() {
                elem.land(api.intensity);
                elem.walk();
            }, null, this)
        })

        // Fade out particles
        api.emitter.forEachAlive(function(p){
            p.alpha= p.lifespan / api.emitter.lifespan;
        });

        // Collision with solid objects
        api.main.robot.collide(this.solid, function() {
            if (api.airStatus.inAir){
                this.main.sound_land_concrete.play('', 0, 5, false, false);
                api.screenshake("canvas", 0.1);
                api.makeDust();
            }
            api.setAirStatus("solid");

            if (api.airStatus['solid'] && Math.abs(api.main.robot.sprite.body.velocity.x) > 0) {
                this.main.sound_walk_concrete.play('', 0, 5, false, false);
            }
        }, null, this)

        // Collision with controllable blocks
        this.main.manager.update()

        // Emit some dust particles when walking.
        if (Math.abs(api.main.robot.sprite.body.velocity.x) > 0 && api.main.robot.sprite.body.touching.down) {
            api.emitter.x = api.main.robot.sprite.x + api.main.robot.sprite.width /2;
            api.emitter.y = api.main.robot.sprite.y + api.main.robot.sprite.height;
            api.emitter.start(true, 500, null, 15);
        }

        // Determine whether the robot is in air.
        if (!api.main.robot.sprite.body.touching.down) {
            api.setAirStatus("inAir");
        }

        api.intensity = api.main.robot.sprite.body.velocity.y;
    }

    return API;
});
