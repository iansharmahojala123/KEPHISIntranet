function format_employees(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Name: </b>' + d.name + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>'
}
$(document).ready(function () {
    var table = $('#employees').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/Employee/Getemployees",
            "type": "POST"
        },
        columns: [
            {
                "class": "text-center",
                "width": "4px",
                name: 'id',
                data: 'id',
                title: "#",
                sortable: false,
                searchable: false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
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
                "name": 'nationalID',
                "data": { "personalNumber": "personalNumber", "nationalID": "nationalID" },
                "title": "P/ID NO.",
                sortable: true,
                searchable: true,
                "render": function (data, type, full, meta) {
                    if (data.personalNumber === null) {
                        return data.nationalID;
                    }
                    else if (data.nationalID === null) {
                        return data.personalNumber;
                    }
                }
            },
            {
                name: 'personalNumber',
                data: "personalNumber",
                title: "personalNumber",
                sortable: true,
                searchable: true,
                visible:false
            },
            {
                name: 'nationalID',
                data: "nationalID",
                title: "nationalID",
                sortable: true,
                searchable: true,
                visible:false
            },
            {
                name: 'employee',
                data: "employee",
                title: "Employee",
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
                name: 'status',
                data: "status",
                title: "Status",
                sortable: true,
                searchable: true
            },
            {
                name: 'datecreated',
                data: "dateCreated",
                title: "Date Created",
                sortable: true,
                searchable: true,
                render: function (data) {
                    return moment(data).format('DD-MM-YYYY');
                }
            },
            {
                name: 'createdby',
                data: 'createdBy',
                title: "Created By",
                sortable: true,
                searchable: true
            },

            {
                "title": "Actions",
                "data": "id",
                "class": "text-center",
                "width": "8%",
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a href="/Employee/_EditEmployee?id=' + data + '" class="editEmployee"><i class="fas fa-pencil-alt"></i></a>&nbsp;&nbsp;&nbsp;<a href="/Employee/_DeactivateEmployee?id=' + data + '" class="deactivateEmployee" title="Deactivate"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });

    $('#employees').on("click", ".editEmployee", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#editEmployeeContainer').html(data);
            $('#editEmployeeModal').modal('show');
            $('.selectpicker').selectpicker();
            var emproles = $("#EmployeeRole option:selected").text();
            var emproleId = $('#EmployeeRole').val();
            $("#EmployeeRole").val(emproleId);
            if (emproles === 'Inspector') {
                $("#pno").show();
                $("#nid").hide();
            }
            else if (emproles !== 'Inspector') {
                $("#nid").show();
                $("#pno").hide();
            }
            $("#EmployeeRole").change(function () {
                var emproles = $("#EmployeeRole option:selected").text();
                var emproleId = $('#EmployeeRole').val();
                $("#EmployeeRole").val(emproleId);
                if (emproles === 'Inspector') {
                    $("#pno").show();
                    $("#nid").hide();
                    $("#NationalID").val() === "";
                }
                else if (emproles === 'Casual' || emproles === 'Casual') {
                    $("#nid").show();
                    $("#pno").hide();
                    $("#PersonalNumber").val() === "";
                }
            });
        });

    });

    $('#Employee').on("click", ".detailsEmployee", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#detailsEmployeeContainer').html(data);
            $('#detailsEmployeeModal').modal('show');
            $('.selectpicker').selectpicker();
        });

    });

    $('#employees').on("click", ".deactivateEmployee", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateEmployeeContainer').html(data);
            $('#deactivateEmployeeModal').modal('show');
        });

    });
});


$("#btnCreateEmployee").on("click", function () {
    var url = $(this).data("url");
    $.get(url, function (data) {
        $('#createEmployeeContainer').html(data);
        $('#createEmployeeModal').modal('show');
        $(".selectpicker").selectpicker();

        $("#Employeerole").change(function () {
            var role = $("#Employeerole option:selected").text();
            alert(role);
            $("#Employeerole").val(role);
            if (role === 'Inspector') {
                $("#pno").show();
                $("#nid").hide();
            }
            else if (role === 'Casual') {
                $("#nid").show();
                $("#pno").shhideow();
            }
            else if (role === 'Intern') {
                $("#nid").show();
                $("#pno").hide();
            }
        });

        var role = $("#Employeerole option:selected").text();
        $("#Employeerole").val(role);
        if (role === 'Inspector') {
            $("#pno").show();
            $("#nid").hide();
        }
        else if (role === 'Casual') {
            $("#nid").show();
            $("#pno").hide();
        }
        else if (role === 'Intern') {
            $("#nid").show();
            $("#pno").hide();
        }
    });
});

$('.add-employee').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#createEmployeeContainer').html(data);
        $('#createEmployeeModal').modal('show');
        $(".selectpicker").selectpicker();
        $("#EmployeeRole").change(function () {
            var emproles = $("#EmployeeRole option:selected").text();
            var emproleId = $('#EmployeeRole').val();
            $("#EmployeeRole").val(emproleId);
            if (emproles === 'Inspector') {
                $("#pno").show();
                $("#nid").hide();
            }
            else if (emproles !== 'Inspector') {
                $("#nid").show();
                $("#pno").hide();
            }
        });
    });


});
$('#createEmployeeModal').on("click", "#btn-submit-emp", function (event) {
    var form = $('form#add-employee-form');
    var action = $(form).attr('action');
    event.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#createEmployeeContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');

});
$("#editEmployeeModal").on("click", "#btn-submit-emp", function (e) {
    var form = $('form#edit-employee-form');
    var action = $(form).attr('action');
    e.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#editEmployeeContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');

});