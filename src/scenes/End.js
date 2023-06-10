class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }
    preload(){
    }
    create(){
        //temporary background color
        this.cameras.main.setBackgroundColor(0xbababa);
        this.add.text(20,20,"credits");

        this.add.text(middleX,middleY-60,"Game made by Sunny Han").setOrigin(0.5,0.5);
        this.add.text(middleX,middleY-20,"Sound:").setOrigin(0.5,0.5);
        this.add.text(middleX,middleY,"mixkit - gunshot, revolver_chamber_spin, handgun_click").setOrigin(0.5,0.5);
        this.add.text(middleX,middleY+20,"The Good, the Bad and the Ugly (main title) - Ennio Morricone").setOrigin(0.5,0.5);

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
    }
    loadScene(sceneName){
        this.scene.start(sceneName);
    }
}
