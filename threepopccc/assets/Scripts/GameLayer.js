import defines from './defines'
import GameDataController from './GameDataController'
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
        this.gameDataController = GameDataController();
        this.initNullPos();
        this.initGame();
    },
    initGame: function () {
        let gameData = this.gameDataController.getGameData();
        for (let i = 0 ; i < defines.gameDataHeight ; i ++){
            for (let j = 0 ; j < defines.gameDataWidth; j ++){
                let data = gameData[ i * defines.gameDataWidth + j];
                let node = cc.instantiate(this.CellPrefab);
                node.getComponent('Cell').init(data);
                node.parent = this.node;
                node.position = this.nullPosList[ (defines.gameDataHeight - 1) * defines.gameDataWidth + j].position;
            }
        }
    },
    initNullPos: function () {
        this.nullPosList = [];
        for (let i = 0 ; i < defines.gameDataHeight ; i ++){
            for (let j = 0 ; j < defines.gameDataWidth ; j ++){
                let node = cc.instantiate(this.NullPosPrefab);
                node.parent = this.node;
                node.position =cc.p((defines.gameDataWidth - 1) * - 0.5 * 100 + 100 * j,
                                    100 * i - 400);
                this.nullPosList.push(node);
            }
        }
    },
    update: function (dt) {
        
    }
});
