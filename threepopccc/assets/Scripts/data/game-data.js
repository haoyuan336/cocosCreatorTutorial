/**
 * Created by chuhaoyuan on 2017/7/6.
 */
const GameData = function () {
  let that = {};
  that.heartCount = 6;
  that.scoreCount = 0;
  that.distanceCount = 0;
  that.energyCount = 0;
  that.totalEnergyCount = 100;
  that.init = function () {
    that.heartCount = 6;
    that.scoreCount = 0;
    that.distanceCount = 0;
    that.energyCount = 0;
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
  that.addEnergyCount = function (count) {

    that.energyCount += count;
    if (that.energyCount > that.totalEnergyCount){
      that.energyCount = that.totalEnergyCount;
    }
  };
  that.subEnergyCount = function (count) {
    that.energyCount -= count;
  };
  that.getEnergyProgress = function () {
    let value = that.energyCount / that.totalEnergyCount;
    // return that.energyCount / that.totalEnergyCount;
    cc.log("value = " + value);
    return value;
  }
  return that;
};
export default GameData;