/**
 * Created by chuhaoyuan on 2017/7/3.
 */
import GameDataController from './GameDataController'
import AnimationController from './AnimationController'
const global = {};
global.gameDataController = GameDataController();
global.animationController = AnimationController();
export default global;