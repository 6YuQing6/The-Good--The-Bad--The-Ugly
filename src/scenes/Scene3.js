class Scene3 extends Phaser.Scene {
    constructor() {
        super("scene3");
    }
    preload() {
        this.load.image('graveFront','./assets/GraveStoneFront.png');
        this.load.image('graveBack','./assets/GraveStoneBack.png');
        this.load.image('enemy','./assets/enemy.png');
        this.load.audio('gunshot','./assets/gunshot.mp3');
        this.load.audio('gunempty','./assets/handgun_click.mp3');
        this.load.audio('gunspin','./assets/revolver_chamber_spin.wav');
    }
    create() {
        //adds audio
        this.gunshot = this.sound.add('gunshot');
        this.gunspin = this.sound.add('gunspin');
        this.gunempty = this.sound.add('gunempty');


        //temporary background color
        this.cameras.main.setBackgroundColor(0xbababa);

        //adds parallax backgrounds
        this.graveBack = this.add.tileSprite(0,0,width,height,'graveBack').setOrigin(0,0);
        this.graveFront = this.add.tileSprite(0,0,width,height,'graveFront').setOrigin(0,0);

        //adds enemy sprites
        this.rightenemy = new Enemy(this,middleX/2,middleY,'enemy');
        this.rightenemy = new Enemy(this,3*middleX/2,middleY,'enemy');

        //set up camera to follow mouse
        this.cameras.main.setBounds(0,0,width,height);
        this.cameras.main.startFollow(this.input.mousePointer);

        this.graveBack.scrollFactorX = 0.1;
        this.graveFront.scrollFactorX = 0.3;


        //testing mouse position
        this.mousePositionText = this.add.text(20,height-20,'MousePos: (0, 0)');
        //moneymoneymoney
        this.moneytext = this.add.text(20,height-40,"$" + money + '.00');
        //adds text
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
            this.loadScene('menuScene');
        });
    }
    update(){
        //mouse position testing
        const mouseX = this.input.mousePointer.x;
        const mouseY = this.input.mousePointer.y;
        this.mousePositionText.setText('MousePos: ' + mouseX + ' ' + mouseY);

        //adjusts parallax background positions - needs to fix
        this.graveFront.tilePositionX = mouseX - this.cameras.main.midPoint.x * this.graveFront.scrollFactorX;
        this.graveBack.tilePositionX = mouseX - this.cameras.main.midPoint.x * this.graveBack.scrollFactorX;
    }
    loadScene(sceneName){
        this.scene.start(sceneName);
    }
 }