define(['Game/API', "Levels/lvl2/settings", "Levels/lvl2/layer-1", "Levels/lvl2/layer-2", "Game/Robot"], function (API, Settings, layer1, layer2, Robot) {
    var Init = function(main) {
        this.main = main;
        this.api = main.api;
        this.library = main.library;
        this.game = main.game;

        // Apply settings.
        this.settings = new Settings(this.main);
        this.main.settings = this.settings;

        // Background layer
        this.bgLayer = new layer1(this.main);
        this.bgLayer.create();

        this.main.robot = new Robot(this.main, 128, 0);

        // Use the API (should be called after drawing the background)
        this.main.api = new API(this.main);

        //Add graphics
        this.main.graphics = this.game.add.graphics(0,0);

        // Foreground layer
        this.fgLayer = new layer2(this.main)
        this.fgLayer.create();

        // Add robot to library
        this.main.library.robot = this.main.robot;
    }

    Init.prototype.update = function() {
        this.fgLayer.update();
    }

    Init.prototype.destroy = function() {
        this.settings.destroy();
    }

    return Init;
});
