// Preference Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"underscore"
], function( $, Backbone, _ ) {

	var constants = {};
	constants.sec = 1000;
	constants.min = constants.sec * 60;
	constants.hour = constants.min * 60;
	constants.day = constants.hour * 60;

	var fourPIA = { 
			repSearch : "tweetsOnly", 
			liveData : true,
			constants : constants,
			minTweetCloudSize : 3,
			startTime : new Date(),
			splashTime : 2000,
			refresh	:	{
					cnt : 0,
					lastRefresh : new Date(),
					duration : constants.min * 1,
				},
			viewportLimits : [
				{ "type" : "small", "limit" : 400},
				{ "type" : "medium", "limit" : 600},
				{ "type" : "large", "limit" : 100000}
			]
		};

	var liveData = document.location.href.gup( "liveData");
	if (liveData === "true") fourPIA.liveData = true;
	if (liveData === "false") fourPIA.liveData = false;

	// sort by viewport limits
	fourPIA.viewportLimits.sort( function( a, b ) {
			if (a.limit > b.limit) return -1;
			if (a.limit === b.limit) return 0;
			return 1;
		});
		
    // Returns the Model public API
    return fourPIA;

} );