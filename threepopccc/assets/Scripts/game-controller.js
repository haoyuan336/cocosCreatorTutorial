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
            this.enterLoadingNode({
                type: "main_world",
                data: defines.initMainWorldType.startPos
            });
        });


        global.eventListener.on("enter_befor_map",()=>{
            if (global.gameData.levelCount <=0){
                return;
            }else {
                global.gameData.levelCount --;
                // this.enterMainWorld();
                this.enterLoadingNode({
                    type: "main_world",
                    data: defines.initMainWorldType.returnStartPos
                });
            }
        });
        global.eventListener.on("enter_game_node",(data)=>{
            // this.enterMainWorld(type);
            this.enterWorld(data);
        });



        global.eventListener.on("enter_monster_world",(monster)=>{
            cc.log("enter monster world" + monster.name);
            this.enterLoadingNode({
                type: "game_world",
                data: monster
            });
        });

        global.gameData.init();
        this.enterLoadingNode({
            type: "main_world",
            data: defines.initMainWorldType.startPos
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
        // cc.log("enter game world" + JSON.stringify(data.data.name));
        let node = cc.instantiate(this.gameWorldPrefab);
        node.parent = this.node;
        node.getComponent("game-world").init(data);


    },
    enterMainWorld: function (data) {

        this.loadingNode.removeFromParent(true);
        this.loadingNode.destroy();
        this.mainWorld = cc.instantiate(this.mainWorldPrefab);
        this.mainWorld.getComponent("game-node").init(data);
        this.mainWorld.parent = this.node;
        // this.mainWorld.getComponent("game-node").init(type);
    },
    enterLoadingNode: function (data) {
        if (this.mainWorld !== undefined){
            this.mainWorld.removeFromParent(true);
            this.mainWorld.destroy();
        }
        this.loadingNode = cc.instantiate(this.loadingPrefab);
        this.loadingNode.parent = this.node;
        this.loadingNode.getComponent("loding-node").init(data);

        this.loadingNode.removeFromParent(true);
        this.loadingNode.destroy();
    }

});
