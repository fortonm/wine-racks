/*global define*/
define([
        'jquery',
        'underscore',
        'backbone',
        'collections/wines',
        'views/wines',
        'common'
], function (jQuery, _, Backbone, Wines, WineView, Common) {
        'use strict';

        var AppView = Backbone.View.extend({

                // Instead of generating a new element, bind to the existing skeleton of
                // the App already present in the HTML.
                el: '#wineapp',

                // Delegated events for creating new items, and clearing completed ones.
                events: {
                        'keypress #new-wine':           'createOnEnter'
                },

                // At initialization we bind to the relevant events on the `Wines`
                // collection, when items are added or changed. Kick things off by
                // loading any preexisting wines that might be saved in *localStorage*.
                initialize: function () {
                        this.$input = this.$('#new-wine');
                        this.$main = this.$('#main');

                        this.listenTo(Wines, 'add', this.addOne);
                        this.listenTo(Wines, 'reset', this.addAll);
                        this.listenTo(Wines, 'all', this.render);

                        Wines.fetch();
                },

                // Re-rendering the App
                render: function () {
                        if (Wines.length) {
                                this.$main.show();
                        } else {
                                this.$main.hide();
                        }
                },

                // Add a single wine item to the list by creating a view for it, and
                // appending its element to the `<ul>`.
                addOne: function (wine) {
                        var view = new WineView({ model: wine });
                        $('#wine-list').append(view.render().el);
                },

                // Add all items in the **Todos** collection at once.
                addAll: function () {
                        this.$('#wine-list').html('');
                        Wines.each(this.addOne, this);
                },

                // Generate the attributes for a new Wine item.
                newAttributes: function () {
                        return {
                                title: this.$input.val().trim()
                        };
                },

                // If you hit return in the main input field, create new **Wine** model,
                // persisting it to *localStorage*.
                createOnEnter: function (e) {
                        if (e.which !== Common.ENTER_KEY || !this.$input.val().trim()) {
                                return;
                        }

                        Wines.create(this.newAttributes());
                        this.$input.val('');
                }
        });

        return AppView;
});