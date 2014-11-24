define(['jquery', 'jquery-terminal'], function ($) {
    return {
        init: function() {
        },
        preload: function() {
        },
        create: function() {
            this.add.tileSprite(64, 2*64, 10*64, 64, 'grass_block');

            var spr = this.add.sprite(256, 256, 'grass_block');
            spr.inputEnabled = true;
            spr.input.useHandCursor = true;
            spr.events.onInputDown.add(function(ev) {
                console.log("Clicked!");
                console.log(this);
                console.log(ev);
                pos = ev.position;
                document.getElementById('main').innerHTML += '<div style="position: absolute; margin-top: ' + pos.y + 'px; margin-left: ' + pos.x + 'px; z-index: 10; background: orange;" id="term"></div>';
                $('#term').terminal(function(command, term) {
                    if (command == 'q' || command == 'quit') {
                        $('div').remove('.terminal');
                    } else if (command !== '') {
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
                }, {
                    greetings: 'Javascript Interpreter',
                    name: 'js_demo',
                    height: 200,
                    prompt: 'js> '});
            }, this);
        }    };
});
