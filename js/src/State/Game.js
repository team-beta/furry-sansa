define(['Terminal', 'Phaser', 'Game/Robot', 'Game/Level'],
function (Terminal, Phaser, Robot, Level) {
    return {
        platforms: null,
        robot: null,
        sound_jump: null,
        sound_walk: null,
        sound_land: null,
        inAir: null,
        music_dododo: null,
        main: null,
        init: function() {
        },
        preload: function() {
        },
        create: function() {
            // Draw the background
            this.game.add.sprite(0, 0, 'background');

            // Add sounds
            this.sound_jump = this.add.audio('sound_jump');
            this.sound_land = this.add.audio('sound_land_metal');
            this.sound_walk = this.add.audio('sound_walk');

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

            this.robot = new Robot(this.game);

            // Create the level
            this._level = new Level(this, this.robot);

            // Create the level
            this._level.create();
        },
        update: function() {
            // basically, call the update on the true game object
            this.main.update();
            // Update the levle
            this._level.update();

            // Play the walk-sound sound if the robot is moving on the ground
            if (Math.abs(this.robot.sprite.body.velocity.x) > 0 && this.robot.sprite.body.touching.down) {
                this.sound_walk.play('', 0, 5, false, false);
            }

            this.robot.update();

        }
    };
});
