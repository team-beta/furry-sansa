define(['Terminal', 'Phaser', 'Game/Level'], function (Terminal, Phaser, Level) {
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

            this.robot = this.add.sprite(128, 0, 'robots');
            this.robot.frame = 4;
            this.robot.animations.add('left', [0, 1, 2, 3], 10, true);
            this.robot.animations.add('right', [5, 6, 7, 8], 10, true);

            this._level = new Level(this, this.robot);

            this.physics.arcade.enable(this.robot);

            this.robot.body.bounce.y = 0.2;
            this.robot.body.gravity.y = 500;
            this.robot.body.collideWorldBounds = true;

            this._level.create();
        },
        update: function() {
            this._level.update();

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
            }

            if (cursors.up.isDown && this.robot.body.touching.down) {
                this.robot.body.velocity.y = -320;
                this.sound_jump.play();
            }
        }
    };
});
