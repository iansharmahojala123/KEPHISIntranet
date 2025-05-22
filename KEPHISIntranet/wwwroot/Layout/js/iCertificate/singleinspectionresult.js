function format_assignmentResults(d) {
    return '<div class="slider" style="margin-left:60px">' +
        '<b>Name: </b>' + d.name + '<br>' +
        '<b>Code:</b> ' + d.code + '<br>' +
        '<b>Location: </b>' + d.location + '<br>' +
        '<b>Email:</b> ' + d.email + '<br>' +
        '<b>Address: </b>' + d.address + '<br>' +
        '<b>Start Date: </b>' + d.startDate + '<br>' +
        '<b>End Date: </b>' + d.endDate + '<br>'  
}
$(document).ready(function () {
    var officeId = $('#officeId').val();
    var table = $('#singleassignmentResult').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/SingleInspectionResult/GetInspectionResultList",
            "type": "POST",
            "data": { kpO_ID: officeId }
        },
        columns: [
            {
                "class": "text-center",
                "width": "4%",
                "title": '#',
                orderable: false,
                sortable: false,
                "defaultContent": ""
            },
            {
                name: 'id',
                data: 'id',
                title: "Id",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                name: 'piP_ID',
                data: 'piP_ID',
                title: "PIP_Id",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                "title": "Date",
                "data": "dateCreated",
                "format": "dd/mm/yyyy",
                "searchable": true,
                "sortable": false,
                render: function (data) {
                    return moment(data).format('DD-MM-YYYY');
                }
            },
            {
                name: 'number',
                data: "number",
                title: "Number",
                sortable: true,
                searchable: true
            },
            {
                name: 'clientName',
                data: "clientName",
                title: "Client",
                sortable: true,
                searchable: true
            },
            {
                name: 'phytoCertNo',
                data: "phytoCertNo",
                title: "Phyto Cert No.",
                sortable: true,
                searchable: true
            },
            {
                name: 'commodityTypeName',
                data: "commodityTypeName",
                title: "Commodity",
                sortable: true,
                searchable: true
            },
            {
                name: 'destination',
                data: "destination",
                title: "Destination",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'vehicleRegistrationNo',
                data: "vehicleRegistrationNo",
                title: "Vehicle/Vessel",
                sortable: true,
                searchable: true
               
            },
            {
                name: 'remarks',
                data: "remarks",
                title: "Remarks",
                sortable: true,
                searchable: true,
                visible:false
            },
            {
                "title": "Actions",
                "data": { "id": "id", "piP_ID": "piP_ID"},
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a class="view-employee" href="/SingleInspectionResult/InspectionResultDetails?id=' + data.id + '"><i class="fas fa-edit"></i></a>  <a target="_blank" href="/SingleInspectionResult/ConfirmPrintCertificate?id=' + data.id + '" class="printCert" data-toggle="tooltip" title="Print Cert"><i class="mdi mdi-printer" style="color:#595959;font-size:17px"></i></a>  <a href="/IssuedCertificates/ConfirmRejectCertificate?id=' + data.id + '" class="rejectCert" title="Reject Cert"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ]
    });
    //<a target="_blank" href="/AssignedInspectionResult/InspectionCertificateReport?piP_ID=' + data.piP_ID + '" ><button type="button" class="btn btn-xs btn-info">Print Report</button></a>
    table.on('draw.dt', function () {
        var PageInfo = $('#singleassignmentResult').DataTable().page.info();
        table.column(0,{ page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    $('#singleassignmentResult').on("click", ".printCert", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateEmployeeContainer').html(data);
            $('#deactivateEmployeeModal').modal('show');
        });

    });
    $("#deactivateEmployeeModal").on("click", "#btnsubmit", function (e) {
        $('#confirm-print-frm').submit();
    });

    $('#confirm-print-frm').on('submit', function (e) {
        $("#Id").val();
    });
    $("#approveModal").on('hidden.bs.modal', function () {
        location.reload();
    });
    $('#singleassignmentResult').on("click", ".rejectCert", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateCertContainer').html(data);
            $('#deactivateCertModal').modal('show');
        });
    });
    $("#deactivateCertModal").on("click", "#btnsubmitreject", function (e) {
        $('#confirm-reject-frm').submit();
    });

    $('#confirm-reject-frm').on('submit', function (e) {
        $("#Id").val();
    });
    $("#btn-assigninspection").on("click", function () {
        var url = $(this).data("url");
        $.get(url, function (data) {
            $('#assignContainer').html(data);
            $('#assignModal').modal('show');
            var rows_selected = table.column(0).checkboxes.selected();
            var assignInspection = [];
            $.each(rows_selected, function (index, rowId) {
                // Create a hidden element 
                assignInspection.push(rowId);
            });
            console.log(assignInspection);
            $("#PIPIdsJson").val(JSON.stringify(assignInspection));
            getEmployees();
        });
    });
    $("#assignModal").on('show.bs.modal', function () {
        var rows_selected = table.column(0).checkboxes.selected();
        var assignInspection = [];
        $.each(rows_selected, function (index, rowId) {
            // Create a hidden element 
            assignInspection.push(rowId);
        });
        console.log(assignInspection);
        $("#PIPIdsJson").val(JSON.stringify(assignInspection));
        getEmployee();
    });

    $("#assignModal").on("click", "#btnsubmit", function (e) {
        var rows_selected = table.column(0).checkboxes.selected();
        var assignInspection = [];
        $.each(rows_selected, function (index, rowId) {
            // Create a hidden element 
            assignInspection.push(rowId);
        });
        console.log(assignInspection);
        $("#PIPIdsJson").val(JSON.stringify(assignInspection));
        $("#EMP_ID option:selected").val();
        $("#inspectionDate").val();
        $('#assign-frm').submit();
    });

    $('#assign-frm').on('submit', function (e) {
    });
    $("#assignModal").on('hidden.bs.modal', function () {
        location.reload();
    });
});
function getEmployee() {
    $('#EMP_ID').change(function () {
        var emp = $("#EMP_ID option:selected").text();
        var empId = $("#EMP_ID option:selected").val();
        $("#EMP_ID").val(empId);
    });
}
$("#btn-assigninspection").on("click", function () {
    var url = $(this).data("url");
    $.get(url, function (data) {
        $('#assignContainer').html(data);
        $('#assignModal').modal('show');
    });
});

var array = [];
$(function getPIPIds() {
    $('#btn-assigninspection').on("click", function () {
        var rows_selected = table.column(0).checkboxes.selected();
        var assignInspection = [];
        $.each(rows_selected, function (index, rowId) {
            assignInspection.push(rowId);
        });
        console.log(assignInspection);
        $("#PIPIdsJson").val(JSON.stringify(assignInspection));
    });
});