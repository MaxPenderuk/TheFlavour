maps = [];
var $ = jQuery;
jQuery(document).ready(function () {
    var $ = jQuery;
    $('.nav-menu').slicknav();
    logo_align();
    $(".nav-menu ul").addClass('animated hidden');

    var menuItemWidth, submenuItemWidth, mnHeight;

    $(".nav-menu > li").hover(function () {
        var $this = $(this);

        $this.children('ul').prepend('<li class="arrow-dropdown"></li>');
        $this.children('ul').removeClass().addClass('animated');

        // Set Mega Nav Width according to # of Widgets
        if ($this.hasClass('mega-nav')) {
            var ul = $this.children('ul'),
                li = ul.children('li'),
                widthFinal = 60,
                liHeight = 0;

            li.not('.arrow-dropdown').each(function () {
                var width = $(this).outerWidth(),
                    height = $(this).outerHeight();

                if (height > liHeight) {
                    liHeight = height;
                }

                widthFinal = widthFinal + width;
            });
            ul.css('width', widthFinal);
            li.not('.arrow-dropdown').css('height', liHeight);
        }

        menuItemWidth = $this.innerWidth();
        menuItemHeight = $this.innerHeight();
        submenuItemWidth = $this.children("ul").innerWidth();
        $this.children("ul").css('left', (menuItemWidth - submenuItemWidth) / 2);

        if ($(this).find('ul').length) {
            var meganav = $(this).children("ul"),
                thisOffset = parseInt($(this).offset().left, 10),
                thisOffsetTop = parseInt($(this).offset().top, 10),
                mnWidth = meganav.outerWidth(),
                mnHeight = meganav.outerHeight(),
                mnoffset = parseInt(meganav.offset().left, 10),
                screenWidth = $(window).width(),
                screenHeight = $(window).height();

            if (mnoffset + mnWidth > screenWidth) {
                meganav.css('left', -(mnWidth / 2 + mnoffset + mnWidth - screenWidth));
            };


            var menu_offset = $('.nav-menu').offset().top - $(document).scrollTop(),
                menuheight = $('.nav-menu').outerHeight();
            if ((menu_offset + menuheight + mnHeight) > screenHeight) {
                meganav.css('top', -mnHeight + 30);
                meganav.find('.arrow-dropdown').addClass('bottom');
            }
            else {
                meganav.css('top', 'initial');
                meganav.find('.arrow-dropdown').removeClass('bottom');
            }

            if (mnoffset < 0) {
                meganav.css('left', -thisOffset + 5)
                var liOffset = $this.offset().left,
                    liWidth = $this.width();
                $this.find('.arrow-dropdown').css('left', liOffset + liWidth / 2 - 5);

            }
        }

        $this.children('ul').addClass('fadeInDownSmall').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $this.children('ul').removeClass().addClass('animated')
        });

    }, function () {
        $(this).children('ul').addClass('fadeOutUpSmall').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass().addClass('hidden')
        })

        $('.arrow-dropdown').remove();
    })

    //Hover a and border to li
    $('.nav-menu > li > a').hover(
        function () {
            $(this).parent('li').addClass('hover-menu');
        },
        function () {
            $(this).parent('li').removeClass('hover-menu');
        }
    );

    var hei = jQuery('#site-logo').outerHeight();
    jQuery('.nav-menu > li').css({
        'padding-top': (hei + 18) / 2,
        'padding-bottom': (hei + 18) / 2
    });


    if (jQuery(".shortcode-portfolio").length > 0) {
        jQuery("#primary").removeClass("col-sm-10 col-sm-offset-1").addClass("col-sm-12");
    }
    if (jQuery(".mega-nav-widget").length > 0) {
        jQuery(".mega-nav-widget").parent("li").addClass("mega-nav-widget");
    }
    jQuery('li.mega-nav-widget:first-child').addClass('first');

    $('.post-thumbnail').hover(
        function () {
            $('.divider.up').addClass('animated fadeInDown');
            $('.divider.down').addClass('animated fadeInUp');
        },
        function () {
            $('.divider.up').removeClass('animated fadeInDown');
            $('.divider.down').removeClass('animated fadeInUp');
        });

    var default_opts = {
        inline: true,
        firstDay: 0,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        prevText: 'MM yy',
        nextText: 'MM yy',
        navigationAsDateFormat: true
    };

    var datepicker_opts = jQuery.extend(default_opts, tf_calendar.datepicker_opts);

    jQuery('#calendar').datepicker(datepicker_opts);
    $("table.ui-datepicker-calendar td").addClass('ui-datepicker-unselectable');
    $(".ui-datepicker-next").before($('.ui-datepicker-title'));

    var contact_page = jQuery('.contactForm');
    if (contact_page.length > 0) {
        contact_page.parents('.container ').addClass('contact');
    }

    $(".anchor-scroll").click(function () {
        var selected = $(this).attr('href');
        if (jQuery('.nav-main').hasClass('sticky')) {
            // scroll to - sticky menu
            $.scrollTo(selected, 500, { offset: -240 });
        } else {
            $.scrollTo(selected, 500);
        }
        return false;
    });

    $("[data-toggle='tooltip']").tooltip();
    jQuery('.panel-group .panel:first-child').find('.panel-collapse').addClass('in');
    var screenRes = $(window).width(),
        screenHeight = $(window).height(),
        html = $('html');

    //Sticky Menu
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 750) {
            $('.nav-main.sticky').addClass('open')
        } else {
            $('.nav-main.sticky').removeClass('open')
        }
    });

    //Slider Before title line
    var wrap_title_slider = $('.active .slider-title-before').width();
    var width_span_title = $('.active .slider-title-before > span').width();
    var final_width_span = ((wrap_title_slider - width_span_title) / 2);
    $('.title-line.left').width(final_width_span - 22);
    $('.title-line.right').width(final_width_span - 22);

    $('.main-carousel').on('slid.bs.carousel', function () {
        var wrap_title_slider = $('.active .slider-title-before').width();
        var width_span_title = $('.active .slider-title-before > span').width();
        var final_width_span = ((wrap_title_slider - width_span_title) / 2);
        $('.title-line.left').width(final_width_span - 22);
        $('.title-line.right').width(final_width_span - 22);
    });

    // IE<8 Warning
    if (html.hasClass("ie7")) {
        $("body").empty().html('Please, Update your Browser to at least IE8');
    }

    // Body Wrap
    $(".body-wrap").css("min-height", screenHeight);
    $(window).resize(function () {
        screenHeight = $(window).height();
        $(".body-wrap").css("min-height", screenHeight);
    });

    // Remove outline in IE
    $("a, input, textarea").attr("hideFocus", "true").css("outline", "none");

    // buttons
    $('a.btn, span.btn').on('mousedown', function () {
        $(this).addClass('active')
    });
    $('a.btn, span.btn').on('mouseup mouseout', function () {
        $(this).removeClass('active')
    });

    // styled Select, Radio, Checkbox
    if ($("select").hasClass("select_styled")) {
        cuSel({ changedEl: ".select_styled", visRows: 8, scrollArrows: true });
    }
    // for select in CF and RF
    $('.select_row_down').click(function () {
        var select = $(this).siblings('.inputselect'),
            next = select.find('.cuselItem.cuselActive').next().attr('val');
        cuselSetValue(select, next);
    });
    $('.select_row_up').click(function () {
        var select = $(this).siblings('.inputselect'),
            prev = select.find('.cuselItem.cuselActive').prev().attr('val');
        cuselSetValue(select, prev);
    });

    // Menu
    $(".nav-menu ul ul").parent("li").addClass("parent");

    // prettyPhoto lightbox, check if <a> has atrr data-rel and hide for Mobiles
    if ($('a').is('[data-rel]') && screenRes > 600) {
        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
        $("a[rel^='prettyPhoto']").prettyPhoto({ theme: 'dark_square', social_tools: false });
    };

    // Smooth Scroling of ID anchors
    function filterPath(string) {
        return string
            .replace(/^\//, '')
            .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
            .replace(/\/$/, '');
    }
    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');

    $('a[href*=#].anchor').each(function () {
        $(this).click(function (event) {
            var thisPath = filterPath(this.pathname) || locationPath;
            if (locationPath == thisPath
                && (location.hostname == this.hostname || !this.hostname)
                && this.hash.replace(/#/, '')) {
                var $target = $(this.hash), target = this.hash;
                if (target && $target.length != 0) {
                    var targetOffset = $target.offset().top;
                    event.preventDefault();
                    $(scrollElem).animate({ scrollTop: targetOffset }, 400, function () {
                        location.hash = target;
                    });
                }
            }
        });
    });

    // use the first element that is "scrollable"
    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i < argLength; i++) {
            var el = arguments[i],
                $scrollElement = $(el);
            if ($scrollElement.scrollTop() > 0) {
                return el;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop() > 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return el;
                }
            }
        }
        return [];
    };

    // Crop Images in Image Slider

    // adds .naturalWidth() and .naturalHeight() methods to jQuery for retrieving a normalized naturalWidth and naturalHeight.
    (function ($) {
        var
            props = ['Width', 'Height'],
            prop;

        while (prop = props.pop()) {
            (function (natural, prop) {
                $.fn[natural] = (natural in new Image()) ?
                    function () {
                        return this[0][natural];
                    } :
                    function () {
                        var
                            node = this[0],
                            img,
                            value;

                        if (node.tagName.toLowerCase() === 'img') {
                            img = new Image();
                            img.src = node.src,
                                value = img[prop];
                        }
                        return value;
                    };
            }('natural' + prop, prop.toLowerCase()));
        }
    }(jQuery));

    var
        carousels_on_page = $('.carousel-inner').length,
        carouselWidth,
        carouselHeight,
        ratio,
        imgWidth,
        imgHeight,
        imgRatio,
        imgMargin,
        this_image,
        images_in_carousel;

    for (var i = 1; i <= carousels_on_page; i++) {
        $('.carousel-inner').eq(i - 1).addClass('id' + i);
    }

    function imageSize() {
        setTimeout(function () {
            for (var i = 1; i <= carousels_on_page; i++) {
                carouselWidth = $('.carousel-inner.id' + i + ' .item').width();
                carouselHeight = $('.carousel-inner.id' + i + ' .item').height();
                ratio = carouselWidth / carouselHeight;

                images_in_carousel = $('.carousel-inner.id' + i + ' .item img').length;

                for (var j = 1; j <= images_in_carousel; j++) {
                    this_image = $('.carousel-inner.id' + i + ' .item img').eq(j - 1);
                    imgWidth = this_image.naturalWidth();
                    imgHeight = this_image.naturalHeight();
                    imgRatio = imgWidth / imgHeight;

                    if (ratio <= imgRatio) {
                        imgMargin = parseInt((carouselHeight / imgHeight * imgWidth - carouselWidth) / 2, 10);
                        this_image.css("cssText", "height: " + carouselHeight + "px; margin-left:-" + imgMargin + "px;");
                    }
                    else {
                        imgMargin = parseInt((carouselWidth / imgWidth * imgHeight - carouselHeight) / 2, 10);
                        this_image.css("cssText", "width: " + carouselWidth + "px; margin-top:-" + imgMargin + "px;");
                    }
                }
            }
        }, 0);
    }

    $(window).load(function () {
        imageSize();
    });
    $(window).resize(function () {
        $('.carousel-indicators li:first-child').click();
        imageSize();
    });

    if ($('#gallery-list').length > 0) {
        $('#gallery-list').isotope({
            transitionDuration: '0.6s'
        });

        $('#categories').on('click', '.categories-item', function () {
            $('.categories-item').removeClass('active');
            $(this).addClass('active');

            var option = $(this).data('category'),
                search = option ? function () {
                    var $item = $(this),
                        name = $item.data('category') ? $item.data('category') : '';
                    return name.match(new RegExp(option));
                } : '*';

            $('#gallery-list').isotope({ filter: search });
        });

        function catInit() {
            $('#categories').carouFredSel({
                swipe: {
                    onTouch: true
                },
                prev: '#categories-prev',
                next: '#categories-next',
                items: { visible: "variable" },
                auto: {
                    play: true,
                    timeoutDuration: 10000
                },
                scroll: {
                    pauseOnHover: true,
                    items: 1,
                    duration: 1000,
                    easing: 'quadratic'
                }
            })
        }

        catInit();
        $(window).resize(function () {
            catInit();
        })
    }
    /* for archive-portfolio */
    if ($('#categories-filter').length > 0) {
        $('#gallery-list').isotope({
            transitionDuration: '0.6s'
        });

        $('#categories-filter').on('click', '.categories-item', function () {
            $('.categories-item').removeClass('active');
            $(this).addClass('active');
        });

        function catInitPortfolio() {
            $('#categories-filter').carouFredSel({
                swipe: {
                    onTouch: true
                },
                prev: '#categories-filter-prev',
                next: '#categories-filter-next',
                items: { visible: "variable" },
                auto: {
                    play: true,
                    timeoutDuration: 10000
                },
                scroll: {
                    pauseOnHover: true,
                    items: 1,
                    duration: 1000,
                    easing: 'quadratic'
                }
            })
        }

        catInitPortfolio();
        $(window).resize(function () {
            catInitPortfolio();
        })
    }


    if ($('#categories-slider').length > 0) {
        function catInitBlog() {
            $('#categories-slider').carouFredSel({
                swipe: {
                    onTouch: true
                },
                prev: '#categories-prev',
                next: '#categories-next',
                items: { visible: "variable" },
                auto: {
                    play: true,
                    timeoutDuration: 10000
                },
                scroll: {
                    pauseOnHover: true,
                    items: 1,
                    duration: 1000,
                    easing: 'quadratic'
                }
            })
        }

        catInitBlog();
        $(window).resize(function () {
            catInitBlog();
        })
    }

    if ($('.parallax-section').length > 0) {
        $('.parallax-section').parallax("50%", 0.1);
    }

});

