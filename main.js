var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 800,
  backgroundColor: "#00000",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Game]
}

var game = new Phaser.Game(config);

// var urlParams = new URLSearchParams(window.location.search);
// var question_id = urlParams.get('question_id');
