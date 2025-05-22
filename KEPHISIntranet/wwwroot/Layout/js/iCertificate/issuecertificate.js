function format_issuedCertificates(d) {
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
    var table = $('#issueCertificate').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/AssignedInspectionResult/GetAssignedInspectionResultList",
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
                searchable: true
            },
            {
                name: 'vehicleRegistrationNo',
                data: "vehicleRegistrationNo",
                title: "Vehicle/Vessel",
                sortable: true,
                searchable: true,
                visible:false
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
                    return '<a class="view-employee" href="/AssignedInspectionResult/InspectionResultDetails?id=' + data.id + '"><button type="button" class="btn btn-xs btn-danger">View </button></a> <a target="_blank" href="/AssignedInspectionResult/InspectionCertificateReport?piP_ID=' + data.piP_ID + '" ><button type="button" class="btn btn-xs btn-info">Print Report</button></a> <a href="/IssuedCertificates/ConfirmRejectCertificate?id=' + data.id + '" class="rejectCert" data-toggle="tooltip" title="Re-Print Cert"><i class="mdi mdi-printer danger" style="color:#6c757d"></i></a>';
                }
            }
        ]
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#assignmentResult').DataTable().page.info();
        table.column(0,{ page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

    $('#issuedcerts').on("click", ".rejectCert", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateCertContainer').html(data);
            $('#deactivateCertModal').modal('show');
        });
    });
    $("#deactivateCertModal").on("click", "#btnsubmitreprint", function (e) {
        $('#confirm-reprint-frm').submit();
    });

    $('#confirm-reprint-frm').on('submit', function (e) {
        $("#Id").val();
    });
});
