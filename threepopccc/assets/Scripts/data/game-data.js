/**
 * Created by chuhaoyuan on 2017/7/6.
 */
const GameData = function () {
  let that = {};
  that.heartCount = 6;
  that.scoreCount = 0;
  that.distanceCount = 0;
  that.init = function () {
    that.heartCount = 6;
    that.scoreCount = 0;
    that.distanceCount = 0;
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
  return that;
};
export default GameData;