import defines from './defines'
// import GameDataController from './GameDataController'
import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        CellPrefab: {
            type: cc.Prefab,
            default: null
        },
        NullPosPrefab: {
            type: cc.Prefab,
            default: null
        }
    },
    onLoad: function () {
        this.initNullPos();
        this.initGame();
    },
    initGame: function () {
        let gameData = global.gameDataController.getGameData();
        for (let i = 0 ; i < defines.gameDataHeight ; i ++){
            for (let j = 0 ; j < defines.gameDataWidth; j ++){

                let node = cc.instantiate(this.CellPrefab);
                node.parent = this.node;
                node.nullPos = global.gameDataController.nullPosList[ (defines.gameDataHeight - 1) * defines.gameDataWidth + j];
                let data = gameData[ i * defines.gameDataWidth + j];
                data.indexWidth = j;
                data.indexHeight = i;
                node.getComponent('Cell').init(data);

            }
        }
    },
    initNullPos: function () {
        this.nullPosList = [];
        for (let i = 0 ; i < defines.gameDataHeight ; i ++){
            for (let j = 0 ; j < defines.gameDataWidth ; j ++){
                let node = cc.instantiate(this.NullPosPrefab);
                node.parent = this.node;
                node.position = cc.p((defines.gameDataWidth - 1) * - 0.5 * 100 + 100 * j,
                                    100 * i - 400);
                // this.nullPosList.push(node);
                global.gameDataController.nullPosList.push(node);
            }
        }
    },
    update: function (dt) {

    }
});
