function format_pay(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Name: </b>' + d.fileName + '<br>' +
        '<b>Status: </b>' + d.status + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>';
}
$(document).ready(function () {
    var table = $('#allpaidentitylist').DataTable({
        "serverSide": true,
        "proccessing": true,
        "dom": 'rt',
        "ajax": {
            "url": "/EntityPaymentFile/GetAllPaidEntities",
            "type": "POST"
        },
        //},
        'columnDefs': [
            {
                'targets': 0,
                "width": "4%",
                'checkboxes': {
                    'selectRow': true
                }
            }
        ],
        'select': {
            'style': 'multi'
        },
        'order': [[1, 'asc']],
        columns: [
            //{
            //    "class": "text-center",
            //    "width": "4px",
            //    name: 'id',
            //    data: 'id',
            //    title: "#",
            //    sortable: false,
            //    searchable: false,
            //    render: function (data, type, row, meta) {
            //        return meta.row + meta.settings._iDisplayStart + 1;
            //    }
            //},
            {
                name: 'id',
                data: 'id',
                title: "Id",
                sortable: false,
                searchable: false,
                visible: true
            },
            {
                "name": 'receiptNumber',
                "data": { "receiptNumber": "receiptNumber", "invoiceNumber": "invoiceNumber" },
                "title": "Invoice/Receipt No.",
                sortable: true,
                searchable: true,
                "render": function (data, type, full, meta) {
                    if (data.receiptNumber === null) {
                        return data.invoiceNumber;
                    }
                    else if (data.invoiceNumber === null) {
                        return data.receiptNumber;
                    }
                }
            },
            {
                name: 'amount',
                data: "amount",
                title: "Amount",
                sortable: true,
                searchable: true,
                visible: true,
                render: $.fn.dataTable.render.number(',', '.', 2, 'Ksh.')
            },
            {
                name: 'dateCreated',
                data: "dateCreated",
                title: "Payment Date",
                sortable: true,
                searchable: true,
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
                "title": "Action",
                "data": { "id": "id", "entitypaymentId": "entitypaymentId" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a href="/EntityPaymentFile/DownloadEntityPaymentFile?id=' + data.id + '&entityPaymentId=' + data.entityPaymentId + '" class="download" data-toggle="tooltip" title="View"><i class="mdi mdi-cloud-download success" style="font-size:16px;color:#006019"></i> Download</a> <a href="/EntityPaymentFile/ConfirmPayment?id=' + data.id + '" class="printCert" data-toggle="tooltip" title="Print Cert"><i class="mdi mdi-printer" style="color:#595959;font-size:17px"></i></a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records to Download, Please ensure <b>Sample Payment</b> is done."
        }
    });
});