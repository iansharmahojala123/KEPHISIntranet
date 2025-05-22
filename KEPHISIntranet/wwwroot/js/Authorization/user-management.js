
$(document).ready(function () {
    $('#users-list').dataTable({
        "proccessing": true,
        "serverSide": true,
        "language": {
            "processing": 'Loading'
        },
        "ajax": {
            "url": "/UserManagement/GetUsers",
            "type": "POST"
        },
        columns: [
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
                sortable: false,
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
                "data": { "id": "id"},
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a class="view-details" href="/UserManagement/ViewUserDetails?id=' + data.id + '"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-list-alt"></i> View Details</button></a>'
                }
            }
        ]
    });
});



$(document).ready(function () {
    $('#roles-list').dataTable({
        "proccessing": true,
        "serverSide": true,
        "language": {
            "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
        },
        "ajax": {
            "url": "/RoleManagement/GetRoles",
            "type": "POST"
        },
        columns: [
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
                "data": { "id": "id", "roleName": "roleName" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a class="edit-role-details" href="/RoleManagement/EditRole?id=' + data.id + '&roleName=' + data.roleName + '"><button class="btn btn-primary btn-xs"><i class="glyphicon glyphicon-pencil"></i> Edit</button></a>' + ' | '
                        + '<a class="view-role-details" href="/RoleManagement/RolePermissions?id=' + data.id + '&roleName=' + data.roleName + '"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-list-alt"></i> View Permissions</button></a>';
                      
                }
            }
        ]
    });
});


$(document).ready(function () {
    var userId = $("#UserId").val();

    $('#user-roles-list').dataTable({
        "proccessing": true,
        "serverSide": true,
        "language": {
            "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
        },
        "dom": 'rt<"bottom"i<"clear">>',
        "ajax": {
            "url": "/RoleManagement/GetUserRoles",
            "type": "POST",
            "data": { UserId: userId }
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
                visible: true
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
                "data": { "roleId": "roleId", "userId": "userId","roleName": "roleName","status":"status"},
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    var link = '<a class="view-role-details" href="/RoleManagement/RolePermissions?id=' + data.roleId + '&roleName=' + data.roleName + '">View Permissions</a>'
                    if (data.status === "Active")
                        link += ' | ' + '<a class="deactivate-user-role" href="/RoleManagement/DeactivateUserRole?id=' + data.userId + '&roleId=' + data.roleId + '">Deactivate Role</a>';
                    else if (data.status === "InActive")
                        link += ' | ' + '<a class="activate-user-role" href="/RoleManagement/ActivateUserRole?id=' + data.userId + '&roleId=' + data.roleId + '">Activate Role</a>';
                    return link;
                }
            }
        ]
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

$(document).ready(function () {
    $('#operations-list').dataTable({
        "proccessing": true,
        "serverSide": true,
        "language": {
            "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
        },
        "ajax": {
            "url": "/RoleManagement/GetPermissions",
            "type": "POST"
        },
        columns: [

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
                title: "Name",
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
        ]
    });
});

$('#role-operations-modal').on('show.bs.modal', function () {
    var roleId = $("#RoleId").val();
    $('#role-operations-list').dataTable({
        "proccessing": true,
        "serverSide": true,
        "language": {
            "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
        },
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





