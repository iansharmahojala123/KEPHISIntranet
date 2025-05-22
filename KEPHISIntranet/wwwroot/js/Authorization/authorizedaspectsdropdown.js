$(document).ready(function () {
    var url = "/AuthorizedAspect/GetAuthorizedAspectDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value=''> Nothing Selected </option>";
        $.each(data, function (i, asp) {
            items += "<option value='" + asp.Value + "'>" + asp.Text + "</option>";
        });
        $("#AuthorizedAspectId").html(items).selectpicker("refresh");
    });
});


