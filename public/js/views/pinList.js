/**
 *  Backbone View (stub code) using the #xx-yy-zz-template from DOM to render ... into target element #xx-yy-target
 *  Needs model to be set from outside
 *
 *  (file can be deleted or changed for Ü4 Pins)
 *
 *  @author Johannes Konert
 *  @licence  CC BY-SA 4.0
 */
define(['backbone', 'jquery', 'underscore', 'pinview'], function(Backbone, $, _, PinView) {
    var PinListView = Backbone.View.extend({
        el: '#pin-list',
        template: undefined,
        render: function() {
            this.$el.empty();
            this.collection.each(function(pin) {
                var pinView = new PinView({model: pin});
                this.$el.prepend(pinView.render().el);
            }, this);
            return this;
        },
        initialize: function() {
            this.listenTo(this.collection,'add', this.render);
        }
    });
    return PinListView;
});

