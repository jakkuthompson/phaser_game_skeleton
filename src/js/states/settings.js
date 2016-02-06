var Settings = function () {

};

module.exports = Settings;

Settings.prototype = {

    create: function (){

        var music = this.add.button(564, 0, 'menuplay', listenerMusic, this, 1, 0, 2);
        music.scale.x = 0.7;
        music.scale.y = 0.7;
    },
    update: function (){



    }
};

