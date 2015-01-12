define(['Game/Block'], function (Block) {
    var Manager = function(main){

        // Quick references
        this.main = main;
        this.game = main.game;
        this.api = main.api;

        // Block group
        this.blocks = this.game.add.group();
        this.blocks.enableBody = true;
    }

    Manager.prototype.create = function (x, y, width, height, name) {
        // Create new block.
        var block = new Block(this.main, name, x, y, width, height, this.blocks);


        // Push block to library so that the player has access to it.
        if(typeof this.main.library.blocks[name] === 'undefined'){
            this.main.library.blocks[name] = block;
        }else{
            this.main.library.blocks[name + '_' + this.main.library.blocks.length] = block;
        }
    }

    Manager.prototype.update = function(){
        var manager = this;

        for (k in manager.main.library.blocks) {
            manager.main.library.blocks[k].update()
        }

    }

    return Manager;
});
