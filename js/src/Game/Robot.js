define(['Game/Object'], function (GameObject) {
    var Robot = function(game, sprite) {
        this._base = GameObject;
        this._base(game, sprite);
    }
    // extend GameObject
    Robot.prototype = GameObject;

    Robot.prototype.update = function() {
        // should be implemented by subclasses
    }

    return Robot;
});
