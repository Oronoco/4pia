// Mobile Router
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/CategoryModel",
	"../collections/CategoriesCollection",
	"../views/CategoryView"
], function( $, Backbone, CategoryModel, CategoriesCollection, CategoryView ) {

    // Extends Backbone.Router
    var CategoryRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Instantiates a new Animal Category View
            this.animalsView = new CategoryView( { el: "#animals", collection: new CategoriesCollection( [] , { type: "animals" } ) } );

            // Instantiates a new Colors Category View
            this.colorsView = new CategoryView( { el: "#colors", collection: new CategoriesCollection( [] , { type: "colors" } ) } );

            // Instantiates a new Vehicles Category View
            this.vehiclesView = new CategoryView( { el: "#vehicles", collection: new CategoriesCollection( [] , { type: "vehicles" } ) } );

            // Instantiates a new Vehicles Category View
            this.rtweetsView = new CategoryView( { el: "#rtweets", collection: new CategoriesCollection( [] , { type: "rtweets", templateName : "script#forpiaItems" } ) } );

            // Instantiates a new Vehicles Category View
            this.dtweetsView = new CategoryView( { el: "#dtweets", collection: new CategoriesCollection( [] , { type: "dtweets" , templateName : "script#forpiaItems"} ) } );

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
           // "": "home",

            "login": "login",
            "join": "join",
            "learn": "learn",
            "forgot": "forgot",
			"categories" : "home",

            // When #category? is on the url, the category method is called
            "category?:type": "category"

        },

        // Home method
        home: function() {

            // Programatically changes to the categories page
            $.mobile.changePage( "#categories" , { reverse: false, changeHash: false } );

        },

        // Home method
        login: function() {

            // Programatically changes to the categories page
            $.mobile.changePage( "#login" , { reverse: false, changeHash: false } );

        },

        // join method
        learn: function() {

            // Programatically changes to the categories page
            $.mobile.changePage( "#learn" , { reverse: false, changeHash: false } );

        },

       // join method
        join: function() {

            // Programatically changes to the categories page
            $.mobile.changePage( "#join" , { reverse: false, changeHash: false } );

        },

        // forgot method
        forgot: function() {

            // Programatically changes to the categories page
            $.mobile.changePage( "#forgot" , { reverse: false, changeHash: false } );

        },

        // Category method that passes in the type that is appended to the url hash
        category: function(type) {

            // Stores the current Category View  inside of the currentView variable
            var currentView = this[ type + "View" ];

            // If there are no collections in the current Category View
            if(!currentView.collection.length) {

                // Show's the jQuery Mobile loading icon
                $.mobile.loading( "show" );

                // Fetches the Collection of Category Models for the current Category View
                currentView.collection.fetch().done( function() {

                    // Programatically changes to the current categories page
                    $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );
    
                } );

            }

            // If there already collections in the current Category View
            else {

                // Programatically changes to the current categories page
                $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );

            }

        }

    } );

    // Returns the Router class
    return CategoryRouter;

} );