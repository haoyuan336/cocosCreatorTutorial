cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.moveSpeed = 1;

    },

    update: function (dt) {
        this.node.position = cc.p(this.node.position.x - this.moveSpeed , this.node.position.y);
        if (this.node.position.x < - cc.Canvas.instance.designResolution.width * 0.5){
            this.node.destroy();
        }
    }

});
