class Scene2 extends Phaser.Scene {
    constructor() {
        super("scene2");
    }
    preload() {
        this.load.image('backHouse','./assets/HousesBack.png');
        this.load.image('enemy','./assets/enemy.png');
        this.load.image('frontHouse','./assets/HousesFront.png');
        this.load.audio('gunshot','./assets/gunshot.mp3');
        this.load.audio('gunempty','./assets/handgun_click.mp3');
        this.load.audio('gunspin','./assets/revolver_chamber_spin.wav');
        this.load.audio('bombdrop','./assets/bombdrop.wav');
        this.load.image('stoneground','./assets/StoneGround.png');
        this.load.image('sky','./assets/Scene2Sky.png');
        this.load.audio('scream','./assets/WilhelmScream.wav');
        this.load.image('blood','./assets/Blood.png');
        this.load.audio('maintheme','./assets/MainTheme.mp3');
        this.load.audio('hit','./assets/hit.wav');
    }
    
    create() {
        //adds audio
        this.gunshot = this.sound.add('gunshot');
        this.gunspin = this.sound.add('gunspin');
        this.gunempty = this.sound.add('gunempty');
        this.bomb =  this.sound.add('bombdrop');
        this.scream = this.sound.add('scream',{volume: 0.5});
        this.hit = this.sound.add('hit',{volume:2});
        this.maintheme = this.sound.add('maintheme');
        this.maintheme.play();

        this.fog = true;
        this.enemykillcount = 0;

        //counts number of bullets in gun
        bullets = 6;
        this.input.on('pointerup',this.handleEnemyClicked,this);

        //adds spacebar input for reloading gun
        SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.on('keyup-SPACE',this.reloadgun,this);

        //temporary background color
        this.cameras.main.setBackgroundColor(0xbababa);

        //adding parallax backgrounds and enemy sprites
        this.sky = this.add.tileSprite(0,0,width,height,'sky').setOrigin(0,0);
        this.sky.setScrollFactor(0.1);
        this.stoneground = this.add.tileSprite(0,0,width,height,'stoneground').setOrigin(0,0);
        this.enemyback1 = new Enemy(this,3*middleX/2,middleY-70,'enemy',0,-1).setOrigin(0.5,0.5);
        this.enemyback2 = new Enemy(this,middleX/2,middleY-70,'enemy',0,-1).setOrigin(0.5,0.5);
        this.backHouse = this.add.tileSprite(0,0,width,height,'backHouse').setOrigin(0,0);
        this.enemyfront1 = new Enemy(this,middleX/2,middleY+20,'enemy',0,-1).setOrigin(0.5,0.5);
        this.enemyfront2 = new Enemy(this,3*middleX/2,middleY+20,'enemy',0,-1).setOrigin(0.5,0.5);
        this.frontHouse = this.add.tileSprite(0,0,width,height,'frontHouse').setOrigin(0,0);
        this.blood = this.add.tileSprite(0,0,width,height,'blood').setOrigin(0,0).setVisible(false);

        //adding fog
        const fogTimerDelay = 5000; // Delay between fog additions 
        let fog = this.textures.createCanvas('fogText', width, height);
        const fogContext = fog.getContext();
        fogContext.fillstyle = '#b2ddc8';
        fogContext.fillRect(0, 0, width, height);
        fog.refresh();

        this.fogSprite = this.add.sprite(0, 0, fog).setOrigin(0,0);
        this.fogSprite.alpha = 0;
        this.fogTimer = this.time.addEvent({
            delay: fogTimerDelay,
            loop: false,
            callback: this.addFog,
            callbackScope: this
        });

        //enemy clicked
        this.enemyfront1.on('enemyClicked',this.handleEnemyEvents,this); 
        this.enemyfront2.on('enemyClicked',this.handleEnemyEvents,this); 
        this.enemyback1.on('enemyClicked',this.handleEnemyEvents,this);
        this.enemyback2.on('enemyClicked',this.handleEnemyEvents,this);
        //enemy shot you
        this.enemyfront1.on('enemyShot',this.playerDeath,this); 
        this.enemyfront2.on('enemyShot',this.playerDeath,this); 
        this.enemyback1.on('enemyShot',this.playerDeath,this);
        this.enemyback2.on('enemyShot',this.playerDeath,this);
        

        //ADDS TEXT
        ////instructions fade away
        const instructions = this.add.text(middleX,middleY-20,"Press Space to Reload").setOrigin(0.5,0.5).setFontSize(40).setFontStyle('bold');
        this.tweens.add({
            targets: instructions,
            alpha: 0,
            duration: 1000,
            delay: 1000,
            onComplete: () => {
                instructions.destroy();
            }
        });
        this.add.text(20,20,"scene2");
        this.bullettext = this.add.text(width-60,height-40,"bullets:" + bullets).setOrigin(0.5,0);
        this.moneytext = this.add.text(20,height-40,"$" + money + '.00');
        this.deathtext = this.add.text(middleX,middleY-20,"You Died").setOrigin(0.5,0.5).setFontSize(40).setFontStyle('bold').setVisible(false);
        this.enemykilledtext = this.add.text(middleX,middleY+20,"Enemies kiled: " + this.enemykillcount).setOrigin(0.5,0.5).setFontSize(30).setFontStyle('bold').setVisible(false);
        //adds back text
        const back = this.add.text(width - 60, 20, 'back');
        back.setInteractive();
        back.on('pointerover', () => {
            back.setFontStyle('bold');
        });

        back.on('pointerout', () => {
            back.setFontStyle('normal');
        });

        back.on('pointerup', () => {
            this.maintheme.stop();
            this.loadScene('menuScene');
        });
    }
    update(){
        this.sky.tilePositionX += 0.1;
    }
    reloadgun(){
        if (bullets != 6){
            bullets++;
            this.gunspin.play();
        }
        else {
            this.gunempty.play();
        }
        this.bullettext.setText("bullets:" + bullets);
    }
    handleEnemyEvents(){
        this.handleEnemyClicked();
        this.handleEnemyDeath();
    }
    handleEnemyClicked(){
        if (bullets != 0){
            this.gunshot.play();
            this.cameras.main.shake(50);
            bullets -= 1;
            //this.gunspin.play();
        }
        else {
            this.gunempty.play();
        }
        this.moneytext.setText("$" + money + '.00');
        this.bullettext.setText("bullets:" + bullets);
    }
    handleEnemyDeath(){
        this.scream.play();
        this.enemykillcount++;
    }
    playerDeath(){
        this.hit.play();
        this.blood.setVisible(true);
        this.maintheme.stop();
        this.fog = false;
        this.deathtext.setVisible(true);
        this.deathtext.alpha = 0;
        this.enemykilledtext.setVisible(true);
        this.enemykilledtext.setText("Enemies kiled: " + this.enemykillcount);
        this.enemykilledtext.alpha = 0;
        S2 = false;
        this.time.delayedCall(2000, () => {
            this.tweens.add({
                targets: [this.deathtext,this.enemykilledtext],
                alpha: 0.85,
                duration: 1000,
                ease: 'Linear',
                repeat: 0,
                yoyo:false,
                onComplete: ()=> {
                    this.time.delayedCall(2000, () => {
                        this.scene.start('menuScene');
                    }, [], this);
                }
            });
        }, [], this);
        console.log('you died');
    }
    loadScene(sceneName){
        this.scene.start(sceneName);
    }
    
    addFog(){
        if(this.fog){
            this.bomb.play();
            this.time.delayedCall(2000, () => {
            this.tweens.add({
                targets: this.fogSprite,
                alpha: 0.70,
                duration: 1000,
                ease: 'Elastic.Out',
                repeat: 0,
                yoyo:false,
                onComplete: ()=> {
                    this.time.delayedCall(4000, () => {
                        this.removeFog();
                    }, [], this);
                }
            });
        }, [], this);
        }
    }
    removeFog(){
        let fogTween = this.tweens.add({
            targets: this.fogSprite,
            alpha: 0,
            duration: 6000,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    if (this.fog){
                        this.addFog();
                    }
                }, [], this);
            }
        });
    }
    
 }