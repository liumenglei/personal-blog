	/**
 * 首页jquery效果（2016-06-17）
 */
$(document).ready(function() {
	//控制下拉菜单箭头翻转特效
	$('.multilevel').hover(function() {
		$(this).children('ul').stop(true, true).slideDown(200);
		$(this).children('a:eq(0)').children('i').removeClass('jtnfz');
		$(this).children('a:eq(0)').children('i').addClass('jtsfz');
	}, function() {
		$(this).children('ul').stop(true.true).slideUp(200);
		$(this).children('a:eq(0)').children('i').removeClass('jtsfz');
		$(this).children('a:eq(0)').children('i').addClass('jtnfz');

	});
	//控制导航栏变换样式
	$("#navbar li").hover(function() {
		$(this).children().children('p').attr('class', 'aspan');
	}, function() {
		$(this).children().children('p').attr('class', 'aspan1');
	})
	/********************控制搜索框start**************************/
	$('#searchform input[type="submit"]').hover(function() {
		$('#searchform input[type="text"]').css('width', '403px');
		$('#searchform fieldset').css('width', '442px');
	}, function() {
		if ($('#searchform input[type="text"]').val() != '') {
			$('#searchform input[type="text"]').css('width', '403px');
			$('#searchform fieldset').css('width', '442px');
		} else {
			$('#searchform input[type="text"]').css('width', '173px');
			$('#searchform fieldset').css('width', '212px');
		}
	})
	$('#searchform input[type="text"]').hover(function() {
		$(this).css('width', '403px');
		$('#searchform fieldset').css('width', '442px');
	}, function() {
		if ($(this).val() != '') {
			$(this).css('width', '403px');
			$('#searchform fieldset').css('width', '442px');
		} else {
			$(this).css('width', '173px');
			$('#searchform fieldset').css('width', '212px');
		}
	})
	$('#searchform input[type="text"]').blur(function() {
		if ($(this).val() != '') {
			$(this).css('width', '403px');
			$('#searchform fieldset').css('width', '442px');
		} else {
			$(this).css('width', '173px');
			$('#searchform fieldset').css('width', '212px');
		}
	})
	$('#searchform input[type="text"]').focus(function() {
		$(this).css('width', '403px');
		$('#searchform fieldset').css('width', '442px');
	})
	/********************控制搜索框end**************************/
})