import global from './../../global'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },


    uiButtonClick: function (target,customEventData) {
        cc.log("click data = " + customEventData);
        global.eventListener.fire('button_click',customEventData);

    }

});
