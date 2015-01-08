define([], function () {
    var Settings = function(main) {
        this.main = main;
        this.snowflake = true;

        // Set bounds
        this.main.game.world.setBounds(0, 0, 1620, 920);

        // Draw the background
        this.main.game.add.tileSprite(0, 0, this.main.game.world.width, this.main.game.world.height, 'background');

        // Background music.
        this.music = this.main.game.add.audio('music_dododo');
        this.music.play('', 0, 1, true, true);
        this.main.bg_music = this.music;
    }

    Settings.prototype.destroy = function() {
        this.music.destroy();
    }

    return Settings;
});
