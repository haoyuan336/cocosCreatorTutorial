/**
 * Created by chuhaoyuan on 2017/6/28.
 */
import defines from './game_defines'
const PuzzleController = function () {
  let that = {};


  const getRandomValue = function () {
    return defines.PuzzleLineType[defines.PuzzleLineTypeList[Math.floor(Math.random() * (defines.PuzzleLineTypeList.length))]];
  };

  that.getPuzzleMap = function () {
    let list = [];
    for (let i = 0 ; i < 2 ; i ++){
      for (let j = 0 ; j < 3 ; j ++){
        let map = {};
        list.push(map);
        map[defines.PuzzleDirectionMap.RIGHT] = getRandomValue();
        map[defines.PuzzleDirectionMap.DOWN] = getRandomValue();

        if (list.length > 1){
          let beforMap = list[list.length - 2];
          map[defines.PuzzleDirectionMap.LEFT] = 0 - beforMap[defines.PuzzleDirectionMap.RIGHT];
        }
        if (list.length > 3){
          let beforMap = list[list.length - 4];
          map[defines.PuzzleDirectionMap.UP] = 0 - beforMap[defines.PuzzleDirectionMap.DOWN];
        }

        if (i === 0){
          map[defines.PuzzleDirectionMap.UP] = defines.PuzzleLineType.MIDDLE;
        }
        if (i === 1){
          map[defines.PuzzleDirectionMap.DOWN] = defines.PuzzleLineType.MIDDLE;
        }
        if (j === 0){
          map[defines.PuzzleDirectionMap.LEFT] = defines.PuzzleLineType.MIDDLE;
        }
        if (j === 2){
          map[defines.PuzzleDirectionMap.RIGHT] = defines.PuzzleLineType.MIDDLE;
        }

        console.log('map = '+ JSON.stringify(map));
        console.log('index =' + i + ',' + j);


      }
    }

    return list;
  };

  return that;
};
export default PuzzleController;
