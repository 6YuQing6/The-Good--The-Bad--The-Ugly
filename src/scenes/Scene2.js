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
    }
    create() {
        //adds audio
        this.gunshot = this.sound.add('gunshot');
        this.gunspin = this.sound.add('gunspin');
        this.gunempty = this.sound.add('gunempty');

        //counts number of bullets in gun
        bullets = 6;
        this.input.on('pointerup',this.handlePointerDown,this);

        //temporary background color
        this.cameras.main.setBackgroundColor(0xbababa);

        //adding parallax backgrounds and enemy sprites
        this.enemyback1 = new Enemy(this,3*middleX/2,middleY-70,'enemy').setOrigin(0.5,0.5);
        this.enemyback2 = new Enemy(this,middleX/2,middleY-70,'enemy').setOrigin(0.5,0.5);
        this.backHouse = this.add.tileSprite(0,0,width,height,'backHouse').setOrigin(0,0);
        this.enemyfront1 = new Enemy(this,middleX/2,middleY+20,'enemy').setOrigin(0.5,0.5);
        this.enemyfront2 = new Enemy(this,3*middleX/2,middleY+20,'enemy').setOrigin(0.5,0.5);
        this.frontHouse = this.add.tileSprite(0,0,width,height,'frontHouse').setOrigin(0,0);

        //enemy clicked
        this.enemyfront1.on('enemyClicked',this.handleEnemyClicked,this); 
        this.enemyfront2.on('enemyClicked',this.handleEnemyClicked,this); 
        this.enemyback1.on('enemyClicked',this.handleEnemyClicked,this);
        this.enemyback2.on('enemyClicked',this.handleEnemyClicked,this);
        

        //ADDS TEXT
        this.add.text(20,20,"scene2");
        this.bullettext = this.add.text(width-60,height-40,"bullets:" + bullets).setOrigin(0.5,0);
        this.moneytext = this.add.text(20,height-40,"$" + money + '.00');
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
            this.loadScene('menuScene');
        });
    }
    reloadgun(){
        bullets = 6;
        this.gunspin.play();
        this.bullettext.setText("bullets:" + bullets);
    }
    update(){
    }
    handlePointerDown(){
        if (bullets != 0){
            this.gunshot.play();
            bullets -= 1;
            this.gunspin.play();
            this.bullettext.setText("bullets:" + bullets);
        }
        else {
            this.gunempty.play();
        }
    }
    handleEnemyClicked(){
        if (bullets != 0){
            this.gunshot.play();
            this.moneytext.setText("$" + money + '.00');
            bullets -= 1;
            this.gunspin.play();
        }
        else {
            this.gunempty.play();
        }
        this.bullettext.setText("bullets:" + bullets);
    }
    loadScene(sceneName){
        this.scene.start(sceneName);
    }
 }