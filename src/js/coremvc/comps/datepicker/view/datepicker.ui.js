tetra.view.register('datepicker', {
  scope: 'datepicker',
  use: ['datepicker'],

  constr: function(me, app, _) {
    'use strict';

    return {
      events: {
        user: {
          'click': {

            '.datepicker': function(e, elm) {
              var container = _(e.target).parents('.datepicker:first'),
                  clicked = _(e.target),
                  year = me.methods.getDisplayedYear(container),
                  month = me.methods.getDisplayedMonth(container);

              // previous month
              if (clicked.hasClass('dp-cal-prev-month')) {
                month--;
                if (month < 0) {
                  year--;
                  month = 11;
                }
                me.methods.showMonth(container, year, month);
                return;
              }

              // next month
              if (clicked.hasClass('dp-cal-next-month')) {
                month++;
                if (month > 11) {
                  year++;
                  month = 0;
                }
                me.methods.showMonth(container, year, month);
                return;
              }

              // previous year
              if (clicked.hasClass('dp-cal-prev-year')) {
                year--;
                me.methods.showMonth(container, year, month);
                return;
              }

              // next year
              if (clicked.hasClass('dp-cal-next-year')) {
                year++;
                me.methods.showMonth(container, year, month);
                return;
              }

              // day clicked
              if (clicked.is('td')) {
                app.notify('select date', {
                  id: container.attr('id'),
                  date: {
                    year: parseInt(clicked.attr('data-year'), 10),
                    month: parseInt(clicked.attr('data-month'), 10) + 1,
                    day: parseInt(clicked.html(), 10)
                  }
                });
                return;
              }

              // datepicker field clicked
              if (clicked.is('input[type="text"]') || clicked.is('.vicon')) {
                _(container).addClass('active');
                me.methods.showCurrentMonth(container);
                return;
              }
            }

          },

          'clickout': {

            // hide the datepicker
            '.datepicker': function(e, elm) {
              _(elm).removeClass('active');
            }

          }
        },

        controller: {

          'set date': function(data) {
            var container = _('#' + data.id),
                format = me.methods.getDateFormat(container.attr('data-i18n')),
                year = data.date.year,
                month = ('0' + data.date.month).slice(-2),
                day = ('0' + data.date.day).slice(-2);

            var output = format.replace('YYYY', year)
              .replace('MM', month)
              .replace('DD', day);

            container.find('input[type="hidden"]').val(
              year + '-' +
              month + '-' +
              day
            );

            container.find('input[type="text"]').val(output);

            container.removeClass('active');
          }

        }
      },

      methods: {

        init: function() {
          me.i18n = {
            en: {
              monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
              dateFormat: 'MM/DD/YYYY',
              weekStart: 0 // Sunday
            },

            fr: {
              monthsShort: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
              weekdaysMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
              dateFormat: 'DD/MM/YYYY',
              weekStart: 1 // Monday
            }
          };
        },

        getMonthShort: function(month, i18n) {
          return me.i18n[i18n].monthsShort[month];
        },

        getWeekdayMin: function(weekday, i18n) {
          return me.i18n[i18n].weekdaysMin[weekday];
        },

        getWeekStart: function(i18n) {
          return me.i18n[i18n].weekStart;
        },

        getDateFormat: function(i18n) {
          return me.i18n[i18n].dateFormat;
        },

        getDisplayedYear: function(container) {
          return parseInt(_(container).attr('data-current-year'), 10);
        },

        getDisplayedMonth: function(container) {
          return parseInt(_(container).attr('data-current-month'), 10);
        },

        showCurrentMonth: function(container) {
          var today = new Date();
          me.methods.showMonth(container, today.getFullYear(), today.getMonth());
        },

        showMonth: function(container, year, month) {
          var date = new Date(year, month, 1),
              firstWeekdayInMonth = date.getDay(),
              i18n = container.attr('data-i18n');

          var grid = '<table>' +
            '<thead>' +
              '<tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>' +
            '</thead>' +
            '<tbody>';

          for (var i = 0; i < 6; i++) {
            grid += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
          }

          grid += '<tbody></table>';

          container.find('dd').html(grid);

          var table = container.find('.dp-cal table'),
              th = table.find('th'),
              td = table.find('td');

          container.find('.dp-cal-year').html(year);
          container.attr('data-current-year', year);

          container.find('.dp-cal-month').html(me.methods.getMonthShort(month, i18n));
          container.attr('data-current-month', month);

          for (i = 0; i < th.length; i++) {
            _(th[i]).html(me.methods.getWeekdayMin((i + me.methods.getWeekStart(i18n)) % 7, i18n));
          }

          var today = new Date();
          var offset = me.methods.getWeekStart(i18n) + 1 - firstWeekdayInMonth;

          if (offset > 1) {
            offset -= 7;
          }

          for (i = 0; i < td.length; i++) {
            var d = new Date(year, month, i + offset);

            _(td[i]).html(d.getDate())
                    .attr('data-year', d.getFullYear())
                    .attr('data-month', d.getMonth());

            if (month !== d.getMonth()) {
              _(td[i]).addClass('dp-cal-other-month');
            } else {
              _(td[i]).removeClass('dp-cal-other-month');
            }

            if (today.getFullYear() === d.getFullYear() &&
                today.getMonth() === d.getMonth() &&
                today.getDate() === d.getDate()
            ) {
              _(td[i]).addClass('dp-cal-today');
            } else {
              _(td[i]).removeClass('dp-cal-today');
            }
          }

        }

      }
    };
  }
});
