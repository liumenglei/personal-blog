jQuery(document).ready(function($) {	
			if($("meta[name=toTop]").attr("content")=="true"){
				$("<div id='toTop'><img src='images/top.png' title='返回顶部'></div>").appendTo('body');
				$("#toTop").css({
					width: '37px',
					height: '37px',
					bottom:'36px',
					right:'5%',
					position:'fixed',
					cursor:'pointer',
					zIndex:'999999',
				});
				$("#toTop").children('img').css({
					width: '37px',
					height: '37px',
				});
				
				if($(this).scrollTop()==0){
						$("#toTop").hide();
					}
				$(window).scroll(function(event) {
					/* Act on the event */
					if($(this).scrollTop()==0){
						$("#toTop").hide();
					}
					if($(this).scrollTop()!=0){
						$("#toTop").show();
					}
				});	
					$("#toTop").hover(function(){
						$(this).children('img').attr('src','images/top2.png')
						$(this).attr('class','')
					},function(){
						$(this).children('img').attr('src','images/top.png')
					})
					$("#toTop").click(function(event) {
								/* Act on the event */
								$(this).attr('class','rubberBand animated')
//								$(this).attr('class','')
								$("html,body").animate({
									scrollTop:"0px"},
									666
									)
							});
				}
		});