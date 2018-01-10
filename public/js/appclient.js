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
        pin: 'models/pin',
        pinview: 'views/pin',
        pinlistview: 'views/pinList'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            attach: 'Backbone'
        },
        pin: {
            exports: 'Pin'
        }
    }
});

// AMD conform require as provided by require.js
require(['jquery', 'backbone', 'pin', 'pinview', 'pinlistview'],
    function ($, backbone, Pin, PinView, PinListView) {

        var pinCollection = new Pin.Collection();
        var ApplicationRouter = backbone.Router.extend({

            //map url routes to contained methods
            routes: {
                "home": "home",
                "p": "pins"
            },

            home: function () {
                alert("TEST")
            },

            pins: function () {
                pinCollection.fetch({
                    success: function(items, response) {
                        var myPinListView = new PinListView({collection:items});
                        console.log(myPinListView.render().el);

                },
                error: function() {
                }
            })
            }


        });
        var app = new ApplicationRouter();
        Backbone.history.start({pushState: true});


        $('.testclass').on("click", function(){
            app.navigate("home", true)
        });
        $('.pins').on("click", function(){
            app.navigate("p", true)
        })
    });
