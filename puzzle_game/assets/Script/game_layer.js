import PuzzleController from './puzzle_controller'
import defines from './game_defines'
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
                    y:  440-  260 * i
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
        let index = 0;
        for (let i in mapData){
            let node = cc.instantiate(this.puzzleCell);
            node.parent = this.node;
            node.getComponent("puzzle_cell").init(mapData[i],this,index);
            this.cellList.push(node);
            index ++;
        }
        this.referCellUI();
    }
    ,
    referCellUI : function () {
        let index = 0;
       for (let i = 0 ; i < this.cellList.length ; i ++){
           let cell = this.cellList[i];
           if (cell.getComponent('puzzle_cell').getIsOnTouchMap()){
               // console.log('is on map');
               cell.active = true;
                if (index < 3){
                    cell.position = this.touchCellList[index].position;
                }else {
                    cell.active = false;
                }
               index ++;

           }
       }


    },
    puzzleCellTouchEnd: function (target) {
      // x
        //得到最近的点
        let minDis = 10000;
        let purPos = undefined;
        for (let i = 0 ; i < this.purCellList.length ; i ++){
            let purCell = this.purCellList[i];
            let pos = purCell.position;
            let touchEndPos = target.node.position;
            let distance = cc.pDistance(pos,touchEndPos);
            if (distance < minDis){
                minDis = distance;
                purPos = pos;
            }
        }
        //再次检测碰撞
        let nodeMinDis = 10000;
        for  (let i = 0 ; i < this.cellList.length ; i ++){
            let node = this.cellList[i];
            if (node.getComponent('puzzle_cell').getIsOnMap()){
                let dis = cc.pDistance(purPos, node.position);
                if (dis < nodeMinDis){
                    nodeMinDis = dis;
                }
            }
        }
        if (minDis < 140 && nodeMinDis > 140){
            target.node.position = purPos;
            target.setOnMap();
        }else {
            target.setOnTouchMap();

        }
        this.referCellUI();
        // cc.log("mndis = " + minDis);

        //检测胜利失败
        this.checkWin();

    },
    checkWin: function () {
        //首先检查，是否所有的点都在地图上了
        for (let i in this.cellList){
            let cell = this.cellList[i];
            if (cell.getComponent("puzzle_cell").getIsOnMap() === false){
                return
            }
        }
        console.log('都在地图上了');
        //开始检测位置
        //做进一步的碰撞检测
        for (let i = 0 ; i < this.cellList.length ; i ++) {
            let cell = this.cellList[i];
            let purCell = this.purCellList[cell.getComponent('puzzle_cell').index];
            let dis = cc.pDistance(purCell.position,cell.position);
            console.log('dis = ' + dis);
            if (dis > 10){

                //有一个方块没在正确的位置上，所以返回
                console.log('这个点不在地图上' + cell.getComponent('puzzle_cell').index);
                return
            }
        }


        console.log('全面胜利了');



        //全面胜利之后 ，加载游戏胜利界面
        this.node.parent.getComponent("layout_controller").gameSuccess();


    },
    puzzleCellTouchBegan: function (target) {

        for (let i in this.cellList){
            this.cellList[i].zIndex = 10;
        }
        target.node.zIndex = 100;
        this.referCellUI();

    }
});
