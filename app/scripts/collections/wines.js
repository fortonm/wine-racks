/*global define*/
define([
        'underscore',
        'backbone',
        'backboneLocalstorage',
        'models/wine'
], function (_, Backbone, Store, Wine) {
        'use strict';

        var WinesCollection = Backbone.Collection.extend({
                // Reference to this collection's model.
                model: Wine,

                // Save all of the wine items under the `"wines"` namespace.
                localStorage: new Store('wines-backbone')
        });

        return new WinesCollection();
});