import BossData from './../../data/config/boss-data'
import global from './../../global'
import EnemyMonsterData from './../../data/config/monster-data'
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
        },
        HealthProgressBar: {
            default: null,
            type: cc.ProgressBar
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
        this.monsterData = BossData[data];
        // cc.log("image)= " + this.monsterData.image);
        this.NameLabel.string = data;
        this.healthCount = this.monsterData.healthCount;
        this.healthTotalCount = this.healthCount;
        cc.loader.loadRes(this.monsterData.image, cc.SpriteFrame, (err, spriteFrame)=>{
            if (err){
                cc.log("err = " + err);
                return;
            }
            this.node.addComponent(cc.Sprite).spriteFrame = spriteFrame;

        });
        this.setState(BossState.EnterIng);
        this.addEnemyTime = 0;

    },
    setState: function (state) {
        cc.log("this state = " + this.state  + "state = " + state);
        if (this.state === state){
            return;
        }
        switch (state){
            case BossState.Waiting:
                break;
            case BossState.EnterIng:
                break;
            case BossState.Dead:

                global.eventListener.fire("game_win"); // 游戏胜利

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
            this.node.position = cc.p(this.node.position.x - 4, this.node.position.y);
            // cc.log('x = ' + this.node.position.x);
            if (this.node.position.x < cc.Canvas.instance.designResolution.width * 0.25){
                this.setState(BossState.Running);
            }
        }
        if (this.state ===  BossState.Running){
            if (this.addEnemyTime > 3){
                this.addEnemyTime = 0;
                this.addEnemy();
            }else {
                this.addEnemyTime += dt;
            }
            if (this.healthCount <= 0 ){
                this.setState(BossState.Dead);
            }
        }




        this.HealthProgressBar.progress = this.healthCount / this.healthTotalCount;
    },
    addEnemy: function () {
        cc.log("加敌人");
        cc.log("boss data = " + JSON.stringify(this.monsterData));
        let count = this.monsterData.addEnemyPointsCount;
        cc.log("需要添加的敌人的个数是" + count);
        let startVec = cc.p(0,100);
        let preAngle = Math.PI * 2 / count;
        cc.log("pre angle = " + preAngle);
        for (let i = 0 ; i < count ; i ++){
            //每添加一个敌人，自己减一定的血量


            let healthCount = EnemyMonsterData[this.monsterData["monster_1"]].health;
            if (this.healthCount <= 0 ){
                this.healthCount = 0;
            }else {
                this.healthCount -= healthCount;
            }


            let pos = cc.pRotateByAngle(startVec, cc.p(0,0), preAngle * i);
            global.eventListener.fire("add_enemy_with_data",{
                monster: this.monsterData["monster_1"],
                position: this.node.convertToWorldSpace(pos)
            })
        }
    },
    onCollisionEnter: function (other, self) {
        if (other.node.getComponent("bullet")){
            let damage = other.node.getComponent("bullet").getDamage();
            this.healthCount -= damage;
            if (other.node.getComponent("hero-node")){
                cc.log("碰到主角了");
            }
            if (this.healthCount <= 0 ){
                this.healthCount = 0;
            }
        }
    }

});
