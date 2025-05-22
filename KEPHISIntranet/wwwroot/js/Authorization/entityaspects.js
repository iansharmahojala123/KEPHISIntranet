$('#inspector').on("click", ".view-aspects", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function (data) {
        $('#inspectoraspectsContainer').html(data);
        $('#inspectoraspectsModal').modal('show');
    });
});
$('#inspectoraspectsmodal').on('show.bs.modal', function () {
    var inspectorId = $("#EntityId").val();
    $('#inspectoraspects').dataTable({
        "serverSide": true,
        "proccessing": true,
        "ajax": {
            "url": "/Entity/GetEntityAspects",
            "type": "POST",
            "data": { inspectorId: inspectorId }
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
                name: 'authorizedAspect',
                data: 'authorizedAspect',
                title: "Authorized Aspect",
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
});
