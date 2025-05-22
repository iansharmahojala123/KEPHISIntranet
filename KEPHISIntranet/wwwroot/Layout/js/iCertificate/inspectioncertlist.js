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
    var table = $('#issuedcerts').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/IssuedCertificates/GetIssuedCertificateList",
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
                "title": "Inspection Date",
                "data": "inspectionDate",
                "format": "dd/mm/yyyy",
                "searchable": true,
                "sortable": false,
                render: function (data) {
                    return moment(data).format('DD-MMM-YYYY');
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
                name: 'phytoCertNo',
                data: "phytoCertNo",
                title: "Phyto Cert No.",
                sortable: true,
                searchable: true,
                visible: false
            },

            {
                name: 'officeCode',
                data: "officeCode",
                title: "Office",
                sortable: true,
                searchable: true
            },
            {
                name: 'clientName',
                data: "clientName",
                title: "Importer",
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
                name: 'origin',
                data: "origin",
                title: "Country Of Origin",
                sortable: true,
                searchable: true
            },
            {
                name: 'quantityUnit',
                data: "quantityUnit",
                title: "Quantity",
                sortable: true,
                searchable: true
            },
            {
                name: 'vehicleRegistrationNo',
                data: "vehicleRegistrationNo",
                title: "Truck No.",
                sortable: true,
                searchable: true,
                visible: false
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
                name: 'employeeName',
                data: "employeeName",
                title: "Inspector",
                sortable: true,
                searchable: true,
                visible: false
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
                "data": { "id": "id", "piP_ID": "piP_ID" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a target="_blank" href="/IssuedCertificates/ConfirmRePrintCertificate?id=' + data.id + '" class="rePrintCert" data-toggle="tooltip" title="Re-Print Cert"><i class="mdi mdi-printer" style="color:#595959;font-size:17px"></i></a> <a href="/IssuedCertificates/ConfirmRejectCertificate?id=' + data.id + '&piP_ID=' + data.piP_ID + ' " class="rejectCert" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ]
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#issuedcerts').DataTable().page.info();
        table.column(0,{ page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    $('#issuedcerts').on("click", ".rePrintCert", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateEmployeeContainer').html(data);
            $('#deactivateEmployeeModal').modal('show');
        });
    });
    $("#deactivateEmployeeModal").on("click", "#btnsubmitreprint", function (e) {
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
