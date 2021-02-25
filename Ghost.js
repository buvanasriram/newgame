class Ghost {
    constructor(x,y,w,h){
        var options = {
            isStatic: true
        }
        this.image = loadImage("ghost.png");
        this.body = Bodies.rectangle(x,y,w,h, options);
        this.body.label = 'ghost'
        this.width = w;
        this.height = h;
        World.add(world, this.body);
    }
    display() {
        var pos = this.body.position;
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.width, this.height);
    }
}