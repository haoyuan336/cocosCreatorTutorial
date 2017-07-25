import monsterDataConfig from './../../data/config/monster-data'
const MonsterState = {
    Invalide: -1,
    Live: 1,
    Dead: 2
}
cc.Class({
    extends: cc.Component,

    properties: {
        healthProgress: {
            default: null,
            type: cc.Node
        }

    },

    // use this for initialization
    onLoad: function () {
        this.moveSpeed = 1;
        this.healthCount = 4;
        this.healthCountTotral = 4;

        this.state = MonsterState.Invalide;
        this.setState(MonsterState.Live);

    },
    init: function (monstername) {
        cc.log("初始化敌人用数据 " + JSON.stringify(monstername));
        let enemyData = monsterDataConfig[monstername];
        cc.log("enemy data = " + JSON.stringify(enemyData));
        this.moveSpeed = enemyData["speed"];
        this.healthCount = enemyData["health"];
        this.healthCountTotal = enemyData["health"];
    },

    update: function (dt) {
        this.node.position = cc.p(this.node.position.x - this.moveSpeed , this.node.position.y);
        if (this.node.position.x < - cc.Canvas.instance.designResolution.width * 0.5){
            // this.node.destroy();
        }
        this.healthProgress.getComponent(cc.ProgressBar).progress = this.healthCount / this.healthCountTotal;

    },
    onCollisionEnter: function (other, self) {
        if (other.node.getComponent("bullet")){
            let damage = other.node.getComponent("bullet").getDamage();
            this.healthCount -= damage;
        }
        if (other.node.getComponent("hero-node")){
            cc.log("碰到主角了");
        }
        if (this.healthCount <= 0 ){
            this.healthCount = 0;
            // this.setState(MonsterState.Dead);
        }
    },
    setState: function (state) {
        if (state === this.state){
            cc.log("重复状态");
            return;
        }
        switch (state){
            case MonsterState.Invalide:
                break;
            case MonsterState.Live:
                break;
            case MonsterState.Dead:

                this.node.removeFromParent(true);

                this.node.destroy();

                break;
            default:
                break;
        }
        this.state = state;
    }

});
