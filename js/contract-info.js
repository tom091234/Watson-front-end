
//table中select颜色随选项变化
$(document).ready(function() {
    $('table select').css("background-color",$(this).find("option:selected").css("background-color"));
});

$(document).ready(function() {
    $('table select').change(function() {
        $(this).css("background-color",$(this).find("option:selected").css("background-color"));
    });
});

//calendar配置
$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
			    left:   'month,basicWeek,basicDay',
			    center: 'title',
			    right:  'today prevYear,prev,next,nextYear'
				},
		weekNumbers:true,
        dayClick: function(date, allDay, jsEvent, view) { 
            $('#add-event').on('show.bs.modal', function (event) {
                $('input[placeholder="开始时间"]').val(date.format('YYYY年MM月DD日'));
                $('input[placeholder="结束时间"]').val(date.format('YYYY年MM月DD日'));
            });
            $('#add-event').modal();
        } 
    })
});

$('a[href="#calendar-view"]').on('shown.bs.tab', function (e) {
	$('#calendar').fullCalendar('render');
})

for (var i=1; i<=2; i++)
{
    $('#datetimepicker'+i).datetimepicker({
        locale: 'zh-cn',
        format: 'YYYY年MM月DD日',
        dayViewHeaderFormat: 'YYYY MMMM',
    });
}
