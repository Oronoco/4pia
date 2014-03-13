// Category Collection
// ===================

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/CategoryModel",
	"../models/DataModel" ], function( $, Backbone, CategoryModel, DataModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

            // Sets the type instance property (ie. animals)
           	this.options = options;
			this.type = options.type;
            this.templateName = options.templateName;

        },

        // Sets the Collection model property to be a Category Model
        model: CategoryModel,

        // Sample JSON data that in a real app will most likely come from a REST web service
        jsonArray: [

        	{ "category": "healthcare", "type": "Insurance Coverage" },

            { "category": "healthcare", "type": "World Health Organization" },

           	{ "category": "healthcare", "type": "Immunization" },

            { "category": "healthcare", "type": "Clinical Trials" },

           	{ "category": "healthcare", "type": "Elder Care" },

            { "category": "ukraine", "type": "Chronology of Coverage" },

            { "category": "ukraine", "type": "US Policy" },

            { "category": "ukraine", "type": "European Union" },

            { "category": "ukraine", "type": "Crimean Vote" },

            { "category": "climate", "type": "Weather Predictions" },

            { "category": "climate", "type": "Renewable Energy" },

            { "category": "climate", "type": "Scientific Papers and Conferences" }

        ],

        // Overriding the Backbone.sync method (the Backbone.fetch method calls the sync method when trying to fetch data)
        sync: function( method, model, options ) {

            // Local Variables
            // ===============

            // Instantiates an empty array
            var categories = [],

                // Stores the this context in the self variable
                self = this,

                // Creates a jQuery Deferred Object
                deferred = $.Deferred();

			
            // Uses a setTimeout to mimic a real world application that retrieves data asynchronously
            setTimeout( function() {

                // Filters the above sample JSON data to return an array of only the correct category type
			   categories = DataModel.loadCategories( method, model, options );
			   if (categories === undefined)
			   {
				   categories = _.filter( self.jsonArray, function( row ) {

						return row.category === self.type;

					} );
				}
				
                // Calls the options.success method and passes an array of objects (Internally saves these objects as models to the current collection)
                options.success( categories );

                // Triggers the custom `added` method (which the Category View listens for)
                self.trigger( "added" );

                // Resolves the deferred object (this triggers the changePage method inside of the Category Router)
                deferred.resolve();

            }, 1000);

            // Returns the deferred object
            return deferred;

        }

    } );

    // Returns the Model class
    return Collection;

} );