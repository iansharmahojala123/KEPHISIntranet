$('#Commodity_TypeId').change(function () {
    var url = "/CommodityType/GetBotanicalNameByTypeDropdown";
    var commodity_TypeId = $("#Commodity_TypeId").val();
    $.getJSON(url, { commodity_TypeId: commodity_TypeId }, function (data) {
        var items = "<option value='0'> Select </option>";
        $.each(data, function (i, offer) {
            items += "<option value='" + offer.Value + "'>" + offer.Text + "</option>"
        });
        var str = $("#Commodity_TypeId option:selected").text();
        var arr = str.split("-");
        $('#BOTANICAL_NAME').val(arr[1]);
      
    });
});