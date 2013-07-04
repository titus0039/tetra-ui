/*! Tetra UI v1.0.32 | (MIT Licence) (c) Viadeo/APVO Corp - inspired by Bootstrap (c) Twitter, Inc. (Apache 2 Licence) */

tetra.view.register('datepicker', {
  scope: 'datepicker',

  constr: function(me, app, _) {
    'use strict';

    return {
      events: {
        user: {
          'click': {

            '.datepicker .dp-field': function(e, elm) {
              var today = new Date();

              me.methods.showMonth(
                _(elm).parents('.datepicker:first'),
                today.getFullYear(),
                today.getMonth()
              );
            },

            '.datepicker .dp-cal-prev-year': function(e, elm) {
              var container = _(elm).parents('.datepicker:first'),
                year = me.methods.getDisplayedYear(container),
                month = me.methods.getDisplayedMonth(container);

              year--;

              me.methods.showMonth(container, year, month);
            },

            '.datepicker .dp-cal-next-year': function(e, elm) {
              var container = _(elm).parents('.datepicker:first'),
                year = me.methods.getDisplayedYear(container),
                month = me.methods.getDisplayedMonth(container);

              year++;

              me.methods.showMonth(container, year, month);
            },

            '.datepicker .dp-cal-prev-month': function(e, elm) {
              var container = _(elm).parents('.datepicker:first'),
                year = me.methods.getDisplayedYear(container),
                month = me.methods.getDisplayedMonth(container);

              month--;

              if (month < 0) {
                year--;
                month = 11;
              }

              me.methods.showMonth(container, year, month);
            },

            '.datepicker .dp-cal-next-month': function(e, elm) {
              var container = _(elm).parents('.datepicker:first'),
                year = me.methods.getDisplayedYear(container),
                month = me.methods.getDisplayedMonth(container);

              month++;

              if (month > 11) {
                year++;
                month = 0;
              }

              me.methods.showMonth(container, year, month);
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
              dateFormat: 'DD/MM/YYYY'
            }
          };
        },

        getDisplayedYear: function(container) {
          return parseInt(_(container).attr('data-current-year'), 10);
        },

        getDisplayedMonth: function(container) {
          return parseInt(_(container).attr('data-current-month'), 10);
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
            _(th[i]).html(me.i18n.en.weekdaysMin[i]);
          }

          for (i = 0; i < td.length; i++) {
            var d = new Date(year, month, i - firstWeekdayInMonth + 1);
            _(td[i]).html(d.getDate());
          }
        }

      }
    };
  }
});
