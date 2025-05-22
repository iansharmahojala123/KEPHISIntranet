function format_mots(d) {
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
    var table = $('#mot').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/MeansOfConveyance/GetMeansOfConveyance",
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
                name: 'name',
                data: "name",
                title: "Name",
                sortable: true,
                searchable: true
            },
            {
                name: 'description',
                data: "description",
                title: "Description",
                sortable: true,
                searchable: true
            },
            {
                name: 'startdate',
                data: 'startDate',
                title: "Start Date",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'enddate',
                data: 'endDate',
                title: "End Date",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                "title": "Actions",
                "data": "id",
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a class="view-office" href="/KephisOffice/OfficeDetails?id=' + data + '"><button class="btn btn-danger btn-xs"><i class="glyphicon glyphicons-new-window"></i> View Details </button></a><i class="ti-write"></i>'
                }
            }
        ]
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#mot').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
});
