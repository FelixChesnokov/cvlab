$(function() {
    $('.header-slider').slick({
        arrows: false,
        vertical: true,
        dots: true,
        dotsClass: 'header-dots',
        // autoplay: 10000
    });

    $('.menu__btn').on('click', function() {
        $('.menu-list').slideToggle();
    });
});
