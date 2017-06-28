import PuzzleController from './puzzle_controller'
cc.Class({
    extends: cc.Component,

    properties: {
        cell_bg: {
            type: cc.Prefab,
            default: null
        },
        puzzleCell: {
            type: cc.Prefab,
            default: null
        },
        touchCellList: {
            type: cc.Node,
            default: []
        }
    },

    // use this for initialization
    onLoad: function () {

        this.purCellList = [];
        for (let i = 0 ; i < 2 ; i ++){
            for (let j = 0 ; j < 3 ; j ++){
                let node = cc.instantiate(this.cell_bg);
                node.parent = this.node;
                node.active = false;
                node.position = {
                    x: (3 - 1) * - 0.5 * 260 + j * 260,
                    y: 180 +  260 * i
                };
                this.purCellList.push(node);
            }
        }


        //初始化一个地图
        this.puzzleController = PuzzleController();
        let mapData = this.puzzleController.getPuzzleMap();
        console.log('map data = ' + JSON.stringify(mapData));

        //初始化碎片节点
        this.cellList = [];
        for (let i in mapData){
            let node = cc.instantiate(this.puzzleCell);
            node.parent = this.node;
            node.getComponent("puzzle_cell").init(mapData[i],this);
            this.cellList.push(node);
        }
        this.referCellUI();
    }
    ,
    referCellUI : function () {
        for (let i = 0 ; i < this.cellList.length ; i ++){
            let node = this.cellList[i];
            if (i < 3){
                node.position = this.touchCellList[i].position;
                node.oldPosition = node.position;
            }else {
                node.active = false;
            }
        }
    },
    puzzleCellTouchEnd: function (target) {
      // x
        //得到最近的点
        let minDis = 10000;
        for (let i = 0 ; i < this.purCellList.length ; i ++){
            let purCell = this.purCellList[i];
            let pos = purCell.position;
            let touchEndPos = target.node.position;
            let distance = cc.pDistance(pos,touchEndPos);
            if (distance < minDis){
                minDis = distance;
            }
        }
        cc.log("mndis = " + minDis);
        if (minDis > 100){
            target.setStartPos();
        }else {

        }


    }


});
