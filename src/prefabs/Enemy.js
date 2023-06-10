class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.setInteractive();
        this.on('pointerup',this.onClick,this);
        this.originaly = y;
        this.init();
    }

    init(){
        //adds enemy timer for random spawns
        const popupTime = Math.random()*5000 + 500;
        this.enemyTimer = this.scene.time.addEvent({
            delay: popupTime,
            loop: false,
            callback: () => {this.popUp(-80)},
            callbackScope: this
        })
    }
    
    popUp(popY){
        const popDuration = 500;
        const targetY = this.y + popY;
        this.scene.tweens.add({
            targets:this,
            y: targetY,
            duration: popDuration,
            ease: 'Bounce',
            onComplete(){
                console.log("enemy pop:" + targetY);
            }
        })
    }

    onClick(){
        if (bullets != 0){
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
                ease: 'Linear',
                onComplete: () => {
                    this.y = this.originaly;
                    this.init();
                }
            })
            this.input.enabled = true;
        }
        
    }
}