var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 799,
  backgroundColor: "#00000",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Game]
}

var game = new Phaser.Game(config);
