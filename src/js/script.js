$(document).ready(function () {
    $('.phone-number').inputmask('+7 (999) 999-99-99');
    // $('#date').inputmask('dd.mm.yyyy'); пример для даты

    $('.carousel__inner').slick({
        infinite: true,
        speed: 600,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<i type="button" class="slick-prev fas fa-chevron-left"></i>',
        nextArrow: '<i type="button" class="slick-next fas fa-chevron-right"></i>',
        responsive: [
            {
                breakpoint: 850,
                settings: {
                    dots: true,
                    arrows: false,
                },
            },
        ],
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active')
            .siblings()
            .removeClass('catalog__tab_active')
            .closest('div.container')
            .find('div.catalog__content')
            .removeClass('catalog__content_active')
            .eq($(this).index())
            .addClass('catalog__content_active');
    });

    // $('.catalog-item__link').each(function (i) {
    //     $(this).on('click', function (e) {
    //         e.preventDefault();
    //         $('.catalog-item__face').eq(i).toggleClass('catalog-item__face_active');
    //         $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
    //     });
    // });

    // $('.catalog-item__backlink').each(function (i) {
    //     $(this).on('click', function (e) {
    //         e.preventDefault();
    //         $('.catalog-item__face').eq(i).toggleClass('catalog-item__face_active');
    //         $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
    //     });
    // });
    // То же самое, только оптимизировано:

    function toggleSlide(itemLink) {
        $(itemLink).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__face').eq(i).toggleClass('catalog-item__face_active');
                $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__backlink');

    //Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('0.3s');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    });
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__subtitle').text($('.catalog-item__title').eq(i).text());
            $('.overlay, #order').fadeIn('0.3s');
        });
    });
    // $('.form_left').validate({
    //     rules: {
    //         name: 'required',
    //         phone: 'required',
    //         email: {
    //             required: true,
    //             email: true,
    //         },
    //     },
    //     messages: {
    //         name: 'Пожалуйста введите имя',
    //         phone: 'Пожалуйста введите номер телефона',
    //         email: {
    //             required: 'Введите E-mail, для связи с вами',
    //             email: 'Неверный формат E-mail адреса',
    //         },
    //     },
    // });
    // $('#order form').validate({
    //     rules: {
    //         name: 'required',
    //         phone: 'required',
    //         email: {
    //             required: true,
    //             email: true,
    //         },
    //     },
    //     messages: {
    //         name: 'Пожалуйста введите имя',
    //         phone: 'Пожалуйста введите номер телефона',
    //         email: {
    //             required: 'Введите E-mail, для связи с вами',
    //             email: 'Неверный формат E-mail адреса',
    //         },
    //     },
    // });
    // $('#consultation form').validate({
    //     rules: {
    //         name: 'required',
    //         phone: 'required',
    //         email: {
    //             required: true,
    //             email: true,
    //         },
    //     },
    //     messages: {
    //         name: 'Пожалуйста введите имя',
    //         phone: 'Пожалуйста введите номер телефона',
    //         email: {
    //             required: 'Введите E-mail, для связи с вами',
    //             email: 'Неверный формат E-mail адреса',
    //         },
    //     },
    // });
    // То же самое, только оптимизировано:

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                name: 'Пожалуйста введите имя',
                phone: 'Пожалуйста введите номер телефона',
                email: {
                    required: 'Введите E-mail, для связи с вами',
                    email: 'Неверный формат E-mail адреса',
                },
            },
        });
    }
    validateForms('.form_left');
    validateForms('#consultation form');
    validateForms('#order form');

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize(),
        }).done(function () {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut('fast');
            $('.overlay, #thanks').fadeIn('fast');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and page up

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('.pageup').fadeIn('fast');
        } else {
            $('.pageup').fadeOut('fast');
        }
    });
});
