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
        this.game.add.sprite(15*tile, height - 19*tile, 'factory_room');

        var text = "This is Jumper.";
        var text2 = "Press enter to continue"
        var style = { font: "65px Arial", fill: "#fff", align: "center" };
        var style2 = { font: "20px Arial", fill: "#fff", align: "center" };
        var t = this.game.add.text(15*tile, height - 10*tile, text, style);
        var t = this.game.add.text(15*tile, height - 8*tile, text2, style2);



    }

    return Layer;
});
