class PlayingChar {
    constructor(x,y){
        var options = {
            density:1,
            friction: 1,
            restitution: 0
        }
        this.image = loadImage("boy.png");
        this.body = Bodies.rectangle(x,y,100,100, options);
        this.body.label = 'PC'
        this.width = 100;
        this.height = 100;
        World.add(world, this.body);
    }
    display() {
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.image, 0,0, this.width, this.height);
        pop();
    }
}