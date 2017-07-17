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
    },
    update: function (dt) {
        if (this.shootNowTime > 1){
            this.shootBullet();
            this.shootNowTime = 0
        }else {
            this.shootNowTime += this.shootSpeed;
        }
    },
    shootBullet: function () {
        //发射一枚子弹
        cc.log("shoow");
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.node.parent;
        bullet.position = {
            x: this.node.position.x + 100,
            y: this.node.position.y
        };
    }
});
