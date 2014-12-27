define(['jquery', 'jquery-terminal'], function ($) {
    var Terminal = function() {
        this.term = $('#term').terminal(this.handleCommand, {
            greetings: false,
            name: 'term',
            height: '100%',
            prompt: '>> ',
            self: this
        });
        $('#term').show();
    }

    Terminal.prototype.open = function(sprite) {
        pos = sprite.position;

        $('#term').css('margin-top', pos.y + 'px');
        $('#term').css('margin-left', pos.x + 'px');

        $('#term').show();
    }

    Terminal.prototype.close = function() {
        this.term.clear();
        $('#term').hide();
    }

    Terminal.prototype.handleCommand = function(command, term) {
        if (command !== '') {
            try {
                var result = window.eval(command);
                if (result !== undefined) {
                    term.echo(new String(result));
                }
            } catch(e) {
                term.error(new String(e));
            }
        } else {
            term.echo('');
        }
    }

    return Terminal;
});
