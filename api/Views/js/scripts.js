/***** FUNTIONS *****/

// Set the date we're counting down to
var countDownDate = new Date("April 12, 2019 0:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    $("#countdown .days").html(days);
    $("#countdown .hours").html(hours);
    $("#countdown .minutes").html(minutes);
    $("#countdown .seconds").html(seconds);

    /*document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";*/

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}, 1000);

//change main menu on scroll
function changeMainMenu(scrollMovement) {
    if (scrollMovement.scrollTop() > 0) {
        $("#main-menu").addClass("changed");
    } else {
        $("#main-menu").removeClass("changed");
    }
}

// cookies code
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// se o cookie ja existir
/*
var cookie = getCookie('ppkcookie');
if (cookie) {
    document.getElementById("apresentation").classList.add("animated");
} else {
    // add cookie
    setCookie('ppkcookie', 'animatedLogo', 3);
    setTimeout(function () {
        document.getElementById("apresentation").classList.add("animated");
    }, 1100);
}
*/
// end cookies code

//  functionalitys of calendar
function calendarFunctionality() {
    var dayButtons = document.getElementById("event-days-list");
    var daySelected = null;
    var contentVisible = null;
    
    if (dayButtons) {
        dayButtons.querySelectorAll("button").forEach(function (button) {
            button.addEventListener("click", function () {
                daySelected = this.getAttribute("data-eventday");
                contentVisible = document.getElementById("content-container").querySelector(".content[data-eventContent='" + daySelected + "']");
                //  actions on links
                document.getElementById("event-days-list").querySelector(".selected").classList.remove("selected");
                this.classList.add("selected");
                //  actions on content
                document.getElementById("content-container").querySelector(".visible").classList.remove("visible");
                contentVisible.classList.add("visible");
            });
        })
    }

}

$(document).ready(function () {

    calendarFunctionality();

    // inicial animation
    setTimeout(function () {
        if (document.querySelector(".main-landing")) {
            document.getElementById("apresentation").classList.add("animated");
        }
    }, 1200);

    //  main menu anchors
    $("#main-menu ul li a").click(function () {
        var hrefMenuClicked = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(hrefMenuClicked).offset().top
        }, 500, function () {
            //  close submenu mobile after click
            if ($("#open-menu-mobile").css("display") == ("block")) {
                $("#main-menu ul").slideUp(150, function () {
                    $("#main-menu ul").removeAttr("style");
                });
                $("#main-menu ul").removeClass("open");
            }
        });
        return false
    });

    //  open/close faqs
    $("#accordion .toggle").click(function () {
        var clicked = $(this).parent();

        if (clicked.hasClass("open")) {
            //  close "this" faq
            clicked.removeClass("open");
            clicked.find(".content-accordion").slideUp(200);
        } else {
            //  close all
            $("#accordion li").removeClass("open");
            $("#accordion li .content-accordion").slideUp(200);
            //  open faq
            clicked.addClass("open");
            clicked.find(".content-accordion").slideDown(200);
        }
        return false;
    });

    //  open/close submenu mobile
    $("#open-menu-mobile").click(function () {
        var submenu = $("#main-menu ul");

        if (submenu.hasClass("open")) {
            submenu.slideUp(150, function () {
                submenu.removeAttr("style");
            });
            submenu.removeClass("open");
        } else {
            submenu.slideDown(150);
            submenu.addClass("open");
        }
        return false;
    });

    $("#group-number").change(function () {
        $("#tab-links .tab-label").slice(0, $(this).val()).addClass("visible");
        $("#tab-links .tab-label").slice($(this).val(), 10).removeClass("visible");
    });

    //tabs system
    $("#tab-links .tab-label > a").on("click", function () {
        var currentAttrValue = $(this).attr('href');

        //  add/remove class "tab-label"
        $(this).parent().addClass("active").siblings().removeClass("active");

        //  add/remove class "tab"
        $("#tab-container " + currentAttrValue).addClass("visible").siblings().removeClass("visible");

        return false;
    });

});

$(window).resize(function () {

});

$(window).scroll(function () {
    var scroll = $(this);

    changeMainMenu(scroll);

});