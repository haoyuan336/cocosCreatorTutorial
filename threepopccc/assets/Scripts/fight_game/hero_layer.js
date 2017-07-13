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
        // this.zIndex = -100;
        // this.addStartDuraction = 0;
        // this.bgList = [];
        ///刚初始化进来，需要加载一些背景


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

    addStart: function () {
        // let data = global.gameDataController.getOneCellData();
        // let start = cc.instantiate(this.StartPrefab);
        // data.index = 0;
        // start.getComponent("cell").init(data);
        // start.parent = this.node;
        // start.position = cc.p(this.camera.position.x + 100,0);
    },
    update: function (dt) {
        // this.heroNode.position = cc.p(this.heroNode.position.x + 1, this.heroNode.position.y);
        // // this.camera.position = cc.p(this.heroNode.position.x + 200, this.camera.position.y);
        // if (this.addStartDuraction > dt * 100){
        //     this.addStartDuraction = 0;
        //     this.addStart();
        // }else {
        //     this.addStartDuraction += dt;
        // }

        // if (this.bgList.length < 2){
        //     let bg = cc.instantiate(this.bgUpPrefab);
        //     bg.parent = this.bgUpLayer;
        //
        //     let index = this.bgList.length - 1;
        //     if (index < 0){
        //         bg.position = cc.p(0,0);
        //     }else {
        //         let lastBg = this.bgList[this.bgList.length - 1];
        //         bg.position = cc.p(lastBg.position.x + lastBg.width,0);
        //
        //     }
        //     cc.log("加一个背景 ");
        //     this.bgList.push(bg);
        // }
        // for (let i = 0 ; i < this.bgList.length ; i ++){
        //     if (this.camera.position.x - this.bgList[i].position.x > this.bgList[i].width){
        //         this.bgUpLayer.removeChild(this.bgList[i]);
        //         this.bgList.splice(i ,1);
        //     }
        // }

        // this.starBgLayer.position = cc.p(this.starBgLayer.position.x - 1, this.starBgLayer.position.y);


    },
});
