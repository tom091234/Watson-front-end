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

//table中select颜色随选项变化
$(document).ready(function() {
    $('table select').css("background-color",$(this).find("option:selected").css("background-color"));
});

$(document).ready(function() {
    $('table select').change(function() {
        $(this).css("background-color",$(this).find("option:selected").css("background-color"));
    });
});

//设置侧边栏的宽度
$(document).ready(function() {
    $('#side-nav-bar').width($('#doc-create-view').width()/3);
});

$(window).resize(function() {
    $('#side-nav-bar').width($('#doc-create-view').width()/3);
});

//侧边栏悬浮
$(document).ready(function() {
    $('#side-nav-bar').affix({
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

//遍历整棵树，全部隐藏
$(document).ready(function() {
    $(".guider").children("ul").hide()
});

//获取ul或者li节点的名字
function GetName(node)
{
    var names = [];
    var tmp = node.text();
    tmp = tmp.trim();
    names = tmp.split("\n");
    return names[0];
}

//获取根节点下的全部直接子节点
function GetSubNodes (root)
{
    var nodes = [];

    root.children('li').each(function(index) {
        nodes.push(GetName($(this)));
      });

    return nodes;
}

//单击隐藏其他同组按钮
function HideExcept (node, begin)
{
    begin.find("button").each(function(index) {
        if ($(this).text() != node.text())
        {
            $(this).hide(300);
        }
    });
}

//根据节点字符串创建控件
function CtreatHTML(start, title, nodes)
{
    var index = $('<div class="col-sm-1"></div>').appendTo(start);
    $('<label >'+title+'</label>').appendTo(index);
    index = $('<div class="col-sm-11"></div>').insertAfter(index);
    index = $('<div class="row"></div>').appendTo(index);

    for (i in nodes)
    {
        var tmpindex = $('<div class="col-sm-4"></div>').appendTo(index);
        var tmp = tmpindex;
        tmpindex = $('<button type="button" class="btn guider-view">'+nodes[i]+'</button>').appendTo(tmpindex);
        tmpindex.bind('click', function() {
            //隐藏未选中的按钮
            chooses.push($(this).text());
            HideExcept($(this), $(this).parent().parent());
            //在树中找到选择的节点
            var root = FindNode(chooses);
            //创建下一级按钮
            if (0 == (root.has("ul")).length)
            {
                return;
            }
            GetGuiderStart($("#guider-wrapper"), root.children("ul"));
        });
    }
}

//根据字符串查找节点
function FindNode(chooses)
{
    var index = $(".guider");
    for (i in chooses)
    {   //相同名字节点的路径不能相同
        index = index.find("li:contains("+chooses[i]+")");
    }
    return index;
}

function GetGuiderStart(start, root)
{
    //获取标题
    var title = GetName(root);
    //获取节点名字
    var nodes = GetSubNodes(root);
    CtreatHTML(start, title, nodes);
}

//初始化向导
var chooses = [];
$(document).ready(function() {
    var start = $(".guider");
    start = $('<div class="row" id="guider-wrapper"></div>').appendTo(start);
    GetGuiderStart(start, $(".guider>ul"));
});
