//$(document).ready(function () {
//    var url = "/MeansOfConveyance/GetModeOfTransportDropdown";
//    $.getJSON(url, {}, function (data) {
//        var items = "<option value='0'> Nothing Selected </option>";
//        $.each(data, function (i, mot) {
//            items += "<option value='" + mot.Value + "'>" + mot.Text + "</option>";
//        });
//        $("#Means_Of_ConveyanceId").html(items).selectpicker("refresh");
//    });
//});

$(document).ready(function () {
    getMod();
});

function getMod() {
    var url = "/MeansOfConveyance/GetModeOfTransportDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "";
        var selectedValue;
        $.each(data, function (i, comp) {
            items += "<option value='" + comp.Value + "'>" + comp.Text + "</option>";
            if (comp.Text.includes("ROAD"))
                selectedValue = comp.Value;
        });
        $("#Means_Of_ConveyanceId").html(items).selectpicker("refresh");
        $("#Means_Of_ConveyanceId").val(selectedValue);
        $("#Means_Of_ConveyanceId").change();
        $("#Means_Of_ConveyanceId").selectpicker("refresh");
    });
}
//$(document).ready(function () {
//    var url = "/CommodityUnit/GetCommodityUnitDropdown";
//    $.getJSON(url, {}, function (data) {
//        var items = "<option value='0'> Nothing Selected </option>";
//        $.each(data, function (i, cu) {
//            items += "<option value='" + cu.Value + "'>" + cu.Text + "</option>";
//        });
//        $("#Commodity_UnitId").html(items).selectpicker("refresh");
//    });
//});
$(document).ready(function () {
    getUnits();
});

function getUnits() {
    var url = "/CommodityUnit/GetCommodityUnitDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "";
        var selectedValue;
        $.each(data, function (i, comp) {
            items += "<option value='" + comp.Value + "'>" + comp.Text + "</option>";
            if (comp.Text.includes("Kg"))
                selectedValue = comp.Value;
        });
        $("#Commodity_UnitId").html(items).selectpicker("refresh");
        $("#Commodity_UnitId").val(selectedValue);
        $("#Commodity_UnitId").change();
        $("#Commodity_UnitId").selectpicker("refresh");
    });
}
//$(document).ready(function () {
//    var url = "/Country/GetCountryDropdown";
//    $.getJSON(url, {}, function (data) {
//        var items = "<option value='0'> Nothing Selected </option>";
//        $.each(data, function (i, country) {
//            items += "<option value='" + country.Value + "'>" + country.Text + "</option>";
//        });
//        $("#CountryId").html(items).selectpicker("refresh");
//    });
//});
$(document).ready(function () {
    getCountries();
});

function getCountries() {
    var url = "/Country/GetCountryDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "";
        var selectedValue;
        $.each(data, function (i, comp) {
            items += "<option value='" + comp.Value + "'>" + comp.Text + "</option>";
            if (comp.Text.includes("TANZANIA"))
                selectedValue = comp.Value;
        });
        $("#CountryId").html(items).selectpicker("refresh");
        $("#CountryId").val(selectedValue);
        $("#CountryId").change();
        $("#CountryId").selectpicker("refresh");
    });
}