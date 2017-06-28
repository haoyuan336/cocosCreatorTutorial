cc.Class({
    extends: cc.Component,

    properties: {

        game_layer: {
            type: cc.Prefab,
            default: null
        },
        ready_layer: {
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    startButton: function () {
        cc.log("游戏开始按钮");
        this.node.removeChild(this.ready_layer);
        let node = cc.instantiate(this.game_layer);
        node.parent = this.node;
    }


});
