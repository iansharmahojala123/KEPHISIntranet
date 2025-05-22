$(document).ready(function () {
    var url = "/InspectionOutcome/GetInspectionOutcomeDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value='0'> Nothing Selected </option>";
        $.each(data, function (i, mot) {
            items += "<option value='" + mot.Value + "'>" + mot.Text + "</option>";
        });
        $("#Inspection_OutcomeId").html(items).selectpicker("refresh");
    });
});
