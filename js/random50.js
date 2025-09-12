function GetRandomInt(min,max){
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
	IsSameAs(item){
		//判断item是否是该字符
		return (item===this.hiragana_)||(item===this.katakana_)||(item===this.sound_);
	}
	toString(){
		return "("+this.hiragana_+";"+this.sound_+";"+this.katakana_+")";
	}
}

let GetRandomJPChar = function (){
	//获取一个随机的假名
	//静态变量：50音数组
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
	//根据传入字符和形式，返回一个判断函数
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

function LaunchAGuess(){
	/*将假名以show给出的形式显示
	*同时将answer给出的形式视为正确答案*/
	let answer_type="s",show_type="h",range=20;

	if(answer_type==show_type){
		//答案与题目形式不应该一样
		console.error("[Error]: Identical answer and problem!");
	}
	let char=GetRandomJPChar(range);//获取随机假名
	SetCharacterOnDislay(char,show_type);//设置显示
	let correct_answer=GetAnswer(char,answer_type);//获取正确答案
	document.getElementById("submit_button").onclick=function (){
		let answer=document.getElementById("submit_text").value;//获取答案
		if(correct_answer===answer){
			alert("正确!");
			LaunchAGuess();//进行下一次猜测
		}else{
			alert("错误!答案是:"+correct_answer);
		}
	}
}

document.addEventListener("DOMContentLoaded", LaunchAGuess());//一进入页面就开始猜测