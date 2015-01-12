define(['Game/Object'], function (GameObject) {
    var Robot = function(main, x, y) {
        this._base = GameObject;
        this._base(main);

        this.sprite = this.game.add.sprite(x, y, 'robots');
        this.sprite.frame = 4;

        // add the animations
        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
        this.sprite.animations.add('up', [9], 10, true);
        this.sprite.animations.add('left_jump', [10], 10, true);
        this.sprite.animations.add('left_jetpack', [12], 10, true);
        this.sprite.animations.add('right_jetpack', [14], 10, true);
        this.sprite.animations.add('right_jump', [11], 10, true);
        this.sprite.animations.add('dance', [10,10,4,4,11,11,4,4], 10, true);


        // enable physics
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = 1500;
        this.sprite.body.collideWorldBounds = true;

        this.dancing = false;
        this.conveyorBelt = false;
        this.conveyorBeltSpeed = 0;

        this.highJump = false;
        this.jetPack = false;

        // Jetpack emitter
        this.emitter = this.game.add.emitter(0, 0, 1500);
        this.emitter.makeParticles('particle_fire', [0,1,2,3], 1500, true, true);
        this.emitter.gravity = 10000;
        this.emitter.width = 10;

    }
    // extend GameObject
    Robot.prototype = GameObject;

    Robot.prototype.collide = function(obj2, collideCallback, processCallback, callbackContext) {
        this.game.physics.arcade.collide(this.sprite, obj2, collideCallback, processCallback, callbackContext);
    }

    Robot.prototype.dance = function() {
        this.dancing = true;
    }
    Robot.prototype.stopDancing = function() {
        this.dancing = false;
    }

    Robot.prototype.jetpack = function(bool) {
        this.jetPack = bool;
        this.sprite.body.gravity.y = bool ? 750 : 1500;
    }

    // Works in Chrome, but not in Firefox.
    Robot.prototype.speak = function(sentence) {
        try {
            var toSpeak = new SpeechSynthesisUtterance(sentence);
            var voices = window.speechSynthesis.getVoices();
            toSpeak.voice = voices[1];
            toSpeak.lang = "en-UK";
            window.speechSynthesis.speak(toSpeak);
        } catch(e) {
            return "Sorry, your browser does not support the speach API.";
        }
    }

    Robot.prototype.update = function() {
        // Create the cursor keys
        var cursors = this.game.input.keyboard.createCursorKeys();
        // First, reset velocity
        this.sprite.body.velocity.x = 0;

        // Key left
        if (cursors.left.isDown) {
            this.sprite.body.velocity.x = this.conveyorBelt && this.sprite.body.touching.down ? -320 - this.conveyorBeltSpeed  : -320;
            if(!this.sprite.body.touching.down){
                if (this.jetPack) {
                    this.sprite.animations.play('left_jetpack');
                    // this.emitter.x = this.main.robot.sprite.x + 25;
                    // this.emitter.y = this.main.robot.sprite.y + 48;
                    // this.emitter.start(true, 500, null, 15);
                } else {
                    this.sprite.animations.play('left_jump');
                }
            }else{
                this.sprite.animations.play('left');
            }

            // Key right
        } else if (cursors.right.isDown) {
            this.sprite.body.velocity.x = this.conveyorBelt && this.sprite.body.touching.down ? 320 - this.conveyorBeltSpeed  : 320;
            if(!this.sprite.body.touching.down){
                if (this.jetPack) {
                    this.sprite.animations.play('right_jetpack');
                    // this.emitter.x = this.main.robot.sprite.x + 7;
                    // this.emitter.y = this.main.robot.sprite.y + 48;
                    // this.emitter.start(true, 500, null, 15);
                } else {
                    this.sprite.animations.play('right_jump');
                }

            }else{
                this.sprite.animations.play('right');
            }

            // Key down
        } else if (cursors.up.isDown || !this.sprite.body.touching.down) {
            this.sprite.animations.play('up');

            // No key
        } else {
            if (this.dancing) {
                this.sprite.animations.play('dance');
            } else if (this.conveyorBelt) {
                this.sprite.animations.play('right');
            } else {
                this.sprite.animations.stop();
                this.sprite.frame = 4;
            }
        }

        // If the sprite is on the ground, allow to jump
        if (((cursors.up.isDown || this.highJump) && this.sprite.body.touching.down)) {
            this.sprite.body.velocity.y = -500;
            console.log(this.jetPack)


            if (this.highJump) {
                this.sprite.body.velocity.y = -800;
                this.highJump = false;
                this.main.sound_jump.play();
            }else {
                this.main.sound_jump.play();
            }
        } else {
            this.main.sound_jetpack.stop();
        }

        //Jetpack emitter always on in-air for realistic gravity effect
        if(!this.sprite.body.touching.down && this.jetPack){
            this.emitter.x = this.main.robot.sprite.x + 16;
            this.emitter.y = this.main.robot.sprite.y + 40;
            this.emitter.start(true, 500, null, 15);
            this.main.sound_jetpack.play('', 0, 5, true, false);
        }

        if (this.highJump) {
            this.sprite.body.velocity.y = -800;
            this.main.sound_jump.play();
            this.highJump = false;
        }
    }

    Robot.prototype.toString = function() {
        return "This is the robot object. Use help('robot') to learn more about yourself."
    }

    return Robot;
});
