$(document).ready(function () {
    var url = "/KephisOffice/GetKephisOfficeDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value='0'> Nothing Selected </option>";
        $.each(data, function (i, lab) {
            items += "<option value='" + lab.Value + "'>" + lab.Text + "</option>"
        });
        $('#KPO_ID').html(items).selectpicker("refresh");
    });
});
$('#KPO_ID').change(function () {
    var url = "/Employee/GetEmployeeByOfficeDropdown";
    var kpoid = $("#KPO_ID").val();
    var office = $("#KPO_ID option:selected").text();
    $.getJSON(url, { kpoid: kpoid }, function (data) {
        var items = "<option value='0'> Nothing Selected </option>";
        $.each(data, function (i, type) {
            items += "<option value='" + type.Value + "'>" + type.Text + "</option>"
        });
        $("#EMP_ID").html(items).selectpicker("refresh");
    });
    $('#KPO_Name').text('Kephis Office : ' + office);
    $('#assign').show();
});

