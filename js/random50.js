function GetRandomInt(min,max){
	/*获取[min,max]随机整数*/
	return Math.floor(Math.random()*max)+min;
}

class JPChar{
	//日语字符，将平假名、罗马音和片假名绑定
	constructor(hiragana,sound,katakana){
		this.hiragana_=hiragana;
		this.katakana_=katakana;
		this.sound_=sound;
	}
	get hiragana(){
		return this.hiragana_;
	}
	get sound(){
		return this.sound_;
	}
	get katakana(){
		return this.katakana_;
	}
	toString(){
		return "("+this.hiragana_+";"+this.sound_+";"+this.katakana_+")";
	}
}

let GetRandomJPChar = function (){
	/*获取一个随机的假名*/
	//静态变量：50音数组 45个元素
	const map=[
		new JPChar("あ", "a", "ア"),
		new JPChar("い", "i", "イ"),
		new JPChar("う", "u", "ウ"),
		new JPChar("え", "e", "エ"),
		new JPChar("お", "o", "オ"),
		new JPChar("か", "ka", "カ"),
		new JPChar("き", "ki", "キ"),
		new JPChar("く", "ku", "ク"),
		new JPChar("け", "ke", "ケ"),
		new JPChar("こ", "ko", "コ"),
		new JPChar("さ", "sa", "サ"),
		new JPChar("し", "si", "シ"),
		new JPChar("す", "su", "ス"),
		new JPChar("せ", "se", "セ"),
		new JPChar("そ", "so", "ソ"),
		new JPChar("た", "ta", "タ"),
		new JPChar("ち", "chi", "チ"),
		new JPChar("つ", "tsu", "ツ"),
		new JPChar("て", "te", "テ"),
		new JPChar("と", "to", "ト"),
		new JPChar("な", "na", "ナ"),
		new JPChar("に", "ɲi", "ニ"),
		new JPChar("ぬ", "nu", "ヌ"),
		new JPChar("ね", "ne", "ネ"),
		new JPChar("の", "no", "ノ"),
		new JPChar("は", "ha", "ハ"),
		new JPChar("ひ", "hi", "ヒ"),
		new JPChar("ふ", "fu", "フ"),
		new JPChar("へ", "he", "ヘ"),
		new JPChar("ほ", "ho", "ホ"),
		new JPChar("ま", "ma", "マ"),
		new JPChar("み", "mi", "ミ"),
		new JPChar("む", "mu", "ム"),
		new JPChar("め", "me", "メ"),
		new JPChar("も", "mo", "モ"),
		new JPChar("や", "ya", "ヤ"),
		new JPChar("ゆ", "yu", "ユ"),
		new JPChar("よ", "yo", "ヨ"),
		new JPChar("ら", "ra", "ラ"),
		new JPChar("り", "ri", "リ"),
		new JPChar("る", "ru", "ル"),
		new JPChar("れ", "re", "レ"),
		new JPChar("ろ", "ro", "ロ"),
		new JPChar("わ", "wa", "ワ"),
		new JPChar("を", "wo", "ヲ")
	];
	return function (range){
		return map[GetRandomInt(0,range)];
	}
}();

function SetCharacterOnDislay(char,type){
	/*设置显示的字符*/
	let display=document.getElementById("character_on_display");//获取显示元素
	if(display===null){console.error("[Error]: Fail to find display box!");return;}
	//设置显示的形式
	if(type==="h"){
		display.innerHTML=char.hiragana;	
	}else if(type==="k"){
		display.innerHTML=char.katakana;
	}else if(type==="s"){
		display.innerHTML=char.sound;
	}else{
		console.error("[Error]: Unknown type of japanese character!");
		return;
	}
}

function GetAnswer(char,type){
	/*根据传入字符和形式，返回一个判断函数*/
	let answer;
	if(type==="h"){
		answer=char.hiragana;
	}else if(type==="k"){
		answer=char.katakana;
	}else if(type==="s"){
		answer=char.sound;
	}else{
		console.warn("Unknown type of japanese character!");
		return;
	}
	return answer;
}

let CheckParamsValid = function(){
	/*检查参数合法性*/ 
	let now_show_type="h",now_answer_type="s",now_range=20;	
	return function({show_type,answer_type,range}={}){
		//如果有参数调用则更更新参数，无则沿用
		if(show_type==undefined){show_type=now_show_type;}
		else{now_show_type=show_type;}
		if(answer_type==undefined){answer_type=now_answer_type;}
		else{now_answer_type=answer_type;}
		if(range==undefined){range=now_range;}
		else{now_range=range;}
		return {show_type:show_type,answer_type:answer_type,range:range};
	}
}()

function LaunchAGuess({show_type,answer_type,range}={}){
	/**以show给出的形式随机显示range范围内的假名
	 *同时将answer给出的形式视为正确答案*/
	let char=GetRandomJPChar(range);//获取随机假名
	SetCharacterOnDislay(char,show_type);//设置显示
	let correct_answer=GetAnswer(char,answer_type);//获取正确答案
	document.getElementById("submit_button").onclick=function (){
		let answer=document.getElementById("submit_text").value;//获取答案
		if(correct_answer===answer){
			alert("正确!");
			LaunchAGuess(CheckParamsValid());//进行下一次猜测
		}else{
			alert("错误!答案是:"+correct_answer);
		}
	}
}

//绑定
const show_type_group=document.getElementById("show_panel");
const answer_type_group=document.getElementById("answer_panel");
const char_range=document.getElementById("char_range");
let ChangeType =function(target){
	/*检查target输入是否合法*/
	//确定修改的目标和需要比较的目标
	let compare_target;
	if(target==="answer_type"){
		compare_target="show_type";
	}else if(target==="show_type"){
		compare_target="answer_type";
	}
	return function(event){
		let target_type = event.target.value.toString().slice(-1);//截取最后一位标识符
		let old_params=CheckParamsValid();
		if(old_params[compare_target]===target_type){
			//不合法的输入，回退
			target_type=old_params[target];
			const all_radio=document.querySelectorAll('input[name="'+target+'"]')//遍历所有target对应的按钮
			all_radio.forEach(radio=>{
				radio.checked=(radio.value.toString().slice(-1)===target_type);//重新选中原来的按钮
			})	
			alert("显示形式和答案形式不能相同！");
			return;
		}
		let new_params=CheckParamsValid({[target]:target_type});
		LaunchAGuess(new_params);
	}
}
//绑定配置面板
show_type_group.addEventListener("change",ChangeType("show_type"));
answer_type_group.addEventListener("change",ChangeType("answer_type"));
char_range.addEventListener("change",function(event){
	const range=event.target.value;
	let new_params=CheckParamsValid(undefined,undefined,range);
	LaunchAGuess(new_params);
})
//绑定刷新按钮
document.getElementById("refresh_button").addEventListener("click",function(){
	LaunchAGuess(CheckParamsValid());
});

let default_params=CheckParamsValid();//默认参数
document.addEventListener("DOMContentLoaded", 
	LaunchAGuess(default_params));//一进入页面就开始猜测