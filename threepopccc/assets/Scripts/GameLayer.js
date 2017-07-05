import defines from './defines'
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
                node.getComponent('cell').init(data);
                node.indexRow = i;
                node.indexLine = j;
                node.getComponent('cell').pushAnimationData({
                    type: "move",
                    position: (()=>{
                        let nullPos = this.nullPosList[(node.indexRow) * defines.gameDataWidth + j];
                        nullPos.cell = node;
                        return nullPos.position;
                    })()
                });

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
        for (let i in this.cellList){
            let cell = this.cellList[i];
            if (cell.getComponent('cell').getIsMoving() === false){
                let index = cell.indexRow * defines.gameDataWidth + cell.indexLine;
                // cc.log('index = ' + index);
                let nullCell = this.nullPosList[index];
                if (cc.pDistance(cell.position,nullCell.position) > 10){
                    cell.getComponent("cell").pushAnimationData({
                        type: 'move',
                        position: nullCell.position
                    })
                }
            }
        }
    },
    cellScrollDirection: function (target) {
        //得到方向之后，先来计算操作
        let direction = target.getDirection();
        let index = undefined;
        cc.log("Direction = " + direction);
        switch (direction){
            case "UP":
                // cell = this.cellList[];
                if (target.node.indexRow === defines.gameDataHeight - 1){
                    return;
                }
                index = (target.node.indexRow + 1) * defines.gameDataWidth + target.node.indexLine;
                break;
            case "DOWN":
                if (target.node.indexRow === 0){
                    return;
                }
                // cell = this.cellList[];
                index = (target.node.indexRow - 1) * defines.gameDataWidth + target.node.indexLine;
                break;
            case "LEFT":
                if (target.node.indexLine === 0){
                    return
                }
                // cell = this.cellList[cell.indexRow  * defines.gameDataWidth + cell.indexLine - 1];
                index = target.node.indexRow  * defines.gameDataWidth + target.node.indexLine - 1;
                break;
            case "RIGHT":
                if (target.node.indexLine === defines.gameDataWidth - 1){
                    return
                }
                // cell = this.cellList[cell.indexRow  * defines.gameDataWidth + cell.indexLine + 1];
                index = target.node.indexRow  * defines.gameDataWidth + target.node.indexLine + 1;
                break;
            default:
                break;
        }

        cc.log("index = " + index);
        let cell = this.cellList[index];
        ///开始计算
        if (global.gameDataController.checkCanSet(target, this.cellList) || global.gameDataController.checkCanSet(cell, this.cellList)){
            //首先根据节点在列表中的位置，进行交换
            let index1 = target.node.indexRow * defines.gameDataWidth + target.node.indexLine;
            let index2 = index;
            let temp = this.cellList[index1];
            this.cellList[index1] = this.cellList[index2];
            this.cellList[index2] = temp;

            temp = target.node.indexRow;
            target.node.indexRow = cell.indexRow;
            cell.indexRow = temp;
            temp = target.node.indexLine;
            target.node.indexLine = cell.indexLine;
            cell.indexLine = temp;
            cc.log("交换");
        }
        //两者交换
        cell.getComponent("cell").pushAnimationData({
            type: "move",
            position: target.node.position
        });
        target.pushAnimationData({
            type: "move",
            position: cell.position
        });
    }

});
