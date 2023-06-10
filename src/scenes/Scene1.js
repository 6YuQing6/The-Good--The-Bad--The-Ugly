class Scene1 extends Phaser.Scene {
    
    constructor() {
        super("scene1");
    }
    preload() {
        this.load.image('sky','./assets/Sky.png');
        this.load.image('ground','./assets/DesertGround.png');
        this.load.image('mountain','./assets/Mountain.png');
        this.load.image('noose','./assets/Noose.png');
        this.load.audio('gunshot','./assets/gunshot.mp3');
    }
    create() {
        //gunshot 
        this.gunshot = this.sound.add('gunshot');
        this.input.on('pointerup',this.handleNooseClicked,this);

        //temporary background color
        this.cameras.main.setBackgroundColor(0xbababa);

        //adding parallax backgrounds
        this.sky = this.add.tileSprite(0,0,width,height,'sky').setOrigin(0,0);
        this.mountain = this.add.tileSprite(0,0,width,height,'mountain').setOrigin(0,0);
        this.ground = this.add.tileSprite(0,0,width,height,'ground').setOrigin(0,0);

        //adds noose sprite
        this.noose = new Noose(this,middleX,0,'noose');
        this.noose.on('nooseClicked',this.handleNooseClicked,this); 

        //set up camera to follow mouse
        this.cameras.main.setBounds(0,0,width,height);
        this.cameras.main.startFollow(this.input.mousePointer);

        this.sky.scrollFactorX = 0.1;
        this.mountain.scrollFactorX = 0.3;
        this.ground.scrollFactorX = 5;

        //testing mouse position
        this.mousePositionText = this.add.text(20,height-20,'MousePos: (0, 0)');

        //adds text 
        this.add.text(20,20,"scene1");
        //moneymoneymoney
        this.moneytext = this.add.text(20,height-40,"$" + money + '.00');
        //instructions fade away
        const instructions = this.add.text(middleX,middleY-20,"Click to Shoot").setOrigin(0.5,0.5).setFontSize(40).setFontStyle('bold');
        this.tweens.add({
            targets: instructions,
            alpha: 0,
            duration: 1000,
            delay: 1000,
            onComplete: () => {
                instructions.destroy();
            }
        });
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
        this.sky.tilePositionX = mouseX - this.cameras.main.midPoint.x * this.sky.scrollFactorX;
        this.mountain.tilePositionX = mouseX - this.cameras.main.midPoint.x * this.mountain.scrollFactorX;
        this.ground.tilePositionX = mouseX - this.cameras.main.midPoint.x * this.ground.scrollFactorX;
        
    }
    loadScene(sceneName){
        this.scene.start(sceneName);
    }
    handleNooseClicked() {
        this.gunshot.play();
        this.moneytext.setText("$" + money + '.00');
    }
 }