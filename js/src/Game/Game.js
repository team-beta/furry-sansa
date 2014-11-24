define([], function () {
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
                document.getElementById('main').innerHTML += '<div style="position: absolute; margin-top: ' + pos.y + 'px; margin-left: ' + pos.x + 'px; z-index: 10;"><textarea></textarea></div>';
            }, this);
        },
        update: function() {
            console.log('update');
        }
    };
});
