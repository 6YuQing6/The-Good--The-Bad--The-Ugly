class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, popcounter = -1, popamount = -80) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.setInteractive();
        this.on('pointerup',this.onClick,this);
        this.originaly = y;
        this.init();
        this.popcounter = popcounter;
        this.isClicked = false;
        this.isDown = true;
        this.popamount = popamount;
    }

    init(){
        this.isDown = true;
        if (this.popcounter != 0) {
            //adds enemy timer for random spawns
            const popupTime = Math.random()*5000 + 500;
            this.enemyTimer = this.scene.time.addEvent({
                delay: popupTime,
                loop: false,
                callback: () => {this.popUp(this.popamount)},
                callbackScope: this
            })
            this.popcounter--;
            
        }
    }
    
    popUp(popY){
        const popDuration = 500;
        const targetY = this.y + popY;
        this.isDown = false;
        let t = this.scene.tweens.add({
            targets:this,
            y: targetY,
            duration: popDuration,
            ease: 'Bounce',
            onComplete: this.enemyShoot()
        })
    }

    enemyShoot(){
            console.log("enemy pop:" + this.y);
            this.scene.time.delayedCall(3000, ()=> {
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
        if (bullets != 0 && !this.isDown){
            bullets++;
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