/*! Tetra UI v1.0.32 | (MIT Licence) (c) Viadeo/APVO Corp - inspired by Bootstrap (c) Twitter, Inc. (Apache 2 Licence) */

tetra.view.register('datepicker', {
  scope: 'datepicker',

  constr: function(me, app, _) {
    'use strict';

    return {
      events: {
        user: {
          'click': {
            '.date-picker .dp-field': function(e, elm) {
              console.log('clicked');
            }
          }
        },

        controller: {}
      },

      methods: {
        init: function() {
        }
      },

      lang: {
        en: {
          monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          dateFormat: 'DD/MM/YYYY'
        }
      }
    };
  }
});
