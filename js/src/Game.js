define(['Terminal', 'Phaser', 'State/Boot', 'State/Preload', 'State/Game', 'Game/Robot', 'Game/Level'],
function (Terminal, Phaser, boot, preload, gm, Robot, Level) {

    var Game = function(phgame) {
        this.game = phgame;

        gm.main = this;

        this.game.state.add('Boot', boot);
        this.game.state.add('Preload', preload);
        this.game.state.add('Game', gm);

        this.game.state.start('Boot');

        // initialize variables
    }

    Game.prototype.create = function() {
        // Draw the background
        this.game.add.sprite(0, 0, 'background');

        // Add sounds
        this.sound_jump = this.game.add.audio('sound_jump');

        // Creating a grass block
        this.grassBlock = {
            land : this.game.add.audio('sound_land_dirt'),
            walk : this.game.add.audio('sound_walk_dirt'),
            sprite : this.game.add.sprite('grass_block'),
            spriteName : "grass_block",
        }

        // Creating a metal block
        this.metalBlock = {
            land : this.game.add.audio('sound_land_metal'),
            walk : this.game.add.audio('sound_walk_metal'),
            sprite : this.game.add.sprite('metal_block'),
            spriteName : "metal_block",
        }

        // Add music
        this.music_dododo = this.game.add.audio('music_dododo');
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
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Initiate terminal
        var term = new Terminal();

        this.robot = new Robot(this);

        // Create the level
        this.level = new Level(this);

        // Create the level
        this.level.create();
    }

    Game.prototype.update = function() {
        // Update the level
        this.level.update();

        // Play the walk-sound sound if the robot is moving on the ground
        if (Math.abs(this.robot.sprite.body.velocity.x) > 0 && this.robot.sprite.body.touching.down) {
            // this.sound_walk.play('', 0, 5, false, false);
            if (this.level.airStatus.onDirt) {
                this.grassBlock['walk'].play('', 0, 5, false, false);
            }
            if (this.level.airStatus.onMetal) {
                this.metalBlock['walk'].play('', 0, 5, false, false);
            }
        }

        this.robot.update();
    }

    return Game;
});
