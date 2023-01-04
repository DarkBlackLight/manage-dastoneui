$(document).on("click", ".go-back", function (e) {
    window.history.back();
    e.preventDefault();
});

$(document).on("click", ".btn-resource", function (e) {
    $('.btn-resource').prop('disabled', true);

    var form = document.querySelector('.form-resource');
    Rails.fire(form, 'submit');
});

$(document).on('ajax:success', '.form-resource', function (e) {
    $('.btn-resource').prop('disabled', false);

    if (e.originalEvent.detail[0].data)
        window.location.replace(e.originalEvent.detail[0].data);
});

$(document).on('ajax:error', '.form-resource', function (e) {
    $('.btn-resource').prop('disabled', false);

    Swal.fire({
        showConfirmButton: false,
        timer: 600,
        icon: 'error',
        title: e.originalEvent.detail[0].data,
    })

});

function initFormComponents() {

    $('.sortable').railsSortable({handle: '.sortable-handle'});

    $('.nested-fields').each(function () {
        if ($(this).next().is('input')) {
            $(this).append($(this).next());
        }
    })

    $(".select2").select2({
        width: '100%'
    });

    $('.datepicker').daterangepicker({
        singleDatePicker: true,
        autoApply: true,
        autoUpdateInput: false,
        showDropdowns: true,
        minYear: 2000,
        locale: {
            format: "YYYY-MM-DD",
            separator: ' ~ ',
            applyLabel: "应用",
            cancelLabel: "取消",
            resetLabel: "重置",
            daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        }
    });

    $('.datepicker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD'));
    });

    $('.datetimepicker').daterangepicker({
        autoApply: true,
        autoUpdateInput: false,
        singleDatePicker: true,
        showDropdowns: true,
        timePicker: true,
        timePicker24Hour: true,
        minYear: 2000,
        locale: {
            format: "YYYY-MM-DD HH:mm:ss",
            separator: ' ~ ',
            applyLabel: "应用",
            cancelLabel: "取消",
            resetLabel: "重置",
            daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        }
    });

    $('.datetimepicker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
    });

}

function initDataTable(ele) {
    var columns = [];
    var columnDefs = [];

    ele.find('th').each(function () {
        columns.push({
            data: $(this).data('name')
        })
        if ($(this).data('name') === 'can') {
            columnDefs.push({
                targets: -1,
                data: 'can',
                render: function (data, type, row, meta) {
                    if (data.update && data.destroy) {
                        return `
<a class="btn btn-info btn-sm" href="${data.show}">查看</a>
<a class="btn btn-warning btn-sm" href="${data.update}">编辑</a>
<a data-confirm="您确定要删除此项记录吗?" class="btn btn-danger btn-sm" rel="nofollow" data-method="delete" href="${data.destroy}">删除</a>`
                    } else if (data.update) {
                        return `
<a class="btn btn-info btn-sm" href="${data.show}">查看</a>
<a class="btn btn-warning btn-sm" href="${data.update}">编辑</a>`;
                    } else if (data.destroy) {
                        return `
<a class="btn btn-info btn-sm" href="${data.show}">查看</a>
<a data-confirm="您确定要删除此项记录吗?" class="btn btn-danger btn-sm" rel="nofollow" data-method="delete" href="${data.destroy}">删除</a>`;
                    } else {
                        return `
<a class="btn btn-info btn-sm" href="${data.show}">查看</a>`;
                    }
                },
            })
        }
    });

    var options = {
        lengthChange: false,
        language: data_table_zh,
        serverSide: true,
        searching: false,
        ordering: false,
        ajax: ele.data('url') + window.location.search,
        columns: columns,
        columnDefs: columnDefs
    };

    if (ele.data('button')) {
        options['dom'] = 'Bfrtip';
        options['buttons'] = ele.data('button').split(',')
    }

    ele.DataTable(options);
}

$(document).on('change', 'input[name="resource_selection"]', function () {
    if ($('input[name="resource_selection"]:checked').length > 0) {
        $('#resources-destroy-all').show();
    } else {
        $('#resources-destroy-all').hide();
    }
});

function destroyAllResources() {
    if (resources_selection_ids.length > 0) {
        let id = resources_selection_ids.shift();
        $.ajax({
            url: window.location.pathname + '/' + String(id),
            method: 'delete',
            data: {
                "authenticity_token": $('meta[name=csrf-token]').attr('content')
            },
            success: function () {
                if (resources_selection_ids.length === 0) {
                    window.location.reload();
                } else {
                    destroyAllResources();
                }
            }
        });
    }
}


$(document).on('click', '#resources-destroy-all', function () {
    if (confirm('确认要删除全部选中数据吗？')) {
        window.resources_selection_ids = [];
        $('input[name="resource_selection"]:checked').each(function () {
            var id = $(this).data('id');
            resources_selection_ids.push(id);
        })
        destroyAllResources();
    }
})

$(document).ready(function () {
    initFormComponents();

    $('.data-table').each(function () {
        initDataTable($(this));
    })

    var body = $('body');
    window.controller_name = body.data('controller-name');
    window.action_name = body.data('action-name');
    window.resource_id = body.data('resource-id');
    window.resources_selection_ids = [];
})