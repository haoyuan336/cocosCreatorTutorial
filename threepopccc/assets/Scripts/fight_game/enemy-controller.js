import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
        EnemyPrefab: {
            default: [],
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.addEnemyTime = 0;
        this.addEnemySpeed = 0.1;

    },
    update: function (dt) {
        if (this.addEnemyTime > 20){
            this.addEnemyTime = 0;
            this.addEnemy();
        }else {
            this.addEnemyTime += this.addEnemySpeed;
        }
    },
    addEnemy: function () {
        let obj = global.gameDataController.getRandomObjInList(this.EnemyPrefab);


        let enemy = cc.instantiate(obj);
        enemy.parent = this.node.parent;
        enemy.position = this.node.position;
    }


});
