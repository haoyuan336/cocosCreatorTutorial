import global from './global'
import defines from './defines'
cc.Class({
    extends: cc.Component,

    properties: {
        levelNodePrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {

        // global.gameData.monsterType = defines.monsterType.monster_0;
        // let levelNode = cc.instantiate(this.levelNodePrefab);
        // levelNode.parent = this.node;
    },


});
