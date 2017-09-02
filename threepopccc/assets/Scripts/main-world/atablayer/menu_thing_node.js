cc.Class({
    extends: cc.Component,

    properties: {
        thing_sprite_frames: {
            default: null,
            type: cc.SpriteAtlas
        }

    },

    // use this for initialization
    onLoad: function () {
        
    },
    setThingData: function (data) {
        cc.log("set thing data = " + JSON.stringify(data));
        this.addComponent(cc.Sprite).spriteFrame = this.thing_sprite_frames.getSpriteFrame(data.image);
    }


});
