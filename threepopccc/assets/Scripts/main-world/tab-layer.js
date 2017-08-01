import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
       gameNodePrefab: {
           default: null,
           type: cc.Prefab
       },
        weaponNodePrefab: {
            default: null,
            type: cc.Prefab
        },
        skillNodePrefab: {
            default: null,
            type: cc.Prefab
        },
        thingNodePrefab: {
            default: null,
            type: cc.Prefab
        },
        closeNodePrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.mainNode = undefined;
        global.mainworldEventListener.on("show_tab_node", (type)=>{
           cc.log("show tab node" + type);
            switch (type){
                case "weapon":
                    this.createNode(this.weaponNodePrefab);
                    break;
                case "close":
                    this.createNode(this.closeNodePrefab);
                    break;
                case "skill":
                    this.createNode(this.skillNodePrefab);
                    break;
                case "thing":
                    this.createNode(this.thingNodePrefab);
                    break;
                case "game":
                    this.createNode(this.gameNodePrefab);


                    break;
                default:
                    break;
            }
        });
        global.mainworldEventListener.fire("show_tab_node","game");
    },
    createNode: function (prefab) {
        if (this.mainNode){
            this.node.removeChild(this.mainNode);
            this.mainNode.destroy();
        }
        this.mainNode = cc.instantiate(prefab);
        this.mainNode.parent = this.node;
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
