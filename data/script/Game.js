/*
 *
 *
 *	Main Game Source
 *	Camara
 *	Input Key
 *	Image Load
 *
 */

// window.addEventListener(
//   "mousedown",
//   function (e) {
//     alert(
//       "X : " +
//         (telis.worldX + e.clientX) +
//         "\nY : " +
//         (telis.worldY + e.clientY)
//     );
//   },
//   false
// );

addEventListener("keydown", keyDown, false);
addEventListener("keyup", keyUp, false);
addEventListener("resize", Resize, false);

var loader = 0;
var total;
var canvas = document.getElementById("GameCanvas");
var camera = document.getElementById("camera");
var ctx = canvas.getContext("2d");

var map_name = "Town";

window.onload = function () {};

var state = {
  main: 0,
  pause: 1,
  over: 2,
  game: 3,
};

var setting = {
  volume: 100,
  width: 1280,
  height: 720,
  show: true,
};

var current_gameState = state.main;

function Load() {
  // Game Image를 로딩함
  loader = 0;
  // 오브젝트 이미지 로딩
  for (var i = 0; i < telis.img.length; i++) {
    telis.img[i].img.onload = function () {
      loader += 1;
      Resize();
      telis.FullScreen();
      Loading();
    };
  }

  for (var i = 0; i < telis.sprite.length; i++) {
    loader += 1;
    Resize();
    telis.FullScreen();
    Loading();
  }

  // 맵 이미지를 로딩함
  for (var i = 0; i < telis.map.length; i++) {
    telis.map[i].img.onload = function () {
      loader += 1;
      Resize();
      telis.FullScreen();
      Loading();
    };
  }
}

// 로딩되는 과정을 보여줌
function Loading() {
  total = telis.img.length + telis.map.length + telis.sprite.length;
  telis.ctx.font = "24px 맑은 고딕";
  telis.showText("Image Resources Loading...", 500, 320, "#000");
  telis.showText(Math.floor((loader / total) * 100) + "%", 750, 350, "#00F");

  if (loader >= total) {
    telis.showText("Done...", 800, 320, "#000");
    telis.showText("Loading Game...", 500, 350, "#000");
    setTimeout(() => LoadComplete(), 500);
  }
}

// 로딩이 완료될 경우 실행
function LoadComplete() {
  GameLoad();
  Resize();
  telis.FullScreen();
  texter.showAble[0].show = true;
}

// 게임 루프를 실행
function GameLoad() {
  setInterval(GameLoop, 1000 / 60);
}

function GameLoop() {
  Update();
  Render();
  fps_manager.showFPS();
}

function Render() {
  ctx.font = "18px 맑은 고딕";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, setting.width, setting.height);

  /*  Map Drawing  */

  switch (telis.current_map) {
    // Forest 지역
    case "Forest":
      ctx.drawImage(telis.getMapImage(telis.current_map), 0, 0);
      break;

    // Town 지역
    case "Town":
      ctx.drawImage(telis.getMapImage(telis.current_map), 0, 0);
      break;
    case "Town_House1":
      ctx.drawImage(telis.getMapImage(telis.current_map), 0, 0);
      break;
  }
  //   console.log(telis.getImage("Ironman"), "image");
  /* Unit or Object Drawing */
  //   ctx.drawImage(
  //     telis.getImage("Ironman"),
  //     player.x - player.width / 2,
  //     player.y - player.height / 2
  //   ); // 플레이어
  //   telis.getSprite("Man");
  let currentFrame = 0;

  let manSprite = telis.getSprite("Man");
  ctx.drawImage(
    manSprite.img,
    parseInt(player.frameIndex) * manSprite.width,
    0,
    manSprite.width,
    manSprite.height,
    player.x - player.width / 2,
    player.y - player.height / 2,
    manSprite.width,
    manSprite.height
  ); // 플레이어

  if (setting.show) {
    // 정보 출력
    telis.AlphaTextBox(
      0.3,
      "#000",
      0,
      0,
      persentageWidth(100),
      persentageHeight(5)
    );
    telis.showText(
      player.moving,
      persentageWidth(50),
      persentageHeight(1),
      "#FFF"
    );
    telis.showText(
      player.frameIndex,
      persentageWidth(60),
      persentageHeight(1),
      "#FFF"
    );
    telis.showText(
      telis.getMapName(telis.current_map),
      persentageWidth(1),
      persentageHeight(1),
      "#FFF"
    );
    telis.showText(
      fps_manager.fps + " FPS",
      persentageWidth(95),
      persentageHeight(1),
      "#FFF"
    );
    telis.showText(
      "X : " +
        (player.x + player.width / 2) +
        "\nY : " +
        (player.y + player.height / 2),
      persentageWidth(1),
      persentageHeight(5),
      "#FFF"
    );
  }

  texter.Render(); // Texter이벤트를 그림
}

function Update() {
  player.Move();
  Camera();
}

function keyDown(e) {
  switch (e.keyCode) {
    case 37:
      player.left = true;
      player.moving = true;
      break;

    case 39:
      player.right = true;
      player.moving = true;
      break;

    case 38:
      player.up = true;
      player.moving = true;
      break;

    case 40:
      player.down = true;
      player.moving = true;
      break;

    case 16:
      player.speed = 15;
      break;
    case 17: // Ctrl
      telis.FullScreen();
      break;

    case 32:
      player.act = true;
      player.Act();
      if (texter.AnyTexterTrue()) {
        texter.idx += 1;
      } else {
        texter.idx = 0;
      }
      break;
  }
  console.log(
    "Pressed KeyCode : " + e.keyCode + " - " + String.fromCharCode(e.keyCode)
  );
}

function keyUp(e) {
  switch (e.keyCode) {
    case 37:
      player.left = false;
      player.moving = false;
      break;

    case 39:
      player.right = false;
      player.moving = false;
      break;

    case 38:
      player.up = false;
      player.moving = false;
      break;

    case 40:
      player.down = false;
      player.moving = false;
      break;
    case 32:
      player.act = false;
      break;
    case 16:
      player.speed = 5;
      break;
  }
}

function Resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  telis.canvas.width = w;
  telis.canvas.height = h;
  telis.ctx.scale(w / setting.width, h / setting.height);
  telis.ctx.translate(-telis.worldX, -telis.worldY);
}

function Camera() {
  var width = telis.worldwidth;
  var height = telis.worldheight;
  var camera_info = {
    x: setting.width,
    y: setting.height,
  };

  /* 카메라 이동 */

  // 플레이어 점프
  if (
    telis.worldY < height - camera_info.y &&
    telis.worldY + camera_info.y / 2 < player.y
  ) {
    telis.worldY += player.speed;
    ctx.translate(0, -player.speed);
  }
  if (telis.worldY > 0 && telis.worldY + camera_info.y / 2 > player.y) {
    ctx.translate(0, player.speed);
    telis.worldY -= player.speed;
  }

  // Player 좌우 이동
  if (
    telis.worldX < width - camera_info.x &&
    telis.worldX + camera_info.x / 2 < player.x
  ) {
    telis.worldX += player.speed;
    ctx.translate(-player.speed, 0);
  }
  if (telis.worldX > 0 && telis.worldX + camera_info.x / 2 > player.x) {
    ctx.translate(player.speed, 0);
    telis.worldX -= player.speed;
  }
}

function persentageWidth(num) {
  return (num / 100) * setting.width;
}

function persentageHeight(num) {
  return (num / 100) * setting.height;
}
