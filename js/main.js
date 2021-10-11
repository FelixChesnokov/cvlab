$(function() {
    $('.header-slider').slick({
        arrows: false,
        vertical: true,
        dots: true,
        dotsClass: 'header-dots',
        autoplay: true,
        autoplaySpeed: 7000,
    });

    $('.menu__btn').on('click', function() {
        $('.menu-list').slideToggle();
    });
});
