class Link {
    constructor(bodyA, bodyB) {
        var options = {
            bodyA: bodyA,
            bodyB: bodyB,
            stiffness: 0.04,
            length:10
        }
        this.link = Constraint.create(options);
        World.add(world, this.link);
    }
    display() {
        if (this.link.bodyB) {
            var pointA = this.link.bodyA.position;
            var pointB = this.link.bodyB.position;
            line(pointA.x, pointA.y, pointB.x, pointB.y);
        }  
    }
    shoot() {
        this.link.bodyB = null;
    }
    attach(stone) {
        this.link.bodyB = stone;
    }
}