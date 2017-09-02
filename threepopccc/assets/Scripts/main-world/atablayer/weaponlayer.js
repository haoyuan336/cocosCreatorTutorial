import global from './../../global'
import defines from './../../defines'
cc.Class({
    extends: cc.Component,

    properties: {
        weapon_prefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {

        cc.log("加载瓦片地图");

        //加载地图
        cc.loader.loadRes("./tiledmap/zhuangbeilan.tmx",(err, tiledmap)=>{
            if (err){
                cc.log("load res err = " + err);
            }
            this.tiledMap = this.node.addComponent(cc.TiledMap);
            this.tiledMap.tmxAsset = tiledmap;
            this.initWeapon();
        });
    },

    initWeapon: function () {
        for (let i = 0 ; i < defines.weaponKey.length ; i ++){
            global.gameData.setActiveWeaponWithType(defines.weaponKey[i]);
        }

        let weaponNameData = global.gameData.getWeaponDataList();
        cc.log("激活的武器名称列表" + JSON.stringify(weaponNameData));
        //武器列表激活之后，初始化到界面之中
        //首先将配置取出来
        cc.loader.loadRes("./config/weapon_config.json", (error, result)=> {
           if (error){
               // cc.log("error = " + error);
           }
           cc.log("result = " + JSON.stringify(result));
            // 配置加载出来之后
            var size = this.tiledMap.getMapSize();
            console.log("size = " + JSON.stringify(size));

            for (let i = 0 ; i < size.width ; i ++){
                for (let j = 0 ; j <size.height ; j ++){

                }
            }

            var index = 0 ;
            for (let i = 0 ; i < weaponNameData.length ; i ++){
                let name = result[i].gun_type;
                if (name === weaponNameData[i]){
                    console.log("找到了这个武器" + name);
                    //创建一个物品
                    var thingNode = cc.instantiate(this.weapon_prefab);
                    thingNode.parent = this.node;
                    thingNode.getComponent("menu_thing_node").setThingData(result[i]);

                    let x = index - Math.floor(index / 7);
                    let y = Math.floor(index / 7);
                    let ground = this.tiledMap.getLayer("layers");
                    let pos = ground.getPositionAt(x, y);
                    console.log("pos = " + JSON.stringify(pos));
                    let worldPos = this.node.convertToWorldSpace(pos);
                    console.log("current pos = " + JSON.stringify(worldPos));
                    let currentPos = this.node.parent.convertToNodeSpace(worldPos);
                    console.log("current pos = " + JSON.stringify(currentPos));
                    let size = this.tiledMap.getTileSize();
                    console.log("size " + JSON.stringify(size));
                    thingNode.position = cc.pAdd(currentPos, cc.p(size.width * 0.5,size.height * 0.5));
                    index ++;
                }
            }
        });

    }


});
