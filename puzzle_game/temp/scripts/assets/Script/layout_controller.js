"use strict";
cc._RF.push(module, '293aaR9vSxJOLjEEFwyK8l1', 'layout_controller');
// Script/layout_controller.js

"use strict";

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
    onLoad: function onLoad() {},
    startButton: function startButton() {
        cc.log("游戏开始按钮");
        this.node.removeChild(this.ready_layer);
        var node = cc.instantiate(this.game_layer);
        node.parent = this.node;
    }

});

cc._RF.pop();