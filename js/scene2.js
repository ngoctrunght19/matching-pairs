class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.cloud1 = this.add.image(100, 100, "cloud1");
    this.cloud2 = this.add.image(400, 80, "cloud2");
    this.cloud3 = this.add.image(1000, 40, "cloud3");
    this.cloud4 = this.add.image(500, 60, "cloud4");
    this.base = this.add.image(config.width / 2, config.height / 2, "base");
    this.ribbon = this.add.image(config.width / 2, 60, "ribbon");
    this.ribbon_text = this.add.text(config.width / 2 - 100, 30, 'MATCHING WORDS', {
      font: '24px',
      stroke: '#000000',
      strokeThickness: 3,
      fill: '#ffffff'
    });
    this.wood = this.add.image(config.width / 2, config.height / 2, "wood");
  }

  update() {
    this.moveCloud(this.cloud1, 1.5);
    this.moveCloud(this.cloud2, 1.7);
    this.moveCloud(this.cloud3, 2);
    this.moveCloud(this.cloud4, 2.2);
  }

  moveCloud(cloud, speed) {
    cloud.x += speed;
    if (cloud.x > config.width) cloud.x = 0;
  }
}
