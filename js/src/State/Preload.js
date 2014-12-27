define([], function () {
    return {
        loaderEmpty: null,
        preloadBar: null,
        ready: false,
        init: function() {
        },
        preload: function() {
            this.loaderEmpty = this.add.sprite(this.camera.width/2 - (365/2), this.camera.height/2 - (49/2), 'preload_empty');
            this.preloadBar = this.add.sprite(this.camera.width/2 - (365/2), this.camera.height/2 - (49/2), 'preload_full');
            this.load.setPreloadSprite(this.preloadBar);

            // Audio
            this.load.audio('sound_land_dirt', 'sound/land_dirt.ogg');
            this.load.audio('sound_land_metal', 'sound/land_metal.ogg');
            this.load.audio('sound_land_concrete', 'sound/land_concrete.ogg');

            this.load.audio('sound_walk_dirt', 'sound/walk.ogg');
            this.load.audio('sound_walk_metal', 'sound/walk_metal.ogg');
            this.load.audio('sound_walk_concrete', 'sound/walk_concrete.ogg');
            
            this.load.audio('sound_coin', 'sound/coin.ogg');
            this.load.audio('sound_jump', 'sound/jump.ogg');
            this.load.audio('music_dododo', 'sound/dododo.ogg');

            // Images
            this.load.image('grass_block', 'assets/src/block_grass.png');
            this.load.image('robot', 'assets/robot.png');
            this.load.image('background', 'assets/src/sky.png');
            this.load.image('metal_block', 'assets/src/block_metal.png')
            this.load.image('crane', 'assets/src/crane.png')
            this.load.image('tree', 'assets/src/tree.png')
            this.load.image('rainbow', 'assets/src/rainbow.png')
            this.load.image('building_1', 'assets/src/building_1.png')
            this.load.image('building_2', 'assets/src/building_2.png')
            this.load.image('building_3', 'assets/src/building_3.png')
            this.load.image('tower', 'assets/src/tower.png')
            this.load.image('tree_bg', 'assets/src/tree_bg.png')

            // Spritesheets
            this.load.spritesheet('dancer', 'assets/robot_dancer.png', 55, 64);
            this.load.spritesheet('robots', 'assets/robots.png', 32, 64);
            this.load.spritesheet('solid_block', 'assets/blocks.png', 32, 32);
        },
        create: function() {
            this.state.start('Game');
        }
    };
});
