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
            this.load.audio('sound_walk', 'sound/walk.ogg');
            this.load.audio('sound_coin', 'sound/coin.ogg');
            this.load.audio('sound_jump', 'sound/jump.ogg');
            this.load.audio('music_dododo', 'sound/dododo.ogg');

            // Images
            this.load.image('grass_block', 'assets/grass_block.png');
            this.load.image('robot', 'assets/robot.png');
            this.load.image('background', 'assets/sky-1600.png');
            this.load.image('factory_block', 'assets/factory_block.png')

            // Spritesheets
            this.load.spritesheet('robots', 'assets/robots.png', 32, 64);
            this.load.spritesheet('solid_block', 'assets/blocks.png', 32, 32);
        },
        create: function() {
            this.state.start('Game');
        }
    };
});
