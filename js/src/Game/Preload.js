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

            this.load.image('grass_block', 'assets/grass_block-32.png');
            this.load.image('robot', 'assets/robot.png');
            this.load.spritesheet('robots', 'assets/robots.png', 32, 64);
        },
        create: function() {
            this.state.start('Game');
        }
    };
});
