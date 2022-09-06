/* JavaScript
 *
 *	GameFramework - Telis
 *	version 0.1
 *  Add Images
 *
 *	Moblie Games
 *
 */

/* 함수 선언 */
function Telis() {
  // 맵의 크기
  this.worldwidth = 2000;
  this.worldheight = 2000;
  this.worldX = 0;
  this.worldY = 0;
  // 이동가능한 맵 크기
  this.minX = 0;
  this.minY = 0;
  this.maxX = 2000;
  this.maxY = 2000;

  this.img = new Array(); // Unit or Object Images
  this.map = new Array(); // Map Images
  this.sprite = new Array(); // Sprite Images
  this.version = 0.1;
  this.loader = 0;
  this.total;
  this.canvas = document.getElementById("GameCanvas");
  this.camera = document.getElementById("CameraCanvas");
  this.ctx = this.canvas.getContext("2d");
  this.ctx.font = "18px 맑은고딕";
  this.ctx.textBaseline = "top";
  this.current_map = "Town";
}
/*  이미지 파일을 추가  */
Telis.prototype.addImage = function (src, name) {
  var tmpimg = new Image();
  tmpimg.src = src;
  this.img.push({ img: tmpimg, name: name, src: src });
};

// 위치, 이름, 가로크기, 세로크기, 애니메이션 속도, 애니메이션 프레임 수
Telis.prototype.addSprite = function (src, name, width, height, fps, frame) {
  var tmpimg = new Image();
  tmpimg.src = src;
  this.sprite.push({
    img: tmpimg,
    name: name,
    width: width,
    height: height,
    fps: fps,
    frame: frame,
  });
};
Telis.prototype.addMap = function (src, name, location) {
  var tmpimg = new Image();
  tmpimg.src = src;
  this.map.push({ img: tmpimg, name: name, src: src, location: location });
};

/*  정보 표시  */
// 원하는 색으로 카메라안에 텍스트 출력
Telis.prototype.showText = function (text, x, y, color, font) {
  this.ctx.fillStyle = color;
  this.ctx.font = font;
  this.ctx.fillText(text, this.worldX + x, this.worldY + y);
};
Telis.prototype.showImage = function (img, x, y, width, height) {
  this.ctx.drawImage(img, this.worldX + x, this.worldY + y, width, height);
};
Telis.prototype.AlphaTextBox = function (alpha, color, x, y, width, height) {
  this.ctx.fillStyle = color;
  this.ctx.globalAlpha = alpha;
  this.ctx.fillRect(this.worldX + x, this.worldY + y, width, height);
  this.ctx.globalAlpha = 1;
};

// 랜덤 숫자를 반환
Telis.prototype.Random = function (n) {
  return Math.floor(Math.random() * n);
};
Telis.prototype.RandomTo = function (n1, n2) {
  var tmp = n2 - n1;
  return Math.floor(Math.random() * n2) + tmp;
};

// 전체화면으로 전환
Telis.prototype.FullScreen = function () {
  if (this.canvas.webkitRequestFullScreen) {
    this.canvas.webkitRequestFullScreen();
  } else {
    this.canvas.mozRequestFullScreen();
  }
};

// 지정한 이름으로 이미지를 찾아옴
Telis.prototype.getImage = function (image_name) {
  var img;
  for (var i = 0; i < this.img.length; i++) {
    if (this.img[i].name == image_name) {
      return this.img[i].img;
    }
  }
};
Telis.prototype.getSprite = function (sprite_name) {
  var arr;
  for (var i = 0; i < this.sprite.length; i++) {
    if (this.sprite[i].name == sprite_name) {
      return this.sprite[i];
    }
  }
};

// 지정한 이름으로 맵을 찾아옴
Telis.prototype.getMapImage = function (map_name) {
  var img;
  for (var i = 0; i < this.map.length; i++) {
    if (this.map[i].name == map_name) {
      return this.map[i].img;
    }
  }
};
// 지정한 이름으로 맵 정보를 찾아옴
Telis.prototype.getMapName = function (map_name) {
  var img;
  for (var i = 0; i < this.map.length; i++) {
    if (this.map[i].name == map_name) {
      return this.map[i].location;
    }
  }
};

Telis.prototype.persentage = function (num) {
  return num / 100;
};

Telis.prototype.setWorldSize = function (w, h) {
  this.worldwidth = w;
  this.worldheight = h;
};

Telis.prototype.setWorldPoint = function (min_x, min_y, max_x, max_y) {
  this.minX = min_x;
  this.minY = min_y;
  this.maxX = max_x;
  this.maxY = max_y;
};

/* FPS 매니저 */
function FPS() {
  this.time = 0;
  this.cnt = 0;
  this.fps = 0;

  return this;
}

FPS.prototype.showFPS = function () {
  this.cnt++;
  var tmpDate = new Date();
  if (this.time + 1000 < tmpDate.getTime()) {
    this.fps = this.cnt;
    this.cnt = 0;
    this.time = tmpDate.getTime();
  }
  delete tmpDate;
};

var fps_manager = new FPS();
var telis = new Telis();
