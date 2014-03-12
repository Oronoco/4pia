// Category View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../routers/mobileRouter",
	"../models/CategoryModel",
	"../models/DataModel"
], function( $, Backbone, Mobile, CategoryModel, DataModel ) {

    // Extends Backbone.View
    var CategoryView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            this.collection.on( "added", this.render, this );

        },

        // Renders all of the Category models on the UI
        render: function() {

			var myCollection = this.collection;
			var templateName = myCollection.templateName  ||  "script#categoryItems";
			
			if (myCollection.templateName)
			{
				var lastHour = undefined;
				_.each( myCollection.models, function( entry, index ) {
						entry = entry.attributes;
						entry.id = index;
						var hour = entry.timestamp.getHours();
						entry.hourBreak = false;
						if (hour !== lastHour)
						{
							entry.hourBreak = true;
							entry.hour_formatted = 
								new Date( entry.timestamp ).format("mmmm dd, yyyy") + 
								" at " + 
								new Date( entry.timestamp ).format("h tt");
							lastHour = hour;
						}
						
					});
				}
				this.template = _.template( $( templateName ).html(), { "collection": myCollection } );
			
            // Renders the view's template inside of the current listview element
            this.$el.find("ul").html(this.template);

			this.$el.find(".timeline")
				.css({"border-color" : "#ddd"});
				
			this.$el.find(".timeline_person").on('click', function() {
				var id = $(this).attr("data-id");
				var targetPerson = myCollection.models[ id ].get("person");
				DataModel.models.drillDown = _.filter( myCollection.models, function( entry, index ) {
						return entry.get("person") === targetPerson;
					});
					
				var strippedPerson = targetPerson
					.replace(/Rep\. /i, "" )
					.replace(/Cong\. /i, "" )
					.replace(/Congressman /i, "" )
					.replace(/U.S\. Rep\. /i, "" )
					.replace(/Senator/i, "" ).trim();

					var person = _.find( DataModel.models.people, function( entry, key ) {
							return  (entry.name.toLowerCase().indexOf( strippedPerson.toLowerCase()) > 0);
						});

				$.CategoryRouter.drillDownView.collection.drillDown = {
						targetPerson : targetPerson,
						url : person ? person.url : false
					};
				$.CategoryRouter.drillDownView.collection.models = DataModel.models.drillDown;
				// Triggers the custom `added` method (which the Category View listens for)
                $.CategoryRouter.drillDownView.collection.trigger( "added" );


				$("body").find(".drilltweeter").text( targetPerson );
				$("body").find(".drilltweeter").text( targetPerson );
				$("body").find(".drilltweetcnt").text( DataModel.models.drillDown.length );
				$.mobile.changePage( "#drillDown" , { reverse: false, changeHash: false } );

				return false; // cancel original event to prevent form submitting
			}); 

			
            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return CategoryView;

} );