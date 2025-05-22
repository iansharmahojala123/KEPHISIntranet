function format_users(d) {
    return '<div class="slider" style="margin-left:50px">' +
        '<b>User Name: </b>' + d.userName + '<br>' +
        '<b>Email Address: </b>' + d.emailAddress + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.createdDate + '<br>'
}
$(document).ready(function () {
    var table = $('#users').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/UserManagement/GetUsers",
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
                name: 'UserName',
                data: "userName",
                title: "User Name",
                sortable: true,
                searchable: true
            },
            {
                name: 'EmailAddress',
                data: 'emailAddress',
                title: "Email Address",
                sortable: true,
                searchable: false
            },
            {
                name: 'PhoneNumber',
                data: 'phoneNumber',
                title: "Phone Number",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'createdDate',
                data: "createdDate",
                title: "Created Date",
                sortable: true,
                searchable: false,
                visible: true
            },
            {
                name: 'createdby',
                data: 'createdBy',
                title: "Created By",
                //sortable: true,
                searchable: false,
                visible: true
            },
            {
                name: 'status',
                data: 'strStatus',
                title: "User Status",
                sortable: true,
                searchable: true
            },
            {
                "title": "Actions",
                "data": { "id": "id" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a class="view-details" href="/UserManagement/ViewUserDetails?id=' + data.id + '"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-list-alt"></i> View Details</button></a>'
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Add New</b> button."
        }
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#users').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
});


$("#btnCreateUser").on("click",  function () {

    var url = $(this).data("url");
    var rolesurl = "/RoleManagement/GetRolesDropDown";

    $.get(url, function (data) {
        $('#createUserContainer').html(data);
        $('#createUserModal').modal('show');
        $('.selectpicker').selectpicker();

        $.getJSON(rolesurl, {}, function (data) {
            var items = "<option value='0'> Select </option>";
            $.each(data, function (i, roles) {
                items += "<option value='" + roles.Value + "'>" + roles.Text + "</option>"
            });
            $("#Roles").html(items).selectpicker("refresh");

        });
    });

});

function format_userRoles(d) {
    return '<div class="slider" style="margin-left:50px">' +
        '<b>Role Name: </b>' + d.roleName + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>'
}
$(document).ready(function () {
    var table = $('#roles-list').DataTable({
        "proccessing": true,
        "serverSide": true,
        "ajax": {
            "url": "/RoleManagement/GetRoles",
            "type": "POST"
        },
        columns: [
            {
                "class": "text-center",
                "width": "4%",
                "title": '#',
                orderable: false,
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
                name: 'Name',
                data: "roleName",
                title: "Role Name",
                sortable: true,
                searchable: true
            },
            {
                name: 'DateCreated',
                data: 'dateCreated',
                title: "Date Created",
                sortable: false,
                searchable: false
            },
            {
                name: 'CreatedBy',
                data: 'createdBy',
                title: "Created By",
                sortable: true,
                searchable: true,
                visible: true
            },
            {
                "title": "Actions",
                "class": "text-center",
                "width": "16%",
                "data": { "id": "id", "roleName": "roleName" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a class="edit-role-details" href="/RoleManagement/EditRole?id=' + data.id + '&roleName=' + data.roleName + '"><i class="fa fa-pencil-alt" style="font-size:14px;color:#009efb"></i></a>&nbsp;&nbsp;' + ' | &nbsp;&nbsp;'
                        + '<a class="view-role-details" href="/RoleManagement/RolePermissions?id=' + data.id + '&roleName=' + data.roleName + '"><button class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-list-alt"></i> View Permissions</button></a>';

                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#roles-list').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    // Add event listener for opening and closing details
    $('#roles-list tbody').on('click', 'td.details-control', function () {
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
            row.child(format_userRoles(row.data()), 'no-padding').show();
            tr.addClass('shown');

            $('div.slider', row.child()).slideDown();
        }
    });
});

$("#btnAddRole").on("click", function () {
    var url = $(this).data("url");
    var rolesurl = "/RoleManagement/GetRolesDropDown";

    $.get(url, function (data) {
        $('#createUserRoleContainer').html(data);
        $('#createUserRoleModal').modal('show');
        $('.selectpicker').selectpicker();

        $.getJSON(rolesurl, {}, function (data) {
            var items = "<option value='0'> Select </option>";
            $.each(data, function (i, roles) {
                items += "<option value='" + roles.Value + "'>" + roles.Text + "</option>"
            });
            $("#Roles").html(items).selectpicker("refresh");

        });
    });

});

$(document).ready(function () {
    var userId = $("#UserId").val();
    var table = $('#user-roles-list').DataTable({
        "proccessing": true,
        "serverSide": true,
        "dom": 'rt<"bottom"i<"clear">>',
        "ajax": {
            "url": "/RoleManagement/GetUserRoles",
            "type": "POST",
            "data": { UserId: userId }
        },
        columns: [
            {
                "class": "text-center",
                "width": "4%",
                "title": '#',
                orderable: false,
                "defaultContent": ""
            },
            {
                name: 'userId',
                data: 'userId',
                title: "userId",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                name: 'Name',
                data: "roleName",
                title: "Role Name",
                sortable: true,
                searchable: true
            },
            {
                name: 'dateAddedToRole',
                data: 'dateAddedToRole',
                title: "Date Added",
                sortable: false,
                searchable: false
            },
            {
                name: 'addedToRoleBy',
                data: 'addedToRoleBy',
                title: "Added By",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'status',
                data: 'status',
                title: "Status",
                sortable: true,
                searchable: true,
                visible: true
            },
            {
                "title": "Actions",
                "class": "text-center",
                "width": "8%",
                "data": { "roleId": "roleId", "userId": "userId", "roleName": "roleName", "status": "status" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    var link = '<a class="view-role-details" href="/RoleManagement/RolePermissions?id=' + data.roleId + '&roleName=' + data.roleName + '"><i class="far fa-file-alt" style="font-size:14px"></i></a>';
                    if (data.status === "Active")
                        link += ' | ' + '<a class="deactivate-user-role" href="/RoleManagement/DeactivateUserRole?id=' + data.userId + '&roleId=' + data.roleId + '"><i class="fa fa-trash-alt danger" style="font-size:14px;color:#f62d51"></i></a>';
                    else if (data.status === "InActive")
                        link += ' | ' + '<a class="activate-user-role" href="/RoleManagement/ActivateUserRole?id=' + data.userId + '&roleId=' + data.roleId + '"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-list-alt"></i> Activate Role&nbsp;&nbsp;</button> </a>';
                    return link;
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Add Role</b> button."
        }
    });

    table.on('draw.dt', function () {
        var PageInfo = $('#user-roles-list').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

});


$('#roles-list').on("click", ".view-role-details", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#role-operations-container').html(data);
        $('#role-operations-modal').modal('show');
    });
});

$('#roles-list').on("click", ".edit-role-details", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#role-operations-container').html(data);
        $('#role-operations-modal').modal('show');
        $("#Permissions").selectpicker("refresh");
    });
});

$('#user-roles-list').on("click", ".view-role-details", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#role-operations-container').html(data);
        $('#role-operations-modal').modal('show');
    });
});

