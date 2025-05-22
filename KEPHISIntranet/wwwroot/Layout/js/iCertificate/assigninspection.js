function format_applications(d) {
    return '<div class="slider" style="margin-left:60px">' +
        '<b>Name: </b>' + d.name + '<br>' +
        '<b>Code:</b> ' + d.code + '<br>' +
        '<b>Location: </b>' + d.location + '<br>' +
        '<b>Email:</b> ' + d.email + '<br>' +
        '<b>Address: </b>' + d.address + '<br>' +
        '<b>Start Date: </b>' + d.startDate + '<br>' +
        '<b>End Date: </b>' + d.endDate + '<br>';
}
$(document).ready(function () {
    //var officeId = $('#officeId').val();
    var table = $('#assigninspection').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/AssignInspection/GetPipApplications",     
            "type": "POST"
        },

        'columnDefs': [
            {
                'targets': 0,
                "width": "4%",
                'checkboxes': {
                    'selectRow': true
                }
            }
        ],
        'select': {
            'style': 'multi'
        },
        'order': [[1, 'asc']],
        columns: [
            {
                name: 'id',
                data: 'id',
                title: "Id",
                sortable: false,
                searchable: false,
                visible: true
            },
            {
            "title": "Date",
                "data": "date",
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
                searchable: true
            },
            {
                name: 'origin',
                data: "origin",
                title: "Origin",
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
                name: 'unitName',
                data: "unitName",
                title: "Unit",
                sortable: true,
                searchable: true
            },
            {
                name: 'kpoId',
                data: 'kpoId',
                title: "kpoId",
                sortable: false,
                searchable: false,
                visible: false
            }
        ]
    });
    $('#applications tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            $('div.slider', row.child()).slideUp(function () {
                row.child.hide();
                tr.removeClass('shown');
            });
        }
        else {
            // Open this row
            row.child(format_applications(row.data()), 'no-padding').show();
            tr.addClass('shown');

            $('div.slider', row.child()).slideDown();
        }
    });


    $("#assignModal").on("click", "#btnsubmit", function (e) {
        $('#confirm-assign-asset-frm').submit();
    });
    
    $('#confirm-assign-asset-frm').on('submit', function (e) {
        var rows_selected = table.column(0).checkboxes.selected();
        var assignInspection = [];
        $.each(rows_selected, function (index, rowId) {
            // Create a hidden element 
            assignInspection.push(rowId);
        });
        console.log(assignInspection);
        $("#PIPIdsJson").val(JSON.stringify(assignInspection));
        $("#EMP_ID").val();
    });
    $("#approveModal").on('hidden.bs.modal', function () {
        location.reload();
    });
    $("#btn-assigninspection").on("click", function () {
        var officeId = $('#KPO_ID').val();
        var empId = $('#EMP_ID').val();
        var type = $('#InspectionType').val();
        $("#KPO_ID").val(officeId);
        $("#EMP_ID").val(empId);
        $("#InspectionType").val(type);

        var url = $(this).data("url");
        $.get(url, function (data) {
            $('#assignContainer').html(data);
            $('#assignModal').modal('show');
            var check = $('#assigninspection').find('input[type=checkbox]:checked').length;
            if (check > 0 && officeId > 0 && empId > 0) {
                alert("Checkbox Selected");
            }
            else {
                alert("Select least One PIP record to assign");
                return false;
            }
        });

    });
    //$("#btn-assigninspection").on("click", function () {
        //var officeId = $('#KPO_ID').val();
        //var empId = $('#EMP_ID').val();
        //var type = $('#InspectionType').val();
        //$("#KPO_ID").val(officeId);
        //$("#EMP_ID").val(empId);
        //$("#InspectionType").val(type);

        //var check = $('#assigninspection').find('input[type=checkbox]:checked').length;
        //if (check > 0) {
        //    //alert("Checkbox Selected");
        //}
        //else {
        //        alert("Select least One PIP record to assign");
        //    return false;
        //}

        //if (officeId > 0 && empId > 0) {
            //var url = $(this).data("url");
            //$.get(url, function (data) {
            //    $('#assignContainer').html(data);
            //    $('#assignModal').modal('show');
            //    var rows_selected = table.column(0).checkboxes.selected();
            //    var assignInspection = [];
            //    $.each(rows_selected, function (index, rowId) {
            //        // Create a hidden element 
            //        assignInspection.push(rowId);
            //    });
            //    console.log(assignInspection);
            //    $("#PIPIdsJson").val(JSON.stringify(assignInspection));
            //    getEmployees();
            //});
        //}
        //else {
        //    alert("Please Select Office and Inspector");
        //    return false;
        //}
    //});
    $("#assignModal").on('show.bs.modal', function () {
        var rows_selected = table.column(0).checkboxes.selected();
        var assignInspection = [];
        $.each(rows_selected, function (index, rowId) {
            // Create a hidden element 
            assignInspection.push(rowId);
        });
        console.log(assignInspection);
        $("#PIPIdsJson").val(JSON.stringify(assignInspection));
        getEmployee();
    });
    
    $("#assignModal").on("click", "#btnsubmit", function (e) {
        var rows_selected = table.column(0).checkboxes.selected();
        var assignInspection = [];
        $.each(rows_selected, function (index, rowId) {
            // Create a hidden element 
            assignInspection.push(rowId);
        });
        console.log(assignInspection);
        $("#PIPIdsJson").val(JSON.stringify(assignInspection));
        $("#EMP_ID option:selected").val();
        $("#inspectionDate").val();
        $('#assign-frm').submit();
    });

    $('#assign-frm').on('submit', function (e) {
    });
    $("#assignModal").on('hidden.bs.modal', function () {
        location.reload();
    });
});
function getEmployee() {
    $('#EMP_ID').change(function () {
        var emp = $("#EMP_ID option:selected").text();
        var empId = $("#EMP_ID option:selected").val();
        $("#EMP_ID").val(empId);
    });
}


//var array = [];
//$(function getPIPIds() {
//    $('#btn-assigninspection').on("click", function () {
//        var rows_selected = table.column(0).checkboxes.selected();
//        var assignInspection = [];
//        $.each(rows_selected, function (index, rowId) {
//            assignInspection.push(rowId);
//        });
//        console.log(assignInspection);
//        $("#PIPIdsJson").val(JSON.stringify(assignInspection));      
//    });
//});

