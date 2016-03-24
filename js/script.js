// 如果窗口高度+100 < 整个文档的高度，就删除hidden类
// 并且用affix方法为该对象添加affix-top类
$(document).ready(function() {
	if ( ($(window).height() + 1) < $(document).height() ) {
	    $('#top-link-block').removeClass('hidden').affix({
	        // 距离父节点顶部100以后，切换为affix类
	        offset: {top:1}
	    });
	}
});

//侧边栏悬浮
$(document).ready(function() {
    $('#side-bav-bar').affix({
        offset: {
        	top: function () {
        		return (this.bottom = $('nav').outerHeight(true))
        	},
        	bottom: function () {
        		return (this.bottom = $('footer').outerHeight(true))
        	}
        }
    });
});

//table中select颜色随选项变化
$(document).ready(function() {
    $('table select').css("background-color",$(this).find("option:selected").css("background-color"));
});

$(document).ready(function() {
    $('table select').change(function() {
        $(this).css("background-color",$(this).find("option:selected").css("background-color"));
    });
});
