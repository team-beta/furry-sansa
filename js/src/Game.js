define(['State/Boot', 'State/Preload', 'State/Game'],
function (boot, preload, gm) {
    var Game = function(phgame) {
        this.game = phgame;

        gm.main = this;

        this.game.state.add('Boot', boot);
        this.game.state.add('Preload', preload);
        this.game.state.add('Game', gm);

        this.game.state.start('Boot');
    }

    Game.prototype.update = function() {
        // update, called by gm.update
    }

    return Game;
});
