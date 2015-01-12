define([], function () {
    var Layer = function(main) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;
        this.API = main.api;
        this.library = main.library;
    }

    Layer.prototype.create = function() {
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;

        // Create platforms
        this.API.createPlatform(0, height - tile, width, tile, this.main.grassBlock);
        this.API.createPlatform(width - 16*tile, height - 14*tile, 2*tile, tile, this.main.grassBlock);

        // Path down
        this.API.createPlatform(width - 12*tile, height - 12*tile, 2*tile, tile, this.main.grassBlock);
        this.API.createPlatform(width - 14*tile, height - 10*tile, 2*tile, tile, this.main.metalBlock);
        this.API.createPlatform(width - 18*tile, height - 8*tile, 2*tile, tile, this.main.metalBlock);

        this.API.createPlatform(width - 14*tile, height - 6*tile, 2*tile, tile, this.main.grassBlock);
        this.API.createPlatform(width - 12*tile, height - 4*tile, 2*tile, tile, this.main.metalBlock);
        this.API.createPlatform(width - 8*tile, height - 2*tile, 2*tile, tile, this.main.grassBlock);

        this.API.createPlatform(0, height - 16*tile, width - 16*tile, tile, this.main.metalBlock);

        this.end = this.game.add.sprite(47*tile, height-4*tile, 'end_level');
        this.game.physics.enable(this.end, Phaser.Physics.ARCADE);

        // Add sprites
        this.game.add.sprite(11*tile, height - 20*tile, 'tree');
        this.game.add.sprite(5*tile, height - 20*tile, 'tree');
        this.game.add.sprite(22*tile, height - 5*tile, 'rainbow')

        // Add solid objects
        this.API.addSolid(0, height - 20 * tile, 'crane');
        this.API.addSolid(4 * tile, height - 5 * tile, 'building_1');
        this.API.addSolid(10 * tile, height - 5 * tile, 'building_3');
        this.API.addSolid(9 * tile, height - 9 * tile, 'building_2');
        this.API.addSolid(25 * tile, height - 5*tile, 'building_3');

        // Add interactable blocks
        this.main.manager.create(15*tile, height - 17*tile, 1, 1, "block_1");
        this.main.manager.create(30*tile, height - 19*tile, 3, 3, "block_2");
    }

    Layer.prototype.update = function() {
        this.robot.collide(this.end, function() {
            this.main.changeLevel(2);
        }, null, this);
    }

    return Layer;
});
