for (var i=1; i<=8; i++)
{
	$('#datetimepicker'+i).datetimepicker({
    	locale: 'zh-cn',
    	format: 'YYYY年MM月DD日',
    	dayViewHeaderFormat: 'YYYY MMMM',
    });
}

$(document).ready(function() {
	$("#published").hide()
	$("#register").hide()
	$("#payment-2").hide()
	$("#payment-3").hide()
});

$("input:radio[name=published]").click(function(event) {
	var value = $("input:radio[name=published]:checked").val();
	if ("出版" == value)
	{
		$("#published").show();
	}
	else
	{
		$("#published").hide()
	}
});

$("input:radio[name=register]").click(function(event) {
	var value = $("input:radio[name=register]:checked").val();
	if ("已登记" == value)
	{
		$("#register").show();
	}
	else
	{
		$("#register").hide()
	}
});

$("input:radio[name=payment]").click(function(event) {
	var value = $("input:radio[name=payment]:checked").val();
	if ("一次性支付" == value)
	{
		$("#payment-1").show()
		$("#payment-2").hide()
		$("#payment-3").hide()
	}
	else if ("分两期支付" == value)
	{
		$("#payment-1").hide()
		$("#payment-2").show()
		$("#payment-3").hide()
	}
	else
	{
		$("#payment-1").hide()
		$("#payment-2").hide()
		$("#payment-3").show()
	}
});

$("input[name=ratio-2-1]").change(function(event) {
	if (("" != $("input[name=value-2]").val()) && ("" != $("input[name=ratio-2-1]").val()))
	{
		if ((!isNaN($("input[name=value-2]").val())) && (!isNaN($("input[name=ratio-2-1]").val())))
		{
			$("input[name=value-2-1]").val($("input[name=value-2]").val()*$("input[name=ratio-2-1]").val()/100)
		}
	}
});

$("input[name=ratio-2-2]").change(function(event) {
	if (("" != $("input[name=value-2]").val()) && ("" != $("input[name=ratio-2-2]").val()))
	{
		if ((!isNaN($("input[name=value-2]").val())) && (!isNaN($("input[name=ratio-2-2]").val())))
		{
			$("input[name=value-2-2]").val($("input[name=value-2]").val()*$("input[name=ratio-2-2]").val()/100)
		}
	}
});

$("input[name=ratio-3-1]").change(function(event) {
	if (("" != $("input[name=value-3]").val()) && ("" != $("input[name=ratio-3-1]").val()))
	{
		if ((!isNaN($("input[name=value-3]").val())) && (!isNaN($("input[name=ratio-3-1]").val())))
		{
			$("input[name=value-3-1]").val($("input[name=value-3]").val()*$("input[name=ratio-3-1]").val()/100)
		}
	}
});

$("input[name=ratio-3-2]").change(function(event) {
	if (("" != $("input[name=value-3]").val()) && ("" != $("input[name=ratio-3-2]").val()))
	{
		if ((!isNaN($("input[name=value-3]").val())) && (!isNaN($("input[name=ratio-3-2]").val())))
		{
			$("input[name=value-3-2]").val($("input[name=value-3]").val()*$("input[name=ratio-3-2]").val()/100)
		}
	}
});

$("input[name=ratio-3-3]").change(function(event) {
	if (("" != $("input[name=value-3]").val()) && ("" != $("input[name=ratio-3-3]").val()))
	{
		if ((!isNaN($("input[name=value-3]").val())) && (!isNaN($("input[name=ratio-3-3]").val())))
		{
			$("input[name=value-3-3]").val($("input[name=value-3]").val()*$("input[name=ratio-3-3]").val()/100)
		}
	}
});

