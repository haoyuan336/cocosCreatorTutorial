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
        this.addOneSkill();
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


        if (this.skillList.length === 0){
            skillNode.scale = {
                x: 1.4,
                y: 1.4
            };
        }else {
            skillNode.position = {
                x: -20 - 70 * this.skillList.length,
                y: -10
            }

        }


        this.skillList.push(skillNode);

    },

    popOneSkill: function () {
        if (this.skillList.length === 0 ){

        }else {
            let skill = this.skillList[this.skillList.length - 1];
            this.skillList.splice(this.skillList.length - 1, 1); //删掉数组的最后一个元素;
            this.node.removeChild(skill);
            return skill;
        }
    }
});
