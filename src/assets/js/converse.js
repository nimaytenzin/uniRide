angular.module('converse', []).service('converse', function() {
    // We create three promises, which will be resolved at various times
    var loaded_deferred = new $.Deferred(),
        connected_deferred = new $.Deferred();

    var service = {
        'waitUntilLoaded': _.constant(loaded_deferred.promise()),
        'initialize': function initConverse(options) {
            this.waitUntilLoaded().done(_.partial(this.api.initialize, options));
        },
        'waitUntilConnected': _.constant(connected_deferred.promise())
    };

    // Here we define the core components of converse.js that will be
    // loaded and used.
    define([
        "converse-core",
        // START: Removable components
        // --------------------
        // Any of the following components may be removed if they're not needed.
        "locales",               // Translations for converse.js. This line can be removed
                                 // to remove *all* translations, or you can modify the
                                 // file src/locales.js to include only those
                                 // translations that you care about.

        "converse-chatview",     // Renders standalone chatboxes for single user chat
        "converse-controlbox",   // The control box
        "converse-bookmarks",    // XEP-0048 Bookmarks
        "converse-mam",          // XEP-0313 Message Archive Management
        "converse-muc",          // XEP-0045 Multi-user chat
        "converse-vcard",        // XEP-0054 VCard-temp
        "converse-register",     // XEP-0077 In-band registration
        "converse-ping",         // XEP-0199 XMPP Ping
        "converse-notification", // HTML5 Notifications
        "converse-minimize",     // Allows chatboxes to be minimized
        "converse-dragresize",   // Allows chatboxes to be resized by dragging them
        "converse-headline",     // Support for headline messages
        // END: Removable components

    ], function(converse) {
        service.api = converse;

        // Register a plugin which resolves `waitUntilConnected` promise.
        converse.plugins.add('conversejs-angular-service', {
            initialize: function () {
                this._converse.api.listen.on('connected', connected_deferred.resolve);
            }
        });

        // Converse.js has been loaded, so we can resolve the `waitUntilLoaded` promise.
        return loaded_deferred.resolve();
    });
    require(["converse"]);
    return service;
});