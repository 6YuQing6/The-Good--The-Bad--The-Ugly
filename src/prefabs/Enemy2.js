class Enemy2 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, popcounter = -1, popamount = -80) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.setInteractive();
        this.on('pointerup',this.onClick,this);
        this.originaly = y;
        this.popcounter = popcounter;
        this.isClicked = false;
        this.popamount = popamount;
    }

    enemyShoot(){
            this.scene.time.delayedCall(5000, ()=> {
                if (!this.isClicked){
                    this.emit('enemyShot');
                    console.log('enemy shot you!');
                }
                else {
                    console.log("you shot enemy!");
                }
                this.isClicked = false;
                });
    }

    onClick(){
        if (bullets != 0){
            this.isClicked = true;
            this.input.enabled = false;
            money += 1000;
            this.emit('enemyClicked');
            const moveDuration = 500;
            const moveY = this.y + height;
            this.scene.tweens.add({
                targets: this,
                y: moveY,
                duration: moveDuration,
                delay: 100,
                ease: 'Linear'
            })
            this.input.enabled = true;
        }
    }
}