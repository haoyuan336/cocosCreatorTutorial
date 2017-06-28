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
        this.isOnMap = defines.OnMap.NO;
        this.isDragging = false;
        let self = this;
        // this.node.on(cc.Event.EventTouch,function (event) {
        //     self.node.position = event.getLocation();
        // },this.parent);\

        // this.node.on(cc.Node.EventType.TOUCH_START, this.memberFunction, this);  // if "this" is component and the "memberFunction" declared in CCClass.
        // node.on(cc.Node.EventType.TOUCH_START, callback, this.node);
        // node.on(cc.Node.EventType.TOUCH_MOVE, callback, this.node);
        // node.on(cc.Node.EventType.TOUCH_END, callback, this.node);
        // node.on(cc.Node.EventType.TOUCH_CANCEL, callback, this.node);
        // node.on("anchor-changed", callback, this);
        const touchStart = function (event) {
            console.log('touch start =' + JSON.stringify(event.getLocation()));
            self.isDragging = true;
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
    init: function (spec, parentScript) {
        this.parentScript = parentScript;
        console.log('spec' + JSON.stringify(spec));
    },
    getMapOn: function () {
        return this.isOnMap;
    },
    setStartPos: function () {
      //回到原点
        this.position = this.oldPosition;
    }


});
