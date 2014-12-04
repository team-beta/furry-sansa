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
    gm = new Phaser.Game("100%", "100%", Phaser.AUTO, '');

    gm.state.add('Boot', Game.Boot);
    gm.state.add('Preload', Game.Preload);
    gm.state.add('Game', Game.Game);

    gm.state.start('Boot');
});
