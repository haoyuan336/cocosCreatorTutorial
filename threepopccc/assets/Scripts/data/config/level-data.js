/**
 * Created by chuhaoyuan on 2017/7/23.
 */

const MonsterList =  [
  ["monster_0"],
  ["monster_0","monster_1"],
  ["monster_0","monster_1","monster_2"],
  ["monster_1","monster_2","monster_3","monster_4"],
];
const LevelData = {
  Level1: {
    monsterList: MonsterList[0],
    map: "./tiledmap/map_1.tmx"
  }
};
export default LevelData;