function RunKonvaStuff(stHeight, stWidth) {
    var stage = new Konva.Stage({
      container:'container',
      height: stHeight,
      width: stWidth
    });

    var rect = new Konva.Rect({
      x: 0,
      y: 0,
      height: stHeight,
      width: stWidth,
      stroke: 'red',
      strokeWidth: 2
    });

    var layer = new Konva.Layer();
    layer.add(rect);
    var img = new Image();
    img.addEventListener('load', function(){
      var kimg = new Konva.Image({
        image: img,
        x: 100,
        y: 100
      });
      var txt = new Konva.Text({
        x: 100 + img.width + 10,
        y: 110,
        text: 'Allo Allo',
        fontSize:30,
        fill:'black'
      });
      layer.add(kimg, txt).draw();
    });
    img.src = 'yeoman.png';
    var canvas = layer.canvas._canvas;
    canvas.style.backgroundColor = 'white';
    stage.add(layer);
}

window.addEventListener('load', function(){
  var container = document.getElementById('container');
  var left = container.parentNode.offsetLeft;
  var top = container.offsetTop;
  var maxHt = window.innerHeight - top - left;
  var maxWd = window.innerWidth - left * 2;
  RunKonvaStuff(maxHt, maxWd);
}, false);
