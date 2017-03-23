/*
 * @author		DenGo
 * @email		i@dengo.org
 * @link		http://dengo.org
 * @date		2014-05-24
 * @project		HTML5_Player
 * @description	基于html5和css3编写的音乐播发器
 */

//window.onload=function(){
	function j(ele){
		return document.querySelector(ele);
	}

	//=========================================保存初始化数据
	var audio = j('#my_audio');
	var musicMode = 'list';
	var musicIndex = 5;
	var bufferTimer = null;
	var volumeTimer = null;
	var planWidth = document.defaultView.getComputedStyle(j('.audioplayer-plan'),null)['width'];
	planWidth = planWidth.substring(0,planWidth.length-2);
	//============================================绑定事件
	j('#play').onclick=function(){
		toPlay('play');
	}

	j('#pause').onclick=function(){
		toPlay('pause');
	}

	j('#prev').onclick=function(){
		toPlay('prev');
	};

	j('#next').onclick=function(){
		toPlay('next');
	};
	//调整播放时间
	j('.audioplayer-plan').onclick=function(ev){
		adjustPorgress(this,ev);
//		console.log(ev)
	};
		//音量调节--延时隐藏调节面板
	j('.volume').onmouseover=j('.volume_wrap').onmouseover=function(){
		clearTimeout(volumeTimer);
		removeClass(j('.volume_wrap'),'hidden')
	};

	j('.volume').onmouseout=j('.volume_wrap').onmouseout=function(){
		volumeTimer = setTimeout(function(){
			addClass(j('.volume_wrap'),'hidden');
		},300);
	};

	j('.volume_bar').onclick=function(ev){
		adjustVolume(this,ev);
	};

	//是否静音
	j('.volume').onclick=function(){
		if (audio.muted == false) {
			this.style.color = '#A1A1A1';
			audio.muted = true;
		}
		else if (audio.muted == true) {
			this.style.color = '#E74D3C';
			audio.muted = false;
		};
	};
	//播放模式
	j('#reorder').onclick=function(){
		var title_str = this.getAttribute('name');
//		alert(title_str);
		changeMusicMode(this,title_str);
	};
	//===============================================初始化播放器
	initPlayer(musicIndex-1);
	audio.volume = 0.8;
	audio.addEventListener('canplay',bufferBar,false);

	function initPlayer(index){
		//音乐路径
		audio.setAttribute('src',playList[index].musicURL);
		//歌手
//		j('.artist_name').innerHTML = playList[index].artist;
		//头像
		j('.audio-img').setAttribute('src',playList[index].avatarURL);
		//歌名
		j('.audio-title .audio-title-name').innerHTML = playList[index].musicName;
		//专辑
//		j('.music_album').innerHTML = playList[index].musicAlbum;
		//进度条
		j('.progress').style.width =   0 +'px';
		//缓冲进度条
		audio.removeEventListener('canplay',bufferBar,false);
		clearInterval(bufferTimer);
		j('.buffer').style.width = 0 +'px';
	}
	
	//================================================更新歌曲播放索引，重新加载歌曲，并播放
	function playIndex(index){
		initPlayer(index);
		audio.load();
		audio.addEventListener('canplay',bufferBar,false);
		toPlay('play');
	}
	//==============================================播放结束后播放下一曲
	audio.addEventListener('ended',function(){
		playMusicMode('ended');
	},false);
	//==============================================播放出错提示
	audio.addEventListener('error',function(){
//		hintError('error');
	},false);
	
	function hintError(action){
		if(action == "error"){
//			alert('你要播放的歌曲找不到了:(，将为你自动播放下一曲');
			playMusicMode('ended');
		}
	}
	//==============================================根据播放模式计算歌曲索引
	function playMusicMode(action){
		var musicNum = playList.length;
		var index = musicIndex;

		//列表循环
		if (musicMode == 'list' ) {
			if (action == 'prev') {
				if (index == 1) { //如果是第一首歌，跳到最后一首
					index = musicNum;
				}
				else{
					index -= 1;
				}
			}
			else if (action == 'next' || action == 'ended') {
				if (index == musicNum) {//如果是最后一首歌，跳到第一首
					index = 1;
				}
				else{
					index += 1;
				}
			};
		};
				//随机播放
		if (musicMode == 'shuffle') {
			var randomIndex = parseInt(musicNum * Math.random());
			index = randomIndex + 1;
			if (index == musicIndex) {//下一首和当前相同，跳到下一首
				index += 1;
			};
		};

		//单曲循环
		if (musicMode == 'repeat') {
			if (action == 'prev') {
				if (index == 1) { //如果是第一首歌，跳到最后一首
					index = musicNum;
				}
				else{
					index -= 1;
				}
			}
			else if (action == 'next') {
				if (index == musicNum) {//如果是最后一首歌，跳到第一首
					index = 1;
				}
				else{
					index += 1;
				}
			}else{
				//if ended 如果是播放结束自动跳转，不做操作
			}
		};

		musicIndex = index;
		playIndex(index-1);
	}
	
	//===============================================更改播放模式
	function changeMusicMode(dom,mode){
		if(mode == '列表循环')
		{
			removeClass(j('#reorder'),'fa-reorder');
			addClass(j('#reorder'),'fa-retweet');
//			dom.title='单曲循环';
			dom.setAttribute('name','单曲循环');
			dom.setAttribute('data-original-title','单曲循环');
			musicMode = 'repeat';
		}
		else if(mode == '单曲循环')
		{
			removeClass(j('#reorder'),'fa-retweet');
			addClass(j('#reorder'),'fa-random');
//			dom.title='随机播放';
			dom.setAttribute('name','随机播放');
			dom.setAttribute('data-original-title','随机播放');
			musicMode = 'shuffle';
		}
		else if(mode == '随机播放')
		{
			removeClass(j('#reorder'),'fa-random');
			addClass(j('#reorder'),'fa-reorder');
//			dom.title='列表循环';
			dom.setAttribute('name','列表循环');
			dom.setAttribute('data-original-title','列表循环');
			musicMode = 'list';
		}
	}
	//=============================================显示剩余时间 和 播放进度条
	audio.addEventListener('timeupdate',function(){
		if (!isNaN(audio.duration)) {
			//剩余时间
			var surplus = audio.duration-audio.currentTime;
			var surplusMin = parseInt(surplus/60);
			var surplusSecond = parseInt(surplus%60);
			if (surplusSecond < 10 ) {
				surplusSecond = '0'+surplusSecond;
			};
			j('.audioplayer-time').innerHTML = "-" + surplusMin + ":" +surplusSecond;

			//播放进度条
			var progressValue = audio.currentTime/audio.duration*planWidth;
			j('.progress').style.width = parseInt(progressValue) + 'px';
		};
	},false);
	//===============================================显示缓冲进度条
	function bufferBar(){
		bufferTimer = setInterval(function(){
			var bufferIndex = audio.buffered.length;
			if (bufferIndex > 0 && audio.buffered != undefined) {
				var bufferValue = audio.buffered.end(bufferIndex-1)/audio.duration*planWidth;
				j('.buffer').style.width = parseInt(bufferValue)+'px';

				if (Math.abs(audio.duration - audio.buffered.end(bufferIndex-1)) <1) {
					j('.buffer').style.width = planWidth+'px';
					clearInterval(bufferTimer);
				};
			};
		},1000);
	}
	//=============================================调整播放进度条
	function adjustPorgress(dom,ev){
		var event = window.event || ev;
		var progressX = event.clientX - dom.getBoundingClientRect().left;
		audio.currentTime = parseInt(progressX/planWidth*audio.duration);
		audio.removeEventListener('canplay',bufferBar,false);
	}
	
	
	//===============================================调整音量条
	function adjustVolume(dom,ev){
		var event = window.event || ev;
		var volumeY = dom.getBoundingClientRect().bottom - event.clientY;
		audio.volume = (volumeY/80).toFixed(2);
		j('.volume_now').style.height = volumeY + 'px';
 	};
 	
	//=================================================播放
	function toPlay(action){
		if (action == 'play') {
			audio.play();
			removeClass(j('#pause'),'hidden');
			addClass(j('#play'),'hidden');
		}
		else if (action == 'pause') {
			audio.pause();
			removeClass(j('#play'),'hidden');
			addClass(j('#pause'),'hidden');
		}
		else if (action == 'prev') {
//			alert(action);
			playMusicMode(action);
		}
		else if (action == 'next') {
//			alert(action);
			playMusicMode(action);
		};
	}
	//=============================================对class操作的工具函数
	function hasClass(dom,className){
		var classNum = dom.className.split(" "),
			hasClass;

		for (var i = 0; i < classNum.length; i++) {
			if (classNum[i] == className) {
				hasClass = true;
				break;
			}
			else{
				hasClass = false;
			};
		};

		return hasClass;
	}

	function addClass(dom,className){
		if (!hasClass(dom,className)) {
			dom.className += " " + className;
		};
	}

	function removeClass(dom,className){
		if (hasClass(dom,className)) {
			var classNum = dom.className.split(" ");
			for (var i = 0; i < classNum.length; i++) {
				if (classNum[i] == className) {
					classNum.splice(i,1);
					dom.className = classNum.join(" ");
					break;
				};
			};
		};
	}

	function replaceClass(dom,className,replaceClass){
		if (hasClass(dom,className)) {
			var classNum = dom.className.split(" ");
			for (var i = 0; i < classNum.length; i++) {
				if (classNum[i] == className) {
					classNum.splice(i,1,replaceClass);
					dom.className = className.join(" ");
					break;
				};
			};
		};
	}
//}