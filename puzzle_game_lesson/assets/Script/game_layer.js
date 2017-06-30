import PuzzleDataController from './puzzle_data_controller'
cc.Class({
    extends: cc.Component,

    properties: {
        mapCell: {
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
        //初始化 上部的六个脆片位置
        this.mapCellList = [];
        for (let i = 0 ; i < 2 ; i ++){
            for (let j = 0 ; j < 3 ; j ++){
                let node = cc.instantiate(this.mapCell);
                node.parent = this.node;
                node.position = cc.p(
                  (3 - 1 ) * - 0.5 * 260 + j * 260,
                  260 * i + 126 //列表是中左下角开始的
                );
                this.mapCellList.push(node);
            }
        }
        ///初始化拼图碎片
        this.puzzleDataController = PuzzleDataController();
        let gameData = this.puzzleDataController.getGameData();//获取一组游戏数据
        this.puzzleCellList = [];
        for (let i = 0 ; i < gameData.length ; i ++){
            let node = cc.instantiate(this.puzzleCell);
            node.parent = this.node;
            node.getComponent('puzzle_cell').init(gameData[i], i);
            this.puzzleCellList.push(node);
        }
        this.referPuzzleCellPos();
    },
    referPuzzleCellPos : function () {
        let index = 0;
        for (let i in this.puzzleCellList){
            let puzzleCell = this.puzzleCellList[i];
            puzzleCell.active = true;
            if (puzzleCell.getComponent('puzzle_cell').getIsOnTouchMap()){
                if (index < 3){
                    puzzleCell.position = this.touchCellList[index].position
                }else {
                    puzzleCell.active = false;
                }
                index ++
            }
        }
    },
    puzzleCellTouchStart: function (target) {
        //开始触摸

        target.setOnDragging();
        this.scortZoder(target);
        this.referPuzzleCellPos();

    },
    scortZoder: function (target) {
        for (let i = 0 ; i < this.puzzleCellList.length ; i ++){
            this.puzzleCellList[i].zIndex = 10
        }
        target.node.zIndex = 100;
    },
    puzzleCellTouchEnd: function (target) {
        //触摸结束
        //找到离puzzle_cell最近的点
        let minMapDis = 10000;
        let purMapPos = undefined;
        for (let i in this.mapCellList){
            let mapCell = this.mapCellList[i];
            let dis = cc.pDistance(mapCell.position, target.node.position); //取得亮点之的距离
            if (dis < minMapDis){
                minMapDis = dis;
                purMapPos = mapCell.position;
            }
        }
        console.log('min map dis = ' + minMapDis);
        //获取跟其他随便最短的距离
        let minPuzzleDis = 10000;
        for (let i in this.puzzleCellList){
            let puzzle = this.puzzleCellList[i];
            if (puzzle.getComponent("puzzle_cell").getIsOnMap()){
                let dis = cc.pDistance(puzzle.position, purMapPos);
                if (dis < minPuzzleDis){
                    minPuzzleDis = dis;
                }
            }
        }

        if (minMapDis < 140 && minPuzzleDis > 150){
            target.node.position = purMapPos;
            target.setOnMap();
        }else {
            target.setOnTouch();
        }
        this.referPuzzleCellPos();


        this.checkWin();
    }

    ,
    checkWin : function () {
        for (let i in this.puzzleCellList){
            let puzzle = this.puzzleCellList[i];
            if (puzzle.getComponent("puzzle_cell").getIsOnMap() === false){
                return
            }
        }
        //六个碎片都在地图上
        //这时候检查，每个点的位置是否都恰当
        //得到一个新的列表

        let list = [];
        for (let i in this.mapCellList){
            let cell = this.mapCellList[i];
            //找到离这个点最近的快
            let minDis = 10000;
            let data = undefined;
            for (let j in this.puzzleCellList){
                let puzzle = this.puzzleCellList[j];
                let dis = cc.pDistance(puzzle.position ,cell.position);
                if (dis < minDis){
                    minDis = dis;
                    data = puzzle.getComponent('puzzle_cell').getPuzzleData();
                }
            }
            list.push(data);
        }


        //得到一个新的列表
        cc.log('new list = ' + JSON.stringify(list));

        //让管理器来计算是否符合地图规则
        let isSuccess = this.puzzleDataController.getIsSuccess(list);
        console.log('is success = ' + isSuccess);
        if (isSuccess){
            this.node.parent.getComponent("canvas_controller").gameOver();
        }
    }



});
