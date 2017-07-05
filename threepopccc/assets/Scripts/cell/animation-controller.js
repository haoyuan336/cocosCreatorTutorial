/**
 * Created by chuhaoyuan on 2017/7/4.
 */
const AnimationController = function () {
  let that = {};
  let _animationList = [];


  that.pushAnimation = function (animation) {


    _animationList.push(animation)

  };
  that.popFirstAnimation = function () {
    if (_animationList.length === 0 ){
      return null;
    }
    let animation = _animationList[0];
    _animationList.splice(0,1);
    console.log('animation list = ' + _animationList.length);
    return animation;
  };

  return that;
};
export default AnimationController;