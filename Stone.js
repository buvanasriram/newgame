class Stone {
    constructor(x,y,w,h){
        var options = {
            restitution:1,
            density:1,
            frictionAir: 0.004
        }
        this.image = loadImage("stone.png");
        this.body = Bodies.rectangle(x,y,w,h, options);
        this.body.label = 'stone'
        this.width = w;
        this.height = h;
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