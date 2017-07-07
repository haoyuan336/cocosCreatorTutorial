/**
 * Created by chuhaoyuan on 2017/7/3.
 */
const defines = {};
defines.gameDataWidth = 8;
defines.gameDataHeight = 9;
defines.cellType = {
  "boom1": 0,
  "boom2": 1,
  "boom3": 2,
  "boom4": 3,
  "boom5": 4,
  "boom6": 5,
  "boom7": 6,

};
defines.cellSpeed = 1000;
defines.energyComboRateList = [0,1,4,7,9,12];
defines.SkillList = ["fireAttack","tornadoAttack","iceAttack", "thunderAttack","heartCure","speedState"];
defines.SkillMap = {
  "fireAttack": 0,
  "tornadoAttack": 1,
  "iceAttack": 2,
  "thunderAttack": 3,
  "heartCure": 4,
  "speedState": 5
};
defines.localStorageKeyMap = {
  "EnerySkill": "enery_skill" //激活的技能豆
};
defines.userKey = "userkey";

export default defines