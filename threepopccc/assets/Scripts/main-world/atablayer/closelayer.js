import defines from './../../defines'
import global from './../../global'
cc.Class({
    extends: cc.Component,

    properties: {
        tiledmap_asset: {
            default: null,
            type: cc.TiledMapAsset
        },
        thing_prefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.tiledMap = this.node.addComponent(cc.TiledMap);
        this.tiledMap.tmxAsset = this.tiledmap_asset;
        cc.loader.loadRes("./config/cloth_config.json", (error, result)=>{
            cc.log("error = " + error);
            cc.log("result = " + JSON.stringify(result));
            this.initClothes(result);
        });
    },
    initClothes: function (result) {
        //初始化衣服
        for (var i = 0 ; i < defines.clothKey.length ; i ++){
            global.gameData.setActiveClothWithType(defines.clothKey[i]);
        }
        var clothDataList = global.gameData.getActiveClothDataList();
        console.log("cloth data list = " + JSON.stringify(clothDataList));


        var index = 0;
        var size = this.tiledMap.getMapSize();
        var tildSize = this.tiledMap.getTileSize();
        for (var i = 0 ; i < result.length ; i ++){
            var clothConfig = result[i];
            if (clothConfig.cloth_type === clothDataList[i]){
                console.log("取出了衣服" + clothConfig.cloth_type);
                //创建一个衣服点节点
                var clothNode = cc.instantiate(this.thing_prefab);
                clothNode.parent = this.node;
                clothNode.getComponent("menu_thing_node").setThingData(clothConfig);
                var layer = this.tiledMap.getLayer("layers");
                let x = index - Math.floor(index / size.width);
                let y = Math.floor(index / size.height);
                index ++;
                var pos = layer.getPositionAt(x, y);
                var worldPos = this.node.convertToWorldSpace(pos);
                var nodePos = this.node.parent.convertToNodeSpace(worldPos);
                clothNode.position = cc.pAdd(nodePos, cc.p(tildSize.width * 0.5, tildSize.height * 0.5));

            }
        }

    }

});
