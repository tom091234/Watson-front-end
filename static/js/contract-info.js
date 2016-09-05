
//table中select颜色随选项变化
$(document).ready(function() {
    $('table select').each(function(index, el) {
        $(this).css("background-color",$(this).find("option:selected").css("background-color"));
    });
});

$(document).ready(function() {
    $('table select').each(function(index, el) {
        $(this).change(function() {
            $(this).css("background-color",$(this).find("option:selected").css("background-color"));
        });
    });
});

//处理合同列表中的时间格式
$('table tbody tr td:nth-child(4)').each(function(index, el) {
    var date = date = $.fullCalendar.moment($(this).text(), 'YYYY-MM-DD');
    $(this).text(date.format('YYYY年MM月DD日'));
});

//calendar配置
$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
			    left:   '',
			    center: 'title,prevYear,prev,today,next,nextYear',
			    right:  ''
				},

		weekNumbers:true,

        height: 'auto',

        dayClick: function(date, allDay, jsEvent, view) { 
            $('#add-event').on('show.bs.modal', function (event) {
                $('div.modal-dialog h4').text('添加事件');
                $('input[name="id"]').val('');
                $('textarea[placeholder="事件说明"]').val('');
                $('input[placeholder="开始时间"]').val(date.format('YYYY年MM月DD日'));
                $('input[placeholder="结束时间"]').val(date.format('YYYY年MM月DD日'));
                $('input[name="backgroundColor"]').val('');
                MakeRefOptSel(null);
                $('button.btn-danger').hide();
            });
            $('#add-event').modal();
        },

        eventClick: function(calEvent, jsEvent, view) {
            $('#add-event').on('show.bs.modal', function (event) {
                $('div.modal-dialog h4').text('编辑事件');
                $('input[name="id"]').val(calEvent.id);
                $('textarea[placeholder="事件说明"]').val(calEvent.title);
                $('input[placeholder="开始时间"]').val(calEvent.start.format('YYYY年MM月DD日'));
                $('input[placeholder="结束时间"]').val(calEvent.end.add(-1, 'day').format('YYYY年MM月DD日'));
                calEvent.end.add(1, 'day');
                $('input[name="backgroundColor"]').val(calEvent.backgroundColor);
                MakeRefOptSel(calEvent.ref);
                $('button.btn-danger').show();
            });
            $('#add-event').modal();
        },

        events: '/calendar/events/'
    })
});

$('#add-event button.btn-primary').click(function(event) {
    var start = $.fullCalendar.moment($('input[placeholder="开始时间"]').val(), 'YYYY年MM月DD日');
    var end = $.fullCalendar.moment($('input[placeholder="结束时间"]').val(), 'YYYY年MM月DD日');
    end.add(1, 'day');

    if ('' == $('input[name="id"]').val())
    {
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);

        //新建事件
        jQuery.post(
            '/calendar/new/', 
            {
                title:  $('textarea[placeholder="事件说明"]').val(),
                start:  start.format('YYYY-MM-DD'),
                end:    end.format('YYYY-MM-DD'),
                backgroundColor:  'rgb('+r+','+g+','+b+')',
                ref:    $('select[name="ref"]').val()
            },
            function (data, textStatus, jqXHR){
                $('#calendar').fullCalendar('refetchEvents'); //重新获取所有事件数据
                alert($(this).parents('tr').children('td:eq(0)').text()+'添加成功');
            });
    }
    else
    {
        //修改事件
        jQuery.post(
            '/calendar/edit/', 
            {
                id:     $('input[name="id"]').val(),
                title:  $('textarea[placeholder="事件说明"]').val(),
                start:  start.format('YYYY-MM-DD'),
                end:    end.format('YYYY-MM-DD'),
                ref:    $('select[name="ref"]').val()
            },
            function (data, textStatus, jqXHR){
                $('#calendar').fullCalendar('refetchEvents'); //重新获取所有事件数据
                alert($(this).parents('tr').children('td:eq(0)').text()+'修改成功');
            });
    }

    $('#add-event').modal('hide');
});

$('#add-event button.btn-danger').click(function(event) {
    //删除事件
    jQuery.post(
        '/calendar/delete/', 
        {
            id:     $('input[name="id"]').val()
        },
        function (data, textStatus, jqXHR){
            $('#calendar').fullCalendar('refetchEvents'); //重新获取所有事件数据
            alert($(this).parents('tr').children('td:eq(0)').text()+'删除成功');
        });

    $('#add-event').modal('hide');
});

$('a[href="#calendar-view"]').on('shown.bs.tab', function (e) {
	$('#calendar').fullCalendar('render');
    $('#calendar').fullCalendar('refetchEvents');
})

