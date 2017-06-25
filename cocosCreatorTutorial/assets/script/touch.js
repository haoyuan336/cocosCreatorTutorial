cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        Parent: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        cc.log("canvas script onload");
        this.node.on(cc.Node.EventType.TOUCH_START,function (event) {
        },this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function (event) {
            self.Parent.getComponent("controller").setTouchPosition(event.getLocation());
            cc.log("Touch Move");
        });
        this.node.on(cc.Node.EventType.TOUCH_END,function (event) {
            cc.log("Touch End");
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
