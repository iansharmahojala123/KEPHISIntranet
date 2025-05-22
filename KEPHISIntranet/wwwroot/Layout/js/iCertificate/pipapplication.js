$(document).ready(function () {
    //var kpO_ID = $("#KPO_ID").val();
    var table =  $('#applications').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/ImportApplication/GetPipApplication",
            "type": "POST"
            //"data": { kpO_ID: kpO_ID }
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
                "title": "Date",
                "data": "date",
                "format": "dd/mm/yyyy",
                "searchable": true,
                "sortable": false,
                render: function (data) {
                    return moment(data).format('DD-MMM-YYYY');
                }
            },
            {
                name: 'number',
                data: "number",
                title: "Number",
                sortable: true,
                searchable: true
            },
            {
                name: 'clientName',
                data: "clientName",
                title: "Client",
                sortable: true,
                searchable: true
            },
            {
                name: 'commodityTypeName',
                data: "commodityTypeName",
                title: "Type",
                sortable: true,
                searchable: true
            },
            {
                name: 'commodityFormName',
                data: "commodityFormName",
                title: "Form",
                sortable: true,
                searchable: true
            },
            {
                name: 'origin',
                data: "origin",
                title: "Origin",
                sortable: true,
                searchable: true
            },          
            {
                name: 'quantity',
                data: "quantity",
                title: "Quantity",
                sortable: true,
                searchable: true
            },
            {
                name: 'unitName',
                data: "unitName",
                title: "Unit",
                sortable: true,
                searchable: true
            },
            {
                "title": "",
                "data": "id",
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a href="/ImportApplication/PIPDetails?id=' + data + '"><i class="mdi mdi-eye"></i></a>';
                }
            }
        ]
    });
    
});
