cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.node.interactable = true;
        this.node.on(cc.Node.EventType.TOUCH_START,  (event) =>{
            cc.log("thing info touch start");
            this.node.removeFromParent(true);
        })
    },


});
