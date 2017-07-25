import MonsterData from './../../data/config/monster-data'
const BossState = {
    Invalide: -1,
    EnterIng: 1,
    Running: 2,
    Dead: 3,
    Win: 4
}
cc.Class({
    extends: cc.Component,

    properties: {
        NameLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.state = BossState.Invalide;
        this.node.position = {
            x: cc.Canvas.instance.designResolution.width * 0.5 ,
            y: 0
        }

    },

    init: function (data) {
        cc.log("init boss with data = " + JSON.stringify(data));
        this.monsterData = MonsterData[data];
        // cc.log("image)= " + this.monsterData.image);
        this.NameLabel.string = data;
        cc.loader.loadRes(this.monsterData.image + "", cc.SpriteFrame, (err, spriteFrame)=>{
            if (err){
                cc.log("err = " + err);
                return;
            }
            this.node.addComponent(cc.Sprite).spriteFrame = spriteFrame;

        });
        this.setState(BossState.EnterIng);

    },
    setState: function (state) {
        if (this.state === state){
            return;
        }
        switch (state){
            case BossState.Waiting:
                break;
            case BossState.EnterIng:
                break;
            case BossState.Dead:
                break;
            case BossState.Running:
                break;
            case BossState.Win:
                break;
        }
        this.state = state;
    },
    update: function (dt) {
        if (this.state === BossState.EnterIng){
            this.node.position = cc.p(this.position.node.x - 1, this.node.position.y);
            if (this.node.position.x < cc.Canvas.instance.designResolution.width * 0.6){
                this.setState(BossState.Running);
            }
        }
    }

});
