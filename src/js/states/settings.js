var Settings = function () {

};

module.exports = Settings;

Settings.prototype = {

    create: function (){




        var back = this.add.button(730, 0, 'exitstore', gotomenu, this, 1, 0, 2);
        back.scale.x = 0.7;
        back.scale.y = 0.7;

    },
    update: function (){



    }
};

function gotomenu(){

    this.game.state.start('Menu');


}