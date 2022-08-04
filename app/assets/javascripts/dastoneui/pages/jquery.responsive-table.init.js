/**
 * Theme: Dastone - Responsive Bootstrap 5 Admin Dashboard
 * Author: Mannatthemes
 * Responsive-table Js
 */


$(function () {
    let table_th = $('.table-responsive #tech-companies thead th')
    table_th.slice(1, table_th.length - 1).attr('data-priority', 1)

    $('.table-responsive').responsiveTable({
        addDisplayAllBtn: 'btn btn-secondary',
        i18n: {
            focus: '重点',
            display: '显示',
            displayAll: '显示全部'
        }
    });
});