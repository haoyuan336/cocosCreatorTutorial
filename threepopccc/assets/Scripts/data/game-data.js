/**
 * Created by chuhaoyuan on 2017/7/6.
 */
import localDataController from './local-data-controller'
import defines from './../defines'
import LevelData from './../data/config/level-data'
const InfoMap = {
  levelCount: "level_count"
};
const GameData = function () {
  let that = {};
  that.levelCount = 0;
  that.playerID = 0;
  that.heartCount = 6;
  that.scoreCount = 0;
  that.distanceCount = 0;
  that.energyCount = 0;
  that.totalEnergyCount = 100;
  that.skillList = [];
  that.init = function () {
    that.heartCount = 6;
    that.scoreCount = 0;
    that.distanceCount = 0;
    that.energyCount = 0;
    // localDataController.removeLocalData(defines.userKey);
    if (localDataController.getData(defines.userKey) === null){
      let date = new Date();
      let id = date.getTime();
      localDataController.setData(defines.userKey,{playerID: id});
      cc.log("储存用户id");

      //储存一下激活的技能
      let skillList = defines.SkillList[[defines.SkillMap.fireAttack]];
      cc.log("skill list = " + JSON.stringify(skillList));
      localDataController.setData(defines.localStorageKeyMap.EnerySkill,skillList);


      //储存一下 当前玩家在第几关的位置
      localDataController.setData(InfoMap.levelCount, 0 );


      localDataController.setData(defines.KeyMap.now_level_count, "Level1");
    }
    that.playerID = localDataController.getData(defines.userKey).playerID;
    cc.log("用户ID = " + that.playerID);
    that.skillList = localDataController.getData(defines.localStorageKeyMap.EnerySkill);
    that.levelCount = localDataController.getData(InfoMap.levelCount);

  };
  that.addScore = function (score) {
    cc.log("add score" + score);
    that.scoreCount += score;
  };
  that.addDistance = function (distance) {
    that.distanceCount += distance;
  };
  that.subHeart = function (count) {
    that.heartCount -= count;
  };
  that.addEnergyCount = function (count,callback) {

    that.energyCount += count;
    if (that.energyCount > that.totalEnergyCount){
      that.energyCount = 0;
      if (callback){
        callback();
        //豆满了
      }
    }
  };
  that.subEnergyCount = function (count) {
    that.energyCount -= count;
  };
  that.getEnergyProgress = function () {
    let value = that.energyCount / that.totalEnergyCount;
    // return that.energyCount / that.totalEnergyCount;
    // cc.log("value = " + value);
    return value;
  };
  that.getMonsterLevelAndStartPoint = function () {
    //获取初始
    let monsterLevelCount = "Level1";
    let startPoint = undefined;

    if (localDataController.getData(defines.KeyMap.now_level_count)){
      monsterLevelCount = localDataController.getData(defines.KeyMap.now_level_count);
    }
    if (localDataController.getData(monsterLevelCount + defines.KeyMap.start_point)){
      startPoint = localDataController.getData(defines.KeyMap.now_level_count + defines.KeyMap.start_point);
    }




    return {
      nowLevelCount: monsterLevelCount,
      startPoint: startPoint
    }
  };

  that.getStartPointData  = function () {
    let monsterLevelCount = "Level1";
    if (localDataController.getData(defines.KeyMap.now_level_count)){
      monsterLevelCount = localDataController.getData(defines.KeyMap.now_level_count);
    }
    let startPoint = undefined;
    if (localDataController.getData(monsterLevelCount + defines.KeyMap.start_point)){
      startPoint = localDataController.getData(monsterLevelCount + defines.KeyMap.start_point);
    }
    return startPoint;
  };
  that.getLevelCount = function () {
    let monsterLevelCount = "Level1";
    if (localDataController.getData(defines.KeyMap.now_level_count)){
      monsterLevelCount = localDataController.getData(defines.KeyMap.now_level_count);
    }
    return monsterLevelCount;
  };
  that.setStartPointData = function (point) {

    cc.log("set start point = " + JSON.stringify(point));
    let levelCount = that.getLevelCount();
    localDataController.setData(levelCount + defines.KeyMap.start_point, point);
  };

  that.getMonsterDataInPoint = function (point) {
    let level = that.getLevelCount();
    if (localDataController.getData(level + defines.KeyMap.monster_data + JSON.stringify(point)) === null){
      return false
    }
    return localDataController.getData(level + defines.KeyMap.monster_data + JSON.stringify(point));
  };

  that.setMonsterDataInPoint = function (point, monsterdata) {
    let level = that.getLevelCount();
    localDataController.setData(level + defines.KeyMap.monster_data + JSON.stringify(point), monsterdata);
  };
  return that;
};
export default GameData;