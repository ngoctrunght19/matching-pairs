class Game extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.image(0, 0, "background").setOrigin(0);
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

    this.initBoxes();

    this.initialTime = 0;
    this.timer = this.add.text(20, 20, 'Time: ' + this.formatTime(this.initialTime), {
      font: '20px',
      stroke: '#000000',
      strokeThickness: 3,
      fill: '#ffffff'
    });
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.countUp, callbackScope: this, loop: true });
    this.tipNumber = 0;
    this.tip = this.add.text(config.width - 20, 20, 'Tips: ' + this.tipNumber, {
      font: '20px',
      stroke: '#000000',
      strokeThickness: 3,
      fill: '#ffffff'
    });
    this.tip.setOrigin(1, 0);

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(3, 0xffffff);
  }

  update() {
    this.moveCloud(this.cloud1, 1);
    this.moveCloud(this.cloud2, 1);
    this.moveCloud(this.cloud3, 1.5);
    this.moveCloud(this.cloud4, 1.7);
    if (this.shine) this.shine.angle += 0.5;
  }

  initBoxes() {
    this.words = ["1", "one", "2", "two", "3", "three", "4", "four", "5", "five"];
    this.solution = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    this.shuffle();
    this.woods = [];
    this.shapes = [];
    this.tempIndex = -1;
    this.score = 0;

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

        this.shapes[shapeIndex] = this.add.text(posX, posY, this.words[shapeIndex], {
          font: '20px',
          fill: '#ffffff'
        });
        this.shapes[shapeIndex].setOrigin(0.5);
        this.shapes[shapeIndex].alpha = 0;
        shapeIndex++;
      }
    };
  }

  winGame() {
    this.timedEvent.paused = true;
    this.shine = this.add.image(config.width / 2, config.height / 2, "shine");
    this.shine.setScale(3);
    this.wonboard = this.add.image(config.width / 2, config.height / 2, "wonboard");
    this.wonboard.setScale(0.5);
    this.replay = this.add.image(config.width / 2, config.height / 2 + 100, "replay")
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on('pointerup', () => this.scene.restart());
  }

  moveCloud(cloud, speed) {
    cloud.x += speed;
    if (cloud.x > config.width) cloud.x = 0;
  }

  woodHoverState(i) {
    this.graphics.clear();
    this.graphics.strokeRect(this.woods[i].x - this.woods[i].width / 2, this.woods[i].y - this.woods[i].height / 2, this.woods[i].width, this.woods[i].height);
  }

  woodRestState(i) {
    this.graphics.clear();
  }

  woodClick(i) {
    if (this.tempIndex == -1) {
      if (this.shapes[i].alpha != 1) {
        this.woods[i].tint = 0;
        this.shapes[i].alpha = 1;
        this.tempIndex = i;
      }
    } else {
      if (this.shapes[i].alpha != 1) {
        this.woods[i].tint = 0;
        this.shapes[i].alpha = 1;
        let j = this.tempIndex;
        if (this.solution[i] == this.solution[j]) {
          this.score += 2;
          if (this.score == this.solution.length) this.winGame();
        } else {
          setTimeout(() => {
            this.woods[i].tint = -1;
            this.shapes[i].alpha = 0;
            this.woods[j].tint = -1;
            this.shapes[j].alpha = 0;
          }, 500)
        }
        this.tempIndex = -1;
        this.increaseTip();
      }
    }
  }

  countUp() {
    this.initialTime += 1;
    this.timer.setText('Time: ' + this.formatTime(this.initialTime));
  }

  increaseTip() {
    this.tipNumber++;
    this.tip.setText('Tips: ' + this.tipNumber);
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

  formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var partInSeconds = seconds % 60;
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    return `${minutes}:${partInSeconds}`;
  }
}
