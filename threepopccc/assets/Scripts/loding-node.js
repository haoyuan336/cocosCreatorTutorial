import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        // setTimeout(function () {
        //     global.eventListener.fire("enter_game_node");
        // },1000);

    },
    init: function (data) {
      this.data = data;
    },
    onDestroy: function () {
        global.eventListener.fire("enter_game_node", this.data);
    }

});
