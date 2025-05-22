function format_assignments(d) {
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
    var id = $("#Id").val();
    var table =  $('#singleassignments').DataTable({
        "serverSide": true,
        "proccessing": true,
        dom:
            "<'row'<'col-sm-6 text-center'B><'col-sm-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-4'l><'col-sm-4'i><'col-sm-4'p>>",
        buttons: [
            {
                text: 'Create New',
                action: function (e, dt, node, config) {
                    alert('Button activated');
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [2, 3, 4]
                }
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 2, 3, 4]
                }
            }

        ],
        "ajax": {
            "url": "/SingleInspection/GetSingleInspectionList",
            "type": "POST",
            "data": { kpO_ID: officeId}
        },
        columns: [
            {
                "class": "text-center",
                "width": "4px",
                name: 'id',
                "data": "id",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                title: "#",
                sortable: false,
                searchable: false,
                visible: true
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
                name: 'commodityTypeName',
                data: "commodityTypeName",
                title: "Type",
                sortable: true,
                searchable: true
            },
            {
                name: 'commodityFormName',
                data: "commodityFormName",
                title: "Form",
                sortable: true,
                searchable: true,
                visible:false
            },
            {
                name: 'origin',
                data: "origin",
                title: "Origin",
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
                name: 'employeeName',
                data: "employeeName",
                title: "Employee",
                sortable: true,
                searchable: true
            },
            {
                "title": "Actions",
                "data": "id",
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a class="view-employee" href="/SingleInspection/ImportDetails?id=' + data + '" style="color:#595959"><button class="btn btn-success btn-xs"><i class="icon-pencil"></i>Record Inspection</button></a>';
                }
            }
        ]
    });
});
