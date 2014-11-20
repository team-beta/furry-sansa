define([], function () {
    return {
        init: function() {
        },
        preload: function() {
        },
        create: function() {
            for (var i = 0; i < 10; i++) {
                this.add.sprite(i * 32, 32, 'grass_block');
            }
        }
    };
});
