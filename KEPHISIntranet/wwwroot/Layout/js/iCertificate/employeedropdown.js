$(document).ready(function () {
    var officeId = $('#officeId').val();
    var url = "/KephisOffice/GetKephisOfficeDropdown";
    $.getJSON(url, { officeId: officeId}, function (data) {
        var items = "<option value='0'> Nothing Selected </option>";
        $.each(data, function (i, type) {
            items += "<option value='" + type.Value + "'>" + type.Text + "</option>";
        });
        $("#KPO_ID").html(items).selectpicker("refresh");
    });
});
$('#KPO_ID').change(function () {
    var office = $("#KPO_ID option:selected").text();
    var officeId = $('#KPO_ID').val();
    $("#KPO_ID").val(officeId);
});

$('#KPO_ID').change(function () {
   
    var url = "/Employee/GetEmployeeByOfficeDropdown";
    var officeId = $('#KPO_ID').val();
    $.getJSON(url, { officeId: officeId }, function (data) {
        var items = "<option value='0'> Nothing Selected </option>";
        $.each(data, function (i, type) {
            items += "<option value='" + type.Value + "'>" + type.Text + "</option>"
        });
        $("#EMP_ID").html(items).selectpicker("refresh");
        
    });
});






$('.add-user-to-role-link').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#deactivate-user-container').html(data);
        $('#deactivate-user-modal').modal('show');
        $("#RoleIds").selectpicker("refresh");
    });
});

