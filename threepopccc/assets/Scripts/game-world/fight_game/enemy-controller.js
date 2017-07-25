import global from './../../global'
import monsterLevelData from "./../../data/config/monster-level-data"
import monsterData from './../../data/config/monster-data'
const MonsterLevelState =  {
    Invalide: -1,
    AddEnemyLevel1: 1,
    AddEnemyLevel2 : 2
}
cc.Class({
    extends: cc.Component,

    properties: {
        EnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        EnemyBossPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.addEnemyTime = 0;
        this.addEnemySpeed = 0.1;
        // this.totalEnemyCount = global.gameData.monsterData.monster_count_0;
        this.addEnemyCount = 0;
        this.state = MonsterLevelState.Invalide;
        // this.state = MonsterLevelState.Invalide;
        // this.setState(MonsterLevelState.AddEnemyLevel1);
        global.eventListener.on("add_enemy_with_data", (data)=>{
            this.addEnemyWithInitData(data);
        });

    },
    init: function (data) {
        let monster = data.data.name;
        cc.log("monster = " + monster);
        this.levelData = global.gameDataController.getMonsterData(monster + "_level", monsterLevelData);
        cc.log("enemy data" + JSON.stringify(this.levelData));
        this.totalEnergyCount = this.levelData["monster_count"];
        global.eventListener.on("game_start",()=>{
           this.setState(MonsterLevelState.AddEnemyLevel1);
        });



    },
    update: function (dt) {

        if (this.state === MonsterLevelState.AddEnemyLevel1){
            if (this.addEnemyTime > 20){
                this.addEnemyTime = 0;
                if (this.addEnemyCount >= this.totalEnergyCount){
                    //前期的敌人添加完成，显出关主

                    this.setState(MonsterLevelState.AddEnemyLevel2);//进入增加敌人数量第二阶段
                }else {
                    this.addEnemy();

                }
            }else {
                this.addEnemyTime += this.addEnemySpeed;
            }
        }else if (this.state === MonsterLevelState.AddEnemyLevel2){
            //第二阶段
        }

    },
    addEnemy: function () {
        // let obj = global.gameDataController.getRandomObjInList(this.EnemyPrefab);
        // let obj = global
        let enemy = cc.instantiate(this.EnemyPrefab);
        enemy.parent = this.node.parent;
        enemy.position = this.node.position;
        enemy.getComponent("enemy").init(this.levelData["monster"]);
        this.addEnemyCount ++;
    },
    addBigEnemy: function () {
        // let obj = global.gameDataController
        let enemy = cc.instantiate(this.EnemyBossPrefab);
        enemy.parent = this.node.parent;
        // enemy.position = {
        //     x: this.node.position.x - 400,
        //     y: this.node.position.y
        // };
        enemy.getComponent("boss").init(this.levelData["monster_boss"]);


    },
    setState: function (state) {
        if (this.state ===  state){
            return
        }
        switch (state){
            case MonsterLevelState.AddEnemyLevel1:
                break;
            case MonsterLevelState.AddEnemyLevel2:
                global.eventListener.fire("enter_game_level_2"); //游戏进入第二阶段
              //添加一个游戏关主
                this.addBigEnemy();
                break;
            default:
                break;
        }
        this.state = state;
    }
    ,
    addEnemyWithInitData : function (data) {
        // cc.log("add enemy with init data " + JSON.stringify(data));
        // let image = monsterLevelData[data.monster].image;
        // cc.loader.loadRes(image, cc.SpriteFrame, (err, spriteFrame)=>{
        //     let monster = cc.instantiate(this)
        // });

        let enemy = cc.instantiate(this.EnemyPrefab);
        enemy.parent = this.node;
        enemy.position = this.node.convertToNodeSpace(data.position);
        enemy.getComponent("enemy").init(data.monster);
    }


});
