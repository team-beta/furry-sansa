define(['Game/Object'], function (GameObject) {
    var Robot = function(game) {
        this._base = GameObject;
        this._base(game);

        this.sprite = this.game.add.sprite(128, 0, 'robots');
        this.sprite.frame = 4;

        // add the animations
        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
        this.sprite.animations.add('up', [9], 10, true);
        this.sprite.animations.add('left_jump', [10], 10, true);
        this.sprite.animations.add('right_jump', [11], 10, true);

        // enable physics
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = 1500;
        this.sprite.body.collideWorldBounds = true;

    }
    // extend GameObject
    Robot.prototype = GameObject;

    Robot.prototype.update = function() {
        // Create the cursor keys
        var cursors = this.game.input.keyboard.createCursorKeys();
        // First, reset velocity
        this.sprite.body.velocity.x = 0;

        // Key left
        if (cursors.left.isDown) {
            this.sprite.body.velocity.x = -320;
            if(!this.sprite.body.touching.down){
                this.sprite.animations.play('left_jump');
            }else{
                this.sprite.animations.play('left');
            }

            // Key right
        } else if (cursors.right.isDown) {
            this.sprite.body.velocity.x = 320;
            if(!this.sprite.body.touching.down){
                this.sprite.animations.play('right_jump');
            }else{
                this.sprite.animations.play('right');
            }

            // Key down
        } else if (cursors.up.isDown || !this.sprite.body.touching.down) {
            this.sprite.animations.play('up');

            // No key
        } else {
            this.sprite.animations.stop();
            this.sprite.frame = 4;
        }

        // If the sprite is on the ground, allow to jump
        if (cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.body.velocity.y = -500;
            this.sound_jump.play();
        }
    }

    return Robot;
});
