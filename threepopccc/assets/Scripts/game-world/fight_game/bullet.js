cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        // this.moveSpeed = 20;

        this.moveSpeed = cc.p(0,0);


        // let randomAngle =Math.PI  + ( 0 -  Math.random() * Math.PI * 0.1) * -1 ;
        // this.moveSpeed = cc.pRotateByAngle(cc.p(0,0), this.moveSpeed, randomAngle);
        // this.moveSpeed = cc.pMult(this.moveSpeed,8);

        //
        this.damage = 1;
        // this.node.getComponent(cc.EditBox).setFocus();

    },
    init: function (data) {
      //角度
        cc.log("bullet data = " + JSON.stringify(data));
        this.moveSpeed = data.angle;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.position = cc.pAdd(this.node.position,  cc.pMult(cc.p(this.moveSpeed.x, this.moveSpeed.y), 20));
        if (this.node.position.x > cc.Canvas.instance.designResolution.width * 0.5 - 100){
            this.node.destroy();
        }
        if (this.node.position.y > cc.Canvas.instance.designResolution.height){
            this.node.destroy();
        }
    },
    onDestroy: function () {
    },
    onCollisionEnter: function (other, self) {
        // cc.log("碰撞了");
        // other.removeFromParent(true);
        // self.removeFromParent(true);
        // this.node.removeFromParent(true);
        // this.node.destroy();

        if (other.node.name === "enemy"){
            cc.log("碰到的是敌人");
            this.node.removeFromParent(true);
        }


    },
    getDamage: function () {
        return this.damage;
    }
});
