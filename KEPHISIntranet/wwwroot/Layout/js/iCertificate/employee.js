function format_employees(d) {
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
    var table =  $('#employees').DataTable({
        "serverSide": true,
        "proccessing": true
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
            "url": "/Employee/GetEmployeeList",
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
            },                "class": "text-center",
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
                name: 'employeeName',
                data: "employeeName",
                title: "Employee",
                sortable: true,
                searchable: true
            },
            {
                name: 'personal_Number',
                data: "personal_Number",
                title: "Personal NO.",
                sortable: true,
                searchable: true
            },
            {
                name: 'designation',
                data: "designation",
                title: "Designation",
                sortable: true,
                searchable: true
            },
            {
                name: 'officeName',
                data: "officeName",
                title: "Office",
                sortable: true,
                searchable: true
            },
            {
                name: 'email_Adress',
                data: "email_Adress",
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
                    return '<a class="view-employee" href="/Employee/EmployeeDetails?id=' + data + '"><i class="ti-clipboard style""color:black"></i></a>'                    
                }
            }
        ]
    });
});