for (var i=1; i<=2; i++)
{
    $('#datetimepicker'+i).datetimepicker({
        locale: 'zh-cn',
        format: 'YYYY年MM月DD日',
        dayViewHeaderFormat: 'YYYY MMMM',
    });
}

var row_per_page = 10;
var max_row_num = $('table.info tbody').find('tr').length;
var max_page_num = Math.ceil(max_row_num/row_per_page);
var current_page = 1;

function MakeRefOpt()
{
    $('select[name="ref"]').empty();
    for (var i=0; i<max_row_num; i++)
    {
        var value = $('table.info tbody tr:eq('+i+') td:eq(0)').text();
        var text = $('table.info tbody tr:eq('+i+') td:eq(1) input').val();

        $('<option value="'+value+'">'+text+'</option>').appendTo($('select[name="ref"]'));
    }
}

function MakeRefOptSel(value)
{
    $('select[name="ref"] option').each(function(index, el) {
        if ($(this).val() == value)
        {
            $(this).attr("selected",true);
        }
        else
        {
            $(this).attr("selected",false);
        }
    });
    $('select[name="ref"]').val(value);
}

function setPage(tmp_page)
{
    //移动端列表不分页
    if ($('#pagination').css('display') == 'none')
    {
        row_per_page = max_row_num;
    }
    else
    {
        row_per_page = 10;
    }

    var min_row = tmp_page*row_per_page-row_per_page;

    if (tmp_page == max_page_num)
    {
        var max_row = max_row_num;
    }
    else
    {
        max_row = tmp_page*row_per_page;
    }
    for (var i=0; i<max_row_num; i++)
    {
        if ((i>=min_row)&&(i<max_row))
        {
            $('table.info tbody tr:eq('+i+')').show();
        }
        else
        {
            $('table.info tbody tr:eq('+i+')').hide();
        }
    }

    if (1 >= max_page_num)
    {
        $('button.prev').addClass("disabled");
        $('button.next').addClass("disabled");
    }
    else if (1 == tmp_page)
    {
        $('button.prev').addClass("disabled");
        $('button.next').removeClass("disabled");
    }
    else if (max_page_num == tmp_page)
    {
        $('button.prev').removeClass("disabled");
        $('button.next').addClass("disabled");
    }
    else
    {
        $('button.prev').removeClass("disabled");
        $('button.next').removeClass("disabled");
    }

    if (0 == max_row_num)
    {
        $('table.info caption').text('您共有'+max_row_num+'份合同');
    }
    else
    {
        $('table.info caption').text('您共有'+max_row_num+'份合同，显示第'+(min_row+1)+'-'+max_row+'份合同...');
    }
}

function setPrev()
{
    if (current_page > 1)
    {
        current_page --;
        setPage(current_page);
    }
}

function setNext()
{
    if (current_page < max_page_num)
    {
        current_page ++;
        setPage(current_page);
    }
}

$('button.prev').click(function(event) {
    setPrev();
});

$('button.next').click(function(event) {
    setNext();
});

$(document).ready(function() {
    setPage(1);
    MakeRefOpt();
});

$('table.info tbody button.delivery').each(function(index, el) {
    var root = $(this).parents('tr');

    if (root.children('td:eq(4)').text() != '未审核')
    {
        $(this).hide();
    }

    $(this).click(function(event) {
        if ($(this).css('display') != 'none')
        {
            //提交审核
            jQuery.post(
                '/contract/for-review/', 
                {
                    id:$(this).parents('tr').children('td:eq(0)').text()
                },
                function (data, textStatus, jqXHR){
                    alert($(this).parents('tr').children('td:eq(0)').text()+'提交审核成功');
                    window.location.reload();
                    $(this).hide();
                });
        }
    });
});

$('table.info tbody button.delete').each(function(index, el) {
    $(this).click(function(event) {
        //删除合同
        jQuery.post(
            '/contract/delete/', 
            {
                id:$(this).parents('tr').children('td:eq(0)').text()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'被成功删除');
            });

        id:$(this).parents('tr').remove();
        max_row_num --;
        max_page_num = Math.ceil(max_row_num/row_per_page);
        if (current_page > max_page_num)
        {
            current_page = max_page_num;
        }
        setPage(current_page);
        MakeRefOpt();
    });
});

$('table.info tbody input[name="label"]').each(function(index, el) {
    $(this).change(function(event) {
        //修改label
        jQuery.post(
            '/contract/label/', 
            {
                id:$(this).parents('tr').children('td:eq(0)').text(),
                label:$(this).val()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'标签已更新');
            });
    });
});

$('table.info tbody input[name="name"]').each(function(index, el) {
    $(this).change(function(event) {
        //修改name
        jQuery.post(
            '/contract/update-name/', 
            {
                id:$(this).parents('tr').children('td:eq(0)').text(),
                name:$(this).val()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'合同名称修改成功');
            });
    });
});

