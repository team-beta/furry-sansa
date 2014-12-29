define([], function () {
    var iBlock = function(main) {
        this.main = main;
        this.game = main.game;
        this.library = main.library;
        this.blocks = this.game.add.group();
        this.blocks.enableBody = true;
        this.library.blocks = this;
    }

    iBlock.prototype.make = function(form, width, height, x, y, name) {
        switch (form) {
            case "block":
                // Create a group
                this.createBlock(width, height, x, y, name);
                break;
        }

    }

    iBlock.prototype.createBlock = function (x, y, width, height, name) {
        var tile = 32;

        var tileSprite = this.game.add.tileSprite(
            x, y, width * 32, height * 32, "solid_block", null, this.blocks
        );

        tileSprite.name = name;
        tileSprite.body.immovable = true;
        tileSprite.solid = true;
    }

    iBlock.prototype.setSolidity = function(name, bool) {
        var iblock = this;

        this.blocks.forEach(function(elem){
            if (elem.name == name) {
                if(bool){
                    elem.alpha = 1;
                    elem.solid = true;
                } else {
                    elem.alpha = 0.5;
                    elem.solid = false;
                }
            }
        })
    }

    iBlock.prototype.listBlocks = function() {
        var result = []

        this.blocks.forEach(function(elem){
            result.push(elem.name)
        })

        return result
    }

    iBlock.prototype.update = function() {
        var iblock = this;

        this.blocks.forEach(function(elem){
            if (elem.solid == true) {
                iblock.main.robot.collide(elem, function() {

                }, null, this)
            }
        })
    }

    return iBlock;
});
