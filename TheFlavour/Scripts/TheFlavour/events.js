jQuery(document).ready(function ($) {

    function animateEvent() {
        var getOtherDirection = function (currentDirection) {
            return currentDirection === 'up' ? 'down' : 'up';
        }

        $('.down, .up').click(function () {
            var $this = jQuery(this),
                direction = $this.attr('class'),
                otherDirection = getOtherDirection(direction),
                $otherDirectionSpan = $this.siblings('.' + otherDirection);

            if ($this.data('offset') === undefined) {
                $this.data('offset', 0);
            }

            var $wrap = $this.closest('.scroll').siblings('.ev_wrap'),
                wrapHeight = $wrap.height(),
                $event = $wrap.find('.inner'),
                length = $this.data('offset'),
                height = $event.height(),
                rest = height % wrapHeight,
                item = parseInt(height / wrapHeight),
                unit;

            if (rest > 0) {
                item = item + 1;
            }

            item = item - 1;

            if (direction === 'down') {
                length += wrapHeight;
                $this.siblings('span.up').removeClass('disable');
                if (length >= wrapHeight * item) {
                    $this.addClass('disable');
                }
            } else {
                length -= wrapHeight;
                $this.siblings('span.down').removeClass('disable');
                if (length == 0) {
                    $this.addClass('disable');
                }
            }

            $this.data('offset', length);
            $otherDirectionSpan.data('offset', length);

            if (direction && wrapHeight !== 0) {
                unit = (direction === 'down') ? '-=' : '+=';
            }
            $event.animate({ 'margin-top': unit ? (unit + wrapHeight) : wrapHeight });
        });
    }
    var makeTwoDigit = function (n) {
        return n.toString().length > 1
            ? n
            : '0' + n;
    }
    function changeDayText() {

        setTimeout(function () {
            $('table.ui-datepicker-calendar td').addClass('ui-datepicker-unselectable');
            $(".ui-datepicker-next").before($('.ui-datepicker-title'));
            var $table = $('.ui-datepicker-calendar tbody');

            //     set attribute data-month, data-year for other month "td"
            var attr_month = $table.find('td[data-month]').attr('data-month');
            var attr_year = $table.find('td[data-year]').attr('data-year');

            attr_month = parseInt(attr_month);

            $table.find('td[data-month]').first().prevAll().attr('data-month', attr_month - 1).attr('data-year', attr_year);
            $table.find('td[data-month]').last().nextAll().attr('data-month', attr_month + 1).attr('data-year', attr_year);


            $table.find('.event').each(function () {

                var $this = $(this),
                    newday,
                    year,
                    month,
                    day,
                    i,
                    length;

                year = $this.attr('data-year');

                month = makeTwoDigit(
                    parseInt($this.attr('data-month')) + 1
                );

                day = makeTwoDigit(
                    $this.hasClass('ui-state-disabled')
                        ? $this.children('.ui-state-default').text()
                        : $this.children('a').text()
                );

                var key = year + '-' + month + '-' + day;

                if (allEvents[key] !== undefined) {
                    for (i = 0, length = allEvents[key].length; i < length; i++) {
                        for (var val in allEvents[key][i]) {
                            var all = allEvents[key][i][val];
                            var index = all.indexOf(",");
                            var link = all.substring(0, index);
                            var title = all.substring(index + 1, all.length);
                            newday = $this.html() + "<a href='" + link + "' class='new_ev'>" + title + ' ' + "(" + val + ")" + "</a>" + "  ";
                            $this.html(newday);
                        }
                    }
                }
            });

            //    add up - down buttons, for those td who has many events
            $('tbody td').each(function () {
                var $this = $(this).children('.new_ev');
                $this.wrapAll('<div class="inner" />');
                $this.closest('.inner').wrap('<div class="ev_wrap" />');

                var height = 0;
                $this.each(function () {
                    height += $(this).height();
                });

                if (height > $('.ev_wrap').height()) {
                    $this.closest('td').append("<span class='down'>" + tf_calendar.up_button + "</span>");
                    $this.closest('td').append("<span class='up disable'>" + tf_calendar.down_button + "</span>");
                }
                $this.closest('td').find('.down, .up').wrapAll('<div class="scroll" />');

            });

            //    move up, move down events
            animateEvent();
            $('.new_ev').click(function () { window.location.href = $(this).attr('href'); });

        }, 5);
    }
    var id = jQuery('input[name="current_event"]').attr("value");
    var lang = '';
    if (typeof tf_qtrans_lang !== 'undefined')
        lang = '&lang=' + tf_qtrans_lang.lang;

    var x_data = "action=tfuse_archive_events&id=" + id + lang;
    jQuery.ajax({
        type: "POST",
        url: tf_script.ajaxurl,
        data: x_data,
        beforeSend: function () {

        },
        success: function (rsp) {
            //console.log(rsp);
            var obj = jQuery.parseJSON(rsp);
            if (obj != null) {
                allEvents = obj.date;
                //console.log(allEvents);
                var default_opts = {
                    inline: true,
                    firstDay: 0,
                    showOtherMonths: true,
                    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    prevText: 'MM yy',
                    nextText: 'MM yy',
                    navigationAsDateFormat: true,
                    onChangeMonthYear: changeDayText,
                    beforeShowDay: function (date) {
                        var result = [true, '', ''];
                        var humanDate = new Date(date),
                            year,
                            month,
                            day;

                        year = humanDate.getFullYear();
                        month = makeTwoDigit(parseInt(humanDate.getMonth()) + 1);
                        day = makeTwoDigit(humanDate.getDate());
                        var key = year + '-' + month + '-' + day;

                        if (allEvents[key] !== undefined) {
                            result = [true, 'event', ''];
                        }

                        return result;
                    }
                };
                var datepicker_opts = jQuery.extend(default_opts, tf_calendar.datepicker_opts);
                $('#calendar').empty().removeClass('hasDatepicker').removeData().datepicker(datepicker_opts);

                changeDayText();
                $("table.ui-datepicker-calendar td").addClass('ui-datepicker-unselectable');
                $(".ui-datepicker-next").before($('.ui-datepicker-title'));
            }
        }
    });

});
