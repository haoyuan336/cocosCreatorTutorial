import defines from './../../defines'
import global from './../../global'
cc.Class({
    extends: cc.Component,

    properties: {
        thing_prefab: {
            default: null,
            type: cc.Prefab
        },
        tiledmap_asset: {
            default: null,
            type: cc.TiledMapAsset
        }

    },

    // use this for initialization
    onLoad: function () {
        this.tiledMap = this.node.addComponent(cc.TiledMap);
        this.tiledMap.tmxAsset = this.tiledmap_asset;

        this.initThing();
    },
    initThing: function () {
        //首先储存一些物品的key
        for (var i = 0 ; i < defines.thingKey.length ; i ++){
            global.gameData.setActiveThingWithKey(defines.thingKey[i]);
        }
        var thingNameList = global.gameData.getActiveThingDataList();
        //首先取出
        cc.loader.loadRes("./config/thing_config.json",  (error, result)=> {
            if (error){
                cc.log("error = " + error);
            }
            cc.log("result - " + JSON.stringify(result));
            //循环result
            var size = this.tiledMap.getMapSize();
            var tiledSize = this.tiledMap.getTileSize();
            var layers = this.tiledMap.getLayer("layers");
            var index = 0 ;
            for (var i = 0 ; i < result.length ; i ++){

                cc.log("result = " + result[i].thing_type);
               if (result[i].thing_type === thingNameList[i]){
                   //找到了物品
                   cc.log("找到了物品");
                   var thingNode = cc.instantiate(this.thing_prefab);
                   thingNode.parent = this.node;
                   thingNode.getComponent("menu_thing_node").setThingData(result[i]);
                   var x = index - Math.floor(index / size.width) * size.width;
                   var y = Math.floor(index / size.height);
                   cc.log("x = " + x);
                   cc.log("y = " + y);
                   var pos = layers.getPositionAt(x, y);
                   var worldPos = this.node.convertToWorldSpace(pos);
                   var currentPos = this.node.parent.convertToNodeSpace(worldPos);
                   thingNode.position = cc.pAdd(currentPos, cc.p(tiledSize.width * 0.5, tiledSize.height * 0.5));
                   index ++;

               }
            }
        })

    }


});
