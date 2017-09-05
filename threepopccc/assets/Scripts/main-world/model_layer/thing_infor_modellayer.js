cc.Class({
    extends: cc.Component,

    properties: {
        name_label:{
            default: null,
            type: cc.Label
        },
        descirption_label: {
            default: null,
            type: cc.Label
        },
        
    },

    // use this for initialization
    onLoad: function () {
        this.node.interactable = true;
        this.node.on(cc.Node.EventType.TOUCH_START,  (event) =>{
            cc.log("thing info touch start");
            this.node.removeFromParent(true);
        });
    },
    initWithData: function (data) {
        cc.log("init with data = " + JSON.stringify(data));
        this.name_label.string = data.name;


    }


});
