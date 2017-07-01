
//状态机
const PUZZLESTATE = {
    OnTouchMap: 1,
    OnDragging: 2,
    OnMap: 3
};

//上，下，左，右
const OutPosList = [cc.p(0, 156),cc.p(0,-156),cc.p(-156,0),cc.p(156,0)]; //位置
const OutAngleList = [ 180, 0, 90, -90];
const InPosList = [cc.p(0,96),cc.p(0,-96), cc.p(-96, 0), cc.p(96,0)]; //里面的位置
import defines from './defines'

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            type: cc.Label,
            default: null
        },
        puzzleHead: {
            type: cc.Prefab,
            default: null
        }
    },

    onLoad: function () {
        //写监听
        let self = this;

        let isDragging = false;


        this.state = PUZZLESTATE.OnTouchMap;
        const touchStart = function () {
            isDragging = true;

            self.node.parent.getComponent("game_layer").puzzleCellTouchStart(self);

        };
        const touchMove = function (event) {
            if (isDragging === true){
                // self.node.position = event.getLocation();
                let currentPos = self.node.parent.convertTouchToNodeSpace(event);
                self.node.position = currentPos;

            }
        };
        const touchEnd = function () {
            isDragging = false;
            self.node.parent.getComponent("game_layer").puzzleCellTouchEnd(self);
        };


        this.node.on(cc.Node.EventType.TOUCH_START,touchStart, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,touchMove , this.node);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd, this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,touchEnd, this.node);


    },
    init: function (data, index) {
        //初始化一些数据
        cc.log("index = " + index + ",data = " + JSON.stringify(data));
        // this.label.string = index + "";
        //根据边缘的值 ，绘制方向


        this.data = data;
        for (let i in data){
            this.initLine(i , data[i]);
        }


    },
    initLine: function (direction,value) {
      //根据方向跟值，确定显示效果
        console.log('direction' + direction);
        console.log('value' + value);
        if (value === defines.PuzzleLineValue.IN){
            return
        }
        if (value === defines.PuzzleLineValue.OUT){
            let node = cc.instantiate(this.puzzleHead);
            node.parent = this.node;
            node.position = OutPosList[direction - 1];
            node.rotation = OutAngleList[direction - 1];
        }

        let inOut = cc.instantiate(this.puzzleHead);
        inOut.parent = this.node;
        inOut.position = InPosList[direction - 1];
        inOut.rotation = OutAngleList[direction - 1] + 180;


    },
    getIsOnTouchMap : function () {
        if (this.state === PUZZLESTATE.OnTouchMap){
            return true;
        }
        return false;
    },
    setOnDragging: function () {
        this.state = PUZZLESTATE.OnDragging;
    },
    setOnMap: function () {
        this.state = PUZZLESTATE.OnMap;
    },
    setOnTouch: function () {
        this.state = PUZZLESTATE.OnTouchMap;
    },
    getIsOnMap: function () {
        if (this.state === PUZZLESTATE.OnMap){
            return true;
        }
        return false
    },
    getPuzzleData: function () {
        return this.data;
    }
});
