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
    onDestroy: function () {
        global.eventListener.fire("enter_game_node");
    }

});
