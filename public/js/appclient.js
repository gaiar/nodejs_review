/** Main application file to start the client side single page app (only a stub for Ü4)
 *
 * @author Johannes Konert
 * @licence  CC BY-SA 4.0
 */

requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: '_lib/jquery-1.11.3',
        underscore: '_lib/underscore-1.8.3',
        backbone: '_lib/backbone-1.2.3',
        pin: 'models/pin'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        pin: {
            exports: 'Pin'
        }
    }
});

// AMD conform require as provided by require.js
require(['jquery', 'backbone', 'pin'],
    function ($, backbone, Pin) {
        $('body').prepend('<h1>Binterest Pins App</h1>');

        var AppRouter = Backbone.Router.extend({
            routes: {
                'pins': 'showPins'
            },
            showPins: function(){
                var pins = new Pin.Collection();
                pins.fetch({
                    success: function(){alert("HUHU")}
                });
            }
        });
        var myAppRouter = new AppRouter();
        Backbone.history.start({pushState: true});
    });
