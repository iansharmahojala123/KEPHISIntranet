//$(document).ready(function () {
//    var url = "/MeansOfConveyance/GetModeOfTransportDropdown";
//    $.getJSON(url, {}, function (data) {
//        var items = "<option value='0'> Nothing Selected </option>";
//        $.each(data, function (i, mot) {
//            items += "<option value='" + mot.Value + "'>" + mot.Text + "</option>";
//        });
//        $("#Means_Of_ConveyanceId").html(items).selectpicker("refresh");
//    });
//});

$('.add-result-link').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#mot-container').html(data);
        $('#mot-modal').modal('show');
        var url = "/MeansOfConveyance/GetModeOfTransportDropdown";
        $.getJSON(url, {}, function (data) {
            var items = "";
            var selectedValue;
            $.each(data, function (i, comp) {
                items += "<option value='" + comp.Value + "'>" + comp.Text + "</option>";
                if (comp.Text.includes("ROAD"))
                    selectedValue = comp.Value;
            });
            $("#Means_Of_ConveyanceId").html(items).selectpicker("refresh");
            $("#Means_Of_ConveyanceId").val(selectedValue);
            $("#Means_Of_ConveyanceId").change();
            $("#Means_Of_ConveyanceId").selectpicker("refresh");
        });
        $('.selectpicker').selectpicker();
        $("#Remarks").change(function () {
            var remarks = $("#Remarks option:selected").text();
            $("#Remarks").val(remarks);
            if (remarks === 'Inspected and Released') {
                $("#reason").hide();
            }
            else if (remarks === 'Intercepted') {
                $("#reason").show();
            }
        });
    });

   
});
$('.add-bulkresult-link').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#mot-container').html(data);
        $('#mot-modal').modal('show');
        var url = "/MeansOfConveyance/GetModeOfTransportDropdown";
        $.getJSON(url, {}, function (data) {
            var items = "";
            var selectedValue;
            $.each(data, function (i, comp) {
                items += "<option value='" + comp.Value + "'>" + comp.Text + "</option>";
                if (comp.Text.includes("ROAD"))
                    selectedValue = comp.Value;
            });
            $("#Means_Of_ConveyanceId").html(items).selectpicker("refresh");
            $("#Means_Of_ConveyanceId").val(selectedValue);
            $("#Means_Of_ConveyanceId").change();
            $("#Means_Of_ConveyanceId").selectpicker("refresh");
        });
        $('.selectpicker').selectpicker();
        $("#Remarks").change(function () {
            var remarks = $("#Remarks option:selected").text();
            $("#Remarks").val(remarks);
            if (remarks === 'Inspected and Released') {
                $("#reason").hide();
            }
            else if (remarks === 'Intercepted') {
                $("#reason").show();
            }
        });
    });


});

$("#mot-modal").on('hidden.bs.modal', function () {
    location.reload();
});

$("#mot-modal").on("click", "#btn-submit-result", function (e) {

    var form = $('form#add-result-form');
    var action = $(form).attr('action');
    e.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#mot-container").html(data);
        var Code = $("#code").val();
        var iSN = "KEPHIS/" + Code;
        var dispaly = $('#code').val($(iSN + Code).val());
        alert(dispaly);
        $(".selectpicker").selectpicker();
    }, 'html');

});

