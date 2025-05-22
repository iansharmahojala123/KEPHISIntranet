$(document).ready(function () {
    $('#PaymentFileUploaded').change(function () {
        if (this.checked) {
            $("#payment-div").show();
        }
        else {
            $("#payment-div").hide();
        }
    });
});

$('#paymentmode').change(function () {
    var mode = $("#paymentmode option:selected").text();
    var modeid = $('#paymentmode').val();
    $("#PaymentMode").val(modeid);

    if (mode === 'Cash') {
        $("#invoice-div").hide();
        $("#receipt-div").show();
        $("#payment-div").show();
    }
    else if (mode === 'MPESA') {
        $("#invoice-div").hide();
        $("#receipt-div").show();
        $("#payment-div").show();
    }
    else if (mode === 'Invoice')
    {
        $("#receipt-div").hide();
        $("#invoice-div").show();
        $("#payment-div").show();
    }
});

function format_sample(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>';
}
$(document).ready(function () {
    var table = $('#entitypaymentlist').DataTable({
        "serverSide": true,
        "proccessing": true,
        "iDisplayLength": 100,
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
                .column(6)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            $(api.column(6).footer()).html('Grand Total Pending Entity Fee(s)').css({ "font-size": "1rem", "font-family": "Segoe UI Emoji", "font-weight": "bold" });
            var feeAmount = Intl.NumberFormat('sw-KE', { style: 'currency', currency: 'Ksh' }).format(entityFee);
            $(api.column(6).footer()).html(feeAmount).css({ "font-size": "1rem", "font-family": "Segoe UI Emoji", "font-weight": "bold", "text-decoration-line": "underline", "text-decoration-style": "double" });
        },
        "ajax": {
            "url": "/EntityPayment/GetEntityFeeforPayment",
            "type": "POST"
        },
        order: [[3, 'asc'], [2, 'asc']],
        rowGroup: {
                        endRender: function (rows, group) {
                // converting to interger to find total
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\Ksh,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };
                var avg = rows
                    .data()
                    .pluck("feeAmount")
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                return $('<tr/>')
                    .append('<td></td>' + '<td style="font-weight:500"> Total Entity Fee(s) - ' + group + '</td>' + '<td colspan="3" style="text-decoration-line:underline; text-decoration-style:double; font-weight:500">' + $.fn.dataTable.render.number(',', '.', 2, 'Ksh.').display(avg) + '</td>');
            },
            dataSrc: ["entityName", "invoice"]
        },
        columnDefs: [{
            targets: [3, 2],
            visible: false
        }],
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
                name: 'entityName',
                data: 'entityName',
                title: "Entity",
                sortable: false,
                searchable: false,
                visible: false
            }, 
            {
                name: 'invoice',
                data: 'invoice',
                title: "Invoice",
                sortable: false,
                searchable: false,
                visible: false
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
                name: 'feeName',
                data: 'feeName',
                title: "Fee",
                sortable: false,
                searchable: false,
                visible: true
            },        
            {
                name: 'feeAmount',
                data: 'feeAmount',
                title: "Total Amount",
                sortable: false,
                searchable: false,
                visible: true,
                render: $.fn.dataTable.render.number(',', '.', 2, 'Ksh.')
            },
            {
                name: 'paymentStatus',
                data: "paymentStatus",
                title: "Status",
                sortable: true,
                searchable: true
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
                name: 'entityId',
                data: 'entityId',
                title: "entityId",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                "title": "Actions",
                "width": "3px",
                "data": { "id": "id", "entityId": "entityId", "paymentId": "paymentId", "paymentStatus": "paymentStatus", "paymentFileUploaded": "paymentFileUploaded"},
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    var action = '';

                    if (data.paymentStatus === "Paid" && data.paymentFileUploaded === true)
                        action = '<a href="/EntityPayment/EntityPaymentDetails?entityFeeId=' + data.entityFeeId + '"><button class="btn btn-info btn-xs"><i class="far fa-money-bill-alt"></i> View</button></a>';

                    else if (data.paymentStatus === "Pending")
                        action += ' <a href="/EntityPayment/EntityPayment?entityFeeId=' + data.entityFeeId + '"><i class="mdi mdi-cart" style="font-size:16px"></i></a>';
                            //+ ' |  ' + '<a class="view-fees" href = "/Payment/_ViewEntityFee?entityFeeId=' + data.entityFeeId + '" > <button class="btn btn-success btn-xs"><i class="glyphicon glyphicon-list-alt"></i> View Fees</button> </a >';
                    return action;
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });
});


