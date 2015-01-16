define(['jquery', 'jquery-terminal'], function ($) {
    var Terminal = function() {
        this.term = $('#term').terminal(this.handleCommand, {
            greetings: false,
            name: 'term',
            height: '100%',
            prompt: '>> ',
            self: this
        });
        document.terminal = this.term;

        this.terminal = this;
        $('#term').show();
    }

    Terminal.prototype.focus = function(){
        $('.cursor').focus();
    }

    Terminal.prototype.screenshake = function(target, shakes) {
        var shake = 200;

        $(target).removeClass("shake");
        $(target).addClass("shake");
        setTimeout(function(){
            $(target).removeClass("shake");
        }, shake * shakes);
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
        // Fix syntax error: Unexpected token ILLEGAL
        command = command.replace(/[^A-Za-z 0-9 \.,\?""''!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '') ;

            if (command !== '') {
                try {
                    var result = window.eval(command);
                    if (result !== undefined) {
                        term.echo(new String(result));

                    }
                } catch(e) {


                    Terminal.prototype.screenshake("#term", 1)

                    term.error(new String(e));
                }

            } else {
                term.echo('');

            }
            $('#game').click();
            $('#game').focus();
    }

    return Terminal;
});
