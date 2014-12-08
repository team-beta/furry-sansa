define(['Terminal', 'Phaser'], function (Terminal, Phaser) {
    return {
        platforms: null,
        robot: null,
        init: function() {
        },
        preload: function() {
        },
        create: function() {

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
        },
        update: function() {
            this.physics.arcade.collide(this.robot, this.platforms);

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
        }
    };
});
