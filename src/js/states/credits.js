var Credits = function () {

};

module.exports = Credits;

Credits.prototype = {

    create: function (){

        var text = "- phaser -\n with a sprinkle of \n pixi dust.";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t =this.add.text(this.world.centerX-300, 0, text, style);

    },
    update: function(){


    }
};

