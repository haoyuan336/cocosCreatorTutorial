import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
       heartLabel: {
           type: cc.Label,
           default: null
       },
        scoreLabel: {
            type: cc.Label,
            default: null
        },
        distanceLabel: {
            type: cc.Label,
            default: null
        },
        progressBar: {
            type: cc.ProgressBar,
            default: null
      }
    },

    onLoad: function () {

      global.gameData.init();//在这里初始化数据
    },
    update: function () {
        this.heartLabel.string ="heart:" + global.gameData.heartCount;
        this.scoreLabel.string = "score:" + global.gameData.scoreCount;
        this.distanceLabel.string = "distance: " + global.gameData.distanceCount;
        this.progressBar.progress = global.gameData.getEnergyProgress();
    }
});
