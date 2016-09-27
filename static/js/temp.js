
/*********************************** 初始化 ***************************************/

var section_num = 11;

/* radio-inner-input初始化 */
function InitRadioInnerInput()
{
	$("input:radio.radio-inner-input").each(function(index, el) {
		var name = $(this).attr("name");
		var value = $(this).val();
		var input = $(this).next("input");

		$("input:radio[name='"+name+"']").click(function(event) {
			/* Act on the event */
			if (value == $("input:radio[name='"+name+"']:checked").val())
			{
				input.show();
			}
			else
			{
				input.hide();
			}
		});
	});
}

function InitDatetimepicker()
{
	$('.date').each(function(index, el) {
		$(this).datetimepicker({
	    	locale: 'zh-cn',
	    	format: 'YYYY年MM月DD日',
	    	dayViewHeaderFormat: 'YYYY MMMM',
	    });
	});
}

$(document).ready(function() {
	InitRadioInnerInput();
	InitDatetimepicker();
});

/* 设置时间显示 */
function setTime()
{
	var d=new Date();
	var month=new Array(12);
	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";

	var string = month[d.getMonth()]+' '+d.getDate()+', '+d.getHours()+':'+d.getMinutes();
	$('#time').html(string);

	setTimeout('setTime()',500);
}

/*********************************** 添加按钮统一处理 ***************************************/

$(document).ready(function() {
	$('[data-add]').each(function(index, el) {
		var num = 1;
		var html = $(this).html();
		var root = $(this);
		$('#'+$(this).data('add')).click(function(event) {
			/* Act on the event */
			num ++;

			html = html.replace(/[0-9]{3}-[0-9]{3}-[0-9]+/g, function (substr){
				return substr.replace(/[0-9]+$/g, num);
			});

			$(html).appendTo(root);

			/* 刷新inner input */
			InitRadioInnerInput();
			/* 刷新datetimepicker */
			InitDatetimepicker();
		});
	});
});

/*********************************** 表单切换统一处理 ***************************************/
$(document).ready(function() {
	$('[data-switch][data-toggle]').each(function(index, el) {
		var this_element = $(this);

		function ToggleSwitch()
		{
			var value = $("input[name='"+this_element.data("switch")+"']:checked").val()
			if (-1 == this_element.data("toggle").indexOf(value))
			{
				this_element.hide();
			}
			else
			{
				this_element.show();
			}
		}

		ToggleSwitch();

		$("input[name='"+this_element.data("switch")+"']").click(function(event) {
			/* Act on the event */
			ToggleSwitch();
		});
	});
});

/*********************************** 自动填写 ***************************************/

/* 阿拉伯数字转大写汉字 */
function DX(n) {
	if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
	    return "<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>元整";
	var unit = "千百拾亿千百拾万千百拾元角分", str = "";
	    n += "00";
	var p = n.indexOf('.');
	if (p >= 0)
	    n = n.substring(0, p) + n.substr(p+1, 2);
	    unit = unit.substr(unit.length - n.length);
	for (var i=0; i < n.length; i++)
	    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}

/*********************************** 预览控制 ***************************************/

/* 获取表单取值，没有则返回下横线 */
function GetVal (selector)
{
	if ('' != selector.val())
	{
		return selector.val();
	}
	else
	{
		return '<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>';
	}
}

/* 获取radio或者check的取值，返回一个选择或未选择的符号 */
function GetSelectionVal (radioName, checkVal)
{
	if (checkVal == $("input[name='"+radioName+"']:checked").val())
	{
		/* 选中 */
		return '&#9745;'
	}
	else
	{
		/* 未选中 */
		return '&#9744;'
	}
}

/* 生成预览HTML */
function preview_html()
{
	var index = $('<div class="a4-warpper"></div>').appendTo($('#sample-view'));
	index = $('<div class="a4-paper"></div>').appendTo(index);
	index = $('<div class="a4-margin"></div>').appendTo(index);
	$('<p class="title"></p>').appendTo(index);
	$('<p><br></p>').appendTo(index);
	$('<p><b></b></p>').appendTo(index);
	$('<p class="list"><b></b></p>').appendTo(index);
	$('<p></p>').appendTo(index);
}

/* 生成预览HTML */
$('a[href="#sample-view"]').on('show.bs.tab', function (e){
	preview_html();
})

/* 删除预览HTML */
$('a[href="#sample-view"]').on('hidden.bs.tab', function (e) {
	$('#sample-view').empty();
})

/*********************************** 翻页控制 ***************************************/

