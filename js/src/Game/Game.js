define(['Terminal'], function (Terminal) {
    return {
        init: function() {
        },
        preload: function() {
        },
        create: function() {
            var term = new Terminal();

            this.add.tileSprite(32, 2*32, 10*32, 32, 'grass_block');

            var spr = this.add.sprite(128, 128, 'grass_block');
            spr.inputEnabled = true;
            spr.input.useHandCursor = true;

            var robot = this.add.sprite(128, 0, 'robot');

            spr.events.onInputDown.add(term.open, term);
        }
    };
});
