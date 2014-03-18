// Preference Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"underscore"
], function( $, Backbone, _ ) {

	var fourPIA = { 
			repSearch : "tweetsOnly", 
			minTweetCloudSize : 3,
			startTime : new Date(),
			viewportLimits : [
				{ "type" : "small", "limit" : 400},
				{ "type" : "medium", "limit" : 600},
				{ "type" : "large", "limit" : 100000}
			]
		};

	// sort by viewport limits
	fourPIA.viewportLimits.sort( function( a, b ) {
			if (a.limit > b.limit) return -1;
			if (a.limit === b.limit) return 0;
			return 1;
		});
		
    // Returns the Model public API
    return fourPIA;

} );