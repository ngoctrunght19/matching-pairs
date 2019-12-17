class Boot extends Phaser.Scene {
  constructor() {
    super("BootGame");
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
    this.load.on("progress", (percent) => {
      // console.log(percent);
    })
  }

  create() {
    var urlParams = new URLSearchParams(window.location.search);
    var res = this.httpGet(`https://hoclieu.sachmem/api/annotator/search?${urlParams.toString()}`);
    console.log(res);
    this.scene.start("PlayGame");
  }

  httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }
}
