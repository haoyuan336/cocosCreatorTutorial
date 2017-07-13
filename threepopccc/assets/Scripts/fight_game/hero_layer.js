import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
        bg_node: {
            type: cc.Node,
            default: null
        },
        heroNode: {
            type: cc.Node,
            default: null
        },
        recirclePrefab: {
            type: cc.Prefab,
            default: null
        }//循环背景
    },

    // use this for initialization
    onLoad: function () {

        cc.loader.loadRes("shan.png",cc.SpriteFrame, (err, spriteFrame) => {

            let node = cc.instantiate(this.recirclePrefab);
            node.parent = this.bg_node;
            // node.getComponent("recircle_bg").init([spriteFrame],1,0,0);
            node.getComponent("recircle_bg").init({
                spriteFrames: [spriteFrame],
                speed: 1,
                minY: -300,
                maxY: -300,
                minX: 0,
                maxX: 0
            })
        });


        cc.loader.loadRes("yun10.png",cc.SpriteFrame, (err, spriteFrame) => {

            let node = cc.instantiate(this.recirclePrefab);
            node.parent = this.bg_node;
            node.getComponent("recircle_bg").init({
                spriteFrames: [spriteFrame],
                speed: 1,
                minY: 0,
                maxY: 300,
                minX: 100,
                maxX: 300
            })
        });
    },

    update: function (dt) {



    },
});
