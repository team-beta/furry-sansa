define([], function () {
    var GameObject = function(game, sprite) {
        this.game = game;
        this.sprite = sprite;
    }

    GameObject.prototype.update = function() {
        // should be implemented by subclasses
    }

    return GameObject;
});
