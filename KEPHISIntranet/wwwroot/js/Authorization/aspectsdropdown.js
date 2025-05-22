$(document).ready(function () {
    var url = "/AuthorizedAspect/GetAuthorizedAspectDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value=''> Nothing Selected </option>";
        $.each(data, function (i, con) {
            items += "<option value='" + con.Value + "'>" + con.Text + "</option>";
        });
        $("#AuthorizedAspectId").html(items).selectpicker("refresh");
    });
});


