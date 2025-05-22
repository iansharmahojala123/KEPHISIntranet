function format_fee(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Name: </b>' + d.name + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>'
}
$(document).ready(function () {
    var table = $('#fee').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/Fee/GetFee",
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
                title: "Fee",
                sortable: true,
                searchable: true
            },
            {
                name: 'amount',
                data: "amount",
                title: "Amount",
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
                    return '<a href="/Fee/_EditFee?id=' + data + '" class="editFee"><i class="fas fa-pencil-alt"></i></a>&nbsp;&nbsp;&nbsp;<a href="/Fee/_DeactivateFee?id=' + data.id + '" class="deactivateFee" title="Deactivate"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });
    $('#fee').on("click", ".editFee", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#editFeeContainer').html(data);
            $('#editFeeModal').modal('show');
            $('.selectpicker').selectpicker();
        });
    });
    $('#fee').on("click", ".detailscharges", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#detailschargesContainer').html(data);
            $('#detailschargesModal').modal('show');
            $('.selectpicker').selectpicker();
        });

    });
    $('#fee').on("click", ".deactivatecharges", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivatechargesContainer').html(data);
            $('#deactivatechargesModal').modal('show');
        });
    });
});

$('.add-fee').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    var caturl = "/Category/GetCategoryDropdown";
    $.get(url, function (data) {
        $('#createFeeContainer').html(data);
        $('#createFeeModal').modal('show');
        $(".selectpicker").selectpicker();
        $.getJSON(caturl, {}, function (data) {
            var items = "<option value=''> Nothing Selected </option>";
            $.each(data, function (i, cat) {
                items += "<option value='" + cat.Value + "'>" + cat.Text + "</option>";
            });
            $("#CategoryId").html(items).selectpicker("refresh");
        });
    });
});
$('#createFeeModal').on("click", "#btn-submit-fee", function (event) {
    var form = $('form#add-fee-form');
    var action = $(form).attr('action');
    event.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#createFeeContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');

});
$("#editFeeModal").on("click", "#btn-submit-fee", function (e) {
    var form = $('form#edit-fee-form');
    var action = $(form).attr('action');
    e.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#editFeeContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');

});