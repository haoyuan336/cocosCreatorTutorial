/**
 * Created by chuhaoyuan on 2017/7/5.
 */
const EventListener = function (object) {
  let that = {};


  let handlerMap = {};
  that.on = function (type, method) {

    if (handlerMap.hasOwnProperty(type) === false){
      handlerMap[type] = [];
    }
    handlerMap[type].push(method);

  };
  that.fire = function (type) {
    // let list = handlerMap[type];
    // let paramList = [];
    // for (let i = 1 ; i < arguments.length ; i ++){
    //   paramList.push(arguments[i]);
    // }
    // for (let i = 0 ; i < list.length ; i ++){
    //   let method = list[i];
    //   console.log("paramlist = " + JSON.stringify(paramList));
    //   method.apply(this, paramList);
    // }
    let handler = null;
    if (handlerMap.hasOwnProperty(type)){
      let handlerList = handlerMap[type];
      for (let i = 0 ; i < handlerList.length ; i ++){
        handler = handlerList[i];
        let args = [];
        for (let i = 1 ; i < arguments.length ; i ++){
          args.push(arguments[i]);
        }
        handler.apply(this, args);
      }
    }


  };
  that.removeListener = function (type, method) {
    let list = handlerMap[type];
    for (let i = 0 ; i < list.length ; i ++){
      if (list[i] === method){
        list.splice(i, 1);
      }
    }
  };
  that.removeAllListener = function (type) {
    for (let i in handlerMap){
      // handlerMap[i] = [];
      delete handlerMap[i];
    }
  };

  return that;
};
export default EventListener;