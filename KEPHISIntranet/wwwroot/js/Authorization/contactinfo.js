function format_contactinfo(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Name: </b>' + d.name + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>'
}
$(document).ready(function () {
    var table = $('#contactinfo').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/ContactInfo/GetContactInfo",
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
                name: 'contact',
                data: "contact",
                title: "Contact",
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
                name: 'mobileNumber',
                data: "mobileNumber",
                title: "Mobile Number",
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
                    return '<a href="/ContactInfo/_EditContactInfo?id=' + data + '" class="editContactInfo"><i class="fas fa-pencil-alt"></i></a>&nbsp;&nbsp;&nbsp;<a href="/ContactInfo/_DeactivateContactInfo?id=' + data.id + '" class="deactivateContactInfo" title="Deactivate"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });

    $('#contactinfo').on("click", ".editContactInfo", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#editContactInfoContainer').html(data);
            $('#editContactInfoModal').modal('show');
            $('.selectpicker').selectpicker();
        });

    });

    $('#contactinfo').on("click", ".detailsContactInfo", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#detailsContactInfoContainer').html(data);
            $('#detailsContactInfoModal').modal('show');
            $('.selectpicker').selectpicker();
        });

    });

    $('#contactinfo').on("click", ".deactivateContactInfo", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#deactivateContactInfoContainer').html(data);
            $('#deactivateContactInfoModal').modal('show');
        });

    });
});


$("#btnCreateContactInfo").on("click", function () {
    var url = $(this).data("url");
    $.get(url, function (data) {
        $('#createContactInfoContainer').html(data);
        $('#createContactInfoModal').modal('show');
        $(".selectpicker").selectpicker();
    });
});

$('.add-result-link').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#createContactInfoContainer').html(data);
        $('#createContactInfoModal').modal('show');
        $(".selectpicker").selectpicker();
    });


});
$('#createContactInfoModal').on("click", "#btn-submit-con", function (event) {
    var form = $('form#add-contactinfo-form');
    var action = $(form).attr('action');
    event.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#createContactInfoContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');
});
$("#editContactInfoModal").on("click", "#btn-submit-con", function (e) {
    var form = $('form#edit-ContactInfo-form');
    var action = $(form).attr('action');
    e.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#createContactInfoContainer").html(data);
        $(".selectpicker").selectpicker();
    }, 'html');

});

$("#ContactInfoId").change(function () {
    var contactInfo = $(this).val();
    if (contactInfo === 0) {
        $("#contable").hide();
    }
    else if (contactInfo !== 0) {
        $("#contable").show();
        getContactDataTable(contactInfo); // load Contacts by Id selected
    }

});

function getContactDataTable(Id) {
    var table = $('#contactinfodetails').DataTable({
        "serverSide": true,
        "bFilter": false,
        "bLengthChange": false,
        "dom": "lfrti",
        "bInfo": false,
        "proccessing": true,
        "destroy": true,
        "ajax": {
            "url": "/ContactInfo/GetContactInfoById",
            "type": "POST",
            "data": { Id: Id }
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
                name: 'contact',
                data: "contact",
                title: "Contact",
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
                name: 'mobileNumber',
                data: "mobileNumber",
                title: "Mobile Number",
                sortable: true,
                searchable: true
            },
            {
                name: 'status',
                data: "status",
                title: "Status",
                sortable: true,
                searchable: true,
                visible: false
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
                    return '<a href="/ContactInfo/_EditContactInfo?id=' + data + '" class="editContactInfo"><i class="fas fa-pencil-alt"></i></a>&nbsp;&nbsp;&nbsp;<a href="/ContactInfo/_DeactivateContactInfo?id=' + data.id + '" class="deactivateContactInfo" title="Deactivate"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please verify a <b>Customer</b> is selected."
        }
    });

}

$("#btninspector").on("click", function () {
    var url = $(this).data("url");
    $.get(url, function (data) {
        $('#ntityContainer').html(data);
        $('#ntityModal').modal('show');
    });
});