requirejs.config({
    baseUrl: 'js/src',
    paths: {
        Phaser: '../vendor/phaser.min'
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
