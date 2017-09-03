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
defines.monsterType = {
  "monster_0": "monster_0"
},
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
defines.initMainWorldType = {
  startPos: "startPos",
  returnStartPos: "returnStartPos"
};
defines.levelCountList = ["Level1","Level2","Level3","Level3"];
defines.levelCountMap = {
  "Level1": 0,
  "Level2": 1,
  "Level3": 2,
  "Level4": 3
};
defines.monsterSpriteFrameConfig = {
  "monster_0": "mash_room_0.png",
  "monster_1": "mash_room_1.png",
  "monster_2": "mash_room_2.png",
  "monster_3": "mash_room_3.png"
};
defines.userKey = "userkey";
defines.KeyMap = {
  "now_level_count": "now_level_count",
  "start_point": "start_point",
  "monster_data": "monster_data",  //储存的怪物类型
  "monster_create_time": "monster_create_time", //创建怪兽的时间
  "game_win_or_lose": "game_win_or_lose", // 游戏是胜利还是失败
  "action_weapon_name_list": "action_weapon_name_list", //激活的武器名字的列表
  "action_cloth_name_list": "sction_cloth_name_list"   //激活点衣服名字点列表
};
defines.weaponKey = ["gun_1","gun_2"];
defines.clothKey = ["cloth_1", "cloth_2", "cloth_3", "cloth_4", "cloth_5", "cloth_6"];
defines.thingKey = ['thing_1',"thing_2","thing_3","thing_4","thing_5","thing_6","thing_7", "thing_8"];
export default defines