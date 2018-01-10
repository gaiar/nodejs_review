/**
 *  Backbone View (stub code) using the #xx-yy-zz-template from DOM to render ... into target element #xx-yy-target
 *  Needs model to be set from outside
 *
 *  (file can be deleted or changed for Ü4 Pins)
 *
 *  @author Johannes Konert
 *  @licence  CC BY-SA 4.0
 */
define(['backbone', 'jquery', 'underscore'], function(Backbone, $, _) {
    var PinView = Backbone.View.extend({
        tagName: 'picture',
        className: 'picturecontainer content',
        template: _.template($('#pin-template').text()),
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        }
    });
    return PinView;
});

