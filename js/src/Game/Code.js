define([], function() {
    var Code = function(main) {
        this.main = main;
        this.blocks = {};
    }

    Code.prototype.mute = function() {
        this.main.music_dododo.pause();
    }

    Code.prototype.play = function() {
        this.main.music_dododo.play();
    }

    Code.prototype.hello = function() {
        return "Hello world!";
    }

    Code.prototype.listBlocks = function() {
      var result = [];

      for(var k in this.blocks){
        result.push(this.blocks[k]);
      }

      return result;
    }


    Code.prototype.update = function() {
      for(var k in this.blocks){
        this.blocks[k].update();
      }
    }

    return Code;
});
