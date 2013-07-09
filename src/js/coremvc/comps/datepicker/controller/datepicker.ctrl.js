tetra.controller.register('datepicker', {
  scope: 'datepicker',

  constr: function(me, app, page) {
    'use strict';

    return {
      events: {
        view: {
          'select date': function(data) {
            app.notify('set date', data);
            page.notify('datepicker: date selected', data);
          }
        },

        controller: {
        }
      },

      methods: {
        init: function() {
        }
      }
    };
  }
});