$('#user-roles-list').on("click", ".deactivate-user-role", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#deactivate-userrole-container').html(data);
        $('#deactivate-userrole-modal').modal('show');
    });
});

$('#user-roles-list').on("click", ".activate-user-role", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#deactivate-user-container').html(data);
        $('#deactivate-user-modal').modal('show');
    });
});

function format_Operations(d) {
    return '<div class="slider" style="margin-left:50px">' +
        '<b>Permission Name: </b>' + d.name + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>'
}
$(document).ready(function () {
    var table = $('#permissions-list').DataTable({
        "proccessing": true,
        "serverSide": true,
        "ajax": {
            "url": "/RoleManagement/GetPermissions",
            "type": "POST"
        },
        columnDefs: [{
            orderable: false,
            className: 'select-checkbox',
            targets: 0
        }],
        columns: [
            {
                "class": "text-center",
                "width": "4%",
                "title": '#',
                orderable: false,
                sortable:false,
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
                name: 'Name',
                data: "name",
                title: "Permission",
                sortable: true,
                searchable: true
            },
            {
                name: 'DateCreated',
                data: 'dateCreated',
                title: "Date Created",
                sortable: false,
                searchable: false
            },
            {
                name: 'CreatedBy',
                data: 'createdBy',
                title: "Created By",
                sortable: true,
                searchable: true,
                visible: true
            }
            ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#permissions-list').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    // Add event listener for opening and closing details
    $('#permissions-list tbody').on('click', 'td.details-control', function () {
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
            row.child(format_Operations(row.data()), 'no-padding').show();
            tr.addClass('shown');

            $('div.slider', row.child()).slideDown();
        }
    });
});


$('#role-operations-modal').on('show.bs.modal', function () {
    var roleId = $("#RoleId").val();
    $('#role-permissions-list').dataTable({
        "proccessing": true,
        "serverSide": true,
        "ajax": {
            "url": "/RoleManagement/GetRolePermissions",
            "type": "POST",
            "data": { roleId: roleId }
        },
        columns: [
            {
                name: 'roleId',
                data: 'roleId',
                title: "roleId",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                name: 'RoleName',
                data: "roleName",
                title: "Role Name",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'permission',
                data: "permission",
                title: "Permission",
                sortable: true,
                searchable: true
            },
            {
                name: 'Description',
                data: 'description',
                title: "Description",
                sortable: false,
                searchable: false
            }
        ]
    });
});

$(document).ready(function () {
    var url = "/RoleManagement/GetRolesDropDown";
    $.getJSON(url, {}, function (data) {
        var items = " ";
        $.each(data, function (i, comp) {
            items += "<option value='" + comp.Value + "'>" + comp.Text + "</option>"
        });
        $("#Roles").html(items).selectpicker("refresh");

    });
});

$('.edit-user-details-link').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#edit-user-details-container').html(data);
        $('#edit-user-details-modal').modal('show');
    });
});

$('.reactivate-user-account').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#activate-user-container').html(data);
        $('#activate-user-modal').modal('show');
    });
});


$('.deactivate-user-account').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#deactivate-user-container').html(data);
        $('#deactivate-user-modal').modal('show');
    });
});


$('.add-user-to-role-link').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#deactivate-user-container').html(data);
        $('#deactivate-user-modal').modal('show');
        $("#RoleIds").selectpicker("refresh");
    });
});





