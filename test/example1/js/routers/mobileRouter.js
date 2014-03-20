// Mobile Router
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/CategoryModel",
	"../models/DataModel",
	"../models/PreferenceModel",
	"../collections/CategoriesCollection",
	"../views/CategoryView"
], function( $, Backbone, CategoryModel, DataModel, Preferences, CategoriesCollection, CategoryView ) {

    // Extends Backbone.Router
    var CategoryRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Instantiates a new Animal health View
            this.healthcareView = new CategoryView( { el: "#healthcare", collection: new CategoriesCollection( [] , { type: "healthcare" } ) } );

            // Instantiates a new Colors ukraine View
            this.ukraineView = new CategoryView( { el: "#ukraine", collection: new CategoriesCollection( [] , { type: "ukraine" } ) } );

            // Instantiates a new Vehicles climate View
            this.climateView = new CategoryView( { el: "#climate", collection: new CategoriesCollection( [] , { type: "climate" } ) } );

          	// Instantiates a new tweet pulse bios View
            this.pulseView = new CategoryView( { el: "#pulse", collection: new CategoriesCollection( [] , { style: "pulse", type: "pulse" , templateName : "script#forpiaPulse" } ) } );

         	// Instantiates a new tweet cloud bios View
            this.biosView = new CategoryView( { el: "#bios", collection: new CategoriesCollection( [] , { style: "bios", type: "bios", templateName : "script#forpiaBios" } ) } );

         	// Instantiates a new tweet cloud Category View
            this.ctweetsView = new CategoryView( { el: "#ctweets", collection: new CategoriesCollection( [] , {  style: "ctweets", type: "ctweets" } ) } );

             // Instantiates a new republican Category View
            this.rtweetsView = new CategoryView( { el: "#rtweets", collection: new CategoriesCollection( [] , { style: "timeline", type: "rtweets", templateName : "script#forpiaItems" } ) } );

            // Instantiates a new democrat Category View
            this.dtweetsView = new CategoryView( { el: "#dtweets", collection: new CategoriesCollection( [] , { style: "timeline", type: "dtweets" , templateName : "script#forpiaItems"} ) } );

            // Instantiates a new drilldown Category View
            this.drillDownView = new CategoryView( { el: "#drillDown", collection: new CategoriesCollection( [] , { style: "timeline", type: "drillDown" , templateName : "script#forpiaDrill"} ) } );

            // Instantiates a new daily tweets Category View
            this.dailyView = new CategoryView( { el: "#daily", collection: new CategoriesCollection( [] , { style: "timeline", type: "daily" , templateName : "script#forpiaItems", sidebyside : true} ) } );

			$.CategoryRouter = this;
			
            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
           // "": "home",

            "login": "login",
            "join": "join",
            "back": "back",
            "learn": "learn",
            "forgot": "forgot",
			"categories" : "home",
			"tagcanvas" : "tagcanvas",
			"pulse" : "pulse",
			"bios" : "bios",
			"refresh" : "refresh",

            // When #category? is on the url, the category method is called
            "category?:type": "category"

        },

        // tagcanvas method
        tagcanvas: function(bioKey) {
			var searchStr = $(".tagcanvas" + bioKey ).text();
			
			var type = "ctweets";
             // Stores the current Category View  inside of the currentView variable
            var currentView = this[ type + "View" ];

			currentView.search( searchStr );
         },

       // bios method
        bios: function(bioKey) {
			var type = "bios";
             // Stores the current Category View  inside of the currentView variable
            var currentView = this[ type + "View" ];
				
			Preferences.lastPageName = "#" + type + "?" + bioKey;

			currentView.bios( bioKey );
			
         },

		changePage : function(pageName) {
		
				if (pageName != "#pulse")
				{
					Preferences.lastPageName = pageName;
				}
				
				messageFromProfile( pageName );
				
				// Programatically changes to the categories page
				$.mobile.changePage( pageName , { reverse: false, changeHash: false } );
			},
 
		// refresh method
        refresh: function() {
			
			DataModel.refresh(); 

        },

		// Back method
        back: function() {
			var url = Preferences.lastPageName  ||  "#categories";
			this.changePage( url );
        },

		// Home method
        home: function() {

			this.changePage( "#categories" );
        },

		// Home method
        pulse: function() {

			this.changePage( "#pulse" );
        },

        // login method
        login: function() {

 			this.changePage( "#login" );
 
        },

        // learn method
        learn: function() {

			this.changePage( "#learn" );
 
        },

       // join method
        join: function() {

			this.changePage( "#join" );
 
        },

        // forgot method
        forgot: function() {

 			this.changePage( "#forgot" );
 
        },

        // Category method that passes in the type that is appended to the url hash
        category: function(type) {

		var self = this;
			
            // Stores the current Category View  inside of the currentView variable
            var currentView = this[ type + "View" ];

            // If there are no collections in the current Category View
            if(!currentView.collection.length) {

                // Show's the jQuery Mobile loading icon
                $.mobile.loading( "show" );

                // Fetches the Collection of Category Models for the current Category View
                currentView.collection.fetch().done( function() {

					self.changePage( "#" + type );
    
                } );

            }

            // If there already collections in the current Category View
            else {

  				self.changePage( "#" + type );
 
            }

        }

    } );

    // Returns the Router class
    return CategoryRouter;

} );