//Menu <ul> replace to <select>
function responsive(mainNavigation, mainNavigation2) {
    var screenRes = $('body').width();

    if ($('#site-navigation select').length == 0) {
        /* Replace unordered list with a "select" element to be populated with options, and create a variable to select our new empty option menu */
        $('#site-navigation').append('<select class="select_styled" id="topm-select" style="display:none;"></select>');
        var selectMenu = $('#topm-select');

        function appendToSelect(elem) {

            /* Get top-level link and text */
            var href = $(elem).children('a').attr('href');
            var text = $(elem).children('a').text();

            /* Append this option to our "select" */
            if ($(elem).is(".current-menu-item") && href != '#') {
                $(selectMenu).append('<option value="' + href + '">' + text + '</option>');
            } else if (href == '#') {
                $(selectMenu).append('<option value="' + href + '" disabled="disabled">' + text + '</option>');
            } else {
                $(selectMenu).append('<option value="' + href + '">' + text + '</option>');
            }

            /* Check for "children" and navigate for more options if they exist */
            if ($(elem).children('ul').length > 0) {
                $(elem).children('ul').children('li').not(".mega-nav-widget").each(function () {

                    /* Get child-level link and text */
                    var href2 = $(this).children('a').attr('href');
                    var text2 = $(this).children('a').text();

                    /* Append this option to our "select" */
                    if ($(this).is(".current-menu-item") && href2 != '#') {
                        $(selectMenu).append('<option value="' + href2 + '" selected> - ' + text2 + '</option>');
                    } else if (href2 == '#') {
                        $(selectMenu).append('<option value="' + href2 + '" disabled="disabled">- ' + text2 + '</option>');
                    } else {
                        $(selectMenu).append('<option value="' + href2 + '"> - ' + text2 + '</option>');
                    }

                    /* Check for "children" and navigate for more options if they exist */
                    if ($(this).children('ul').length > 0) {
                        $(this).children('ul').children('li').each(function () {

                            /* Get child-level link and text */
                            var href3 = $(this).children('a').attr('href');
                            var text3 = $(this).children('a').text();

                            /* Append this option to our "select" */
                            if ($(this).is(".current-menu-item")) {
                                $(selectMenu).append('<option value="' + href3 + '" class="select-current" selected>--' + text3 + '</option>');
                            } else {
                                $(selectMenu).append('<option value="' + href3 + '"> --- ' + text3 + '</option>');
                            }

                        })
                    }
                })
            }
        }

        /* Navigate our nav clone for information needed to populate options */
        $(mainNavigation).children('ul').children('li').each(function () {
            appendToSelect($(this))
        });
        $(mainNavigation2).children('ul').children('li').each(function () {
            appendToSelect($(this))
        });

    }
    if (screenRes > 800) {
        $('#site-navigation select:first').hide();
        $('#site-navigation ul:first, #site-navigation2 ul:first').show();
    } else {
        $('#site-navigation ul:first, #site-navigation2 ul:first').hide();
        $('#site-navigation select:first').show();
    }

    /* When our select menu is changed, change the window location to match the value of the selected option. */
    $(selectMenu).change(function () {
        location = this.options[this.selectedIndex].value;
    });
};

