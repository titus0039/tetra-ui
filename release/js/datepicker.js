/*! Tetra UI v1.0.32 | (MIT Licence) (c) Viadeo/APVO Corp - inspired by Bootstrap (c) Twitter, Inc. (Apache 2 Licence) */

tetra.view.register('datepicker', {
  scope: 'datepicker',

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

              if (clicked.hasClass('dp-cal-prev-month')) {
                month--;
                if (month < 0) {
                  year--;
                  month = 11;
                }
                me.methods.showMonth(container, year, month);
                return;
              }

              if (clicked.hasClass('dp-cal-next-month')) {
                month++;
                if (month > 11) {
                  year++;
                  month = 0;
                }
                me.methods.showMonth(container, year, month);
                return;
              }

              if (clicked.hasClass('dp-cal-prev-year')) {
                year--;
                me.methods.showMonth(container, year, month);
                return;
              }

              if (clicked.hasClass('dp-cal-next-year')) {
                year++;
                me.methods.showMonth(container, year, month);
                return;
              }

              if (clicked.is('td')) {
                console.log('date clicked', clicked.html());
                return;
              }

              _(container).addClass('active');
              me.methods.showCurrentMonth(container);
            }

          },

          'clickout': {

            '.datepicker': function(e, elm) {
              _(elm).removeClass('active');
            }

          }
        },

        controller: {}
      },

      methods: {

        init: function() {
          me.i18n = {
            en: {
              monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
              dateFormat: 'MM/DD/YYYY',
              weekStartsOn: 0 // Sunday
            },

            fr: {
              monthsShort: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
              weekdaysMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
              dateFormat: 'DD/MM/YYYY',
              weekStartsOn: 1 // Monday
            }
          };
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
              firstWeekdayInMonth = date.getDay();

          var table = _(container).find('.dp-cal table'),
              th = _(table).find('th'),
              td = _(table).find('td');

          _(container).find('.dp-cal-year').html(year);
          _(container).attr('data-current-year', year);

          _(container).find('.dp-cal-month').html(me.i18n.en.monthsShort[month]);
          _(container).attr('data-current-month', month);

          for (var i = 0; i < th.length; i++) {
            _(th[i]).html(me.i18n.en.weekdaysMin[(i + me.i18n.en.weekStartsOn) % 7]);
          }

          var today = new Date();
          var offset = me.i18n.en.weekStartsOn + 1 - firstWeekdayInMonth;

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
