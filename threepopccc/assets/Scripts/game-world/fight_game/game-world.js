import global from './../../global'
// import monsterleveldata from './../../data/config/monster-level-data'
import EventListener from './../../EventListener'
cc.Class({
    extends: cc.Component,

    properties: {
        enemyController: {
            default: null,
            type: cc.Node
        },
        timeCountDownLabel: {
            default: null,
            type: cc.Label
        },
        gameWinLabel: {
            default: null,
            type: cc.Label
        },
        gameWinModelLayerPrefab: {
            default: null,
            type: cc.Prefab
        }
       
    },

    onLoad: function () {
        //初始化一些数据
        // global.gameData.monsterData = monsterleveldata[global.gameData.monsterType];
        // cc.log("monster data = " + JSON.stringify(global.gameData.monsterData));
        //倒计时
        this.totalTime = 4;
        this.StringList = ["","GO!","1","2","3"];

        this.timeCountDownLabel.string = "3";

        global.gameworldEventListener = EventListener({});

        global.gameworldEventListener.on("game_win", ()=>{
            this.gameWinLabel.string = "WIN";
            global.gameData.setWinOrLoseData("win");
            setTimeout(()=>{
                let node = cc.instantiate(this.gameWinModelLayerPrefab);
                node.parent = this.node;
            }, 2000);


        });
        global.gameworldEventListener.on("game_lose", ()=>{
            this.gameWinLabel.string = "LOSE";
            global.gameData.setWinOrLoseData("lose");

            setTimeout(()=>{
                let node = cc.instantiate(this.gameWinModelLayerPrefab);
                node.parent = this.node;
            }, 2000);
        });

    },
    init: function (data) {
        cc.log("game world " + JSON.stringify(data));
        this.enemyController.getComponent("enemy-controller").init(data);
    },
    update: function (dt) {
        if (this.totalTime > 0){
            this.totalTime -= dt;
            if (this.totalTime < 0){
                this.totalTime = 0;
            }
            if ((this.totalTime - Math.floor(this.totalTime)) < 0.05){
                this.totalTime = Math.floor(this.totalTime);
                cc.log("time count down = " + this.totalTime);
                this.timeCountDownLabel.string = this.StringList[this.totalTime];
                if (this.totalTime === 0){
                    this.gameStart();
                }

            }
        }


    },
    gameStart: function () {
      cc.log("游戏开始");
        this.timeCountDownLabel.node.active = false;
        global.gameworldEventListener.fire("game_start");
    },
    onDestroy: function () {

    }
});
