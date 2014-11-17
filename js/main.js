requirejs.config({
    baseUrl: 'js/src',
    paths: {
        Phaser: '../vendor/phaser.min'
    }
});

require(['Phaser', 'game'],
function(Phaser, game) {
    game.phaser = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: game.preload, create: game.create, update: game.update });
});