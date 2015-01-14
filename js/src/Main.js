define(['require', 'jquery', 'Terminal', 'Game/Code', 'Phaser',
        'State/Boot', 'State/Preload', 'State/Game', 'Game/Robot',
        'Game/API', 'Game/Settings', 'Game/BlockManager',
        'Levels/Level0', 'Levels/Level1', 'Levels/Level2', 'Levels/Level3', 'Levels/Level99'],
function (require, $, Terminal, Code, Phaser, boot, preload, gm, Robot, API, Settings, BlockManager) {

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

        // The library is accessible by the player
        this.library = new Code(this);

        // Parallax default
        this.parallax = true;


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
        this.sound_jetpack = this.game.add.audio('sound_jetpack');

        // Creating a grass block
        this.grassBlock = {
            land : this.game.add.audio('sound_land_dirt'),
            walk : this.game.add.audio('sound_walk_dirt'),
            sprite : this.game.add.sprite('grass_block'),
            blockName : "grass_block",
        }

        this.dirtBlock = {
            land : this.game.add.audio('sound_land_dirt'),
            walk : this.game.add.audio('sound_walk_dirt'),
            sprite : this.game.add.sprite('dirt_block'),
            blockName : "dirt_block",
        }

        // Creating a metal block
        this.metalBlock = {
            land : this.game.add.audio('sound_land_metal'),
            walk : this.game.add.audio('sound_walk_metal'),
            sprite : this.game.add.sprite('metal_block'),
            blockName : "metal_block",
        }

        // Creating a fullMetal block
        this.fullMetalBlock = {
          land : this.game.add.audio('sound_land_metal'),
          walk : this.game.add.audio('sound_walk_metal'),
          sprite : this.game.add.sprite('fullMetalBlock'),
          blockName : "fullMetalBlock",
        }

        this.specialBlock = {
            land : this.game.add.audio('sound_land_concrete'),
            walk : this.game.add.audio('sound_walk_concrete'),
            sprite : this.game.add.sprite('invisible'),
            blockName : "invisible",
        }

        this.woodBlock = {
            land : this.game.add.audio('sound_land_wood'),
            walk : this.game.add.audio('sound_walk_wood'),
            sprite : this.game.add.sprite('wood_block'),
            blockName : "wood_block",
        }

        this.sound_walk_concrete = this.game.add.audio('sound_walk_concrete')
        this.sound_land_concrete = this.game.add.audio('sound_land_concrete')
        this.sound_land_conveyor = this.game.add.audio('sound_land_conveyor')
        this.sound_walk_conveyor = this.game.add.audio('sound_walk_conveyor')

        // Start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // initiate settings
        this.settings = new Settings(this);

        // Initiate terminal
        var term = new Terminal();

        if (this.levelNum == undefined) {
            this.levelNum = 0;
        }
        this.loadLevel(this.levelNum);

        $(window).keypress(function(e){
            console.log(e.which);
            if(e.which == 96){
                var cursor = $('#term .cursor');
                if(cursor.hasClass('blink')){
                    console.log('Selecting game canvas');
                    $('#game').click();
                }else{
                    $('#term .cmd').click();
                }
            }
        });
    }

    Main.prototype.changeLevel = function(level) {
        this.level.destroy();
        this.library.clear();
        this.game.state.restart(true, false, level);
    }

    Main.prototype.loadLevel = function(level) {
        // load the first level
        Level = require('Levels/Level' + level);
        // Create level
        this.level = new Level(this);

        // Follow the robot
        this.game.camera.follow(this.robot.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        window.help = this.level.help;
        window.reset = this.library.reset;
    }

    Main.prototype.update = function() {
        // Parallax
        if (typeof this.bg !== "undefined") {
            if (this.parallax) {
                this.bg.position.x = this.game.camera.x/2
                this.bg.position.y = this.game.camera.y/2
            }
        }

        // this.library.update();
        this.api.update();
        this.level.update();
        this.robot.update();
    }

    return Main;
});
