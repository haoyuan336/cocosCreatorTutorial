import defines from './game_defines'
cc.Class({
    extends: cc.Component,

    properties: {
        bgSptiteFrame: {
            type: cc.SpriteFrame,
            default: null
        },
        cellDown: {
            type: cc.SpriteFrame,
            default: null
        },
        cellUp: {
            type: cc.SpriteFrame,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
        this.node.getComponent(cc.Sprite).spriteFrame = this.bgSptiteFrame;
        this.puzzleState = defines.PuzzleCellState.ONTOUCH;
        this.isDragging = false;
        let self = this;
        const touchStart = function (event) {
            console.log('touch start =' + JSON.stringify(event.getLocation()));
            self.isDragging = true;
            self.parentScript.puzzleCellTouchBegan(self);
        };
        const  touchMove = function (event) {
            console.log('touch move =' + JSON.stringify(event.getLocation()));
            if (self.isDragging === true){
                // self.node.position = self.node.convertTouchToNodeSpace(event.getLocation());
                let touchPos = self.node.parent.convertTouchToNodeSpace(event);
                console.log('touch pos = ' + JSON.stringify(touchPos));
                self.node.position = touchPos;
            }
        };
        const touchEnd = function (event) {
            console.log('touch end =' + JSON.stringify(event.getLocation()));

            self.isDragging = false;
            self.parentScript.puzzleCellTouchEnd(self);


        };

        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,touchMove,this.node);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,touchEnd,this.node);


    }
    ,
    init: function (spec, parentScript,index) {
        this.index = index;
        this.parentScript = parentScript;
        console.log('spec' + JSON.stringify(spec));
    },
    setStartPos: function (position) {
        if (position){
            this.startPos = position;
        }
        this.node.position = this.startPos;
    },
    getIsOnTouchLayer: function () {
        if (this.puzzleState === defines.PuzzleCellState.ONTOUCH){
            return true;
        }
        return false;
    }
});
