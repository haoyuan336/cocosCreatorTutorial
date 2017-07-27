import global from './global'
import defines from './defines'
cc.Class({
    extends: cc.Component,

    properties: {
        mainWorldPrefab: {
            default: null,
            type: cc.Prefab
        },
        gameWorldPrefab: {
            default: null,
            type: cc.Prefab
        },
        loadingPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {




        global.eventListener.on("enter_next_map", ()=> {
           //
            global.gameData.levelCount ++;
            // this.enterMainWorld();
            this.enterLoadingNode(()=>{

            });
        });


        global.eventListener.on("enter_befor_map",()=>{
            if (global.gameData.levelCount <=0){
                return;
            }else {
                global.gameData.levelCount --;
                // this.enterMainWorld();
                this.enterLoadingNode(()=>{

                });
            }
        });
        global.eventListener.on("enter_game_world",(data)=>{
        });



        global.eventListener.on("enter_monster_world",(monster)=>{
            cc.log("enter monster world" + monster.name);
            this.enterLoadingNode(()=>{

            });
        });
        global.eventListener.on("enter_main_world", ()=>{
            cc.log("进入mainworld的关卡")
        });


        global.gameData.init();
        // this.enterLoadingNode({
        //     type: "main_world",
        //     data: defines.initMainWorldType.startPos
        // });


        this.enterLoadingNode(()=>{
           cc.log("加载完毕");
            this.enterMainWorld()
        });
        
    },
    enterWorld: function (data) {
        // this.enterMainWorld(type);
        cc.log("enter world" + JSON.stringify(data));
        if (data.type === "main_world"){
            this.enterMainWorld(data);
        }
        if (data.type === "game_world"){
            this.enterGameWorld(data);
        }

    },
    enterGameWorld: function (data) {
        let node = cc.instantiate(this.gameWorldPrefab);
        node.parent = this.node;
        node.getComponent("game-world").init(data);
    },
    enterMainWorld: function () {
        this.mainWorld = cc.instantiate(this.mainWorldPrefab);
        // this.mainWorld.getComponent("game-node").init();
        this.mainWorld.parent = this.node;
    },
    enterLoadingNode: function (callBack) {
        let node = cc.instantiate(this.loadingPrefab);
        node.parent = this.node;
        node.getComponent("loding-node").init(callBack);


    }

});
