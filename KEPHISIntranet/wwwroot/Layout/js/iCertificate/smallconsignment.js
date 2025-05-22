function format_smallconsignment(d) {
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
    var table = $('#smallConsignment').DataTable({
        "serverSide": true,
        "proccessing": true,
        "data": { kpO_ID: officeId },
        "search": {
            "caseInsensitive": true
        },
        "ajax": {
            "url": "/SmallConsignment/GetSmallConsignmentList",
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
                "title": "Date",
                "data": "dateCreated",
                "format": "dd/mm/yyyy",
                "searchable": true,
                "sortable": false,
                render: function (data) {
                    return moment(data).format('DD-MMM-YYYY');
                }
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
                "data":  "id",
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a class="view-employee" href="/AssignedInspectionResult/InspectionResultDetails?id=' + data + '"><i class="fas fa-edit"></i></a>  <a target="_blank" href="/SmallConsignment/ConfirmPrintCertificate?id=' + data + '" class="printCert" data-toggle="tooltip" title="Print Cert"><i class="mdi mdi-printer" style="color:#595959;font-size:17px"></i></a>  <a href="/IssuedCertificates/ConfirmRejectCertificate?id=' + data + '" class="rejectCert" title="Reject Cert"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
             }
            }
        ]
    });
    $('#smallConsignment').on("click", ".printCert", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateSCContainer').html(data);
            $('#deactivateSCModal').modal('show');
        });

    });
    $("#deactivateSCModal").on("click", "#btnsubmit", function (e) {
        $('#confirm-print-frm').submit();
    });

    $('#confirm-print-frm').on('submit', function (e) {
        $("#Id").val();
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#smallConsignment').DataTable().page.info();
        table.column(0,{ page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
});
