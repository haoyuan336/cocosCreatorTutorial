import global from './../../global'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

        cc.log("加载瓦片地图");

        //加载地图
        cc.loader.loadRes("./tiledmap/zhuangbeilan.tmx",(err, tiledmap)=>{
            if (err){
                cc.log("load res err = " + err);
            }
            this.node.addComponent(cc.TiledMap).tmxAsset = tiledmap;
            this.initWeapon();
        });
    },

    initWeapon: function () {
        let weaponNameData = global.gameData.getWeaponData();
        cc.log("激活的武器名称列表" + JSON.stringify(weaponNameData));
    }

});
