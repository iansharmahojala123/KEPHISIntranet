$(document).ready(function () {
    getCountries();
});

function getCountries() {
    var url = "/Country/GetCountries";
    $.getJSON(url, {}, function (data) {
        var items = "";
        var selectedValue;
        $.each(data, function (i, comp) {
            items += "<option value='" + comp.Value + "'>" + comp.Text + "</option>";
            if (comp.Text.includes("Kenya"))
                selectedValue = comp.Value;
        });
        $("#CountryId").html(items).selectpicker("refresh");
        $("#CountryId").val(selectedValue);
        $("#CountryId").change();
        $("#CountryId").selectpicker("refresh");
    });
}
