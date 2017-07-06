import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
       heart_label: {
           type: cc.Label,
           default: null
       },
        score_label: {
            type: cc.Label,
            default: null
        },
        distance_label: {
            type: cc.Label,
            default: null
        }
    },

    onLoad: function () {

      global.gameData.init();//在这里初始化数据
    },

    update: function () {
        this.heart_label.string ="heart:" + global.gameData.heartCount;
        this.score_label.string = "score:" + global.gameData.scoreCount;
        this.distance_label.string = "distance: " + global.gameData.distanceCount;
    }

});
