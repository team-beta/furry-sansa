define([], function() {
    var Code = function(main) {
        this.main = main;
        this.blocks = {};
    }
        
    Code.prototype.toString = function() {
        return "This is the world object. Use help('world') to learn more about the world."
    }

    Code.prototype.mute = function() {
        this.main.bg_music.pause();
    }

    Code.prototype.play = function() {
        this.main.bg_music.play();
    }

    Code.prototype.hello = function() {
        return "Hello world!";
    }

    Code.prototype.listBlocks = function() {
      var result = [];

      for(var k in this.blocks){
        result.push(this.blocks[k].name);
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
