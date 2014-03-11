// Data Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"underscore",
	'numeral', 
	"datejs"
], function( $, Backbone, _, Numeral, datejs ) {

    // The Model constructor
    var dataModels = {};

	 function parseHTML( html, categoryClass ) 
	 {
		var d = new Date();
		var data = [];
		var start = html.indexOf("<!-- SCROLLER CONTENT STARTS HERE -->");
		var end = html.indexOf("<!-- SCROLLER CONTENT ENDS HERE -->");
		var ss = html.substring( start, end );
		start = ss.indexOf( "<table" );
		ss = ss.substring( start );
		
		var div = $( "<div>" ).html(ss);
		var table = $(div).find("table");
		_.each( table, function( tbl, index ) {
//s				if (index > 10) return;
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
						hour += 11;
						
					timestamp = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, min);
					timestamp_formatted = new Date( timestamp ).format("h:MM tt");
				}

				var twitter = spans[1];
				var followers = $(spans[2]).text().match(/([-,0-9]+) followers$/);
				followers = parseInt( followers[1].replace( /,/g, ""), 10 );
				var followers_formatted = Numeral(followers).format("#,###");
				
				var description = $(tds[3]).text();
				var hrefs = $(tds[3]).find("a");
				var href = hrefs[0].href;
				var tmpl = {
						person : person,
						type : categoryClass,
						timestamp : timestamp,
						timestamp_formatted : timestamp_formatted,
						followers : followers,
						followers_formatted : followers_formatted,
						description : description,
						href	: href
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
			models : dataModels,
			loadCategories : function( method, model, options ) {
					var dataset = dataModels[ model.type ];
					if (dataset)
					{
						return dataset;
					}
					return undefined;
				},
			loadFAUXdata : function ( callback ) {
					var dfd_dnews = $.get("data/view-source 4pia.com Dnews_window.php.html");
					var dfd_rnews = $.get("data/view-source 4pia.com Rnews_window.php.html");
					
					$.when( dfd_dnews, dfd_rnews )
						.done( function(dnews, rnews) {
								dataModels.dtweets = parseHTML( dnews[0], "timeline_category_dtweets" );
								dataModels.rtweets = parseHTML( rnews[0], "timeline_category_rtweets" );
								dataModels.drillDown = [];

								$("body").find(".rtweetcnt").text( dataModels.rtweets.length );
								$("body").find(".dtweetcnt").text( dataModels.dtweets.length );
								callback();
							});
				},
		};
		
    // Returns the Model public API
    return publicAPI;

} );