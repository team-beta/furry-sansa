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

require(['Phaser', 'Game'],
function(Phaser, Game) {
    var gm = new Game(
        new Phaser.Game("100%", "100%", Phaser.AUTO, '')
    );
});
