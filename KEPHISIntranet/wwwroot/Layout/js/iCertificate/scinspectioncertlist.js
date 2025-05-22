function format_inspectioncertlist(d) {
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
    var table = $('#scissuedcerts').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/IssuedCertificatesSc/GetIssuedCertificateSmallConsignment",
            "type": "POST"
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
                name: 'id',
                data: 'id',
                title: "Id",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                name: 'documentReferenceNo',
                data: "documentReferenceNo",
                title: "Document Ref No",
                sortable: true,
                searchable: true
            },
            {
                name: 'commodityType',
                data: "commodityType",
                title: "Commodity",
                sortable: true,
                searchable: true
            },
            {
                name: 'quantity',
                data: "quantity",
                title: "Quantity",
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
                name: 'vehicleRegNo',
                data: "vehicleRegNo",
                title: "Vehicle/Vessel",
                sortable: true,
                searchable: true
            },
            {
                name: 'remarks',
                data: "remarks",
                title: "Remarks",
                sortable: true,
                searchable: true
            },
            {
                "title": "Actions",
                "data": { "id": "id", "piP_ID": "piP_ID" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a target="_blank" href="/IssuedCertificatesSC/ConfirmRePrintCertificate?id=' + data.id + '" class="rePrintCert" data-toggle="tooltip" title="Re-Print Cert"><i class="mdi mdi-printer" style="color:#595959;font-size:17px"></i></a> <a href="/IssuedCertificatesSC/ConfirmRejectCertificate?id=' + data.id + '&piP_ID=' + data.piP_ID + ' " class="rejectCert" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ]
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#scissuedcerts').DataTable().page.info();
        table.column(0,{ page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    $('#scissuedcerts').on("click", ".rePrintCert", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateSCContainer').html(data);
            $('#deactivateSCModal').modal('show');
        });
    });
    $("#deactivateSCModal").on("click", "#btnsubmitreprint", function (e) {
        $('#confirm-reprint-frm').submit();
    });

    $('#confirm-reprint-frm').on('submit', function (e) {
        $("#Id").val();
    });
    $('#issuedcerts').on("click", ".rejectCert", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateCertContainer').html(data);
            $('#deactivateCertModal').modal('show');
        });
    });
    $("#deactivateCertModal").on("click", "#btnsubmitreject", function (e) {
        $('#confirm-rejectcert-frm').submit();
    });

    $('#confirm-rejectcert-frm').on('submit', function (e) {
        $("#Id").val();
    });
});
