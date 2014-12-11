define(['Game/Boot', 'Game/Preload', 'Game/Game'],
function (boot, preload, gm) {
    var Game = function(phgame) {
        this.game = phgame;

        this.game.state.add('Boot', boot);
        this.game.state.add('Preload', preload);
        this.game.state.add('Game', gm);

        this.game.state.start('Boot');
    }

    return Game;
});
