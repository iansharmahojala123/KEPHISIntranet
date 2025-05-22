function format_sample(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>';
}
$(document).ready(function () {
    var entityId = $("#EntityId").val();
    var table = $('#vwpaidentityfee').DataTable({
        "serverSide": true,
        "proccessing": true,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api();

            // converting to interger to find total
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\Ksh,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // computing column Total of the complete result 
            var entityFee = api
                .column(4)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            $(api.column(3).footer()).html('Total Entity Fee(s)').css({ "font-size": "1rem", "font-family": "Segoe UI Emoji", "font-weight": "bold" });
            var amount = Intl.NumberFormat('sw-KE', { style: 'currency', currency: 'Ksh' }).format(entityFee);
            $(api.column(4).footer()).html(amount).css({ "font-size": "1rem", "font-family": "Segoe UI Emoji", "font-weight": "bold", "text-decoration-line": "underline", "text-decoration-style": "double" });
        },
        "ajax": {
            "url": "/EntityFee/GetVwPaidEntityFee",
            "type": "POST",         
            "data": { EntityId: entityId }
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
                name: 'datecreated',
                data: "dateCreated",
                title: "Date",
                sortable: true,
                searchable: true
            },
            {
                name: 'name',
                data: 'name',
                title: "Fees for Authorization Activities",
                sortable: false,
                searchable: false
            },
            {
                "class": "text-right",
                name: 'amount',
                data: 'amount',
                title: "Amount in Kshs.",
                sortable: false,
                searchable: false,
                visible: true
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
                name: 'createdby',
                data: 'createdBy',
                title: "CreatedBy",
                sortable: true,
                searchable: true,
                visible: false
            },

            {
                "class": "text-center",
                "width": "6px",
                "title": "Actions",
                "data": { "id": "id", "entityId": "entityId", "paymentstatus": "paymentstatus"},
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    var action = '';
                    if (data.paymentstatus === "Pending")
                        action += '<a href="/EntityFee/_EditEntityFee?id=' + data.id + '" class="editEntityFee"><i class="fas fa-pencil-alt"></i></a>';

                    else if (data.paymentstatus === "Paid")
                        action += ' <a href="/EntityFee/_EditEntityFee?id=' + data.id + '" class="viewEntityFee"><button class="btn btn-success btn-xs"><i class="glyphicon glyphicon-list-alt"></i> View Fees</button></a>';
                    return action;
                }
            }
        ],
        //rowsGroup: [2],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    }); 
    $('#vwpaidentityfee').on("click", ".editEntityFee", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#editEntityFeeContainer').html(data);
            $('#editEntityFeeModal').modal('show');
            $('.selectpicker').selectpicker();
        });
    });
});



