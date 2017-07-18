import global from './../../global'
cc.Class({
    extends: cc.Component,

    properties: {
       heartLabel: {
           type: cc.Label,
           default: null
       },
        scoreLabel: {
            type: cc.Label,
            default: null
        },
        distanceLabel: {
            type: cc.Label,
            default: null
        },
        energyProgressBar: {
            type: cc.ProgressBar,
            default: null
        },
        comboRateEffectNode: {
            type: cc.Node,
            default: null
        },
        skillDou: {
            type: cc.Prefab,
            default: null
        }
    }
    ,

    onLoad: function () {

      global.gameData.init();//在这里初始化数据
      let self = this;
      const comboEffect = function (count) {
        // cc.log("combo effect = " + count);
        if (count <= 0 ){
          return;
        }
        let node = new cc.Node("effect");
        node.parent = self.comboRateEffectNode;
        node.addComponent(cc.Label).string = "x" + count;
        node.rotation = 20 - Math.random() * 40;

        let action = cc.sequence(cc.scaleTo(0.2,1.6,1.6).easing(cc.easeIn(3)),cc.fadeTo(0.5,0),cc.callFunc(function () {
          self.comboRateEffectNode.removeChild(node);
        }));
        node.runAction(action);

      };
      this.comboEffect = comboEffect;
      global.eventListener.on("add_combo_effect",this.comboEffect);
      const addEnergy = function (count) {
        global.gameData.addEnergyCount(count,()=>{
          //加满了,这时候给玩家加一个豆，
          // let bomnSkill = global.gameDataController.getOneEnergyBomb();
          //在这里初始化一个技能豆,并且gameui进行管理
          // let bombSkill = global.gameDataController.getRandomObjInList(global.gameData.skillList);
          // cc.log("bomb skill" + bombSkill);
          global.eventListener.fire("add_one_skill_node");

        });
        self.energyProgressBar.progress = global.gameData.getEnergyProgress();
      };
      this.addEnergy = addEnergy;
      global.eventListener.on("add_energy",this.addEnergy);
    },
    update: function () {
        this.heartLabel.string ="heart:" + global.gameData.heartCount;
        this.scoreLabel.string = "score:" + global.gameData.scoreCount;
        this.distanceLabel.string = "distance: " + global.gameData.distanceCount;
        // this.progressBar.progress = global.gameData.getEnergyProgress();
    },
    comboEffect: function (count) {

    },
    onDestroy: function () {
        global.eventListener.removeListener("add_combo_effect",this.comboEffect);
        global.eventListener.removeListener("add_energy",this.addEnergy);
      //注销监听
    }
});
