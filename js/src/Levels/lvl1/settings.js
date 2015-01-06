define([], function () {
    var Settings = function(main) {
        this.main = main;
        this.music = 'music_dododo';
        this.bg = 'bg_sky';
        this.snow = true;

        // Set bounds
        this.main.game.world.setBounds(0, 0, 1620, 920);

        // Draw the background
        this.main.game.add.tileSprite(0, 0, this.main.game.world.width, this.main.game.world.height, 'background');

        // Background music.
        this.music_dododo = this.main.game.add.audio('music_dododo');
        this.music_dododo.play('', 0, 1, true, true);
        this.main.bg_msuic = this.music_dododo;
    }

    return Settings;
});
