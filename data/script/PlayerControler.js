// JavaScript Document
/*
 *
 *	Move Player
 *
 */
function PlayerControl() {
  this.x = 400; // x
  this.y = 400; // y
  this.speed = 5; // move speed
  this.act = false; // talk to NPC, Act to object
  this.able = true; // can move
  this.left = false; // input left
  this.right = false; // input right
  this.up = false; // input up
  this.down = false; // input down
  this.width = 70; // image width
  this.height = 146; // image height
  this.moving = false; //움직이고 있는지 여부
  this.frameIndex = 1;
}

PlayerControl.prototype.Move = function () {
  if (this.able) {
    if (this.left && this.x > telis.minX + this.width / 2) {
      this.x -= this.speed;
    } else if (this.right && this.x < telis.maxX - this.width / 2) {
      this.x += this.speed;
    } else if (this.up && this.y > telis.minY + this.height / 2) {
      this.y -= this.speed;
    } else if (this.down && this.y < telis.maxY - this.height / 2) {
      this.y += this.speed;
    }
  }
  if (!this.moving) {
    this.frameIndex = 0;
  }
  if (this.moving) this.frameIndex += 0.1;
  if (this.frameIndex >= 3) {
    this.frameIndex = 1;
  }
  console.log("움직이는 중");
};

PlayerControl.prototype.setPoint = function (x, y) {
  this.x = x;
  this.y = y;
};

PlayerControl.prototype.Act = function () {
  if (this.act) {
    switch (telis.current_map) {
      case "Town":
        // 1125   1200   870  980
        if (this.inPotal(1180, 1230, 990, 1020)) {
          // Town 첫번째 집
          //if(this.x > 1125 && this.x < 1200 && this.y > 870 && this.y < 980) {
          telis.current_map = "Town_House1";
          this.setPoint(1130, 920);
          telis.setWorldPoint(670, 820, 1310, 1170);
        }
        if (this.inPotal(1540, 1660, 1960, 2030)) {
          // Town 맨 아래 포탈
          telis.current_map = "Forest";
          this.setPoint(900, 60);
          telis.setWorldPoint(0, 0, 2000, 2000);
          console.log("숲으로 나가는 포탈");
        }
        break;
      case "Town_House1":
        if (this.inPotal(1150, 1200, 950, 970)) {
          // Town 첫번째 집
          telis.current_map = "Town";
          this.setPoint(1160, 960);
          telis.setWorldPoint(0, 0, 2000, 2000);
        }
        break;

      case "Forest":
        break;
    }
  }
};

PlayerControl.prototype.inPotal = function (mx, _mx, my, _my) {
  if (
    this.x + this.width / 2 > mx &&
    this.x + this.width / 2 < _mx &&
    this.y + this.height / 2 > my &&
    this.y + this.height / 2 < _my
  ) {
    // Town 첫번째 집
    return true;
  } else {
    return false;
  }
};

var player = new PlayerControl();
