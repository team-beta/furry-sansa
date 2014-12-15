define([], function () {
    var GameObject = function(main, sprite) {
        this.main = main;
        this.game = main.game;
        this.sprite = sprite || null;
    }

    GameObject.prototype.update = function() {
        // should be implemented by subclasses
    }

    return GameObject;
});
