$(document).ready(function () {
    var url = "/KephisOffice/GetOfficeDropdown";
    $.getJSON(url, {}, function (data) {
        var items = "<option value='0'> Nothing Selected </option>";
        $.each(data, function (i, lab) {
            items += "<option value='" + lab.Value + "'>" + lab.Text + "</option>"
        });
        $('#KPO_ID').html(items).selectpicker("refresh");
        $('#generatedcertsreport').hide();
    });
});


$("#KPO_ID").change(function () {
    $('#generatedcertsreport').hide();
    var kpoId = $("#KPO_ID").val();
});
$("#From").change(function () {
    $('#generatedcertsreport').hide();
    var from = $("#From").val();
});

$("#To").change(function () {
    var from = $("#From").val();
    var kpoId = $("#KPO_ID").val();
    var to = $("#To").val();
    $('#generatedcertsreport').show();
    getCertsDataTable(kpoId, from, to);
});

function getCertsDataTable(kpoId, from, to) {
    var table = $('#generatedCerts').DataTable({
        "serverSide": true,
        "bFilter": false,
        "bLengthChange": false,
        "dom": "lfrti",
        "proccessing": true,
        'iDisplayLength': 10000,
        buttons: [
            {
                extend: 'excel',
                text: 'Export to Excel',
                exportOptions: {
                    modifier: {
                        page: 'All',
                        selected: null
                    }
                }
            }
        ],
        "destroy": true,
        "ajax": {
            "url": "/Report/GetInspectionCertificates",
            "type": "POST",
            "data": { kpoId: kpoId,from:from, to:to }
        },
        columns: [
            {
                name: 'id',
                data: 'id',
                title: "NO",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                name: 'kephisOfficeName',
                data: "kephisOfficeName",
                title: "Office",
                sortable: true,
                searchable: true,
                visible:false
            },
            {
                "title": "Inspection Date",
                "data": "inspectionDate",
                "format": "dd/mm/yyyy",
                "searchable": true,
                "sortable": false,
                render: function (data) {
                    return moment(data).format('DD-MMM-YYYY');
                }
            },
            {
                name: 'clientName',
                data: "clientName",
                title: "Importer",
                sortable: true,
                searchable: true
            },
            {
                name: 'exporter',
                data: "exporter",
                title: "Exporter",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'commodityTypeName',
                data: "commodityTypeName",
                title: "Commodity",
                sortable: true,
                searchable: true
            },
            {
                name: 'origin',
                data: "origin",
                title: "Country Of Origin",
                sortable: true,
                searchable: true
            },
            {
                name: 'quantityUnit',
                data: "quantityUnit",
                title: "Quantity",
                sortable: true,
                searchable: true
            },
            {
                name: 'number',
                data: "number",
                title: "Number",
                sortable: true,
                searchable: true
            },
            {
                name: 'phytoCertNo',
                data: "phytoCertNo",
                title: "Phyto Cert No.",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'vehicleRegistrationNo',
                data: "vehicleRegistrationNo",
                title: "Truck No.",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'destination',
                data: "destination",
                title: "Destination",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'employeeName',
                data: "employeeName",
                title: "Inspector",
                sortable: true,
                searchable: true,
                visible: false
            },
            {
                name: 'remarks',
                data: "remarks",
                title: "Remarks",
                sortable: true,
                searchable: true,
                visible: false
            }
        ],
        "language": {
            "emptyTable": "No Records found to view Report."
        }
    });
}

