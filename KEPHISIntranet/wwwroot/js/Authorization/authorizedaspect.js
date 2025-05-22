function format_aa(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Name: </b>' + d.name + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>'
}
$(document).ready(function () {
    var table = $('#authorizedAspect').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/AuthorizedAspect/GetAuthorizedAspects",
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
                name: 'name',
                data: "name",
                title: "Authorized Aspect",
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
                    return '<a href="/AuthorizedAspect/_EditAuthorizedAspect?id=' + data + '" class="editAA"><i class="fas fa-pencil-alt"></i></a>&nbsp;&nbsp;&nbsp;<a href="/AuthorizedAspect/_Deactivate?id=' + data + '" class="deactivateAA" title="Deactivate"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });

    $('#authorizedAspect').on("click", ".editAA", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#editAAContainer').html(data);
            $('#editAAModal').modal('show');
            $('.selectpicker').selectpicker();
        });

    });

    $('#authorizedAspect').on("click", ".detailsAA", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#detailsAAContainer').html(data);
            $('#detailsAAModal').modal('show');
            $('.selectpicker').selectpicker();
        });

    });

    $('#authorizedAspect').on("click", ".deactivateAA", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateAAContainer').html(data);
            $('#deactivateAAModal').modal('show');
        });

    });
});


$("#btnCreateAA").on("click", function () {
    var url = $(this).data("url");
    var departmenturl = "/AuthorizedAspects/GetTestCategories";
    $.get(url, function (data) {
        $('#createAAContainer').html(data);
        $('#createAAModal').modal('show');
        $('.selectpicker').selectpicker();
    });

});

$('#createAAModal').on("click", "#btn-submit-auth", function (event) {
    var form = $('form#add-auth-form');
    var action = $(form).attr('action');
    event.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#createAAContainer").html(data);
    }, 'html');

});
$("#editAAModal").on("click", "#btn-submit-aspect", function (e) {
    var form = $('form#edit-auth-form');
    var action = $(form).attr('action');
    e.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#editAAContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');

});
$('.add-aspect').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#createAAContainer').html(data);
        $('#createAAModal').modal('show');
        $(".selectpicker").selectpicker();
    });


});