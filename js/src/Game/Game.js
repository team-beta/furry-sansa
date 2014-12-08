define(['Terminal', 'Phaser'], function (Terminal, Phaser) {
    return {
        platforms: null,
        robot: null,
        sound_jump: null,
        sound_walk: null,
        sound_land: null,
        inAir: null,
        music_dododo: null,
        init: function() {
        },
        preload: function() {
        },
        create: function() {

            // Set sounds
            this.sound_jump = this.add.audio('sound_jump');
            this.sound_land = this.add.audio('sound_land');
            this.sound_walk = this.add.audio('sound_walk');
            this.music_dododo = this.add.audio('music_dododo');
            this.music_dododo.play('', 0, 1, true, true);

            this.physics.startSystem(Phaser.Physics.ARCADE);

            var term = new Terminal();

            this.platforms = this.add.group();

            // enable physics
            this.platforms.enableBody = true;

            var ground = this.add.tileSprite(0, this.world.height - 32, this.world.width, 32, 'grass_block', null, this.platforms);

            ground.body.immovable = true;

            var ledge = this.add.tileSprite(32, 12*32, 10*32, 32, 'grass_block', null, this.platforms);

            ledge.body.immovable = true;

            //var spr = this.add.sprite(128, 128, 'grass_block');
            //spr.inputEnabled = true;
            //spr.input.useHandCursor = true;
            //spr.events.onInputDown.add(term.open, term);

            this.robot = this.add.sprite(128, 0, 'robots');
            this.robot.frame = 4;
            this.robot.animations.add('left', [0, 1, 2, 3], 10, true);
            this.robot.animations.add('right', [5, 6, 7, 8], 10, true);

            this.physics.arcade.enable(this.robot);

            this.robot.body.bounce.y = 0.2;
            this.robot.body.gravity.y = 300;
            this.robot.body.collideWorldBounds = true;

            // Starting point in the air
            this.inAir = true;
        },
        update: function() {
            //  Collide the player and the stars with the platforms
            this.physics.arcade.collide(this.robot, this.platforms, function(){
              // The player is landing
              if(this.inAir){
                this.sound_land.play('', 0, 5, false, false);
              }
            }, null, this);

            // Determine whether the robot is in air.
            if (this.robot.body.touching.down) {
              this.inAir = false;
            } else {
              this.inAir = true;
            }

            if (Math.abs(this.robot.body.velocity.x) > 0 && this.robot.body.touching.down) {
              this.sound_walk.play('', 0, 5, false, false);
            }

            var cursors = this.input.keyboard.createCursorKeys();

            // first, reset velocity
            this.robot.body.velocity.x = 0;

            if (cursors.left.isDown) {
                this.robot.body.velocity.x = -320;
                this.robot.animations.play('left');
            } else if (cursors.right.isDown) {
                this.robot.body.velocity.x = 320;
                this.robot.animations.play('right');
            } else {
                this.robot.animations.stop();
                this.robot.frame = 4;
                // stand still
            }

            if (cursors.up.isDown && this.robot.body.touching.down) {
                this.robot.body.velocity.y = -150;
                this.sound_jump.play();
            }
        }
    };
});
