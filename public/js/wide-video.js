var count=0;
var first_video_loaded=false;
var second_video_loaded=false;
var first_slide_ocurred=false;
var enough_bw=false;

var dataVideos=[
	{filename:"intro1",boxId:"slide1",color:"#353ff8",background:"#FFFFFF"},
	{filename:"intro2",boxId:"slide2",color:"#D0AA00",background:"#FFFFFF"}		
	];

function correctImage(id){

	$(id).delay(1000).animate({left:"0%"},100);
}

function fixBackgroundHeight(){

	if($("#Registration").height()>$("body").height()){

		$("#images, #video").css("height",getDocumentHeight()+"px");

	}else{

		$("#images, #video").css("height","");
	}
}

function getDocumentHeight(){
	var D=document;
	return Math.max(D.body.scrollHeight,D.documentElement.scrollHeight,D.body.offsetHeight,D.documentElement.offsetHeight,D.body.clientHeight,D.documentElement.clientHeight);
}

function getDocumentRatio(){
	var wh=$(window).height();
	var ww=$(window).width();
	var ratio=wh/ww;return ratio;
}

function hideVideo(id,source){
	document.getElementById(id).style.display="none";
}

function imageSlide(i){
	var curr_i=dataVideos[i];

	if((dataVideos.length-1)==i){
		var next_i=dataVideos[0];
		var load_i=dataVideos[1];
		loopImage();
	}else{
		if((dataVideos.length-2)==i){
			var next_i=dataVideos[i+1];
			var load_i=dataVideos[0];
		}
		else{
			var next_i=dataVideos[i+1];
			var load_i=dataVideos[i+2];
		}
	}

	if(count==1){
		if(!($("#image-"+load_i.filename).length>0)){
			$("#images").prepend('<div class="image-box" id="image-'+load_i.boxId+'" ><img class="image-slide" id="image-'+load_i.filename+'" src="img/'+load_i.filename+'.png" /></div>');
			sizeImage();
		}
	}

	playImage(next_i);
	$("#image-"+next_i.boxId).css("opacity",0).animate({opacity:1},800);$("#image-"+curr_i.boxId).css("opacity",1).animate({opacity:0},800);
	var ratio=getDocumentRatio();
	correctImage("#image-"+curr_i.filename);
	panningImage("#image-"+next_i.filename,ratio);
}

function loadMediaFirst(){
	if(!mobileCheck()){
		$("#images").hide();
		$("#video").show();videoHtml(dataVideos[0]);
		$("#"+dataVideos[0].boxId).css("background-image","url(img/"+dataVideos[0].filename+".png)");
		hideVideo(dataVideos[0].filename,0);
		sizeVideo();
		sizeVideoBg();
		$("#"+dataVideos[0].filename).on("canplay",videoOnCanPlay);
		loadVideo(dataVideos[0].filename,0);
		playVideo(dataVideos[0]);
		$("video").addClass("hidden");}else{$("#images").show();
		$("#video").hide();
		$("#images").prepend('<div class="image-box" id="image-'+dataVideos[0].boxId+'" style="z-index: -1;" ><img class="image-slide" id="image-'+dataVideos[0].filename+'" src="img/'+dataVideos[0].filename+'.png" /></div>');sizeImage();
	}
}

function loadMediaSecond(){
	if(!mobileCheck()){
		videoHtml(dataVideos[1]);
		$("#"+dataVideos[1].boxId).css("background-image","url(img/"+dataVideos[1].filename+".png)");
		hideVideo(dataVideos[1].filename,0);
		sizeVideo();
		sizeVideoBg();
		$("#"+dataVideos[1].filename).on("canplay",videoOnCanPlay);
		loadVideo(dataVideos[1].filename,0);
		$("video").addClass("hidden");
	}else{
		$("#images").prepend('<div class="image-box" id="image-'+dataVideos[1].boxId+'" ><img class="image-slide" id="image-'+dataVideos[1].filename+'" src="img/'+dataVideos[1].filename+'.png" /></div>');sizeImage();
		prechargeImage();
	}
}

function loadVideo(id,source){
	document.getElementById(id).style.display="inline";document.getElementById(id).load();
	document.getElementById(id).pause();console.log("Loading video "+id);
}

function loopImage(){
	count++;
	for(var i=0;i<dataVideos.length;i++){
		var delay=(i+1)*5000;setTimeout("imageSlide("+i+");",delay);
	}
}

function loopVideo(){
	count++;
	for(var i=0;i<dataVideos.length;i++){
		var delay=(i+1)*9000;setTimeout("videoSlide("+i+");",delay);
	}
}

function panningImage(id,ratio){
	$(id).animate({left:"-5%"},4400);
}

function mobileCheck(){
	var check=false;
	if(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)){
		check=true;
	}
	return check;
}

function playImage(video){
	if(document.getElementById("btn-form")!=null){
	
		document.getElementById("btn-form").style.background=video.color;document.getElementById("bubble").style.background=video.color;document.getElementById("bubble").style.border=video.color;
	}
	document.body.style.backgroundColor=video.background;
}

