function format_offices(d) {
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
    var table =  $('#offices').DataTable({
        "serverSide": true,
        "proccessing": true,
        dom:
            "<'row'<'col-sm-6 text-center'B><'col-sm-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-4'l><'col-sm-4'i><'col-sm-4'p>>",
        buttons: [
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
            "url": "/KephisOffice/GetKephisOfficeList",
            "type": "POST"
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
                name: 'name',
                data: "name",
                title: "Name",
                sortable: true,
                searchable: true
            },
            {
                name: 'code',
                data: "code",
                title: "Code",
                sortable: true,
                searchable: true
            },
            {
                name: 'location',
                data: "location",
                title: "Location",
                sortable: true,
                searchable: true
            },
            {
                name: 'email',
                data: "email",
                title: "Email",
                sortable: true,
                searchable: true
            },
          
            {
                name: 'startdate',
                data: 'startDate',
                title: "Start Date",
                sortable: true,
                searchable: true,
                visible:false
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
                "width": "5px",
                "class": "text-center",
                "data": "id",
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a class="view-office" href="/KephisOffice/OfficeDetails?id=' + data + '"><button class="btn btn-danger btn-xs"><i class="glyphicon glyphicons-new-window"></i> View Details </button></a>'                   
                }
            }
        ]
    });
});
