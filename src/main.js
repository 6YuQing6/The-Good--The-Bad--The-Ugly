//Sunny Han
//The Good, The Bad, The Ugly Game
//Approx hrs: 

let config = {
    type: Phaser.CANVAS,
    width: 888,
    height: 480,
    scene: [Menu, Scene1, Scene2, Scene3, End]
  }
  

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyG, keyF, keyUP, keyDOWN, keyR;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 5;
let middleX = game.config.width/2;
let middleY = game.config.height/2;
let width = game.config.width;
let height = game.config.height;
let money = 0;
let bullets = 6;