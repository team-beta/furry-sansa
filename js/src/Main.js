define(['require', 'jquery', 'Terminal', 'Game/Code', 'Phaser', 'State/Boot', 'State/Preload', 'State/Game', 'Game/Robot', 'Game/API', 'Levels/lvl0/init', 'Levels/lvl1/init', 'Levels/lvl2/init'],
function (require, $, Terminal, Code, Phaser, boot, preload, gm, Robot, API) {

    var Main = function(phgame) {

        // Start up the game.
        this.game = phgame;
        gm.main = this;
        this.game.state.add('Boot', boot);
        this.game.state.add('Preload', preload);
        this.game.state.add('Game', gm);
        this.game.state.start('Boot');
        this.levelNum = 0;

        this.robot = null;
        this.bg_music = null;


        console.log(this.levelNum);
        // The library is accessible by the player
        this.library = new Code(this);
    }

    Main.prototype.mute = function() {

        if (this.bg_music.isPlaying) {
            this.bg_music.pause();
        } else {
            this.bg_music.resume();
        }
    }

    Main.prototype.create = function() {

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

        console.log(this.levelNum);
        if (this.levelNum == undefined) {
            this.levelNum = 0;
        }
        this.loadLevel(this.levelNum);
    }

    Main.prototype.changeLevel = function(level) {
        this.level.destroy();
        this.game.state.restart(true, false, level);
    }

    Main.prototype.loadLevel = function(level) {
        // load the first level
        Level = require('Levels/lvl' + level + '/init');
        // Create level
        this.level = new Level(this);

        // Follow the robot
        this.game.camera.follow(this.robot.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
    }

    Main.prototype.update = function() {
        this.library.update();
        this.api.update(this.api);
        this.level.update();
        this.robot.update();
    }

    return Main;
});
