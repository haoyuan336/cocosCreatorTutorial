/**
 * Created by chuhaoyuan on 2017/7/7.
 */
let LocalDataController = function () {
  let that = {};

  //读取数据，以及加密


  const writeData = function (key, data) {
    //储存数据
    cc.sys.localStorage.setItem(key,JSON.stringify(data));
    // let dataStr = JSON.stringify(data);
    // var encryted = encryted.encrypt(dataStr,secretKey,256);
    // cc.sys.localStorage.setItem(key, encryted);

  };
  const readData = function (key) {
    //读取数据
    var cipherText = cc.sys.localStorage.getItem(key);
    // var userData = JSON.parse(encrypt.decrypt(cipherText,secretKey,256));
    //
    return JSON.parse(cipherText);
  };

  that.removeLocalData = function (key) {
    cc.sys.localStorage.removeItem(key);
  };

  that.setData = writeData;
  that.getData = readData;


  return that;
};
const localDataController = LocalDataController();
export default localDataController;