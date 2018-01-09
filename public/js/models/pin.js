/**
 *  Backbone Model (stub)
 *  Connected to REST API /{ressourcepath}
 *
 *  (file can be deleted or used for Ü4 Pins)
 *
 *  @author Johannes Konert
 *  @licence  CC BY-SA 4.0
 */
define(['backbone', 'underscore'], function (Backbone, _) {
    var result = {};

    result.Model = Backbone.Model.extend({
        urlRoot: '/pins',
        idAttribute: '_id',
        defaults: {
            title: '',
            type: 'image',
            src: '',
            description: '',
            views: 0,
            ranking: 0,
            timestamp: ''
        },
        initialize: function () {
            // after constructor code
        },
        validate: function (attr) {
            if (!attr.user) {
                return "Missing User ID";
            }
        }
    });


    result.Collection = Backbone.Collection.extend({
        model: result.Model,
        url: '/pins',
    });
    return result;
});