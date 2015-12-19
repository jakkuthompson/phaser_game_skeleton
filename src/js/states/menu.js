var Menu = function () {
  this.text = null;
};

module.exports = Menu;

Menu.prototype = {

  create: function () {

    this.asset = this.add.sprite(25, 25, 'menulogo');
    this.asset.scale.x = 2;
    this.asset.scale.y = 2;

    this.playbutton = this.add.sprite(500, 150, 'playbutton');
    this.playbutton.scale.x = 0.5;
    this.playbutton.scale.y = 0.5;




  },

  update: function () {
  },

  onDown: function () {

  }
};

