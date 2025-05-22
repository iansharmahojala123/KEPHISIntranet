function format_sample(d) {
    return '<div class="slider" style="margin-left:70px">' +
        '<b>Created By:</b > ' + d.createdBy + '<br>' +
        '<b>Date Created:</b > ' + d.dateCreated + '<br>';
}
$(document).ready(function () {
    var inspectorId = $("#InspectorId").val();
    var table = $('#vwpendinginspectorfee').DataTable({
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
            var inspectorFee = api
                .column(4)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            $(api.column(3).footer()).html('Total Inspector Fee(s)').css({ "font-size": "1rem", "font-family": "Segoe UI Emoji", "font-weight": "bold" });
            var amount = Intl.NumberFormat('sw-KE', { style: 'currency', currency: 'Ksh' }).format(inspectorFee);
            $(api.column(4).footer()).html(amount).css({ "font-size": "1rem", "font-family": "Segoe UI Emoji", "font-weight": "bold", "text-decoration-line": "underline", "text-decoration-style": "double" });
        },
        "ajax": {
            "url": "/InspectorFee/GetVwPendingInspectorFee",
            "type": "POST",         
            "data": { InspectorId: inspectorId }
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
                name: 'feeName',
                data: 'feeName',
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
                "data": { "id": "id", "inspectorId": "inspectorId", "paymentstatus": "paymentstatus"},
                "searchable": false,
                "sortable": false,
                "render": function (data, type, full, meta) {
                    var action = '';
                    if (data.paymentstatus === "Pending")
                        action += '<a href="/InspectorFee/_EditInspectorFee?id=' + data.id + '" class="editInspectorFee"><i class="fas fa-pencil-alt"></i></a>';

                    else if (data.paymentstatus === "Paid")
                        action += ' <a href="/InspectorFee/_EditInspectorFee?id=' + data.id + '" class="viewInspectorFee"><button class="btn btn-success btn-xs"><i class="glyphicon glyphicon-list-alt"></i> View Fees</button></a>';
                    return action;
                }
            }
        ],
        //rowsGroup: [2],
        "language": {
            "emptyTable": "No Records found, Please click on <b>Create New</b> button."
        }
    }); 
    $('#vwpendinginspectorfee').on("click", ".editInspectorFee", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        $.get(url, function (data) {
            $('#editInspectorFeeContainer').html(data);
            $('#editInspectorFeeModal').modal('show');
            $('.selectpicker').selectpicker();
        });
    });
});

var editarray = [];
$(function getchargesIds() {
    $('#editInspectorFeeContainer').on('hide.bs.select', "#FeeId", function (e) {
        editarray = $("#FeeId").val();
        console.log($("#FeeId").val());
        var sum = 0; // initialize sum
        var results = [];
        $("#FeeId option:selected").each(function () {
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

$('#editInspectorFeeContainer').on("change", "#CategoryId", function () {
    console.log($("#InspectorAmount").val());
    $('#Amountpayable').val('');
    var type = $("#CategoryId option:selected").text();
    $("#InspectorAmount").keyup(function () {
        $('#Amountpayable').val($('#InspectorAmount').val());
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

var createarray = [];
$(function getchargesIds() {
    $('#createFeeContainer').on('hide.bs.select', "#FeeId", function (e) {
        createarray = $("#FeeId").val();
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

