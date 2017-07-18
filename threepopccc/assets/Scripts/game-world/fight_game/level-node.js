import global from './../../global'
import monsterleveldata from './../../data/config/monster-level-data'
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function () {
        //初始化一些数据
        global.gameData.monsterData = monsterleveldata[global.gameData.monsterType];
        cc.log("monster data = " + JSON.stringify(global.gameData.monsterData));

    },


});
