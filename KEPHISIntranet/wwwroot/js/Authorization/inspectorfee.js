function format_sample(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>';
}
$(document).ready(function () {
    var inspectorId = $("#InspectorId").val();
    var table = $('#inspectorfee').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/InspectorFee/GetInspectorDetails",
            "type": "POST",
            "data": { inspectorId: inspectorId }
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
                name: 'category',
                data: 'category',
                title: "Category",
                sortable: false,
                searchable: false,
                visible: true
            },
            {
                name: 'amount',
                data: 'amount',
                title: "Total Amount",
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
                "data": { "id": "id", "InspectorId": "InspectorId"},
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    return '<a href="/InspectorFee/_EditInspectorFee?id=' + data + '" class="editInspectorFee"><i class="fas fa-pencil-alt"></i></a>&nbsp;&nbsp;&nbsp;<a href="/Employee/_DeactivateEmployee?id=' + data.id + '" class="deactivateEmployee" title="Deactivate"><i class="fas fa-trash-alt" style="color:#dc3545"></i></a>';
                }
            }
        ],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    }); 
});


$('#inspectorfee').on("click", ".editInspectorFee", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#editInspectorFeeContainer').html(data);
        $('#editInspectorFeeModal').modal('show');
        $('.selectpicker').selectpicker();
    });
});

$('#inspectorFee').on("click", ".view-fee", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#editFeeContainer').html(data);
        $('#editFeeModal').modal('show');
    });
});


$('.add-fee').on("click", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    var caturl = "/Category/GetCategoryDropdown";
    $.get(url, function (data) {
        $('#createFeeContainer').html(data);
        $('#createFeeModal').modal('show');
        $('.selectpicker').selectpicker();
        $.getJSON(caturl, {}, function (data) {
            var items = "<option value='0'> Nothing Selected </option>";
            $.each(data, function (i, cat) {
                items += "<option value='" + cat.Value + "'>" + cat.Text + "</option>";
            });
            $("#CategoryId").html(items).selectpicker("refresh");
        });
    });  
});

var array = [];
$(function getchargesIds() {
    $('#createFeeContainer').on('hide.bs.select', "#FeeId", function (e) {
        array = $("#FeeId").val();
        console.log($("#FeeId").val());
        var sum = 0; // initialize sum
        var results = [];
        $("#FeeId option:selected").each(function() {
            var val = $(this).text().split(" ").pop();
            if (val !== '') results.push(val);
        });
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            $("#InspectorAmount").val(sum += parseInt(results[i]));
            }
        console.log(sum);
    });
});


$("#InspectorAmount").keyup(function () {
    $('#Amountpayable').val($('#InspectorAmount').val());
});

$('#createFeeContainer').on("change", "#CategoryId", function () {
    console.log($("#InspectorAmount").val());
    $('#Amountpayable').val('');
    var type = $("#CategoryId option:selected").text();
    $("#InspectorAmount").keyup(function () {
        $('#Amountpayable').val($('#InspectorAmount').val());
        });
});

$("#btnRejectionForm").on("click", function () {
    var url = $(this).data("url");
    $.get(url, function (data) {
        $('#rejectSampleContainer').html(data);
        $('#rejectSampleModal').modal('show');
        $('.selectpicker').selectpicker();
    });
});


$("#createFeeModal").on("click", "#btn-submit-fee", function (e) {
    var form = $('form#add-fee-form');
    var action = $(form).attr('action');
    e.preventDefault();
    $.post(action, $(form).serialize(), function (data) {
        $("#createFeeContainer").html(data);
        console.log($("#FeeId").val(array));
        $(".selectpicker").selectpicker();
    }, 'html');
});



