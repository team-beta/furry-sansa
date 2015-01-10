define([], function() {
    var Settings = function(main) {
        this.main = main;
        this.snowflake = false;
    }

    Settings.prototype.setWorldBounds = function(x, y, width, height) {
        this.main.game.world.setBounds(x, y, width, height);
    }

    Settings.prototype.drawBackground = function(background) {
        this.main.bg = this.main.game.add.tileSprite(0, 0, this.main.game.world.width, this.main.game.world.height, background);
    }

    Settings.prototype.playMusic = function(music) {
        this.music = this.main.game.add.audio(music);
        this.music.play('', 0, 1, true, true);
        this.main.bg_music = this.music;
    }

    Settings.prototype.setSnowflake = function(snowflake) {
        this.snowflake = snowflake;
    }

    Settings.prototype.destroy = function() {
        this.music.destroy();
    }

    return Settings;
});
