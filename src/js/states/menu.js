var Menu = function () {
  this.text = null;
};

module.exports = Menu;

Menu.prototype = {

  create: function () {

    var style = { font: "65px Arial", fill: "#ffffff", align: "left" };

    this.text = this.add.text(240, 200, "Press to Start", style);

  },

  update: function () {
  },

  onDown: function () {
    this.game.state.start(playerState.currentLevel);
  }
};
