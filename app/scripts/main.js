/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        }
    },
    paths: {
        jquery: ('__proto__' in {} ? '../bower_components/zepto/zepto' : '../bower_components/jquery/jquery'),
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        backboneLocalstorage: '../bower_components/backbone.localStorage/backbone.Localstorage',
        text: '../bower_components/requirejs-text/text'
    }
});

require([
        'backbone',
        'views/app',
        'routers/router'
], function (Backbone, AppView, Workspace) {
        /*jshint nonew:false*/
        // Initialize routing and start Backbone.history()
        new Workspace();
        Backbone.history.start();

        // Initialize the application view
        new AppView();
});