// Footer Menu <ul> replace to <select>
function responsive_footer(footerNavigation) {
    var $ = jQuery;
    var screenRes = $('body').width();

    if ($('#site-navigation3 select').length == 0) {
        /* Replace unordered list with a "select" element to be populated with options, and create a variable to select our new empty option menu */
        $('#site-navigation3').append('<select class="select_styled" id="footerm-select" style="display:none;"></select>');
        var footerMenu = $('#footerm-select');

        /* Navigate our nav clone for information needed to populate options */
        $(footerNavigation).children('ul').children('li').each(function () {

            /* Get top-level link and text */
            var href = $(this).children('a').attr('href');
            var text = $(this).children('a').text();

            /* Append this option to our "select" */
            if ($(this).is(".current-menu-item") && href != '#') {
                $(footerMenu).append('<option value="' + href + '" selected>' + text + '</option>');
            } else if (href == '#') {
                $(footerMenu).append('<option value="' + href + '" disabled="disabled">' + text + '</option>');
            } else {
                $(footerMenu).append('<option value="' + href + '">' + text + '</option>');
            }

            /* Check for "children" and navigate for more options if they exist */
            if ($(this).children('ul').length > 0) {
                $(this).children('ul').children('li').not(".mega-nav-widget").each(function () {

                    /* Get child-level link and text */
                    var href2 = $(this).children('a').attr('href');
                    var text2 = $(this).children('a').text();

                    /* Append this option to our "select" */
                    if ($(this).is(".current-menu-item") && href2 != '#') {
                        $(footerMenu).append('<option value="' + href2 + '" selected> - ' + text2 + '</option>');
                    } else if (href2 == '#') {
                        $(footerMenu).append('<option value="' + href2 + '" disabled="disabled"># ' + text2 + '</option>');
                    } else {
                        $(footerMenu).append('<option value="' + href2 + '"> - ' + text2 + '</option>');
                    }

                    /* Check for "children" and navigate for more options if they exist */
                    if ($(this).children('ul').length > 0) {
                        $(this).children('ul').children('li').each(function () {

                            /* Get child-level link and text */
                            var href3 = $(this).children('a').attr('href');
                            var text3 = $(this).children('a').text();

                            /* Append this option to our "select" */
                            if ($(this).is(".current-menu-item")) {
                                $(footerMenu).append('<option value="' + href3 + '" class="select-current" selected>' + text3 + '</option>');
                            } else {
                                $(footerMenu).append('<option value="' + href3 + '"> -- ' + text3 + '</option>');
                            }

                        });
                    }
                });
            }
        });
    }
    if (screenRes > 768) {
        $('#site-navigation3 select:first').hide();
        $('#site-navigation3 ul:first').show();
    } else {
        $('#site-navigation3 ul:first').hide();
        $('#site-navigation3 select:first').show();
    }

    /* When our select menu is changed, change the window location to match the value of the selected option. */
    $(footerMenu).change(function () {
        location = this.options[this.selectedIndex].value;
    });
}

