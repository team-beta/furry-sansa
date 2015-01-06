define([], function () {
    var Layer = function(main) {
        this.main = main;
        this.game = main.game;
        this.robot = main.robot;
    }

    Layer.prototype.create = function() {
        var tile = 32;
        var height = this.game.world.height;
        var width = this.game.world.width;
        var text = "This is Jumper.";
        
        var style = { font: "65px Arial", fill: "#fff", align: "center" };

        var t = this.game.add.text(5*tile, height - 10*tile, text, style);




    }

    return Layer;
});