function setProgress(tmpI)
{
	var percentage = Math.ceil(100/section_num*(tmpI));
	if (tmpI == section_num)
	{
		percentage = 100;
	}

	$('div.progress-bar').attr('aria-valuenow', percentage);
	$('div.progress-bar').text(percentage+'%');
	$('div.progress-bar').css('width', percentage+'%');
}

function setPage(tmpI)
{
	if ($('#pagination').css('display') == 'none')
	{
		for (var i=1; i<=section_num; i++)
		{
			$('#section-'+i).show();
		}
	}
	else
	{
		for (var i=1; i<=section_num; i++)
		{
			if (tmpI == i)
			{
				$('#section-'+i).show();
			}
			else
			{
				$('#section-'+i).hide();
			}
		}

		if (1 == tmpI)
		{
			$('button.prev').addClass("disabled");
			$('button.next').removeClass("disabled");
		}
		else if (section_num == tmpI)
		{
			$('button.prev').removeClass("disabled");
			$('button.next').addClass("disabled");
		}
		else
		{
			$('button.prev').removeClass("disabled");
			$('button.next').removeClass("disabled");
		}
		setProgress(tmpI);
	}
}

function setPrev()
{
	for (var i=1; i<=section_num; i++)
	{
		if($('#section-'+i).is(':visible'))
		{
			break;
		}
	}

	if (i > 1)
	{
		setPage(i-1);
	}
}

function setNext()
{
	for (var i=1; i<=section_num; i++)
	{
		if($('#section-'+i).is(':visible'))
		{
			break;
		}
	}

	if (i < section_num)
	{
		setPage(i+1);
	}
}

$('button.prev').click(function(event) {
	setPrev();
});

$('button.next').click(function(event) {
	setNext();
});

$(document).ready(function() {
	setTime();
	setPage(1);
});

/*********************************** 合同提交 ***************************************/

/* 为提交给后端的html添加CSS */
function ReplaceCSS(text)
{
	var para_reg = new RegExp('class="para"','g');
	var para_replace = 'style="font-size:14pt;line-height:1.5;text-indent:28pt;text-align:justify"';

	var list_reg = new RegExp('class="list"','g');
	var list_replace = 'style="font-size:14pt;line-height:1.5;padding-left:0.74cm;text-indent:-0.74cm;text-align:justify"';

	var title_reg = new RegExp('class="title"','g');
	var title_replace = 'style="font-size:28pt;font-weight:bold;line-height:1.5;text-align:center"';

	var center_reg = new RegExp('class="center"','g');
	var center_replace = 'style="text-align:center"';

	text = text.replace(para_reg, para_replace);
	text = text.replace(list_reg, list_replace);
	text = text.replace(title_reg, title_replace);
	text = text.replace(center_reg, center_replace);

	return text;
}

/* html提交给后端 */
$('button[type="submit"]').click(function(event) {
	/* 添加html的字符串，提交给后台 */
	preview_html();
	var head = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"></head><body>';
	var html = ReplaceCSS($('div.a4-margin').html());
	//var html = $('div.a4-margin').html();
	$("<input hidden type='text' name='html' value='"+head+html+"</body></html>'>").insertBefore(this);
	$('#sample-view').empty();

	/* 创建合同后默认添加的事件 */
});

/*$("form").submit(function(e){
    e.preventDefault();
    alert("Submit prevented");
});*/

/*********************************** 表单校验 ***************************************/

$(document).ready(function() {
	$('#002').validate({
	    rules: {
	      '002-007': {
	        email: true
	      },
	      '002-013': {
	        email: true
	      },
	      '002-018': {
	        email: true
	      },
	      '002-026': {
	        email: true
	      },
	      '002-034': {
	        email: true
	      },
	      '002-040': {
	        email: true
	      },
	      '002-047': {
	        email: true
	      }
	    },
	    messages: {
	      '002-007': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-013': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-018': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-026': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-034': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-040': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-047': {
	        email: "请输入一个合法的邮箱地址"
	      }
	    },
        submitHandler:function(form){
            form.submit();
        },
        errorClass:'input-error',
        validClass:'input-valid'
	});
});


/*********************************** 移动端界面处理 ***************************************/

//删除所有data-hint，因为在移动端没有悬停，但该属性会占用宽度
function RemoveHint()
{
	if ($('#pagination').css('display') == 'none')
	{
		$('[data-hint]').each(function(index, el) {
			$(this).removeAttr('data-hint');
		});
	}
}

$(document).ready(function() {
	RemoveHint();
});


