import global from "./../../global"
const PlayerState = {
    Invalide: -1,
    Waiting: 1,
    Running: 2,
    GameLevel2: 3,
    Dead: 4,
    Win: 5
}
cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        progressBar: {
            default: null,
            type: cc.ProgressBar
        }
    },

    // use this for initialization
    onLoad: function () {
        this.shootSpeed = 0.1;
        this.shootNowTime = 0;
        this.healthCount = 10;
        this.healthCountTotal = 10;
        // global.gameworldEventListener.on("enter_game_level_2",()=>{
        //     // this.setState(PlayerState.GameLevel2);
        // });

        global.gameworldEventListener.on("game_start" , ()=>{
            this.setState(PlayerState.Running);
        });
        global.gameworldEventListener.on("game_win", ()=>{
            this.setState(PlayerState.Win);
        });
        this.state = PlayerState.Invalide;
    },
    update: function (dt) {


        if (this.enemyTarget === undefined){
            cc.log("找敌人");
            this.enemyTarget = this.getEnemyTarget();
            if (this.enemyTarget !== undefined){
                cc.log("找到了敌人");
                //找到敌人之后开始射击
            }
        }

        if (this.enemyTarget !== undefined){
            if (this.enemyTarget.getComponent("enemy").getIsDead()){
                cc.log("敌人死了");
                this.enemyTarget = undefined;
            }
        }


        // if (this.state === PlayerState.Running || this.state === PlayerState.GameLevel2){
        if (this.state === PlayerState.Running && this.enemyTarget !== undefined){

                if (this.shootNowTime > 1){
                this.shootBullet();
                this.shootNowTime = 0
            }else {
                this.shootNowTime += this.shootSpeed;
            }
        }

        this.progressBar.progress = this.healthCount / this.healthCountTotal;

    },
    getEnemyTarget: function () {

        let childList = this.node.parent.children;
        let maxDis = 10000;
        let target = undefined;
        for(let i in childList){
            let child = childList[i];
            if (child.name === "enemy"){
                cc.log("敌人");
                let dis = cc.pDistance(this.node.position, child.position);
                if (dis < maxDis){
                    maxDis = dis;
                    target = child;
                }
            }
        }
        return target;
    },
    shootBullet: function () {
        //发射一枚子弹
        // cc.log("shoow");

        if (this.enemyTarget === undefined){
            return;
        }


        cc.log("发射子弹");

        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.node.parent;
        bullet.position = {
            x: this.node.position.x + 100,
            y: this.node.position.y
        };

        let angle = cc.pSub(this.enemyTarget.position, bullet.position);
        angle = cc.pNormalize(angle);
        bullet.getComponent("bullet").init({
            angle: angle
        });
    },
    setState: function (state) {
        if (state === this.state){
            return
        }
        switch (state){
            case PlayerState.Invalide:
                break;
            case PlayerState.Waiting:
                break;
            case PlayerState.Running:
                break;
            case PlayerState.GameLevel2:

                break;
            case PlayerState.Dead:


                console.log("game lose");
                global.gameData.isWin = false;
                global.gameworldEventListener.fire("game_lose");

                break;
            case PlayerState.Win:
                break;
            default: break;
        }
        this.state = state;
    },
    onCollisionEnter: function (other, self) {
        cc.log("碰到主角了 敌人");
        if (other.node.getComponent("enemy") && this.state === PlayerState.Running){
            let damage = other.node.getComponent("enemy").getDamage();
            cc.log("造成伤害" + damage);
            this.healthCount -= damage;
            if (this.healthCount < 0){
                this.healthCount = 0;

                this.setState(PlayerState.Dead);
            }
        }
    },
    onDestroy: function () {
        // global.gameworldEventListener.removeListenerType("enter_game_level_2");
        // global.gameworldEventListener.removeListenerType("game_start");
        // global.gameworldEventListener.removeListenerType("game_win");

    }
});
