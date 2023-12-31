//Sunny Han
//The Good, The Bad, The Ugly Game

//Phaser components used: cameras, text objects, tween manager, timers, tilemaps, interactive objects

let config = {
    type: Phaser.CANVAS,
    width: 888,
    height: 480,
    scene: [Menu, Scene1, Scene2, Scene3, End]
  }
  

let game = new Phaser.Game(config);

// reserve keyboard vars
let SPACE;
let S1 = true;
let S2 = true;
let S3 = true;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 5;
let middleX = game.config.width/2;
let middleY = game.config.height/2;
let width = game.config.width;
let height = game.config.height;
let money = 0;
let bullets = 6;