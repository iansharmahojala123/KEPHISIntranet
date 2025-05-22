$(document).ready(function () {
    var table = $('#category').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/Category/GetCategories",
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
                title: " Category",
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
                title: "DateCreated",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'createdby',
                data: 'createdBy',
                title: "CreatedBy",
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
                    return '<a href="/Category/_EditCategory?id=' + data + '" class="editCategory"><i class="fas fa-pencil-alt"></i></a>&nbsp;&nbsp;&nbsp;<a href="/Category/_Deactivate?id=' + data + '" class="deactivateCategory" title="Deactivate"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });
    $('#category').on("click", ".editCategory", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#editCategoryContainer').html(data);
            $('#editCategoryModal').modal('show');
            $('.selectpicker').selectpicker();
        });

    });

    $('#category').on("click", ".detailsType", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#detailsTypeContainer').html(data);
            $('#detailsTypeModal').modal('show');
            $('.selectpicker').selectpicker();
        });

    });

    $('#category').on("click", ".deactivateCategory", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateCategoryContainer').html(data);
            $('#deactivateCategoryModal').modal('show');
        });

    });
});


$("#btnCreateCategory").on("click", function () {
    var url = $(this).data("url");
    $.get(url, function (data) {
        $('#createCategoryContainer').html(data);
        $('#createCategoryModal').modal('show');
    });
});
$('.add-category').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#createCategoryContainer').html(data);
        $('#createCategoryModal').modal('show');
        $(".selectpicker").selectpicker();
    });


});
$('#createCategoryModal').on("click", "#btn-submit-category", function (event) {
    var form = $('form#add-category-form');
    var action = $(form).attr('action');
    event.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#createCategoryContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');

});
$("#editCategoryModal").on("click", "#btn-submit-category", function (e) {
    var form = $('form#edit-category-form');
    var action = $(form).attr('action');
    e.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#editCategoryContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');

});