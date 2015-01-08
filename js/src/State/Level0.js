define(['Game/API', "Game/Robot"], function (API, Robot) {
    var Init = function() {
        // console.log(world.main)
        this.main = world.main;
        this.library = this.main.library;
        this.game = this.main.game;
        this.bg = null;
        this.line = 0;
        this.tile = 32;
        this.phaser = this.main.phaser;

        // Apply settings.
        this.setUp();
        this.height = this.game.world.height;
        this.width = this.game.world.width;

        // Use the API (should be called after drawing the background)
        this.main.api = new API(this.main);

        // Background layer
        this.createLayer1();

        // Robot
        this.createRobot();

        //Add graphics
        this.main.graphics = this.game.add.graphics(0,0);

        // Foreground layer
        this.createLayer2();

        // Add robot to library
        this.main.library.robot = this.main.robot;

    }

    Init.prototype.createRobot = function() {
        var x = 17*32;
        var y = this.height - 128;

        // if (typeof this.main.robot != "undefined") {
        //     this.main.robot.sprite.destroy();
        //     // TODO: Make a create method in the Robot.js.
        // }

        this.main.robot = new Robot(this.main, x, y);
    }

    Init.prototype.setUp = function() {
        // Turn off snowflakes.
        this.main.snowflake = false;

        // Set bounds
        this.main.game.world.setBounds(0, 0, 1620, 920);

        // (No background)

        // Background music.
        this.music = this.main.game.add.audio('music_thinking-back');
        this.music.play('', 0, 1, true, true);
        this.main.bg_music = this.music;
    }

    Init.prototype.createLayer1 = function() {
        this.room = this.game.add.sprite(15*this.tile, this.height - 19*this.tile, 'factory_room');
        this.room.animations.add('blinky', [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], 3, true);
        this.room.animations.play('blinky');
    }

    Init.prototype.createLayer2 = function() {
        this.storyText = [
            "This is Jumper...",
            "Jumper works for a   \n mattress factory.",
            "Everyday he jumps on \n mattresses to test \n their quality.",
            "But he feels sad.",
            "All he has ever seen is \n within this small dark room.",
            "Is this all life has \n to offer me?",
            "I want to cry :(",
            "Cry for help...",
            "But robots don't cry.",
            "Can you help me?",
            "Write 'help()' in the \n terminal below."
        ]


        this.storyStyle = { font: "40px Arial", fill: "#fff", align: "center" };
        this.displayNext();
        this.jumped = false;

        this.main.api.createPlatform(0, this.height - 1*this.tile, this.width, this.tile, this.main.metalBlock);
        this.spawnMattress();
        // console.log(this.matras.body)
        this.main.api.createPlatform(14*this.tile, this.height - 19*this.tile, this.tile, 18*this.tile, this.main.specialBlock);
        this.main.api.createPlatform(35*this.tile, this.height - 19*this.tile, this.tile, 18*this.tile, this.main.specialBlock);
        this.main.robot.conveyorBelt = true;
    }

    Init.prototype.displayNext = function() {
        this.storyLine = this.game.add.text(15*this.tile, this.height - 5*this.tile, this.storyText[this.line].toUpperCase(), this.storyStyle);
        // this.storyLine.alpha = 0
        this.game.add.tween(this.storyLine).to({y: 0}, 10000, this.phaser.Easing.Linear.None, true);
        this.game.add.tween(this.storyLine).to({alpha: 0}, 5000, this.phaser.Easing.Linear.None, true);

        // Go to next line
        if (this.line != this.storyText.length - 1) {
            this.line += 1;
        }
    }

    Init.prototype.spawnMattress = function() {
        this.main.matras = this.game.add.sprite(37*this.tile, this.height - 2*this.tile, 'mattress');
        this.game.physics.enable(this.main.matras, this.main.phaser.Physics.ARCADE);
        this.main.matras.body.velocity.x=-150;
        this.main.matras.body.immovable = true;
        this.main.matras.animations.add('jump', [1,0], 10, false);
        this.jumped = false;
        this.main.robot.conveyorBelt = true;
    }

    Init.prototype.resetMattress = function() {
        this.main.matras.body.position.x = 37*32;
        this.jumped = false;
        this.main.robot.conveyorBelt = true;
    }


    Init.prototype.continue = function() {
        if (!this.jumped) {
            this.displayNext();
        }
        this.jumped = true;
    }

    Init.prototype.update = function() {
        console.log(this.main.matras)

        // console.log(this.matras.body)
        if (this.main.matras.body.position.x < 12*this.tile) {
            this.resetMattress();
        }

        this.main.robot.collide(this.main.matras, function() {
            this.main.robot.sprite.body.velocity.y = -800;
            this.main.sound_jump.play();
            this.main.matras.animations.play('jump');
            this.continue();
        }, null, this)

        this.api.update(this.api);
    }

    return Init;
});
