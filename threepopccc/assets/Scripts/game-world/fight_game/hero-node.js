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
        }
    },

    // use this for initialization
    onLoad: function () {
        this.shootSpeed = 0.1;
        this.shootNowTime = 0;
        global.eventListener.on("enter_game_level_2",()=>{
            this.setState(PlayerState.GameLevel2);
        });

        global.eventListener.on("game_start" , ()=>{
            this.setState(PlayerState.Running);
        });
        this.state = PlayerState.Invalide;
    },
    update: function (dt) {


        if (this.state === PlayerState.Running || this.state === PlayerState.GameLevel2){
            if (this.shootNowTime > 1){
                this.shootBullet();
                this.shootNowTime = 0
            }else {
                this.shootNowTime += this.shootSpeed;
            }
        }


    },
    shootBullet: function () {
        //发射一枚子弹
        // cc.log("shoow");
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.node.parent;
        bullet.position = {
            x: this.node.position.x + 100,
            y: this.node.position.y
        };

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
                break;
            case PlayerState.Win:
                break;
            default: break;
        }
        this.state = state;
    }
});
