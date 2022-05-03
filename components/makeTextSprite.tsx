import * as THREE from "three";

var defaultWidthForText = 450;
var canvasMinSize = 300;
var textMultiplier = 1;

function getMaxWidth(context, texts)
{
    let maxWidth = 0;
    for(let i in texts)
        maxWidth = Math.max(maxWidth, context.measureText(texts[i]).width);
    return maxWidth;
}


export function makeTextSprite(message, parameters, transparent, opaque) {
  message = " " + message + " ";
  if (parameters === undefined) parameters = {};

  var fontface = parameters.hasOwnProperty("fontface") ?
      parameters["fontface"] : "Arial";

  var fontsize = parameters.hasOwnProperty("fontsize") ?
      parameters["fontsize"] : 70 ;

  var borderThickness = parameters.hasOwnProperty("borderThickness") ?
      parameters["borderThickness"] : 2;

  var borderColor = parameters.hasOwnProperty("borderColor") ?
      parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

  var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
      parameters["backgroundColor"] : { r: 169, g: 169, b: 169, a: 1.0 };

  var textColor = parameters.hasOwnProperty("textColor") ?
      parameters["textColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

  /// setting opaque
  if(opaque === undefined) backgroundColor.a = 0.3;
  else backgroundColor.a = opaque;

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = "Bold " + fontsize + "px " + fontface;

  var texts = message.split('\n');
  var totalLine = texts.length;
  var textWidth = getMaxWidth(context, texts);

  // setting canvas size
  var size = Math.max(canvasMinSize, textWidth + 2 * borderThickness);
  canvas.width = size;
  canvas.height = size;
  context.font = "Bold " + fontsize + "px " + fontface;

  // background color
  context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
      + backgroundColor.b + "," + backgroundColor.a + ")";
  // border color
  context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
      + borderColor.b + "," + borderColor.a + ")";
  // border width
  context.lineWidth = borderThickness;

  let totalTextHeight = fontsize * textMultiplier * totalLine;
  roundRect(context, (size/2 - textWidth / 2) - borderThickness/2, size / 2 - fontsize/2 - totalTextHeight/2, textWidth + borderThickness, totalTextHeight + fontsize/2 , 6);


  // text color
  context.fillStyle = "rgba(" + textColor.r + "," + textColor.g + ","
      + textColor.b + "," + textColor.a + ")";

  let startY = size / 2  - totalTextHeight/2 + fontsize/2 ;
  for(var i = 0; i < totalLine; i++) {
      let curWidth = context.measureText(texts[i]).width;
      context.fillText(texts[i], size/2 - curWidth/2, startY + fontsize * i * textMultiplier);
  }

  // canvas contents will be used for a texture
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  var spriteMaterial = new THREE.SpriteMaterial(
      { map: texture, transparent: true, depthTest: false, depthWrite: false });


  if (transparent !== undefined && transparent === true) {
      spriteMaterial.transparent = true;
      spriteMaterial.depthWrite = false;
      spriteMaterial.depthTest = false;
  }

  var sprite = new THREE.Sprite(spriteMaterial);
  //dimensions sprite
  var width = spriteMaterial.map.image.width;
  var height = spriteMaterial.map.image.height;
  
  sprite.scale.set( width/10, height/10, 1 );


  return sprite;
}



function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
  
