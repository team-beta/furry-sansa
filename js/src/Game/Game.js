define(['Terminal'], function (Terminal) {
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

            var term = new Terminal();
            spr.events.onInputDown.add(term.open, term);
        }
    };
});
