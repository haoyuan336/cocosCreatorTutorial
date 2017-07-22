import global from './global'
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
            this.enterLoadingNode();
        });


        global.eventListener.on("enter_befor_map",()=>{
            if (global.gameData.levelCount <=0){
                return;
            }else {
                global.gameData.levelCount --;
                // this.enterMainWorld();
                this.enterLoadingNode();
            }
        });
        global.eventListener.on("enter_game_node",()=>{

            this.enterMainWorld();
        });

        global.gameData.init();
        this.enterLoadingNode();
        
    },
    enterMainWorld: function () {
        this.loadingNode.removeFromParent(true);
        this.loadingNode.destroy();
        this.mainWorld = cc.instantiate(this.mainWorldPrefab);
        this.mainWorld.parent = this.node;
    },
    enterLoadingNode: function () {
        if (this.mainWorld !== undefined){
            this.mainWorld.removeFromParent(true);
            this.mainWorld.destroy();
        }
        this.loadingNode = cc.instantiate(this.loadingPrefab);
        this.loadingNode.parent = this.node;
        this.loadingNode.removeFromParent(true);
        this.loadingNode.destroy();
    }

});
