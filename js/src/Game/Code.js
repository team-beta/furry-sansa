define([], function() {
    var Code = function(main) {
        this.main = main;
    }

    Code.prototype.mute = function() {
        this.main.music_dododo.pause();
    }

    Code.prototype.play = function() {
        this.main.music_dododo.play();
    }

    Code.prototype.hello = function() {
        return "Hello world!";
    }

    return Code;
});
