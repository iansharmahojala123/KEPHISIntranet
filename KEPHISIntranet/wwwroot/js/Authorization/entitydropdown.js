$(document).ready(function () {
    var url = "/Entity/GetEntityDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value=''> Nothing Selected </option>";
        $.each(data, function (i, inspector) {
            items += "<option value='" + inspector.Value + "'>" + inspector.Text + "</option>";
        });
        $("#EntityId").html(items).selectpicker("refresh");
    });
});