function playVideo(video){
	if($("#"+video.filename).length>0){
		document.getElementById(video.filename).play();
	}
	if(document.getElementById("btn-form")!=null){
		document.getElementById("btn-form").style.background=video.color;document.getElementById("bubble").style.background=video.color;document.getElementById("bubble").style.border=video.color;
	}

	document.body.style.backgroundColor=video.background;
}

function prechargeImage(){
	playImage(dataVideos[0]);
	var ratio=getDocumentRatio();
	panningImage("#image-"+dataVideos[0].filename,ratio);
}

function prechargeVideo(){
	loadVideo("vidvid1",0);
	loadVideo("vidvid2",1);
	playVideo("vidvid1","#353ff8","#0C2363");
}

function showSocial(responseText,statusText,xhr,$form){
	$(".hero").fadeOut("slow",function(){
		$(this).text("Thanks. Want to tell anyone?");
	}).fadeIn("slow");

	$("#subscriptionForm").fadeOut("slow",function(){
		$("#social").fadeIn("slow");
		});
}

function sizeImage(ratioImage){
	if(typeof ratioImage=="undefined"){
		ratioImage=getDocumentRatio();
	}
	if(ratioImage<1){
		console.log("width : 100%");
		$(".image-slide").css("width","100%").css("height","auto");
	}
	else{
		console.log("heigth  : 100%");
		$(".image-slide").css("width","auto").css("height","100%");
	}
}

function sizeVideo(ratio){
	if(typeof ratio=="undefined"){
		ratio=getDocumentRatio();
	}
	if(ratio<9/16){
		console.log("width : 100%");
		$("video").css("width","100%").css("height","auto");
	}else{
		console.log("heigth  : 100%");
		$("video").css("width","auto").css("height","100%");
	}
}

function sizeVideoBg(ratio){
	if(typeof ratio=="undefined"){
		ratio=getDocumentRatio();
	}
	if(ratio<1){
		$(".video-box").removeClass("tall").addClass("wide");
	}else{
		$(".video-box").removeClass("wide").addClass("tall");
	}
}

function videoHtml(video){
	if(video==dataVideos[0]||video==dataVideos[1]){
		var force=true;
	}
	else{
		var force=false;
	}
	if(!($("#"+dataVideos[0].filename).hasClass("hidden"))||force){
		$("#video").prepend('<div class="video-box" id="'+video.boxId+'" ><video class="transparent" id="'+video.filename+'" preload="metadata"></video></div>');
		$("#"+video.filename).append('<source src="video/'+video.filename+'.mp4">');
		$("#"+video.filename).append('<source src="video/'+video.filename+'.ogv">');
		$("#"+video.filename).append('<source src="video/'+video.filename+'.webm">');
	}
	else{
		$("#video").prepend('<div class="video-box" id="'+video.boxId+'" > </div>');
	}
	if(video==dataVideos[0]){
		$("#"+video.boxId).css("opacity",1);
	}

	$("#"+video.filename).on("canplay",videoOnCanPlay);sizeVideo();sizeVideoBg();
}

function videoOnCanPlay(){
	if(this.getAttribute("id")==dataVideos[0].filename){
		first_video_loaded=true;
	}
	if(this.getAttribute("id")==dataVideos[1].filename){
		second_video_loaded=true;
	}
	if(this.getAttribute("id")==dataVideos[0].filename||this.getAttribute("id")==dataVideos[1].filename){
		if(first_video_loaded&&second_video_loaded&&!first_slide_ocurred){
			$("video").removeClass("hidden");
		}
	}

	$(this).removeClass("transparent").addClass("transition");
}

function videoSlide(i){
	var curr_v=dataVideos[i];
	if((dataVideos.length-1)==i){
		var next_v=dataVideos[0];
		var load_v=dataVideos[1];
		loopVideo();
	}
	else{
		if((dataVideos.length-2)==i){
			var next_v=dataVideos[i+1];
			var load_v=dataVideos[0];
		}
		else{var next_v=dataVideos[i+1];
			var load_v=dataVideos[i+2];
		}
	}
	if(count==1){
		if(!($("#"+load_v.filename).length>0)){
			videoHtml(load_v);
		}else{
			if($("#"+load_v.filename).length>0){
				loadVideo(load_v.filename,1);
			}
		}

		$("#"+load_v.boxId).css("background-image","url(img/"+load_v.filename+".png)");

		if(enough_bw){
			$(".video-box").addClass("no-bg");
		}
	}

	playVideo(next_v);
	$("#"+next_v.boxId).css("opacity",0).delay(100).animate({opacity:1},400).css("zIndex",-2).animate({zIndex:-1},200).toggleClass("expand");
	$("#"+curr_v.boxId).css("opacity",1).delay(100).animate({opacity:0},800).css("zIndex",-1).animate({zIndex:-2},200).toggleClass("expand");
}