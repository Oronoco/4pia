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
						

		drillDown : function( targetPerson, myCollection, options ) {
				var person = undefined;
				if (targetPerson &&  myCollection)
				{
					DataModel.models.drillDown = _.filter( myCollection.models, function( entry, index ) {
							return entry.get("person") === targetPerson;
						});
					
					var sortName = targetPerson.sortName()

					var person = _.find( DataModel.models.people, function( entry, key ) {
								return  (entry.name.toLowerCase().indexOf( sortName.toLowerCase()) > 0);
							});
				}

				$.CategoryRouter.drillDownView.collection.drillDown = $.extend({
						targetPerson : targetPerson,
						url : person ? person.url : false
					}, options );
					
				$.CategoryRouter.drillDownView.collection.models = DataModel.models.drillDown;
				// Triggers the custom `added` method (which the Category View listens for)
                $.CategoryRouter.drillDownView.collection.trigger( "added" );


				$("body").find(".drilltweeter").text( targetPerson );
				$("body").find(".drilltweetcnt").text( DataModel.models.drillDown.length );
				$.mobile.changePage( "#drillDown" , { reverse: false, changeHash: false } );
				
				return $.CategoryRouter.drillDownView.collection.drillDown;
			},
			
		search : function( searchStr ) {
				var self = this;
				var myCollection = $.CategoryRouter.dailyView.collection;
				self.searchCollection( myCollection, function() {
						var s = searchStr.toLowerCase().trim();
						var demCnt = 0;
						var repCnt = 0;
						DataModel.models.drillDown = _.filter( myCollection.models, function( entry, index ) {
								var desc = entry.get("person") + " " + entry.get("description");
								var match = desc.toLowerCase().indexOf( s );
								if (match >= 0)
								{
									if (entry.get("categoryClass") === "rtweets") repCnt++
									else demCnt++;
									return true;
								}
								return false;
							});

						self.drillDown( searchStr, undefined, {header: true, demCnt : demCnt, repCnt : repCnt} );
				});
			},
			
		searchCollection : function ( targetCollection, callback) {
				
				// If there are no collections in the current Category View
				if(!targetCollection.length) {

					// Show's the jQuery Mobile loading icon
					$.mobile.loading( "show" );

					// Fetches the Collection of Category Models for the current Category View
					targetCollection.fetch().done( callback );

				}
				else
				{
					callback();
				}
			},
			
		bios : function( bioKey ) {
				var self = this;
				var targetBio = _.filter( DataModel.models.bios, function( entry, index ) {
						return entry.bio.key === bioKey;
					});
					
				if (targetBio.length)
				{
					self.searchCollection( $.CategoryRouter.dailyView.collection, function() {
							self.drillDown( targetBio[0].bio.sortName, $.CategoryRouter.dailyView.collection );
						});
				}
			},
			
        // Renders all of the Category models on the UI
        render: function() {

			var self = this;
			var templateName = self.collection.templateName  ||  "script#categoryItems";

			if (self.collection.options.style === "timeline")
			{
				var lastHour = undefined;
				_.each( self.collection.models, function( entry, index ) {
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
			
			this.template = _.template( $( templateName ).html(), { "collection": self.collection } );
			
 			if (self.collection.options.style === "ctweets")
			{
				this.template = DataModel.models.ctweets;
			}
			
           // Renders the view's template inside of the current listview element
            this.$el.find("ul").empty().html(this.template);

			this.$el.find(".timeline")
				.css({"border-color" : "#ddd"});
				
			this.$el.find(".timeline_person").on('click', function() {
					var id = $(this).attr("data-id");
					var targetPerson = self.collection.models[ id ].get("person");
				
					self.drillDown( targetPerson, self.collection );
				
					return false; // cancel original event to prevent form submitting
				}); 


			this.$el.find(".tweetCloudItem").on('click', function() {
					var searchStr = $(this).text();
					self.search( searchStr );
			
					return false; // cancel original event to prevent form submitting
				}); 
			
            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return CategoryView;

} );