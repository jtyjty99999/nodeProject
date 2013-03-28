/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-25
 * Time: 上午11:53
 * To change this template use File | Settings | File Templates.
 */
function getWheelValue(e) {
    var e = e || window.event;
    var data = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail % 3 == 0 ? e.detail : e.detail / 3);
    return data
}
var already = 0;
var height = $(window).height();
function change(e) {
    var step = parseInt(getWheelValue(e));
    already -= step;
    if (already < 0) {
        already = 0;
    } else if (already > 8) {
        already = 8;
    }
    render(already);
}
function render(already) {
    var whole = already * height;
    setTimeout(function () {
        $(window).scrollTop(whole);
    }, 0)
}
function addHandler(oElement, sEvent, fnHandler) {
    oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : (oElement["_" + sEvent + fnHandler] = fnHandler, oElement[sEvent + fnHandler] = function () {
        oElement["_" + sEvent + fnHandler]()
    }, oElement.attachEvent("on" + sEvent, oElement[sEvent + fnHandler]))
}
$(function () {
    setInterval(function () {
        already = parseInt(($(window).scrollTop()) / height);
    }, 300)
    $('section').css('height', height);
    addHandler(document, "mousewheel", change);
    addHandler(document, "DOMMouseScroll", change);
    $(document).on('resize', function () {
        $('section').css('height', height);
    })
})