function format_payment(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>';
}
$(document).ready(function () {
    var table = $('#entitypayments').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/EntityPayment/GetEntityPayments",
            "type": "POST"
        },
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        'order': [[6, 'asc']],
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
                "class": "details-control",
                "width": "4%",
                orderable: false,
                "defaultContent": ""
            },
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
                name: 'enitytName',
                data: 'enitytName',
                title: "Entity",
                sortable: false,
                searchable: false,
                visible: true
            },
            {
                name: 'amount',
                data: 'amount',
                title: "Amount",
                sortable: false,
                searchable: false,
                visible: true
            },
            {
                name: 'sampleStatus',
                data: 'sampleStatus',
                title: "Sample Status",
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
                name: 'datecreated',
                data: "dateCreated",
                title: "DateCreated",
                sortable: true,
                searchable: true,
                visible: true
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
                "data": { "id": "id", "sampleId": "sampleId", "paymentId": "paymentId", "sampleStatus": "sampleStatus", "evaluationStatus": "evaluationStatus", "paymentFileUploaded": "paymentFileUploaded" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    var action = '<a href="/Payment/PaymentDetails?id=' + data.id + '"><button class="btn btn-info btn-xs"><i class="far fa-money-bill-alt"></i> View</button></a>';

                    if (data.sampleStatus === "Approved" && data.paymentFileUploaded === true)
                        action = '<a href="/Payment/PaymentDetails?id=' + data.id + '"><button class="btn btn-info btn-xs"><i class="far fa-money-bill-alt"></i> View</button></a>';

                    else if (data.sampleStatus === "Approved" && data.paymentFileUploaded === false)
                        action += ' <a href="/Payment/Payment?id=' + data.id + '"><button class="btn btn-info btn-xs"><i class="far fa-money-bill-alt"></i> Pay</button></a>';
                    return action;
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });
});

$('#paymentenitytlist').on("click", ".view-fees", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#feeContainer').html(data);
        $('#feeModal').modal('show');
    });
});

$('#feeModal').on('show.bs.modal', function () {
    var entityFeeId = $("#EntityFeeId").val();
    var table = $('#pendingentityfee').DataTable({
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

            $(api.column(2).footer()).html('Total Entity Fee(s)').css({ "font-size": "1rem", "font-family": "Segoe UI Emoji", "font-weight": "bold" });
            var feeAmount = Intl.NumberFormat('sw-KE', { style: 'currency', currency: 'Ksh' }).format(entityFee);
            $(api.column(4).footer()).html(feeAmount).css({ "font-size": "1rem", "font-family": "Segoe UI Emoji", "font-weight": "bold", "text-decoration-line": "underline", "text-decoration-style": "double" });
        },
        "ajax": {
            "url": "/EntityFee/GetEntityFeeDetails",
            "type": "POST",
            "data": { EntityFeeId: entityFeeId }
        },
        "columnDefs": [
            { "visible": true, "targets": 2 }
        ],
        "order": [[2, 'asc']],
        "orderFixed": [2, 'asc'],
        "displayLength": 10,
        "drawCallback": function (settings) {
            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.rows({ page: 'current' }).data().each(function (data, i) {
                var group = data[2];
                var groupLink = '<a href="#">' + $('<div>').text(group).html() + '</a>';

                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="group"><td colspan="5">' + groupLink + '</td></tr>'
                    );
                    last = group;
                }
            });
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
                name: 'dateCreated',
                data: "dateCreated",
                title: "DateCreated",
                sortable: true,
                searchable: true,
                visible: true
            },
            {
                name: 'feeName',
                data: 'feeName',
                title: "Fee",
                sortable: false,
                searchable: false,
                visible: true
            },
            {
                name: 'feeAmount',
                data: 'feeAmount',
                title: "Fee Amount",
                sortable: false,
                searchable: false
            },
            {
                name: 'paymentStatus',
                data: "paymentStatus",
                title: "Status",
                sortable: true,
                searchable: true
            },
            
            {
                name: 'createdby',
                data: 'createdBy',
                title: "CreatedBy",
                sortable: true,
                searchable: true,
                visible:false
            },

            {
                "title": "Actions",
                "data": { "id": "id", "entityId": "entityId" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a href="/EntityFee/_EditEntityFee?id=' + data + '" class="editEntityFee"><i class="fas fa-pencil-alt"></i></a>&nbsp;&nbsp;&nbsp;<a href="/Employee/_DeactivateEmployee?id=' + data.id + '" class="deactivateEmployee" title="Deactivate"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    });
    $('#vwpendingentityfee').on("click", ".editEntityFee", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#editEntityFeeContainer').html(data);
            $('#editEntityFeeModal').modal('show');
            $('.selectpicker').selectpicker();
        });
    });
});