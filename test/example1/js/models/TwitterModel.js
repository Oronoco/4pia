// Data Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"underscore",
	'numeral', 
	"datejs",
	"../models/EnvModel",
	"../models/DataModel",
	"../models/PreferenceModel",
	"../collections/CategoriesCollection",
	"jstorage"
], function( $, Backbone, _, Numeral, datejs, ENV, DataModel, Preferences, CategoriesCollection ) {

    // The Model constructor
    var twitterModels = {};

	 function parseHTML( html, person, categoryClass, d) 
	 {
		d = d || new Date();
		var data = [];
		var start = html.indexOf("<div class=\"stream profile-stream\">");
		var end = html.indexOf("</ol>");
		var ss = html.substring( start, end );
		start = ss.indexOf( "<ol" );
		ss = ss.substring( start ) + "</ol></div>";
		
		var div = $( "<div>" ).html(ss);
		var items = $(div).find("li[data-item-type]");

		_.each( items, function( item, index ) {
				var xx = $(item).html();
//		if (true) console.log( index, xx );
//				if (index > 10) return;

				var tweet 	= $(item).find(".tweet");
				if (tweet.length === 0) return;
				var time 	= $(tweet).find(".time");
				var text 	= $(tweet).find(".tweet-text");
				var hashtags = $(text).find(".twitter-hashtag");
				var links 	= $(text).find(".twitter-timeline-link");
				var cards 	= $(tweet).find("[data-card-type]");
				
				var timestamp = $(time).find("[data-time]").attr("data-time")  ||  new Date().getTime();
				timestamp = parseInt( timestamp, 10 );
				var tweetDate = new Date( timestamp * 1000 );
				timestamp	= new Date( timestamp );
				timestamp_formatted = tweetDate.format("h:MM tt");
							
				var description = $(text).text();

				var href = undefined;
				if (hashtags.length > 0)
				{
					href = $(hashtags).filter("[data-query-source='hashtag_click']").attr("href");
					href = "https://twitter.com" + href;
				}
				
				if (links.length > 0)
				{
					_.each( links, function( elem ) {
							var linkText = $(elem).text();
							
							// remove the linkText from the description
							var resultText = description.replace( linkText, "" );
							if (resultText.length != description.length )
							{
								// if something was removed then remember that link
								href = $(elem).attr("href") ||  linkText;
								description = resultText;
							}
						});
						
//					href = $(hashtags).filter("[data-query-source='hashtag_click']").attr("href");
				}
				
				var cardContent = undefined;
				if (cards.length > 0)
				{
					var photo = $(cards).filter("[data-card-type='photo']");
					var img = $(photo).find("img");
					cardContent = $(img).attr("src");
					if (cardContent === undefined)
					{
						cardContent = $(photo).find("[data-img-src]").attr("data-img-src");
					}
					
				}

				var tmpl = {
						person : person.name,
						type : "timeline_category_" + categoryClass,
						categoryClass : categoryClass,
						timestamp : tweetDate,
						timestamp_formatted : timestamp_formatted,
						description : description.trim(),
						href	: href,
						cardContent	: cardContent,
					};
					
				data.push( tmpl );
				
			});
			
			data.sort( function( a, b ) {
					var aTime = a.timestamp.getTime();
					var bTime = b.timestamp.getTime();
					if (aTime < bTime) return 1;
					if (aTime === bTime) return 0;
					return -1;
				});
				
		return data;
	}
	var publicAPI = {
			models : twitterModels,
			
			refresh : function ( personKey ) {
					if (personKey) delete twitterModels[ personKey ]
					else twitterModels = {};
				},
				
			loadPersonTweets : function ( personKey, req_timestamp  ) {

					if (!Preferences.liveData  ||  ENV.isLocalHost ) personKey = "SenFeinstein";
					
					var person = _.find( DataModel.models.people, function( entry, key ) {
							return  entry.key === personKey;
						});
					if (person === undefined)
					{
						return;
					}
					
					var twitterURL_live = "https://twitter.com/" + person.key;
					var twitterURL_local = "data/view-source twitter.com " + person.key + ".html";
					
					var dfd_loader = $.Deferred();
					
					var tweetFeed = twitterModels[ person.key ];
					if (tweetFeed)
					{
						dfd_loader.resolve( tweetFeed, req_timestamp );
					}
					else
					{
						var dfd_twitter = $.Deferred();
						$.get(Preferences.liveData ? twitterURL_live : twitterURL_local )
							.done(function(response,status,xhr){
									dfd_twitter.resolve( [ response ]);
								})
							.fail(function(){
									console.log("************ twitter.com Failed: " , twitterURL_local, JSON.stringify( arguments ));
									$.get( twitterURL_local )
										.done(function(response,status,xhr){
												dfd_twitter.resolve( [ response ] );
											})
										.fail(function(){
												console.log("************ twitter.com Failed - Check file access issue: ", twitterURL_local , JSON.stringify( arguments));
												alert("dfd_tweetCloud Failed - Check file access issue " + twitterURL_local);
												dfd_twitter.reject();
											});
								});
						
						$.when( dfd_twitter )
							.done( function( twitterHTML ) {
									var tweetFeed = parseHTML( twitterHTML[0], person, "dtweets" );
									var myCollection = new CategoriesCollection( tweetFeed, { type: "tweetFeed" } ); 
									twitterModels[ person.key ] = myCollection;
									dfd_loader.resolve( myCollection, req_timestamp );
								});
					}
					
					return dfd_loader;
				},
		};
		
    // Returns the Model public API
    return publicAPI;

} );