$('table.info tbody select[name="status"]').each(function(index, el) {
    $(this).change(function(event) {
        //修改status
        jQuery.post(
            '/contract/update-law-status/', 
            {
                id:$(this).parents('tr').children('td:eq(0)').text(),
                status:$(this).val()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'法律状态已修改');
            });
    });
});

$('button.search_btn').click(function(event) {
    var search_text=$('input[type="search"]').val();

    if ('' == search_text)
    {
        //显示所有合同
        setPage(1);
    }
    else
    {
        $('table.table.info tbody').children().each(function(index, el) {
            var id      = $(this).children('td:eq(0)').text();
            var name    = $(this).find('input[name="name"]').val();
            var type    = $(this).children('td:eq(2)').text();
            var time    = $(this).children('td:eq(3)').text();
            var state   = $(this).children('td:eq(4)').text();
            var status  = $(this).find('select').val();
            var tag     = $(this).find('input[name="label"]').val();

            if ((id.match(search_text)) ||
                (name.match(search_text)) ||
                (type.match(search_text)) ||
                (time.match(search_text)) ||
                (state.match(search_text)) ||
                (status.match(search_text)) ||
                (tag.match(search_text))
                )
            {
                $(this).show();
            }
            else
            {
                $(this).hide();
            }
        });
        $('button.prev').addClass("disabled");
        $('button.next').addClass("disabled");
        $('caption').text("");
    }
});

$('input[type="search"]').keypress(function(event) {
    if (13 == event.keyCode)
    {
        $('button.search_btn').click();
    }
});

/***********************************移动端界面处理***************************************/

//列表按钮获取合同名字
$(document).ready(function() {
    $('table.info tbody tr').each(function(index, el) {
        $(this).find('button.small-table-button').text($(this).find('input[name="name"]').val());
    });
});

//移动端列表不分页
$(window).resize(function(event) {
    /* Act on the event */
    setPage(1);
});

$('table.info tbody tr').each(function(index, el) {
    var root = $(this);
    $(this).find('button.small-table-button').click(function(event) {
        /* Act on the event */
        $('#edit-contract').on('show.bs.modal', function (event) {
            $('#edit-contract').find('p:eq(0)').text(root.children('td:eq(0)').text());
            $('#edit-contract').find('input:eq(0)').val(root.find('input[name="name"]').val());
            $('#edit-contract').find('p:eq(1)').text(root.children('td:eq(2)').text());
            $('#edit-contract').find('p:eq(2)').text(root.children('td:eq(3)').text());
            $('#edit-contract').find('p:eq(3)').text(root.children('td:eq(4)').text());
            if (root.children('td:eq(4)').text() == '未审核')
            {
                $('#edit-contract .modal-footer').find('button:eq(1)').show();
            }
            else
            {
                $('#edit-contract .modal-footer').find('button:eq(1)').hide();
            }
            $('#edit-contract').find('select').empty();
            $(root.find('select').html()).appendTo($('#edit-contract').find('select'));
            $('#edit-contract').find('select').css("background-color",$('#edit-contract').find('select').find("option:selected").css("background-color"));
            $('#edit-contract').find('input:eq(1)').val(root.find('input[name="label"]').val());

            /* 按键映射 */
            $('#edit-contract .modal-footer').find('button:eq(0)').click(function(event) {
                /* Act on the event */
                root.find('a.preview').click();
            });
            $('#edit-contract .modal-footer').find('button:eq(1)').click(function(event) {
                /* Act on the event */
                root.find('button.delivery').click();
            });
            $('#edit-contract .modal-footer').find('button:eq(2)').click(function(event) {
                /* Act on the event */
                root.find('button.delete').click();
                $('#edit-contract').modal('hide');
            });

            /* 事件处理 */
            $('#edit-contract').find('input:eq(0)').change(function(event) {
                /* Act on the event */
                root.find('input[name="name"]').val($(this).val());
                root.find('input[name="name"]').change();
                root.find('button.small-table-button').text($(this).val());
            });
            $('#edit-contract').find('input:eq(1)').change(function(event) {
                /* Act on the event */
                root.find('input[name="label"]').val($(this).val());
                root.find('input[name="label"]').change();
            });
            $('#edit-contract').find('select').change(function(event) {
                /* Act on the event */
                $(this).css("background-color",$(this).find("option:selected").css("background-color"));
                root.find('select').val($(this).val());
                root.find('select').css("background-color",$(this).find("option:selected").css("background-color"));
                root.find('select').change();
            });

            $('button.btn-danger').show();
        });
        $('#edit-contract').modal();
    });
});
