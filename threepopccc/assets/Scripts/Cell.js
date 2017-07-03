import defines from './defines'
cc.Class({
    extends: cc.Component,

    properties: {


        Textures: {
            type: cc.SpriteFrame,
            default: []
        }
    },
    onLoad: function () {

    },
    init: function (data) {
        cc.log("init cell " + JSON.stringify(data));
        let type = data.type;
        let index = defines.cellType[type];
        this.node.getComponent(cc.Sprite).spriteFrame = this.Textures[index];
    },
    update: function (dt) {

    }
});
