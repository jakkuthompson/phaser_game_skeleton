var Credits = function () {

};

var credits;
var Jack;
var Nathan;
var Jerrick;
var Avery;

module.exports = Credits;

Credits.prototype = {

    create: function (){
        this.stage.backgroundColor="#00FFFF";

        credits = this.add.text(225, 0, "Credits", {
            font: "80px Arial",
            fill: "#000"
        });

        Jack = this.add.text(0, 135, "Jack Thompson: Team Leader and Programmer", {
            font: "30px Arial",
            fill: "#000"
        });
        Nathan = this.add.text(0, 175, "Nathan Rogers: Lead Programmer", {
            font: "30px Arial",
            fill: "#000"
        });
        Jerrick = this.add.text(0, 215, "Jerrick Ban: Programmer", {
            font: "30px Arial",
            fill: "#000"
        });
        Avery = this.add.text(0, 255, "Avery Thompson: Asset Designer", {
            font: "30px Arial",
            fill: "#000"
        });
    },
    update: function(){


    }
};