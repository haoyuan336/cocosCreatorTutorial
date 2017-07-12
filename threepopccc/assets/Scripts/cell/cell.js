import defines from './../defines'
import AnimationController from './animation-controller'
import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
        Textures: {
            type: cc.SpriteFrame,
            default: []
        },
        label: {
            type: cc.Label,
            default: null
        }
    },
    onLoad: function () {
        this.animationController = AnimationController();
        let isTouch = false;
        let self = this;
        this.touchpopTime = 0;
        this.score = 1;
        this.energy = 1;
        const onTouchStart = function () {



            self.oldPos = self.node.position;
            self.currentDirection = undefined;
            if (global.gameDataController.getIsCanInput()){
                self.touchpopTime += 0.24;
                isTouch = true;
            }

        };
        const onTouchMove = function (event) {
            if (isTouch){
                let targetPos = self.node.parent.parent.convertTouchToNodeSpace(event);
                self.processDirection(targetPos);
            }
        };
        const onTouchEnd = function () {
            isTouch = false;
        };
        this.node.on(cc.Node.EventType.TOUCH_START,onTouchStart, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,onTouchMove,this.node);
        this.node.on(cc.Node.EventType.TOUCH_END,onTouchEnd,this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,onTouchEnd,this.node);

    },
    processDirection: function (position) {
        //计算方向
        if (this.currentDirection !== undefined){
            return;
        }
        if (position.y - this.oldPos.y > 50){
            this.currentDirection = "UP";
        }else if (position.y - this.oldPos.y < -50){
            this.currentDirection = "DOWN";
        }else if (position.x - this.oldPos.x < -50){
            this.currentDirection = "LEFT";
        }else if (position.x - this.oldPos.x > 50){
            this.currentDirection = "RIGHT";
        }
        // cc.log("this.currentDirection =  " + this.currentDirection);

        if (this.currentDirection !== undefined){
            this.node.parent.parent.getComponent("GameLayer").cellScrollDirection(this);
        }
        //通知parent的脚本  ，我滑动了方向
    }
    ,
    init: function (data) {
        cc.log("init cell " + JSON.stringify(data));
        let type = data.type;
        this.isMoving = false;
        this.type = data.type;
        let index = defines.cellType[type];
        this.indexWidth = data.indexWidth;
        this.indexHeight = data.indexHeight;
        // this.node.getComponent(cc.Sprite).spriteFrame = ;
        // let spriteF = this.SpriteFrame.clone();
        let node = new cc.Node("sprite");
        node.addComponent(cc.Sprite).spriteFrame = this.Textures[index];
        node.parent = this.node;
        node.scale = {
            x: 1.4,
            y: 1.4
        };
        this.index = data.index;

    },
    update: function (dt) {
        if (this.touchpopTime > 0){
            this.touchpopTime -= dt;
        }
        // cc.log("touchpostime = " + this.touchpopTime);
        if (this.touchpopTime > 0.24){
            cc.log("双击");
            this.touchpopTime = 0;
            this.node.parent.parent.getComponent("GameLayer").doubleClick(this);
        }
        if (this.isMoving){

        }else {

            let actionData = this.animationController.popFirstAnimation();

            if (actionData !== null){

                this.isMoving = true;
                let self = this;
                // cc.log("animation data = " + JSON.stringify(actionData));
                let callBack = cc.callFunc(function () {
                    cc.log("运行结束");
                    self.isMoving = false;
                    global.gameDataController.removeOneAction();
                },this);
                let dis = cc.pDistance(this.node.position, actionData.position);
                let timeDuraction = dis / defines.cellSpeed;
                let action = cc.sequence(cc.moveTo(timeDuraction, actionData.position.x,actionData.position.y).easing(cc.easeIn(1.6)),callBack);
                this.node.runAction(action)
            }
        }
    },
    pushAnimationData: function (data) {
        // global.eventListener.fire("add_action");
        global.gameDataController.addOneAction();
        this.animationController.pushAnimation(data);
    },
    getDirection: function () {
        return this.currentDirection;
    },
    getIsMoving: function () {
      return this.isMoving;
    },
    getType : function () {
        cc.log("get type" + this.type);
        return this.type;
    },
    setLabelIndex: function (index) {
        this.index = index;
        this.label.string = index + "";
    },
    getIndex: function () {
        return this.index;
    },
    getScore: function () {
        return this.score;
    },
    getEnergy: function () {
        return this.energy;
    },
    onDestroy: function () {
      //被删除
      //   if (this.isMoving === true){
      //       cc.log("被删除是，还在运动");
      //       global.gameDataController.removeOneAction();
      //       ///被删除的时候删除是如果还在运动中，就删掉一个
        //暂时用不到
      //   }
    }
});
