/**
 * Theme: Dastone - Responsive Bootstrap 5 Admin Dashboard
 * Author: Mannatthemes
 * Sweet Alert Js
 */


!function ($) {
    "use strict";

    var SweetAlert = function () {
    };

    //examples
    //examples
    SweetAlert.prototype.init = function () {
        //Basic
        $('#sa-basic').on('click', function () {
            Swal.fire('Any fool can use a computer')
        });
        //Auto Close
        $('#sa-auto-close').click(function () {
            var timerInterval
            Swal.fire({
                title: 'Auto close alert!',
                html: 'I will close in <strong></strong> seconds.',
                timer: 2000,
                onBeforeOpen: function () {
                    Swal.showLoading()
                    timerInterval = setInterval(function () {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 100)
                },
                onClose: function () {
                    clearInterval(timerInterval)
                }
            }).then(function (result) {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
            })
        });

    },
        //init
        $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.SweetAlert.init()
    }(window.jQuery);

$(function () {


})