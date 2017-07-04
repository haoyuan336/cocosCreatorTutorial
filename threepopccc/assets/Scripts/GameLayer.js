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
        this.indexHeight = 0;
    },
    initGame: function () {
        this.cellList = [];
        let gameData = global.gameDataController.getGameData();
        let index = 0;
        for (let i = 0 ; i < defines.gameDataHeight ; i ++){
            for (let j = 0 ; j < defines.gameDataWidth; j ++){

                let node = cc.instantiate(this.CellPrefab);
                node.parent = this.node;
                // node.nullPos = this.nullPosList[ (defines.gameDataHeight - 1) * defines.gameDataWidth + j];
                let data = gameData[ i * defines.gameDataWidth + j];
                data.index = index;
                node.getComponent('Cell').init(data);
                this.cellList.push(node);
                index ++;

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
                                    100 * i );
                this.nullPosList.push(node);
                // global.gameDataController.nullPosList.push(node);
            }
        }
    },
    update: function () {
       for (let i = 0 ; i < this.cellList.length ; i ++){
           let cell = this.cellList[i];
           if (cell.indexWidth === undefined && cell.indexHeight === undefined){
               cell.indexHeight = defines.gameDataHeight - 1;
               cell.indexWidth = i % defines.gameDataWidth;
           }


           if (cell.indexHeight > 0){
               let nullPos = this.nullPosList[cell.indexHeight * defines.gameDataWidth + cell.indexWidth];
               if (nullPos.cell === undefined){
                   nullPos.cell = cell;
                   cell.getComponent("Cell").pushAnimationData({
                       type: "move",
                       position: nullPos.position
                   })
               }else {
                    cell.indexHeight -= 1;
               }
           }



       }

    }
});
