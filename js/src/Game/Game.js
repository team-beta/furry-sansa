define([], function () {
    return {
        init: function() {
        },
        preload: function() {
        },
        create: function() {
            for (var i = 0; i < 10; i++) {
                this.add.sprite(i * 31, 32, 'grass_block');
            }
        }
    };
});
