class Noose extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.init()
        this.setInteractive();
        this.on('pointerup',this.onClick,this);
        //this.customArea = new Phaser.Geom.Rectangle(-20, 20, -100, 100);
        //this.input.hitArea = this.customArea;
    }

    init(){
        this.setOrigin(0.5,0.1);
        this.swing();
    }

    swing(){
        const swingDuration = 2000;
        const swingAngleStart = Phaser.Math.DegToRad(60);
        const swingAngleEnd = Phaser.Math.DegToRad(-60);

        this.swing = this.scene.tweens.add({
            targets: this,
            rotation: {from: swingAngleStart, to: swingAngleEnd},
            duration: swingDuration,
            yoyo: true,
            repeat: -1
        })
    }
    onClick(){
        this.input.enabled = false;
        money += 1000;
        this.emit('nooseClicked');
        this.swing.stop();
        const moveDuration = 500;
        const moveY = this.y + height;
        this.scene.tweens.add({
            targets: this,
            y: moveY,
            duration: moveDuration,
            ease: 'Linear',
            onComplete: () => {
                this.destroy();
            }
        })
        this.input.enabled = true;
    }
    /*
    update() {
        //move spaceship left
        this.x -= this.moveSpeed;
        //console.log(this.x, this.y);
        //wrap around from left to right edge 
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }
    updateMoveSpeed(max, min){
        this.maxspeed = max;
        this.minspeed = min;
        this.moveSpeed = Phaser.Math.Between(this.minspeed,this.maxspeed);
        console.log(this.moveSpeed);
    }
    reset() {
        this.x = game.config.width + Phaser.Math.Between(50,400);
    }
    */
}