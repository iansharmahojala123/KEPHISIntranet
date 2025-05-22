$(document).ready(function () {
    var url = "/ContactInfo/GetContactInfoDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value=''> Nothing Selected </option>";
        $.each(data, function (i, con) {
            items += "<option value='" + con.Value + "'>" + con.Text + "</option>";
        });
        $("#ContactInfoId").html(items).selectpicker("refresh");
    });
});


