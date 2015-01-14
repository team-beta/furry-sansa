define([], function () {
    var Task = function(sprite, x, y){
        this.sprite = sprite;
        this.finished = false;
        this.position = this.sprite.body.position;
        this.dest_x = x == 0 ? this.sprite.body.position.x : x;
        this.dest_y = y == 0 ? this.sprite.body.position.y : y;
        console.log("Dest X: " + this.dest_x + ", Dest y: " + this.dest_y + ", Curr: " + this.position.x + " : " + this.position.y);
        if(this.dest_x > this.sprite.position.x){
            this.sprite.body.velocity.x = 500;
        }else if(this.dest_x < this.sprite.position.x){
            this.sprite.body.velocity.x = -500;
        }
        if(this.dest_y > this.sprite.position.y){
            this.sprite.body.velocity.y = 500;
        }else if(this.dest_y < this.sprite.position.y){
            this.sprite.body.velocity.y = -500;
        }
        this.velocity = this.sprite.body.velocity;

        Task.prototype.update = function(){
            console.log("Velocity = " + this.velocity.x + ", Finished: " + this.finished
            + ", Dest X: " + this.dest_x + ", Dest y: " + this.dest_y + ", Curr: " + this.position.x + " : " + this.position.y);

            // Check for x
            if(this.velocity.x > 0 && this.position.x >= this.dest_x){
                this.velocity.x = 0;
            }
            if(this.velocity.x < 0 && this.position.x <= this.dest_x){
                this.velocity.x = 0;
            }
            // // Check for y
            // if(this.velocity.y > 0 && this.position.y >= this.dest_y){
            //     this.velocity.y = 0;
            // }
            // if(this.velocity.y < 0 && this.position.y <= this.dest_y){
            //     this.velocity.y = 0;
            // }
            if(this.velocity.x == 0 && this.velocity.y == 0){
                this.finished = true;
            }

        }
    }

    return Task;

});
