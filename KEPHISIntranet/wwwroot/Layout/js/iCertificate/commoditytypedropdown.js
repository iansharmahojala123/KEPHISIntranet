$(document).ready(function () {
    var url = "/CommodityType/GetCommodityTypeDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value='0'> Nothing Selected </option>";
        $.each(data, function (i, type) {
            items += "<option value='" + type.Value + "'>" + type.Text + "</option>"
        });
        $('#Commodity_TypeId').html(items).selectpicker("refresh");
    });
});

