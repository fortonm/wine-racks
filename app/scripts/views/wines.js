/*global define*/
define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/wines.html',
        'common'
], function (jQuery, _, Backbone, winesTemplate, Common) {
        'use strict';

        var WineView = Backbone.View.extend({

                tagName:  'li',

                template: _.template(winesTemplate),

                // The DOM events specific to an item.
                events: {
                        'dblclick label':       'edit',
                        'click .destroy':       'clear',
                        'keypress .edit':       'updateOnEnter',
                        'blur .edit':           'close'
                },

                // The WineView listens for changes to its model, re-rendering. Since there's
                // a one-to-one correspondence between a **Wine** and a **WineView** in this
                // app, we set a direct reference on the model for convenience.
                initialize: function () {
                        this.listenTo(this.model, 'change', this.render);
                        this.listenTo(this.model, 'destroy', this.remove);
                },

                // Re-render the titles of the wine item.
                render: function () {
                        this.$el.html(this.template(this.model.toJSON()));

                        this.$input = this.$('.edit');
                        return this;
                },

                // Switch this view into `"editing"` mode, displaying the input field.
                edit: function () {
                        this.$el.addClass('editing');
                        this.$input.focus();
                },

                // Close the `"editing"` mode, saving changes to the wine.
                close: function () {
                        var value = this.$input.val().trim();

                        if (value) {
                                this.model.save({ title: value });
                        } else {
                                this.clear();
                        }

                        this.$el.removeClass('editing');
                },

                // If you hit `enter`, we're through editing the item.
                updateOnEnter: function (e) {
                        if (e.keyCode === Common.ENTER_KEY) {
                                this.close();
                        }
                },

                // Remove the item, destroy the model from *localStorage* and delete its view.
                clear: function () {
                        this.model.destroy();
                }
        });

        return WineView;
});