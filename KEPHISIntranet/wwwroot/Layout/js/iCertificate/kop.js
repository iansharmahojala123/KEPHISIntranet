$(document).ready(function () {
    var url = "/KephisOffice/GetOfficeDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value='0'> Nothing Selected </option>";
        $.each(data, function (i, lab) {
            items += "<option value='" + lab.Value + "'>" + lab.Text + "</option>"
        });
        $('#KPO_ID').html(items).selectpicker("refresh");
    });
});
