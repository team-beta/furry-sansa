define(['Terminal', 'Phaser', 'Game/Level'], function (Terminal, Phaser, Level) {
    return {
        platforms: null,
        robot: null,
        sound_jump: null,
        sound_walk: null,
        sound_land_dirt: null,
        sound_land_metal: null,
        inAir: null,
        music_dododo: null,
        init: function() {
        },
        preload: function() {
        },
        create: function() {
            // Draw the background
            this.game.add.sprite(0, 0, 'background');

            // Add sounds
            this.sound_jump = this.add.audio('sound_jump');
            this.sound_walk = this.add.audio('sound_walk');
            this.sound_land_dirt = this.add.audio('sound_land_dirt');
            this.sound_land_metal = this.add.audio('sound_land_metal');

            // Add music
            this.music_dododo = this.add.audio('music_dododo');
            this.music_dododo.play('', 0, 1, true, true);

            // Create hotkey to mute sound
            this.key_m = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
            this.key_m.onDown.add(function(){
                if (this.music_dododo.isPlaying) {
                    this.music_dododo.pause();
                } else {
                    this.music_dododo.resume();
                }
            }, this);

            // Start physics system
            this.physics.startSystem(Phaser.Physics.ARCADE);

            // Initiate terminal
            var term = new Terminal();

            // Create the robot and its animations
            this.robot = this.add.sprite(128, 0, 'robots');
            this.robot.frame = 4;
            this.robot.animations.add('left', [0, 1, 2, 3], 10, true);
            this.robot.animations.add('right', [5, 6, 7, 8], 10, true);
            this.robot.animations.add('up', [9], 10, true);
            this.robot.animations.add('left_jump', [10], 10, true);
            this.robot.animations.add('right_jump', [11], 10, true);

            // Create the level
            this._level = new Level(this, this.robot);

            // Allow physics for the robot
            this.physics.arcade.enable(this.robot);

            // Set gravity
            this.robot.body.gravity.y = 1500;

            // Make the screen the border
            this.robot.body.collideWorldBounds = true;

            // Create the level
            this._level.create();
        },
        update: function() {
            // Update the levle
            this._level.update();

            // Play the walk-sound sound if the robot is moving on the ground
            if (Math.abs(this.robot.body.velocity.x) > 0 && this.robot.body.touching.down) {
                this.sound_walk.play('', 0, 5, false, false);
            }

            // Create the cursor keys
            var cursors = this.input.keyboard.createCursorKeys();

            // First, reset velocity
            this.robot.body.velocity.x = 0;

            // Key left
            if (cursors.left.isDown) {
                this.robot.body.velocity.x = -320;
                if(!this.robot.body.touching.down){
                    this.robot.animations.play('left_jump');
                }else{
                    this.robot.animations.play('left');
                }

            // Key right
            } else if (cursors.right.isDown) {
                this.robot.body.velocity.x = 320;
                if(!this.robot.body.touching.down){
                    this.robot.animations.play('right_jump');
                }else{
                    this.robot.animations.play('right');
                }

            // Key down
            } else if (cursors.up.isDown || !this.robot.body.touching.down) {
                this.robot.animations.play('up');

            // No key
            } else {
                this.robot.animations.stop();
                this.robot.frame = 4;
            }

            // If the robot is on the ground, allow to jump
            if (cursors.up.isDown && this.robot.body.touching.down) {
                this.robot.body.velocity.y = -500;
                this.sound_jump.play();
            }
        }
    };
});
