$(document).ready(function () {
    var officeId = $('#officeId').val();
    var url = "/Employee/GetEmployeeByOfficeDropdown";
    $.getJSON(url, { officeId: officeId}, function (data) {
        var items = "<option value='0'> Nothing Selected </option>";
        $.each(data, function (i, type) {
            items += "<option value='" + type.Value + "'>" + type.Text + "</option>";
        });
        $("#KPO_ID").html(items).selectpicker("refresh");
    });
});

