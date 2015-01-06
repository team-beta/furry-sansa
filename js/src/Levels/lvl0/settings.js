define([], function () {
    var Settings = function(main) {
        this.main = main;
        this.snowflake = false;

        // Set bounds
        this.main.game.world.setBounds(0, 0, 1620, 920);

        // Draw the background


        // Background music.
        this.music = this.main.game.add.audio('music_thinking-back');
        this.music.play('', 0, 1, true, true);
        this.main.bg_music = this.music;
    }

    return Settings;
});
