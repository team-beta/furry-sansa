define(['Game/Object'], function (GameObject) {
    var Interactable = function(main, sprite) {
        this._base = GameObject;
        this._base(main, sprite);
    }
    // extend
    Interactable.prototype = GameObject;

    Interactable.prototype.update = function() {
        // should be implemented by subclasses
    }

    return Interactable;
});
