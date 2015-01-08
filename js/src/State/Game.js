define([],
function () {
    return {
        init: function(level) {
            this.main.levelNum = level;
        },
        preload: function() {
        },
        create: function() {
            this.main.create();
        },
        update: function() {
            this.main.update();
        }
    };
});
