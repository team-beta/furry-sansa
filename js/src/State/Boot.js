define([], function () {
    return {
        init: function() {
            // Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
            this.input.maxPointers = 1;
            // Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            // This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
            this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        },
        preload: function() {
            this.load.image('preload_empty', 'assets/loader_empty.png');
            this.load.image('preload_full', 'assets/loader_full.png');
        },
        create: function() {
            this.state.start('Preload');
        }
    };
});
