// import global from './../../global'
// import monsterleveldata from './../../data/config/monster-level-data'
cc.Class({
    extends: cc.Component,

    properties: {
        enemyController: {
            default: null,
            type: cc.Node
        }
       
    },

    onLoad: function () {
        //初始化一些数据
        // global.gameData.monsterData = monsterleveldata[global.gameData.monsterType];
        // cc.log("monster data = " + JSON.stringify(global.gameData.monsterData));

    },
    init: function (data) {
        cc.log("game world " + JSON.stringify(data));
        this.enemyController.getComponent("enemy-controller").init(data);
    },
    onDestroy: function () {

    }
});
