define(['require', 'jquery', 'Terminal', 'Game/Code', 'Phaser', 'State/Boot', 'State/Preload', 'State/Game', 'Game/Robot', 'Game/API', 'Levels/lvl0/init', 'Levels/lvl0/init'],
function (require, $, Terminal, Code, Phaser, boot, preload, gm, Robot, API) {

    var Game = function(phgame) {

        // Start up the game.
        this.game = phgame;
        gm.main = this;
        this.game.state.add('Boot', boot);
        this.game.state.add('Preload', preload);
        this.game.state.add('Game', gm);
        this.game.state.start('Boot');

        this.robot = null;
        this.bg_music = null;

        // The library is accessible by the player
        this.library = new Code(this);
    }

    Game.prototype.mute = function() {

        if (this.bg_music.isPlaying) {
            this.bg_music.pause();
        } else {
            this.bg_music.resume();
        }
    }

    Game.prototype.create = function() {

        // Add sounds
        this.sound_jump = this.game.add.audio('sound_jump');

        // Creating a grass block
        this.grassBlock = {
            land : this.game.add.audio('sound_land_dirt'),
            walk : this.game.add.audio('sound_walk_dirt'),
            sprite : this.game.add.sprite('grass_block'),
            blockName : "grass_block",
        }

        // Creating a metal block
        this.metalBlock = {
            land : this.game.add.audio('sound_land_metal'),
            walk : this.game.add.audio('sound_walk_metal'),
            sprite : this.game.add.sprite('metal_block'),
            blockName : "metal_block",
        }

        this.specialBlock = {
            land : this.game.add.audio('sound_land_concrete'),
            walk : this.game.add.audio('sound_walk_concrete'),
            sprite : this.game.add.sprite('invisible'),
            blockName : "invisible",
        }

        this.sound_walk_concrete = this.game.add.audio('sound_walk_concrete')
        this.sound_land_concrete = this.game.add.audio('sound_land_concrete')

        // Start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Initiate terminal
        var term = new Terminal();

        this.aaaaaaa = false;

        // load the first level
        Level = require('Levels/lvl0/init');
        // Create level
        this.level = new Level(this);

        // Follow the robot
        this.game.camera.follow(this.robot.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
        this.aaaaaaa = true;
    }

    Game.prototype.update = function() {
        // this.screenShake(10);
        // Update the level
        this.library.update();
        this.api.update(this.api);
        this.level.update();
        this.robot.update();

    }

    return Game;
});
