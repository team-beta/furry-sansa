requirejs.config({
    "baseUrl": 'js/src',
    "paths": {
        "Phaser": '../vendor/phaser.min',
        "jquery": '../vendor/jquery-2.1.1.min',
        "jquery-terminal": '../vendor/jquery.terminal-0.8.8.min'
    },
    "shim": {
        "jquery-terminal": [ "jquery" ]
    }
});

// The object that will be accessible
var world = null;

require(['Phaser', 'Game'],
function(Phaser, Game) {
    var parent = document.getElementById('game');
    var gm = new Game(
        new Phaser.Game("100%", "100%", Phaser.AUTO, parent)
    );


    // Make the object accessible from outside.
    world = gm.library;
});
