import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {


    },
    init: function (data) {
      this.data = data;
        setTimeout(function () {
            global.eventListener.fire("enter_game_node",data);
        },1000);
    },
    onDestroy: function () {
        // global.eventListener.fire("enter_game_node", this.data);
    }

});
