define(['Game/Object'], function(GameObject) {
    GrassBlock.prototype = Interactable;
    GrassBlock.prototype.sound_land = this.add.audio('sound_land_dirt');
    GrassBlock.prototype.sound_walk = this.add.audio('sound_walk_dirt');
    GrassBlock.prototype.sprite = this.add.sprite('grass_block');
}
