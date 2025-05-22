$(document).ready(function () {
    var url = "/Category/GetCategoryDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value=''> Nothing Selected </option>";
        $.each(data, function (i, cat) {
            items += "<option value='" + cat.Value + "'>" + cat.Text + "</option>";
        });
        $("#CategoryId").html(items).selectpicker("refresh");
    });
});