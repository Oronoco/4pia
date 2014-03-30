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
	constants.quarterHour = constants.min * 15;
	constants.halfHour = constants.quarterHour * 2;
	constants.hour = constants.halfHour * 2;
	constants.quarterDay = constants.hour * 6;
	constants.halfDay = constants.quarterDay * 2;
	constants.day = constants.halfDay * 2;
	constants.week = constants.day * 7;

	var fourPIA = { 
			repSearch : "tweetsOnly", 
			liveData : true,
			constants : constants,
			minTweetCloudSize : 3,
			startTime : new Date(),
			splashTime : 3000,
			refresh	:	{
					cnt : 0,
					lastRefresh : new Date(),
					duration : constants.min * 1,
				},
			viewportSize : {},
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