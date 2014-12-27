define(['jquery', 'Terminal', 'Phaser', 'State/Boot', 'State/Preload', 'State/Game', 'Game/Robot', 'Game/API', 'Levels/lvl1/layer-1', 'Levels/lvl1/layer-2'],
function ($, Terminal, Phaser, boot, preload, gm, Robot, API, L11, L12) {

    var Game = function(phgame) {

        // Start up the game.
        this.game = phgame;
        gm.main = this;
        this.game.state.add('Boot', boot);
        this.game.state.add('Preload', preload);
        this.game.state.add('Game', gm);
        this.game.state.start('Boot');
    }

    Game.prototype.screenShake = function(shakes) {
        if(this.game.time.now - this.shakedAt < 200) {
            return;
        }
        this.shakedAt = this.game.time.now;
        this.screenShakes = shakes;

        // console.log(window)
        if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate(shakes*10);
        }
    };

    Game.prototype.create = function() {
        // Set bounds
        this.game.world.setBounds(0, 0, 1620, 920);

        // Draw the background
        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');

        // Use the API (should be called after drawing the background)
        this.api = new API(this);

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

        this.sound_walk_concrete = this.game.add.audio('sound_walk_concrete')
        this.sound_land_concrete = this.game.add.audio('sound_land_concrete')

        // Add music
        this.music_dododo = this.game.add.audio('music_dododo');
        this.music_dododo.play('', 0, 1, true, true);

        // Creating hotkeys blocks the terminal from using these characters.
        // Create hotkey to mute sound
        // this.key_m = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        // this.key_m.onDown.add(function(){
        //     if (this.music_dododo.isPlaying) {
        //         this.music_dododo.pause();
        //     } else {
        //         this.music_dododo.resume();
        //     }
        // }, this);

        // Start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Initiate terminal
        var term = new Terminal();

        // Background layer
        this.bgLayer = new L11(this);
        this.bgLayer.create();

        this.robot = new Robot(this);
        this.api.robot = this.robot;

        // Foreground layer
        this.fgLayer = new L12(this)
        this.fgLayer.create();

        // Follow the robot
        this.game.camera.follow(this.robot.sprite, Phaser.Camera.FOLLOW_PLATFORMER);


    }

    Game.prototype.update = function() {
        // this.screenShake(10);
        // Update the level
        this.api.update(this.api);
        this.robot.update();
    }

    return Game;
});
