import MonsterData from './../../data/config/monster-data'
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        NameLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function (data) {
        cc.log("init boss with data = " + JSON.stringify(data));
        this.monsterData = MonsterData[data];
        this.NameLabel.string = data;
        cc.loader.loadRes(this.monsterData.image, cc.SpriteFrame, (err, spriteFrame)=>{
            if (err){
                cc.log("err = " + err);
                return;
            }
            this.node.addComponent(cc.Sprite).spriteFrame = spriteFrame;

        });

    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
