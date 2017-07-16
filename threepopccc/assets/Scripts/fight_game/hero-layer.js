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

        cc.loader.loadResArray(["yun3.png","yun4.png"],cc.SpriteFrame, (err, spriteFrames) => {

            let node = cc.instantiate(this.recirclePrefab);
            node.parent = this.bg_node;
            node.getComponent("recircle-bg").init({
                spriteFrames: spriteFrames,
                speed: 0.5,
                minY: -200,
                maxY: 200,
                minX: 100,
                maxX: 300
            })
            cc.director.getCollisionManager().enabled = true;
        });

        cc.loader.loadRes("bg_12.png",cc.SpriteFrame, (err, spriteFrame) => {

            let node = cc.instantiate(this.recirclePrefab);
            node.parent = this.bg_node;
            node.getComponent("recircle-bg").init({
                spriteFrames: [spriteFrame],
                speed: 1.5,
                minY: -290,
                maxY: -290,
                minX: 300,
                maxX: 500,
                scale: 2
            });
        });

        cc.loader.loadRes("earth_0.png",cc.SpriteFrame, (err, spriteFrame) => {

            let node = cc.instantiate(this.recirclePrefab);
            node.parent = this.bg_node;
            node.getComponent("recircle-bg").init({
                spriteFrames: [spriteFrame],
                speed: 2,
                minY: -410,
                maxY: -410,
                minX: 0,
                maxX: 0,
                scale: 2
            });
            // node.scale = {
            //     x: 2,
            //     y: 2
            // };
        });
    },

    update: function (dt) {



    },
});
