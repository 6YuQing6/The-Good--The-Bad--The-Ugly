class Scene3 extends Phaser.Scene {
    constructor() {
        super("scene3");
    }
    preload() {
        this.load.image('graveFront','./assets/GraveStoneFront.png');
        this.load.image('graveBack','./assets/GraveStoneBack.png');
        this.load.image('enemy','./assets/enemy.png');
        this.load.image('sky','./assets/Sky.png');
        this.load.audio('gunshot','./assets/gunshot.mp3');
        this.load.audio('gunempty','./assets/handgun_click.mp3');
        this.load.audio('gunspin','./assets/revolver_chamber_spin.wav');
        this.load.audio('finale','./assets/TheTrio_finalstandoff.mp3');
        this.load.image('blood','./assets/Blood.png');
        this.load.audio('scream','./assets/WilhelmScream.wav');
        this.load.audio('hit','./assets/hit.wav');
    }
    create() {
        //adds audio
        bullets = 6;
        this.gunshot = this.sound.add('gunshot');
        this.gunspin = this.sound.add('gunspin');
        this.gunempty = this.sound.add('gunempty');
        this.scream = this.sound.add('scream',{volume: 0.5});
        this.hit = this.sound.add('hit',{volume:2});
        this.finale = this.sound.add('finale',{volume: 0.8, loop: false});
        this.finale.play();
        //adds shooting 
        this.input.enabled = false;
        this.input.on('pointerup',this.handleEnemyClicked,this);
        
        //temporary background color
        this.cameras.main.setBackgroundColor(0xbababa);

        //adds parallax backgrounds
        this.sky = this.add.tileSprite(0,0,width,height,'sky').setOrigin(0,0);
        this.sky.setScrollFactor(0.1);
        this.graveBack = this.add.tileSprite(0,0,width,height,'graveBack').setOrigin(0,0);
        this.graveFront = this.add.tileSprite(0,0,width,height,'graveFront').setOrigin(0,0);

        //adds enemy sprites
        this.rightenemy = new Enemy2(this,middleX/2,middleY+100,'enemy',0,0).setScale(1.4);
        this.leftenemy = new Enemy2(this,3*middleX/2,middleY+100,'enemy',0,0).setScale(1.4);
        this.blood = this.add.tileSprite(0,0,width,height,'blood').setOrigin(0,0).setVisible(false);
        this.enemykillcount = 0;

        //sets up camera movement to focus on enemy sprites
        let enemyCameraDelay = 3000;
        this.x = 1;
        this.zoomlevel = 2;
        this.cameras.main.startFollow(this.rightenemy);
        this.enemyTimer = this.time.addEvent({
            delay: enemyCameraDelay,
            loop: true,
            callback: this.switchCameraTarget,
            callbackScope: this
        });

        this.time.delayedCall(enemyCameraDelay * 14, () => {
            this.enemyTimer.remove(false);
            this.cameras.main.startFollow(this.input.mousePointer);
            this.cameras.main.zoom = 1;
            this.input.enabled = true;
            this.rightenemy.enemyShoot();
            this.leftenemy.enemyShoot();
        }, [], this);


        //enemy clicked
        this.rightenemy.on('enemyClicked',this.handleEnemyEvents,this); 
        this.leftenemy.on('enemyClicked',this.handleEnemyEvents,this); 
        //enemy shot you
        this.rightenemy.on('enemyShot',this.playerDeath,this); 
        this.leftenemy.on('enemyShot',this.playerDeath,this);

        //set up camera to follow mouse
        this.cameras.main.setBounds(0,0,width,height);
        this.cameras.main.startFollow(this.input.mousePointer);
        this.graveBack.scrollFactorX = 0.1;
        this.graveFront.scrollFactorX = 0.3;


        //testing mouse position
        //this.mousePositionText = this.add.text(20,height-20,'MousePos: (0, 0)');
        //moneymoneymoney
        this.moneytext = this.add.text(20,height-40,"$" + money + '.00');
        //adds text
        this.deathtext = this.add.text(middleX,middleY-20,"You Died").setOrigin(0.5,0.5).setFontSize(40).setFontStyle('bold').setVisible(false);
        this.add.text(20,20,"scene3");
        const back = this.add.text(width - 60, 20, 'back');
        back.setInteractive();
        back.on('pointerover', () => {
            back.setFontStyle('bold');
        });

        back.on('pointerout', () => {
            back.setFontStyle('normal');
        });

        back.on('pointerup', () => {
            this.finale.stop();
            this.loadScene('menuScene');
        });
    }
    update(){
        //mouse position testing
        const mouseX = this.input.mousePointer.x;
        const mouseY = this.input.mousePointer.y;
        //this.mousePositionText.setText('MousePos: ' + mouseX + ' ' + mouseY);

        //adjusts parallax background positions - needs to fix
        
        this.sky.tilePositionX += 0.1;
        /*
        this.graveFront.tilePositionX = mouseX - this.cameras.main.midPoint.x * this.graveFront.scrollFactorX;
        this.graveBack.tilePositionX = mouseX - this.cameras.main.midPoint.x * this.graveBack.scrollFactorX;
        */
    }

    switchCameraTarget(){
        //this.cameras.main.zoomTo(1,500);
        if (this.x % 2 == 0){
            this.cameras.main.startFollow(this.rightenemy);
            console.log('swtich to left');
        }
        else{
            console.log('switch to right');
            this.cameras.main.startFollow(this.leftenemy);
        }
        this.x++;
        this.cameras.main.zoomTo(this.zoomlevel, 1000);
        this.zoomlevel += 0.1;
    }
    handleEnemyEvents(){
        this.handleEnemyClicked();
        this.handleEnemyDeath();
    }
    handleEnemyDeath(){
        this.scream.play();
        this.enemykillcount++;
        if (this.enemykillcount == 2){
            this.playerWin();
        }
    }
    handleEnemyClicked(){
        if (bullets != 0){
            this.gunshot.play();
            this.cameras.main.shake(50);
            //this.gunspin.play();
        }
        else {
            this.gunempty.play();
        }
        this.moneytext.setText("$" + money + '.00');
        //this.bullettext.setText("bullets:" + bullets);
    }
    playerDeath(){
         //reset camera
         this.cameras.main.stopFollow();
         this.cameras.main.setZoom(1);
         this.cameras.main.setBounds(0, 0, width, height);
         this.hit.play();
        this.blood.setVisible(true);
        this.deathtext.setVisible(true);
        this.deathtext.alpha = 0;
        S3 = false;
        this.time.delayedCall(2000, () => {
            this.tweens.add({
                targets: this.deathtext,
                alpha: 0.85,
                duration: 1000,
                ease: 'Linear',
                repeat: 0,
                yoyo:false,
                onComplete: ()=> {
                    this.time.delayedCall(2000, () => {
                        this.scene.start('endScene');
                    }, [], this);
                }
            });
        }, [], this);
        console.log('you died');
    }
    playerWin(){
        //reset camera
        this.cameras.main.stopFollow();
        this.cameras.main.setZoom(1);
        this.cameras.main.setBounds(0, 0, width, height);

        this.deathtext.setVisible(true);
        this.deathtext.setText('You Win!');
        this.deathtext.alpha = 0;
        S3 = false;
        this.time.delayedCall(2000, () => {
            this.tweens.add({
                targets: this.deathtext,
                alpha: 0.85,
                duration: 1000,
                ease: 'Linear',
                repeat: 0,
                yoyo:false,
                onComplete: ()=> {
                    this.time.delayedCall(2000, () => {
                        this.scene.start('endScene');
                    }, [], this);
                }
            });
        }, [], this);
    }
    loadScene(sceneName){
        this.scene.start(sceneName);
    }
 }