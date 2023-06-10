class Turkey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);
        //scene.physics.add.existing(this);
        this.dead = false;
        this.moveSpeed = 5; // pixels per frame
        this.lanes = [75, 175, 275, 375];
        this.currentlane = 1;
        this.allowinput = true;
        this.delaytime = 1000;
        this.timer = scene.time;
        this.buttonDown = false;
        scene.load.audio('jump','./assets/jump.wav');
        this.jump = scene.sound.add('jump');
    }
      update(keyUP, keyDOWN){
        //left/right movement
        if (this.allowinput) {
          if (!this.dead) {
              if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.buttonDown && this.currentlane != 0) {
                this.currentlane -= 1;
                this.y = this.lanes[this.currentlane];
                this.allowinput = false;
                this.jump.play();
                this.timer.addEvent({
                  delay: this.delayTime,
                  callback: this.enableInput,
                  callbackScope: this
                });
                }
              else if (Phaser.Input.Keyboard.JustDown(keyDOWN) && !this.buttonDown && this.currentlane != 3){
                  this.currentlane += 1;
                  this.y = this.lanes[this.currentlane];
                  this.allowinput = false;
                  this.jump.play();
                this.timer.addEvent({
                  delay: this.delayTime,
                  callback: this.enableInput,
                  callbackScope: this
                });
              }
          }
        }
      }
      reset() {
        this.dead = false;
        this.y = game.config.height - borderUISize - borderPadding;
      }
      enableInput() {
        this.allowinput = true; // Enable input after the delay
      }
}