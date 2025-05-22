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
    var table =  $('#bulkassignments').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/AssignedBulkInspection/GetAssignedBulkInspectionList",
            "type": "POST",
            "data": { kpO_ID: officeId}
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
                    return '<a class="view-employee" href="/AssignedBulkInspection/BulkImportDetails?id=' + data + '" style="color:#595959"><button class="btn btn-info btn-xs">Record Inspection</button></a>';
                }
            }
        ]
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#bulkassignments').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

});
