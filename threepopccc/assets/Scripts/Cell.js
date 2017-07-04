import defines from './defines'
import AnimationController from './AnimationController'
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
    },
    init: function (data) {
        cc.log("init cell " + JSON.stringify(data));
        let type = data.type;
        this.isMoving = false;
        let index = defines.cellType[type];
        this.indexWidth = data.indexWidth;
        this.indexHeight = data.indexHeight;
        this.node.getComponent(cc.Sprite).spriteFrame = this.Textures[index];
        this.label.string = data.index;
        this.index = data.index;

    },
    update: function () {


        if (this.isMoving){

        }else {
            let actionData = this.animationController.popFirstAnimation();
            if (actionData !== null){
                this.isMoving = true;
                cc.log("animation data = " + JSON.stringify(actionData));
                let callBack = cc.callFunc(function () {
                    cc.log("运行结束");
                    this.isMoving = false;
                },this);
                let action = cc.sequence(cc.moveTo(1, actionData.position.x,actionData.position.y),callBack);
                this.node.runAction(action)


            }


        }

    },
    pushAnimationData: function (data) {
        cc.log("push animation data " + "index =  " + this.index + JSON.stringify(data));
        this.animationController.pushAnimation(data);
    }

});
