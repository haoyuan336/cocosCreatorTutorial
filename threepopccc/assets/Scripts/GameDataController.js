/**
 * Created by chuhaoyuan on 2017/7/3.
 */
import defines from './defines'
const GameDataController = function() {
  let that = {};
  that.nullPosList = [];
  that.cellList = [];


  const getRandomType = function () {
    let list = [];
    for (let i in defines.cellType){
      list.push(i);
    }

    let type = list[Math.floor(Math.random() * (list.length - 1))]
    return type;

  };

  that.getGameData =  function () {
    let gameData = [];

    for (let i = 0 ; i < defines.gameDataHeight; i ++){
      for (let j = 0 ; j < defines.gameDataWidth ; j ++){
        let data = {};
        data.type = getRandomType();
        gameData.push(data);
      }
    }

    return gameData
  };

  return that;
};
export default GameDataController;