define([], function () {
    return {
        init: function() {
        },
        preload: function() {
        },
        create: function() {
            this.add.tileSprite(64, 2*64, 10*64, 64, 'grass_block');
        }
    };
});
