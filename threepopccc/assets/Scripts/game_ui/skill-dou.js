import global from './../global'
import defines from './../defines'
cc.Class({
    extends: cc.Component,

    properties: {
        skinSpriteFrame: {
            type: cc.SpriteFrame,
            default: [] //是一个列表，技能皮肤列表
        }

    },
    onLoad: function () {
        this.skillList = [];
        // this.addOneSkill();
        // this.addOneSkill();
        // this.addOneSkill();
        // this.addOneSkill();

        global.eventListener.on("add_one_skill_node",()=>{
            this.addOneSkill();
        });


        this.addOneSkill();
        this.addOneSkill();
        this.addOneSkill();

    },
    addOneSkill: function () {


        let skinType = global.gameDataController.getRandomObjInList(defines.SkillList);
        let skinIndex = defines.SkillMap[skinType];
        let skillNode = new cc.Node("Skill");
        skillNode.addComponent(cc.Sprite).spriteFrame = this.skinSpriteFrame[skinIndex];
        skillNode.parent = this.node;

        skillNode.scale = {
            x: 0.1,
            y: 0.1
        };

        let scale = {};

        if (this.skillList.length === 0){
            scale = {
                x: 1.4,
                y: 1.4
            }
        }else {
            scale = {
                x: 1,
                y: 1
            };
            skillNode.position = {
                x: -20 - 70 * this.skillList.length,
                y: -10
            }

        }

        let action = cc.scaleTo(0.1,scale.x,scale.y);
        skillNode.runAction(action);




        // action.addComponent(cc.Button);
        skillNode.interactable = true;
        let self = this;
        skillNode.on(cc.Node.EventType.TOUCH_START,function (event) {
            cc.log('click');
            let target = event.target;
            // cc.log("click index = " + target.index);
            // cc.log("skill list = " + self.skillList.length);
            // if (target.index === 0){
            //     cc.log("使用了此技能");
            // }
            if (target === self.skillList[0]){
                cc.log("使用了此技能");
                self.popOneSkill(target);
            }
        });

        // skillNode.index = this.skillList.length;
        this.skillList.push(skillNode);

    },

    referSkillListUI: function () {
        cc.log('刷新技能都的位置');
    },
    popOneSkill: function (target) {

        this.skillList.splice(0,1);
        target.destroy();
        this.referSkillListUI();


        // if (this.skillList.length === 0 ){
        //
        // }else {
        //    //  let skill = this.skillList[this.skillList.length - 1];
        //    // // this.skillList.splice(this.skillList.length - 1, 1); //删掉数组的最后一个元素;
        //    //  this.node.removeChild(skill);
        //    //  return skill;
        // }
    }
});
