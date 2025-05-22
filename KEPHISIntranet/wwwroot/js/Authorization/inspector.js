function format_inspector(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Name: </b>' + d.name + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>'
}
$(document).ready(function () {
    var table = $('#inspector').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/Inspector/GetInspectors",
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
                name: 'inspector',
                data: "inspector",
                title: "Inspector",
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
                name: 'authorizationNumber',
                data: "authorizationNumber",
                title: "Auth NO.",
                sortable: true,
                searchable: true
            },
            {
                name: 'gazetteNumber',
                data: "gazetteNumber",
                title: "Gazette NO.",
                sortable: true,
                searchable: true
            },
            {
                name: 'authorizationStatus',
                data: "authorizationStatus",
                title: "Status",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'status',
                data: "status",
                title: "Status",
                sortable: true,
                searchable: true,
                visible: false               
            } ,
            {
                name: 'datecreated',
                data: "dateCreated",
                title: "Date Created",
                sortable: true,
                searchable: true,
                visible: false,
                render: function (data) {
                    return moment(data).format('DD-MM-YYYY');
                }
            },
            {
                name: 'createdby',
                data: 'createdBy',
                title: "Created By",
                sortable: true,
                searchable: true,
                visible:false
            },

            {
                "title": "Actions",
                "data": { "id": "id", "inspector": "inspector" },
                "class": "text-center",
                "width": "14%",
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a href="/Inspector/_EditInspector?id=' + data.id + '" class="editinspector"><i class="fas fa-pencil-alt"></i></a>&nbsp;&nbsp;&nbsp;<a href="/Inspector/_Deactivateinspector?id=' + data.id + '" class="deactivateinspector" title="Deactivate"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a> <a class="view-aspects" href="/Inspector/_ViewInspectorAspects?id=' + data.id + '&inspector=' + data.inspector + '"><button class="btn btn-success btn-xs"><i class="glyphicon glyphicon-list-alt"></i> View Aspects</button> </a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });

    $('#inspector').on("click", ".editinspector", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#editInspectorContainer').html(data);
            $('#editInspectorModal').modal('show');
            $('.selectpicker').selectpicker();
        });

    });

    $('#inspector').on("click", ".view-aspects", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#inspectoraspectsContainer').html(data);
            $('#inspectoraspectsModal').modal('show');
        });
    });
    $('#inspectoraspectsModal').on('show.bs.modal', function () {
        var inspectorId = $("#InspectorId").val();
        $('#inspectoraspects').dataTable({
            "serverSide": true,
            "proccessing": true,
            "ajax": {
                "url": "/Inspector/GetInspectorAspects",
                "type": "POST",
                "data": { inspectorId: inspectorId }
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
                    name: 'authorizedAspectName',
                    data: 'authorizedAspectName',
                    title: "Authorized Aspect",
                    sortable: false,
                    searchable: false
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
                    name: 'status',
                    data: 'status',
                    title: "Status",
                    sortable: true,
                    searchable: true
                }
            ]
        });
    });

    $('#inspector').on("click", ".deactivateinspector", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateinspectorContainer').html(data);
            $('#deactivateinspectorModal').modal('show');
        });

    });
});

$('.add-insp-link').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    var aspurl = "/AuthorizedAspect/GetAuthorizedAspectDropdown";
    var inspectorurl = "/Entity/GetEntityDropdown";
    $.get(url, function (data) {
        $('#createInspectorContainer').html(data);
        $('#createInspectorModal').modal('show');
        $(".selectpicker").selectpicker();
        $.getJSON(aspurl, {}, function (data) {
            var items = "<option value='0'> Select </option>";
            $.each(data, function (i, asp) {
                items += "<option value='" + asp.Value + "'>" + asp.Text + "</option>"
            });
            $("#AuthorizedAspectId").html(items).selectpicker("refresh");
        });
        $.getJSON(inspectorurl, {}, function (data) {
            var items = "<option value='0'> Nothing Selected </option>";
            $.each(data, function (i, ent) {
                items += "<option value='" + ent.Value + "'>" + ent.Text + "</option>"
            });
            $("#EntityId").html(items).selectpicker("refresh");
        });

    });
});
$('#createInspectorModal').on("click", "#btn-submit-inspector", function (event) {
    var form = $('form#add-inspector-form');
    var action = $(form).attr('action');
    event.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#createInspectorContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');
});
$("#editInspectorModal").on("click", "#btn-submit-inspector", function (e) {
    var form = $('form#edit-inspector-form');
    var action = $(form).attr('action');
    e.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#editInspectorContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');
});
