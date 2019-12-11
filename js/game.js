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

    this.ribbon_text = this.add.text(config.width / 2, 40, 'MATCHING WORDS', {
      font: '24px',
      stroke: '#000000',
      strokeThickness: 3,
      fill: '#ffffff'
    });
    this.ribbon_text.setOrigin(0.5);
    this.placeBoxes();
  }

  update() {
    this.moveCloud(this.cloud1, 1.5);
    this.moveCloud(this.cloud2, 1.7);
    this.moveCloud(this.cloud3, 2);
    this.moveCloud(this.cloud4, 2.2);
  }

  placeBoxes() {
    this.words = ["1", "one", "2", "two", "3", "three", "4", "four", "5", "five"];
    this.solution = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    this.shuffle();
    this.woods = [];
    this.tempIndex = -1;

    let colNumber = Math.ceil(Math.sqrt(this.words.length));
    let rowNumber = Math.ceil(this.words.length / colNumber);
    let shapeIndex = 0;
    for (let rowIndex = 0; rowIndex < rowNumber; rowIndex++) {
      for (let colIndex = 0; colIndex < colNumber && shapeIndex < this.words.length; colIndex++) {
        let posX = config.width / 2 + (colIndex - colNumber / 2 + 0.5) * 133;
        let posY = config.height / 2 + (rowIndex - rowNumber / 2 + 0.5) * 92;
        let i = shapeIndex;
        this.woods[shapeIndex] = this.add.sprite(posX, posY, "wood")
          .setInteractive({ cursor: "pointer" })
          .on('pointerover', () => this.woodHoverState(i))
          .on('pointerout', () => this.woodRestState(i))
          .on('pointerup', () => this.woodClick(i));

        this.words[shapeIndex] = this.add.text(posX, posY, this.words[shapeIndex], {
          font: '20px',
          fill: '#ffffff'
        });
        this.words[shapeIndex].setOrigin(0.5);
        this.words[shapeIndex].alpha = 0;
        shapeIndex++;
      }
    };
  }

  moveCloud(cloud, speed) {
    cloud.x += speed;
    if (cloud.x > config.width) cloud.x = 0;
  }

  woodHoverState(i) {
    // this.wood.alpha = 0.8;
  }

  woodRestState(i) {
    // this.wood.alpha = 1;
  }

  woodClick(i) {
    if (this.tempIndex == -1) {
      if (this.words[i].alpha != 1) {
        this.woods[i].tint = 0;
        this.words[i].alpha = 1;
        this.tempIndex = i;
      }
    } else {
      if (this.words[i].alpha != 1) {
        this.woods[i].tint = 0;
        this.words[i].alpha = 1;
        let j = this.tempIndex;
        if (this.solution[i] != this.solution[j]) {
          setTimeout(() => {
            this.woods[i].tint = -1;
            this.words[i].alpha = 0;
            this.woods[j].tint = -1;
            this.words[j].alpha = 0;
          }, 500)
        }
        this.tempIndex = -1;
      }
    }
  }

  shuffle() {
    var j, x, i;
    for (i = this.words.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.words[i];
      this.words[i] = this.words[j];
      this.words[j] = x;
      x = this.solution[i];
      this.solution[i] = this.solution[j];
      this.solution[j] = x;
    }
  }
}
