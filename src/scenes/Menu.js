class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('cursor', './assets/MouseCursor.png');
        this.load.audio('bgm','./assets/MainTheme.mp3');
        this.load.audio('gunshot','./assets/gunshot.mp3');
    }

    create() {
        //background music 
        if (!this.sound.get('bgm')){
            this.bgm = this.sound.add('bgm', {volume: 0.8, loop: true});
            this.bgm.play();
        }
        this.bgm.resume();
        //gunshot 
        this.gunshot = this.sound.add('gunshot');
        //temporary background color
        this.cameras.main.setBackgroundColor(0xbababa);

        //changes mouse cursor
        this.input.setDefaultCursor('url(./assets/MouseCursor.png) 10 10, auto'); //10 10 adjusts cursor hotspot

        this.input.on('pointerup',this.pointerDown,this);

        //adds menu options to switch to different scenes
        const menuOptions = [
            { text: 'scene1', scene: 'scene1' },
            { text: 'scene2', scene: 'scene2' },
            { text: 'scene3', scene: 'scene3' },
            { text: 'credits', scene: 'endScene' }
        ];
        this.add.text(20,20,'The Good, The Bad, and The Ugly');
        this.moneytext = this.add.text(20,height-40,"$" + money + '.00');
        menuOptions.forEach((option, index) => {
            const y = 100 + index * 100;
            const text = this.add.text(middleX, y, option.text).setOrigin(0.5, 0.5);
            text.setInteractive();
    
            text.on('pointerover', () => {
                text.setFontStyle('bold');
            });
    
            text.on('pointerout', () => {
                text.setFontStyle('normal');
            });
    
            text.on('pointerup', () => {
                this.loadScene(option.scene);

            });
        });

        /*
        let text1 = this.add.text(middleX,100,'scene1').setOrigin(0.5,0.5);
        text1.setInteractive();
        let text2 = this.add.text(middleX,200,'scene2').setOrigin(0.5,0.5);
        text2.setInteractive();
        let text3 = this.add.text(middleX,300,'scene3').setOrigin(0.5,0.5);
        text3.setInteractive();
        let textcredits = this.add.text(middleX,400,'credits').setOrigin(0.5,0.5);
        textcredits.setInteractive();
        text1.on('pointerup',() => this.loadScene('scene1'));
        text2.on('pointerup',() => this.loadScene('scene2'));
        text3.on('pointerup',() => this.loadScene('scene3'));
        textcredits.on('pointerup',() => this.loadScene('endScene'));
        */
    }

    update() {
        
    }

    loadScene(sceneName){
        if (sceneName != 'endScene'){
            this.bgm.pause();
        }
        this.scene.bringToTop('menuScene');
        this.scene.start(sceneName);
    }
    pointerDown() {
        this.gunshot.play();
    }
}