$('#sample-analysis-modal').on('show.bs.modal', function () {
    var InspectorAuthorizationId = $("#InspectorAuthorizationId").val();
    var table = $('#sample-analysis-list-table').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/InspectorAuthorization/GetSampleAnalysis",
            "type": "POST",
            "data": { InspectorAuthorizationId: InspectorAuthorizationId }
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
                name: 'analysis',
                data: 'analysisName',
                title: "Analysis",
                sortable: false,
                searchable: false
            },
            {
                name: 'amount',
                data: 'analysisAmount',
                title: "Amount",
                sortable: false,
                searchable: false
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
    table.on('draw.dt', function () {
        var PageInfo = $('#sample-analysis-list-table').DataTable().page.info();
        table.column(1, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
});

$('#sample-labs-modal').on('show.bs.modal', function () {
    var InspectorAuthorizationId = $("#InspectorAuthorizationId").val();
    var table = $('#sample-labs-list-table').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/InspectorAuthorization/GetSampleLaboratory",
            "type": "POST",
            "data": { InspectorAuthorizationId: InspectorAuthorizationId }
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
                name: 'laboratoryDetails',
                data: 'laboratoryDetails',
                title: "lab Number",
                sortable: false,
                searchable: false
            },
            {
                name: 'laboratory',
                data: 'laboratory',
                title: "laboratory",
                sortable: false,
                searchable: false
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
    table.on('draw.dt', function () {
        var PageInfo = $('#sample-labs-list-table').DataTable().page.info();
        table.column(1, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
});

function format_reports(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Sample Type: </b>' + d.sampleTypeName + '<br>' +
        '<b>Customer: </b>' + d.customerName + '<br>' +
        '<b>Sampled By: </b>' + d.sampledBy + '<br>' +
        '<b>Sampler Name: </b>' + d.employeeName + '<br>' +
        '<b>Evaluation Status: </b>' + d.evaluationStatus + '<br>' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>';
}
$(document).ready(function () {
    var sampleId = $("#SampleId").val();
    var table = $('#analysisreports').DataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/InspectorAuthorization/GetSamplesDetails",
            "type": "POST",
            "data": { SampleId: sampleId }
        },
        columnDefs: [{
            orderable: false,
            className: 'select-checkbox',
            targets: 0
        }],
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        'order': [[6, 'asc']],
        columns: [
            {
                name: null,
                data: null,
                defaultContent: "",
                "width": "4%"
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
                name: 'sampleStatus',
                data: 'sampleStatus',
                title: "Sample Status",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                name: 'evaluationStatus',
                data: 'evaluationStatus',
                title: "Evaluation Status",
                sortable: false,
                searchable: false,
                visible: false
            },
            {
                name: 'sampleTypeName',
                data: 'sampleTypeName',
                title: "Sample Type",
                sortable: false,
                searchable: false,
                visible: true
            },
            {
                name: 'category',
                data: 'categoryName',
                title: "Category",
                sortable: false,
                searchable: false,
                visible: true
            },
            {
                name: 'numberOfSamples',
                data: 'numberOfSamples',
                title: "No. of Samples",
                sortable: false,
                searchable: false,
                visible: true
            },
            {
                name: 'amountPayable',
                data: 'amountPayable',
                title: "Total Amount",
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
                "data": { "id": "id", "lotNumber": "lotNumber", "sampleId": "sampleId", "evaluationStatus": "evaluationStatus", "sampleStatus": "sampleStatus" },
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    //return '<a class="view-analysis" href="/InspectorAuthorization/_ViewSampleAnalysis?id=' + data.id + '&lotNumber=' + data.lotNumber + '"><button class="btn btn-info btn-xs"><i class="fas fa-vials" style="font-size:14px;color:white"></i> Analysis</button> </a>' + ' | '
                    //    + '<a class="view-labs" href="/InspectorAuthorization/_ViewSampleLaboratory?id=' + data.id + '&lotNumber=' + data.lotNumber + '"><button class="btn btn-info btn-xs"><i class="glyphicon glyphicon-list-alt"></i> View Labs</button> </a>'
                    var action = '<a class="view-sample-evaluation" href="/SampleManagement/SampleEvaluation?id=' + data.sampleId + '&readMode=' + true + '"></a>';
                    if (data.sampleStatus === "Pending" && data.evaluationStatus === "Pending")
                        action = '<a class="view-sample-evaluation" href="/SampleManagement/SampleEvaluation?id=' + data.sampleId + '"><button class="btn btn-primary btn-xs"><i class="fas fa-cogs"></i> Evaluate</button> </a>';

                    else if (data.sampleStatus === "Approved" && data.evaluationStatus === "Evaluated")
                        action += ' | ' + '<a target="_blank" class="analysisinfo" href="/ReportManagement/SampleReceiptForm?id=' + data.id + '&sampleId=' + data.sampleId + '"><button class="btn btn-xs btn-success"><i class="fa fa-file-pdf"></i> Print Report </button></a>';

                    else if (data.sampleStatus === "Rejected" && data.evaluationStatus === "Evaluated")
                        action += ' | ' + '<a href="/ReportManagement/SampleRejectionForm?id=' + data.id + '&id=' + data.id + '&sampleId=' + data.sampleId + '"><button class="btn btn-danger btn-xs"><i class="fa fa-file-pdf"></i> Reject&nbsp;&nbsp;&nbsp;&nbsp;</button> </a>';

                    else if (data.sampleStatus === "Pending" && data.evaluationStatus === "Pending")
                        action = '<a class="view-sample-evaluation" href="/InspectorAuthorization/InspectorAuthorization?id=' + data.id + '"><button class="btn btn-primary btn-xs"><i class="fas fa-cogs"></i> Analyse</button> </a>';

                    return action;

                }
            }
        ],
        "language": {
            "emptyTable": "There are no records found to <b>Generate Report</b>."
        }
    });
    table.on('draw.dt', function () {
        var PageInfo = $('#InspectorAuthorization').DataTable().page.info();
        table.column(3, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    // Add event listener for opening and closing details
    $('#InspectorAuthorization tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            $('div.slider', row.child()).slideUp(function () {
                row.child.hide();
                tr.removeClass('shown');
            });
        }
        else {
            // Open this row
            row.child(format_sample(row.data()), 'no-padding').show();
            tr.addClass('shown');

            $('div.slider', row.child()).slideDown();
        }
    });

});