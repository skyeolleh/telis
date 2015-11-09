// JavaScript Document
/*
*
*
*	Show Text Box 
*
*
*/

function Texter() {
	this.dialog = new Array(); // 대화, 이벤트 텍스트 배열
	this.showAble = new Array(); // 텍스트 출력 가능 여부 배열
	this.idx = 0;
}

Texter.prototype.addText = function(arr, name) {
	this.dialog.push({text : arr, name : name});
	this.showAble.push({show : false, name : name});
}

Texter.prototype.AnyTexterTrue = function() {
	for(var i = 0; i < this.showAble.length; i++) {
		if(this.showAble[i].show) {
			return true;
		}
	}
	return false;
}


Texter.prototype.getText = function(name) {
	for(var i = 0; i < this.dialog.length; i++) {
		if(this.dialog[i].name == name) {
			return this.dialog[i].text;
		}
	}
}

Texter.prototype.getTextIndex = function(name) {
	for(var i = 0; i < this.showAble.length; i++) {
		if(this.showAble[i].name == name) {
			return i;
		}
	}
}

// 추가한 대화의 이름, 일러스트, 사람
Texter.prototype.showText = function(name, illust, teller) {
	player.able = false;
	var t = this.getText(name);
	var cnt = t.length;
	if(this.idx < cnt) {
		
		// TextBox 출력
		telis.AlphaTextBox(0.5, "#000", persentageWidth(20), persentageHeight(70), persentageWidth(60), persentageHeight(30));
		
		// Text 출력
		var tmpstr = t[this.idx].split("\n");
		for(var i = 0; i < tmpstr.length; i++) {
			telis.showText(tmpstr[i], persentageWidth(35), persentageHeight(80) + (i * 30), "#FFF", '24px 맑은 고딕');
		}
		
		// Teller 출력
		if((typeof(teller) === "object")) {	// 둘이상의사람이 대화시의 일러스트 그림
			for(var i = 0; i < teller.length; i++) {
				telis.showText(teller[i], persentageWidth(35), persentageHeight(72), "#000", '30px 맑은 고딕');
			}
		}
		else if((typeof(teller) === "string")) 	// 독백 또는 혼자
			telis.showText(teller, persentageWidth(35), persentageHeight(72), "#000", '30px 맑은 고딕');
		else										// 일러스트가 없는 경우 
			;
		
		// Illust 출력
		if((typeof(illust) === "object")) 		// 둘이상의사람이 대화시의 일러스트 그림
			this.showIllust(teller[this.idx]);
		else if((typeof(illust) === "string")) 	// 독백 또는 혼자
			this.showIllust(illust);
		else										// 일러스트가 없는 경우 
			;
			
	} else if(this.idx >= cnt) { // 대화 종료
		this.showAble[this.getTextIndex(name)].show = false;
		this.idx = 0;
		player.able = true;
	}
}

Texter.prototype.showIllust = function(name) {
	telis.showImage(telis.getImage(name), persentageWidth(23), persentageHeight(75), 100, 100);
}

Texter.prototype.Render = function() {
	/*
	for(var i = 0; i < this.showAble.length; i++) {
		if(this.showAble[i].show) {
			this.showText("Prolog");
		}
	}
	*/
	if(this.showAble[0].show) {
		this.showText("Prolog", "Girl_normal", "소녀");
	} else if(this.showAble[1].show) {
		this.showText("Dialog1", "Girl_normal");
	}
}

var texter = new Texter();

/*  Add Text to Texter  */

texter.addText(["SpaceBar로 다음으로 넘길수있습니다\nCtrl 키로 전체화면을 할수있습니다.\n화살표로 움직입니다", "화살표 키 : 이동\nF11 : 전체화면\nShift : 달리기\nSpace : 선택, 대화, 행동", "밑으로 내려가면 사냥을 할 수 있는 공간이있었지?\n집에서 무기를 챙겨서 나가자."], "Prolog");


texter.addText(["이집은 들어갈수없다.", "열쇠가 필요할것같은데?"], "Dialog1");