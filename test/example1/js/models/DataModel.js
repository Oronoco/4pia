// Data Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"underscore",
	'numeral', 
	"datejs",
	"../models/PreferenceModel",
	"../models/PeopleModel",
	"jstorage"
], function( $, _, Numeral, datejs, Preferences, PeopleModel ) {

    // The Model constructor
    var dataModels = {};

	 function parseHTML( html, categoryClass, d) 
	 {
		d = d || new Date();
		var data = [];
		var start = html.indexOf("<!-- SCROLLER CONTENT STARTS HERE -->");
		var end = html.indexOf("<!-- SCROLLER CONTENT ENDS HERE -->");
		var ss = html.substring( start, end );
		start = ss.indexOf( "<table" );
		ss = ss.substring( start );
		
		var meta = [
				{ name : "campaignDebt", tag : /([-,0-9]+) CampaignDebt$/, format : "$#,###" },
				{ name : "followers", tag : /([-,0-9]+) followers$/ },
				{ name : "cashOnHand", tag : /([-,0-9]+) CashOnHand$/, format : "$#,###" },
			];
		
		var div = $( "<div>" ).html(ss);
		var table = $(div).find("table");

		_.each( table, function( tbl, index ) {
				var xx = $(tbl).html();
//		if (true) console.log( index, $(tbl).html());
//				if (index > 10) return;
				var spans = $(tbl).find("span");
				
				var tds = $(tbl).find("td");
				var person = $(spans[0]).text();
				var timestamp = person.match(/\s*(0?[1-9]|1[012]):([0-5]\d)\s*([APap])[mM]$/);
				var timestamp_formatted;
				if (timestamp)
				{
					person = person.substring( 0, person.length - timestamp[0].length ).trim();
					var hour = parseInt( timestamp[1], 10);
					var min = parseInt( timestamp[2], 10);
					if (timestamp[3] === "P")
					{
						if (hour !=12)
							hour += 12;
					}
					else
					{
						if (hour === 12)
							hour = 0;
					}
//					if (hour === 5 &&  min === 19) debugger;
					
					timestamp = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, min);
					timestamp_formatted = new Date( timestamp ).format("h:MM tt");
//				console.log( xx, timestamp_formatted );
				}

				var twitter = spans[1];
				
				
				var description = $(tds[3]).text();
				var hrefs = $(tds[3]).find("a");
				var href = hrefs[0].href;
				var tmpl = {
						person : person,
						type : "timeline_category_" + categoryClass,
						categoryClass : categoryClass,
						timestamp : timestamp,
						timestamp_formatted : timestamp_formatted,
						description : description,
						href	: href
					};
				
				_.each( meta, function( entry , key ) {
						var match = $(spans[2]).text().match( entry.tag );
						if (_.isArray(match))
						{
							var value = parseInt( match[1].replace( /,/g, ""), 10 );
							tmpl[ entry.name ] = value;
							tmpl[ entry.name + "_formatted" ] = Numeral(value).format( entry.format ||  "#,###");
						}
						else
						{
							tmpl[ entry.name ] = undefined;
							tmpl[ entry.name + "_formatted" ] = undefined;
						}
					});
					
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
			models : dataModels,
			
			updateSearchCounts : function ( categories )
			{
				return $.CategoryRouter.searchView.countSearchTweets();
			},
			
			updateSearchModel : function( collection ) {
					var lookup = {};
					dataModels.search = [
							{ "category": "search", "type": "obama", createdOn : new Date() },
							{ "category": "search", "type": "today", createdOn : new Date() },
						];
						
					var storedValues = $.jStorage.get( Preferences.storageAuthKey );
					if (storedValues === null)
					{
						storedValues = [];
					}
					else
					{
						dataModels.search = [];
					}
					
					if (collection)
					{
						dataModels.search = collection.toJSON();
						storedValues = []; 
					}
					
					_.each( dataModels.search, function( entry ) {
							lookup[ entry.type ] = entry;
						});
						
						
					_.each( storedValues, function( entry ) {
							entry.category = "search";
							entry.createdOn = entry.d;
							entry.type = entry.t;
							if (lookup[ entry.type ] === undefined)
							{
								lookup[ entry.type ] = entry;
							}
						});
						
					storedValues = []; 
					dataModels.search = [];
					_.each( lookup, function( entry ) {
							dataModels.search.push( entry );
							storedValues.push({
									 "t": entry.type, 
									 "d" : entry.createdOn
								});
						});
						
					
					$.jStorage.set( Preferences.storageAuthKey, storedValues );
				},
				
			refresh : function() {
					
					var self = this;
					location.hash = location.hash.replace(/\#.*$/, "#categories");
					var d =  new Date( Preferences.refresh.lastRefresh );
					var refreshTimeStamp = Preferences.refresh.lastRefresh.getTime() + Preferences.refresh.duration;
					var refreshDiff = (refreshTimeStamp - new Date().getTime());
					var willRefresh = (refreshDiff <= 0)
					
					var msg = "";
					var msgclass = "";
					if (willRefresh)
					{
						msgclass = ".lastRefresh";
						msg = d.format("mmm d, yyyy")
							+ " at "
							+  d.format("h:MM tt");
							
						
					}
					else
					{
						msgclass = ".nextRefresh";
						msg = Math.round( refreshDiff / 1000 );
					}
					
					$(".forpia-header-refresh").find(".refreshMsg")
						.hide();

					$(".forpia-header-refresh").find( msgclass )
						.show();
					$(".forpia-header-refresh-text").text( msg );
					$(".forpia-header-refresh")
						.slideDown("slow");
						
					var delay = 3000;
					var dfd_delay = $.Deferred();
					setTimeout(function() {
								dfd_delay.resolve(true);
							}, delay
						);
					
					messageFromProfile( "#refreshDelay:" + refreshDiff );

					if (willRefresh)
					{
						var dfd_refresh = $.Deferred();
						$.when( dfd_delay, dfd_refresh )
							.done(function() {
									$.mobile.changePage( "#categories" , { reverse: false, changeHash: false } );
									
									$(".forpia-header-refresh")
										.slideUp("fast");
															
									$.mobile.loading( "hide" );
								});
						
							// Show's the jQuery Mobile loading icon
						$.mobile.loading( "show" );
						Preferences.refresh.cnt++;
						
						this.loadFAUXdata( function() {
								
								dfd_refresh.resolve(true);
								
							}, Preferences.refresh.cnt);
					}
					else
					{
						dfd_delay
							.done(function() {
									$(".forpia-header-refresh")
										.slideUp("fast");
								})
					}
			},
				
			loadCategories : function( method, model, options ) {
					var dataset = dataModels[ model.type ];
					
					if (dataset)
					{
						return dataset;
					}
					return undefined;
				},
				
			markupTweetCloud : function( cloud ) {

					var pos = cloud.indexOf("<body>") + 6;
					var str = cloud.substring( pos );
					var div = $("<div>").html(str);
					var contents = $(div).find("#contents")
						.addClass("tweetCloudContents");
						
					var header = $(contents).find("h2")
						.addClass("tweetCloudHeader");
						
					var container = $(contents).find("center").find("div")
						.addClass("tweetCloudContainer");
					
					var spans = $(contents).find("font").find("span");
					var tagcanvas = $("<ul>");
					var sizes = {};
					var itemIndex = 0;
					_.each( spans, function( span ) {
							var fs = $(span).css("font-size");
							var size = sizes[ fs ];
							if (size === undefined)
							{
								size = [];
								sizes[fs] = size;
							}
							size.push( span );
							
							$(span)
								.addClass("tweetCloudItem");
								
							var text = $(span).text();
							if (text.length >= Preferences.minTweetCloudSize)
							{
								 
								var aref = $("<a href='#tagcanvas?" + itemIndex + "' class='tweetCloudItem'>")
									.text( text );
									
								var li = $("<li class='tagcanvas tagcanvas" + itemIndex + "' >")
									.append(aref);
								tagcanvas
									.append( li );
									
								size.push( li );
								itemIndex++;
							}
							else
							{
								$(span)
									.hide();
							}
						});
						
					var maxSizes = 5;
					var fontScale = 1;
					if (Preferences.viewportSize.type !== "large")
					{
						var pad = 10;
						fontScale = (Preferences.viewportSize.limit - pad) / 850;
						$(container).css({width : window.innerWidth - pad});
					}
					var cnt = 0;
					var min = undefined;
					var max = undefined;
					_.each( sizes, function( items, pxSize ) {
							var px = parseInt( pxSize, 10 );
							max = Math.max( max || 0, px );
							min = Math.min( min  || px, px );
							cnt++;
						});
						
					var bucketSize = max / maxSizes;
					
					_.each( sizes, function( items, pxSize ) {
							var px = parseInt( pxSize, 10 );
							px = Math.round( (px - min) / bucketSize );
							var fontSize = min + px * bucketSize * fontScale;
//							console.log( pxSize, px , fontSize, min, max, bucketSize, maxSizes );
							var sizeClass = "tweetCloudSize" + px;
							
							var fontColor = undefined;
							if (maxSizes - px < 2)
							{
								fontColor = "#0F0";
							}
							
							if (fontColor)
							{
								$(items)
									.css({"color" : fontColor});
							}
							
							$(items)
								.addClass( sizeClass )
								.css({"font-size" : fontSize});
						});
					
					dataModels.ctweets = contents;
					dataModels.tagcanvas = tagcanvas;
					
				},
				
			updateCounts : function() {
					if (dataModels.bios === undefined) debugger;
					$("body").find(".biocnt").text( dataModels.bios.length );
					$("body").find(".dailycnt").text( dataModels.daily.length );
					$("body").find(".rtweetcnt").text( dataModels.rtweets.length );
					$("body").find(".dtweetcnt").text( dataModels.dtweets.length );
				},

			loadFAUXdata : function ( callback, numRefreshes ) {
					var self = this;
					var demoDataDate = new Date( 2014, 02, 10);
					var dataDate = (Preferences.liveData ? new Date() : demoDataDate);
								
					var ctweets_debug = document.location.href.gup( "ctweets");
					
					var dfd_dnews = $.Deferred();
					$.get( Preferences.liveData ? "http://4pia.com/Dnews_window.php" : "data/view-source 4pia.com Dnews_window.php.html" )
						.done(function(response,status,xhr){
								dfd_dnews.resolve( [ response ]);
							})
						.fail(function(){
								console.log("************ Dnews_window Failed - Check CORS Access-Control-Allow-Origin issue: " , JSON.stringify( arguments));
								$.get("data/view-source 4pia.com Dnews_window.php.html")
									.done(function(response,status,xhr){
											dataDate = demoDataDate;
											dfd_dnews.resolve( [ response ] );
										})
									.fail(function(){
											console.log("************ Dnews_window Failed - Check file access issue: " , JSON.stringify( arguments));
											alert("dfd_tweetCloud Failed - Check file access issue");
											dfd_dnews.reject();
										});
							});
		
					var dfd_rnews = $.Deferred();
					$.get(Preferences.liveData ? "http://4pia.com/Rnews_window.php" : "data/view-source 4pia.com Rnews_window.php.html")
						.done(function(response,status,xhr){
								dfd_rnews.resolve( [ response ]);
							})
						.fail(function(){
								console.log("************ Rnews_window Failed - Check CORS Access-Control-Allow-Origin issue: " , JSON.stringify( arguments));
								$.get("data/view-source 4pia.com Rnews_window.php.html")
									.done(function(response,status,xhr){
											dataDate = demoDataDate;
											dfd_rnews.resolve( [ response ] );
										})
									.fail(function(){
											console.log("************ Rnews_window Failed - Check file access issue: " , JSON.stringify( arguments));
											alert("dfd_tweetCloud Failed - Check file access issue");
											dfd_rnews.reject();
										});
							});
		
					var dfd_ctweets = $.Deferred();
					$.get(Preferences.liveData ? "http://4pia.com/TweetCloud.php" : "data/view-source 4pia.com ctweet_window.php.html" )
						.done(function(response,status,xhr){
								dfd_ctweets.resolve( [ response ]);
							})
						.fail(function(){
								console.log("************ dfd_tweetCloud Failed - Check CORS Access-Control-Allow-Origin issue: " , JSON.stringify( arguments));
								$.get("data/view-source 4pia.com ctweet_window.php.html")
									.done(function(response,status,xhr){
											dfd_ctweets.resolve( [ response ] );
										})
									.fail(function(){
											console.log("************ dfd_tweetCloud Failed - Check file access issue: " , JSON.stringify( arguments));
											alert("dfd_tweetCloud Failed - Check file access issue");
											dfd_ctweets.reject();
										});
							});

					var dfd_people = PeopleModel.loadModel();
					
					$.when( dfd_dnews, dfd_rnews, dfd_people, dfd_ctweets)
						.done( function(dnews, rnews, people, cloud) {
								dataModels.dtweets = parseHTML( dnews[0], "dtweets", dataDate );
								dataModels.rtweets = parseHTML( rnews[0], "rtweets", dataDate );
								
								if (document.location.href.gup( "zeroData"))
								{
									dataModels.dtweets = [];
									dataModels.rtweets = [];
								}
								
								dataModels.daily = [];
								_.each(dataModels.dtweets, function(entry) {
										dataModels.daily.push( entry );
									});
								_.each(dataModels.rtweets, function(entry) {
										dataModels.daily.push( entry );
									});
								dataModels.daily.sort( function( a, b ) {
										var aTime = a.timestamp.getTime();
										var bTime = b.timestamp.getTime();
										if (aTime < bTime) return 1;
										if (aTime === bTime) return 0;
										return -1;
									});
									
								var tweetCnt = {};
								_.each( dataModels.daily, function( entry ) {
									
										var sortName = entry.person.sortName()

										var cnt = tweetCnt[ sortName ];
										if (cnt === undefined)
										{
											cnt = 0;
										}
										cnt++;
										tweetCnt[ sortName ]= cnt;
									});
									
								dataModels.bios = [];
								_.each( people, function( bio, key ) {
										var cnt = tweetCnt[ bio.sortName ] || undefined;
										dataModels.bios.push( {category : "bios", bio : bio, tweetCnt : cnt } );
									});
								dataModels.bios.sort(function(a, b) {
//										if (a.bio.sortName === "Denny Heck") return -1;
										return a.bio.sortName.localeCompare( b.bio.sortName );
									});
									
								self.updateSearchModel();
								
								dataModels.drillDown = [];
								dataModels.people = people;
								if (cloud !== true)
								{
									self.markupTweetCloud( cloud[0] );
								}

								self.updateCounts();
								
								Preferences.refresh.lastRefresh = new Date();

								callback();
							});
				},
		};
		
    // Returns the Model public API
    return publicAPI;

} );