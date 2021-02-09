window.onload = function () {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");


    context.beginPath();
    context.moveTo(20, 30);
    context.lineTo(20, 20);
    context.lineWidth = 2;
    context.strokeStyle = 'red';
    context.stroke();


    context.beginPath();
    context.moveTo(20, 30);
    context.lineTo(30, 10);
    context.lineWidth = 2;
    context.strokeStyle = 'red';
    context.stroke();

    context.beginPath();
    context.moveTo(80,50);
    context.lineTo(80,80);
    context.lineWidth = 2;
    context.strokeStyle = "red";
    context.stroke();

}