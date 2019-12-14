class Boot extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "assets/images/background.jpg");
    this.load.image("base", "assets/images/base.png");
    this.load.image("cloud1", "assets/images/cloud1.png");
    this.load.image("cloud2", "assets/images/cloud2.png");
    this.load.image("cloud3", "assets/images/cloud3.png");
    this.load.image("cloud4", "assets/images/cloud4.png");
    this.load.image("replay", "assets/images/replay.png");
    this.load.image("ribbon", "assets/images/ribbon.png");
    this.load.image("shine", "assets/images/shine.png");
    this.load.image("star", "assets/images/star.png");
    this.load.image("wonboard", "assets/images/wonboard.png");
    this.load.image("wood", "assets/images/wood.png");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
  }
}
