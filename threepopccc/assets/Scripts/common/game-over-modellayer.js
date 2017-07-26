import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // use this for initialization
    onLoad: function () {

    },
    init: function () {

    },
    okButtonClick: function () {
        global.eventListener.fire("enter_main_world");
    }

  
});
