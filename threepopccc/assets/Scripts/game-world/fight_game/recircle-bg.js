import global from './../../global'
cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad: function () {
        this.bgTextureList = [];
        this.speed = 0;
        this.distance = 0;//间隔
        this.bgList = [];//背景 的列表
        this.scale = 1;

        global.eventListener.on("enter_game_level_2",()=>{
           cc.log("recircle bg 游戏进入第二阶段，背景停止滚动");
        });


    },
    init: function (spec) {
      //需要两个参数,需要滚动的
        this.bgTextureList = spec.spriteFrames; //滚动的资源列表
        this.speed = spec.speed; //滚动的速度
        this.distance = spec.distance;//滚动的间隔
        this.minY = spec.minY;
        this.maxY = spec.maxY;
        this.minX = spec.minX;
        this.maxX = spec.maxX;

        if (spec.scale){
            this.scale = spec.scale;
        }

       // this.node.addComponent(cc.Sprite).spriteFrame = resList[0];


    },
    update: function () {

        let maxX = -10000;
        for (let i in this.bgList){
            let bg = this.bgList[i];
            if (bg.position.x + bg.width * 0.5 > maxX){
                maxX = bg.position.x + bg.width * 0.5
            }
        }


        if (this.bgTextureList.length !== 0 && maxX < cc.Canvas.instance.designResolution.width) {
            let node = new cc.Node("bg");
            node.parent = this.node;
            node.addComponent(cc.Sprite).spriteFrame = global.gameDataController.getRandomObjInList(this.bgTextureList);
            node.scale = {
                x: this.scale,
                y: this.scale
            };
            node.position = {
                x: (()=>{
                    if (this.bgList.length === 0){

                        return 0

                    }else {


                        cc.log("node width = " + node.width);
                        //最后找到了最后的那个点的位置了
                        return maxX + Math.random() * (this.maxX - this.minX) + this.minX + node.width * 0.5;
                    }
                })(),
                y: Math.random() * (this.maxY - this.minY) + this.minY
            };
            this.bgList.push(node);
        }


        for (let i = 0 ; i < this.bgList.length ; i ++) {
            let node = this.bgList[i];
            node.position = {
                x: node.position.x - this.speed,
                y:  node.position.y
            };
            let width = cc.Canvas.instance.designResolution.width;
            // console.log('width = '+ width);

            if (node.position.x + node.width < width * - 0.5){

                console.log("删掉");

                this.bgList.splice(i, 1);
                node.destroy();
            }
        }
    }
    ,
    onDestroy: function () {
        
    }


});
