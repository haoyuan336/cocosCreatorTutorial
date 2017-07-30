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
           //  global.gameData.levelCount ++;

            // this.enterMainWorld();
            let nowLevel = global.gameData.getLevelCount();
            cc.log("nowLevel" + nowLevel);
            let levelCount = defines.levelCountMap[nowLevel];
            global.gameData.setLevelCount(defines.levelCountList[levelCount + 1]);
            this.enterLoadingNode(()=>{
                this.mainWorld = cc.instantiate(this.mainWorldPrefab);
                this.mainWorld.parent = this.node;
            });
        });


        global.eventListener.on("enter_befor_map",()=>{

            let  nowLevel = global.gameData.getLevelCount();
            let levelCount = defines.levelCountMap[nowLevel];
            let nowLevelCount = levelCount - 1;
            if (nowLevelCount < 0){
                nowLevelCount = 0;
            }
            cc.log("enter befor map" + nowLevelCount);

            global.gameData.setLevelCount(defines.levelCountList[nowLevelCount]);
            this.enterLoadingNode(()=>{
                this.mainWorld = cc.instantiate(this.mainWorldPrefab);
                this.mainWorld.parent = this.node;
            });
            // if (global.gameData.levelCount <=0){
            //     return;
            // }else {
            //     global.gameData.levelCount --;
            //     // this.enterMainWorld();
            //     this.enterLoadingNode(()=>{
            //
            //     });
            // }
        });
        // global.eventListener.on("enter_game_world",(data)=>{
        // });



        global.eventListener.on("enter_monster_world",(monster)=>{
            cc.log("enter monster world" + monster.name);
            this.enterLoadingNode(()=>{
                console.log("enter monster world");
                this.mainWorld = cc.instantiate(this.gameWorldPrefab);
                this.mainWorld.parent = this.node;
                this.mainWorld.getComponent("game-world").init(monster);
            });
        });
        global.eventListener.on("enter_main_world", ()=>{
            cc.log("进入mainworld的关卡");
            this.enterLoadingNode(()=>{
                this.mainWorld = cc.instantiate(this.mainWorldPrefab);
                this.mainWorld.parent = this.node;

            })

        });


        global.gameData.init();
        // this.enterLoadingNode({
        //     type: "main_world",
        //     data: defines.initMainWorldType.startPos
        // });


        this.enterLoadingNode(()=>{
           cc.log("加载完毕");
            this.mainWorld = cc.instantiate(this.mainWorldPrefab);
            // this.mainWorld.getComponent("game-node").init();
            this.mainWorld.parent = this.node;
        });
        
    },

    enterLoadingNode: function (callBack) {
        if (this.mainWorld){
            this.mainWorld.removeFromParent(true);
            this.mainWorld.destroy();
        }

        let node = cc.instantiate(this.loadingPrefab);
        node.parent = this.node;
        node.getComponent("loding-node").init(callBack);


    }

});
