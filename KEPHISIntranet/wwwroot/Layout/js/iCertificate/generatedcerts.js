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
    var table = $('#generatedCerts').DataTable({
        "serverSide": true,
        "proccessing": true,
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, 'All']
        ],
        //dom: 'Bfrtip',
        //buttons: [
        //    'copy',
        //    'csv',
        //    'excel',
        //    'pdf',
        //    {
        //        extend: 'excel',
        //        text: 'excel all (not just selected)',
        //        exportOptions: {
        //            modifier: {
        //                order: 'current',
        //                page: 'all',
        //                selected: null
        //            }
        //        }
        //    }
        //],
        //dom: 'Bfrtip',
        //buttons: [
        //    'copy', 'csv', 'excel', 'pdf', 'print'
        //],
        "ajax": {
            "url": "/Report/GetInspectionCertificates",
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
                title: "#",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                name: 'kephisOfficeName',
                data: "kephisOfficeName",
                title: "Office",
                sortable: true,
                searchable: true
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
                name: 'clientName',
                data: "clientName",
                title: "Importer",
                sortable: true,
                searchable: true
            },
            {
                name: 'exporter',
                data: "exporter",
                title: "Exporter",
                sortable: true,
                searchable: true,
                visible:false
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
            }
        ]
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#generatedCerts').DataTable().page.info();
        table.column(0,{ page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
});
