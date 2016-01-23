var Credits = function () {

};

module.exports = Credits;

Credits.prototype = {

    create: function (){

        var text = "CREDITS";
        var text2= "\n \n \n Avery Thompson = Assets Designer";
        var text3= "\n \n \n \n \n Jack Thompson = Coder and Team Leader";
        var text4= "\n \n \n \n \n Nathan Rogers = Lead Coder";
        var text5= "\n \n \n \n \n \n  Jerrick Ban = Inspector and Coder";
        var style = { font: "80px Times New Roman", fill: "#ffff00", align: "center"};
        var style2 = { font: "50px Times New Roman", fill: "#ff0000", align: "left"};
        var style3 = { font: "40px Times New Roman", fill: "#ff0000", align: "left"};

        var t =this.add.text(this.world.centerX-300, 0, text, style);
        var t1=this.add.text(0,0,text2,style2);
        var t2=this.add.text(0,0,text3,style3);
        var t3=this.add.text(0,0,text4,style2);
        var t4=this.add.text(0,0,text5,style2);
    },
    update: function(){


    }
};