jQuery(document).ready(function () {
    // Remove links outline in IE 7
    $("a").attr("hideFocus", "true").css("outline", "none");

    // reload topmenu on Resize
    var mainNavigation = $('#site-navigation').clone(),
        mainNavigation2 = $('#site-navigation2').clone();
    responsive(mainNavigation, mainNavigation2);

    $(window).resize(function () {
        responsive(mainNavigation, mainNavigation2);
    });

    // reload topmenu on Resize
    var footerNavigation = $('#site-navigation3').clone();
    responsive_footer(footerNavigation);

    $(window).resize(function () {
        responsive_footer(footerNavigation);
    });

    // odd/even
    $("ul.recent_posts > li:odd, ul.popular_posts > li:odd, .table-striped table>tbody>tr:odd, .boxed_list > .boxed_item:odd, .grid_layout .post-item:odd").addClass("odd");
    $(".widget_recent_comments ul > li:even, .widget_recent_entries li:even, .widget_twitter .tweet_item:even, .widget_archive ul > li:even, .widget_categories ul > li:even, .widget_nav_menu ul > li:even, .widget_links ul > li:even, .widget_meta ul > li:even, .widget_pages ul > li:even, .event_list .event_item:even").addClass("even");

    if ($('.nav-main').parents('header').next().hasClass('main-top')) {
        $('.nav-main').css('border-bottom', 'none')
    }
    else {
        $('.nav-main').css('border-bottom', '2px solid #ededed')
    }

    //Scroll To Top
    $('.anchor[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var speed = 2,
            boost = 1,
            offset = 80,
            target = $(this).attr('href'),
            currPos = parseInt($(window).scrollTop(), 10),
            targetPos = target != "#" && $(target).length == 1 ? parseInt($(target).offset().top, 10) - offset : currPos,
            distance = targetPos - currPos,
            boost2 = Math.abs(distance * boost / 1000);
        $("html, body").animate({ scrollTop: targetPos }, parseInt(Math.abs(distance / (speed + boost2)), 10));

    });

    $(window).on('scroll', function () {
        if (parseInt($(window).scrollTop(), 10) > 200) {
            $('#to-top').removeClass('hidden');
        }
        else {
            $('#to-top').addClass('hidden');
        }
    });
});
function logo_align() {
    var screenRes = $('body').width();
    width_logo = jQuery('#site-logo').outerWidth();
    if (screenRes < 380) {
        jQuery('#site-logo').css('margin-left', -(width_logo / 2));
    }
    else {
        jQuery('#site-logo').css('margin-left', 0);
    }
}

jQuery(window).resize(function () {
    logo_align();
});