class Bullet {
    constructor(x,y){
        var options = {
            restitution:1,
            density:1,
            frictionAir: 0.004
        }
        this.image = loadImage("bullet.png");
        this.body = Bodies.rectangle(x,y,50,50, options);
        this.body.label = 'bullet'
        this.width = 50;
        this.height = 50;
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