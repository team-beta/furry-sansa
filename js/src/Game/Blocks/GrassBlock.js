define(['Game/GameObject'], function(GameObject) {
    GrassBlock.prototype = Interactable;
    GrassBlock = function() {
        this.sound_land = this.add.audio('sound_land_dirt');
        this.sound_walk = this.add.audio('sound_walk_dirt');
        this.sprite = this.add.sprite('grass_block');
    }


    this.main.Robot.collide(GrassBlock, function(){
        // Collide
    }, null, null);
});
