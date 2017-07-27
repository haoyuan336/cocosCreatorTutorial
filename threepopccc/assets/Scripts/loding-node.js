cc.Class({
    extends: cc.Component,

    properties: {

      progressBar: {
        default: null,
        type: cc.ProgressBar
      }
    },

    onLoad: function () {
      this.loadIndex = 0;


    },
    init: function (callBack) {
     this.callBack = callBack;
    },
    update: function (dt) {


      this.progressBar.progress = this.loadIndex;
      if (this.loadIndex < 1){
        this.loadIndex += dt * 0.4
      }else {
        if (this.callBack){
          this.callBack.call();
        }
        this.destroy();
        this.node.removeFromParent(true);
      }




    },
    onDestroy: function () {
        // global.eventListener.fire("enter_game_node", this.data);
    }

});
