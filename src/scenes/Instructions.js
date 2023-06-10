class Instructions extends Phaser.Scene {
    constructor() {
        super("scene1");
    }
    create() {
        this.add.text(middleX,middleY-20,"Click to Shoot").setOrigin(0.5,0.5);
    }
}