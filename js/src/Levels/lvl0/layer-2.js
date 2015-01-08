define(["Game/Block"], function (Block) {
    var Layer = function(main) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;
        this.API = main.api;
        this.library = main.library;
        this.roll = false;
        this.line = 0;

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

        // this.continueText = "Jump on a mattress to continue"

        this.storyStyle = { font: "40px Arial", fill: "#fff", align: "center" };
        // this.continueStyle = { font: "20px Arial", fill: "#fff", align: "center" };

        this.displayNext();

        this.jumped = false;
    }

    Layer.prototype.create = function() {
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;
        this.API.createPlatform(0, height - 1*tile, width, tile, this.main.metalBlock);
        this.spawnMattress();
        this.API.createPlatform(14*tile, height - 19*tile, tile, 18*tile, this.main.specialBlock);
        this.API.createPlatform(35*tile, height - 19*tile, tile, 18*tile, this.main.specialBlock);
        this.main.robot.conveyorBelt = true;

        // should be 42*tile
        this.end = this.game.add.sprite(2*tile, height-4*tile, 'end_level');
        this.game.physics.enable(this.end, Phaser.Physics.ARCADE);
    }

    Layer.prototype.displayNext = function() {
        // Add new lines
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;
        this.storyLine = this.game.add.text(15*tile, height - 5*tile, this.storyText[this.line].toUpperCase(), this.storyStyle);
        // this.storyLine.alpha = 0
        this.game.add.tween(this.storyLine).to({y: 0}, 10000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.storyLine).to({alpha: 0}, 5000, Phaser.Easing.Linear.None, true);

        // Go to next line
        if (this.line != this.storyText.length - 1) {
            this.line += 1;
        }
    }

    Layer.prototype.spawnMattress = function() {
        this.matras = this.game.add.sprite(37*32, this.game.world.height - 2*32, 'mattress');
        this.game.physics.enable(this.matras, Phaser.Physics.ARCADE);
        this.matras.body.velocity.x=-150;
        this.matras.body.immovable = true;
        this.matras.animations.add('jump', [1,0], 10, false);
        this.jumped = false;
        this.main.robot.conveyorBelt = true;
    }

    Layer.prototype.resetMattress = function() {
        this.matras.body.position.x = 37*32;
        this.jumped = false;
        this.main.robot.conveyorBelt = true;
    }

    Layer.prototype.stopRoll = function() {
        this.matras.body.velocity.x = 0;
        this.main.robot.conveyorBelt = false;
        this.stopped = true;
    }

    Layer.prototype.continue = function() {
        if (!this.jumped) {
            this.displayNext();
        }
        this.jumped = true;
    }

    Layer.prototype.update = function() {
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;

        if (this.matras.body.position.x < 12*tile) {
            this.resetMattress();
        }

        this.robot.collide(this.end, function() {
            this.main.changeLevel(1);
        }, null, this);

        this.robot.collide(this.matras, function() {
            this.robot.sprite.body.velocity.y = -800;
            this.main.sound_jump.play();
            this.matras.animations.play('jump');
            this.continue();
        }, null, this);
    }

    return Layer;
});
