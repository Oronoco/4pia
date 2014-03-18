// Pulse Model
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"highcharts",
	"../routers/mobileRouter",
	"../models/CategoryModel",
	"../models/PreferenceModel",
	"../models/DataModel",
	"tagcanvas"
], function( $, Backbone, HighCharts, Mobile, CategoryModel, Preferences, DataModel, TagCanvas ) {

	var body = $('body'),
		chartDefaultCSS = {
			"font-family" 	   : body.css("font-family"),
			"font-weight"      : body.css("font-weight"),
			"font-size"   	   : body.css("font-size"),
			"axis-font-size"   : "11px", //"9px"
			"legend-font-size"   : "11px",
			"axis-title-size"   : "12px",
			"axis-font-color"  : "#888",
			"axis-color"       : '#cccccc',
			"fill" 			   : "transparent",
			"color" 		   : body.css("color"),
			'text-transform': 'uppercase'
		};
		
    Highcharts.setOptions({
    	chart: {
			backgroundColor : "transparent",  // this is also the color used with export
			plotBackgroundColor: "transparent",
    		style: {
    			'fontFamily' : chartDefaultCSS['font-family'],
    			'fontSize'	 : chartDefaultCSS['font-size'],
    			'color'		 : chartDefaultCSS['color'],
    			'overflow'	 : 'none'
    		}
    	},
		credits : {
				enabled : false
			},
    	legend : {
			verticalAlign   : 'top',
        	layout			: 'vertical',
			align 			: 'right',
			floating 		: false,
			borderWidth		: 0,
        	borderRadius	: 0,
			symbolPadding	: 5,
			symbolWidth		: 15,
        	margin			: 0,
			itemStyle 		: {
				color : chartDefaultCSS[ "axis-font-color" ],
				fontSize : chartDefaultCSS[ "legend-font-size" ]
			}
		},
    	xAxis: {
    		tickLength:0,
    		lineColor 		: chartDefaultCSS['axis-color'],  // line color for x-axis
    		title: {
	    		style: {
	    			fontWeight: "plain",
					color : chartDefaultCSS[ "axis-font-color" ],
					fontSize : chartDefaultCSS[ "axis-font-size" ],
					fontFamily : chartDefaultCSS[ "font-family" ],
					textTransform:  'uppercase'
				}
			}
    	},
    	yAxis: {
    		tickLength:0,
    		title: {
	    		style: {
					fontWeight: "plain", //DE2605
					color : chartDefaultCSS[ "axis-font-color" ],
					fontSize : chartDefaultCSS[ "axis-font-size" ],
					fontFamily : chartDefaultCSS[ "font-family" ],
					textTransform:  'uppercase'
				}
			},
			labels: {
				style: {
					fontWeight: "plain",
					textTransform: 'uppercase'
				}
			}
    	}
    });		

	var publicAPI = {
						
		makePulseCharts : function ( view )
		{
			var self = this;
			var pulseContainer = $(view.$el).find(".pulse-chart-container");

			if (!pulseContainer  ||  pulseContainer.length === 0)
			{
				return;
			}
			var charts = $(pulseContainer).find(".pulse-chart");
			_.each( charts, function( entry ) {
					var chartType = $(entry).attr("data-type");
					var func = self[ chartType ];
					var div;
					if (func)
					{
						div = func.apply( self, [view, entry ] );
					}
					else
					{
						div = $("<div>")
							.text(chartType);
					}
					
					$(entry)
						.empty()
						.append( div );
				});
		},
		
		dailyTweets : function( view, elem ) {
				var chartContainer = $("<div>")
					.css({
							"max-width" : window.innerWidth,
							"width" : window.innerWidth,
							"height" : "140px",
							"margin" : "0 auto"
						});
						
				$(function () {
						$(chartContainer).highcharts({

							chart: {
								type: 'column'
							},

							title: {
								text: 'Daily Tweets'
							},

							xAxis: {
								categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
							},

							yAxis: {
								allowDecimals: false,
								min: 0,
								title: {
									text: 'Tweets'
								}
							},

							tooltip: {
								formatter: function() {
									return '<b>'+ this.x +'</b><br/>'+
										this.series.name +': '+ this.y +'<br/>'+
										'Total: '+ this.point.stackTotal;
								}
							},

							plotOptions: {
								column: {
									stacking: 'normal'
								}
							},

							series: [{
								name: 'Dem',
								color: '#232066',
        						data: [3, 4, 4, 2, 5, 3, 1],
								stack: 'dem'
							}, {
								name: 'Rep',
								color: '#E91D0E',
        						data: [3, 0, 4, 4, 3, 2, 4],
								stack: 'rep'
							}, {
								name: 'me',
								color: '#0F0',
        						data: [3, 0, 4, 4, 3, 2, 4],
								stack: 'me'
							}]
						});
					});
    
				return chartContainer;
			},
			
		followers : function( view, elem ) {
				var chartContainer = $("<div>")
					.css({
							"max-width" : window.innerWidth,
							"width" : window.innerWidth,
							"height" : "140px",
							"margin" : "0 auto"
						});
						
				$(function () {
						$(chartContainer).highcharts({

							chart: {
            					zoomType: 'xy'
							},

							title: {
								text: 'Hourly Followers'
							},

							xAxis: {
								 type: 'datetime'
							},

							yAxis: {
								allowDecimals: false,
								min: 0,
								title: {
									text: 'Followers'
								}
							},

							tooltip: {
								formatter: function() {
									return '<b>'+ this.x +'</b><br/>'+
										this.series.name +': '+ this.y +'<br/>'+
										'Total: '+ this.point.stackTotal;
								}
							},

							plotOptions: {
								column: {
									stacking: 'normal'
								}
							},

							series: [{
								name: 'Dem',
								color: '#232066',
        						data: [
									[Date.UTC(2010, 0, 1, 10), 12312],
									[Date.UTC(2010, 0, 1, 20), 12312],
									[Date.UTC(2010, 0, 2, 10), 12432],
									[Date.UTC(2010, 0, 2, 20), 11253],
									[Date.UTC(2010, 0, 3, 10), 15345],
									[Date.UTC(2010, 0, 3, 20), 62346],
									[Date.UTC(2010, 0, 4, 10), 34234],
									[Date.UTC(2010, 0, 4, 20), 32454] 
        						],
								stack: 'dem'
							}, {
								name: 'Rep',
								color: '#E91D0E',
        						data: [
									[Date.UTC(2010, 0, 1, 10), 23542],
									[Date.UTC(2010, 0, 1, 20), 34214],
									[Date.UTC(2010, 0, 2, 10), 32142],
									[Date.UTC(2010, 0, 2, 20), 23412],
									[Date.UTC(2010, 0, 3, 10), 42324],
									[Date.UTC(2010, 0, 3, 20), 23234],
									[Date.UTC(2010, 0, 4, 10), 43123],
									[Date.UTC(2010, 0, 4, 20), 43433]  
        						],
								stack: 'rep'
							}, {
								name: 'me',
								color: '#0F0',
        						data: [
									[Date.UTC(2010, 0, 1, 10), 23542],
									[Date.UTC(2010, 0, 1, 20), 34214],
									[Date.UTC(2010, 0, 2, 10), 32142],
									[Date.UTC(2010, 0, 2, 20), 23412],
									[Date.UTC(2010, 0, 3, 10), 42324],
									[Date.UTC(2010, 0, 3, 20), 23234],
									[Date.UTC(2010, 0, 4, 10), 43123],
									[Date.UTC(2010, 0, 4, 20), 43433]  
        						],
								stack: 'me'
							}]
						});
					});
    
				return chartContainer;
			},
			
		makeDrillDownCharts : function ( chartContainer, params )
		{
			var defaults = {
				width:320,
				height:240,
				bgColor:"EEEEEE",
				colors:"",
				toLegend: function( x ) { return x }
			};

			params = $.extend( {}, defaults, params );
			var yearChart = $("<img id=funFacts_year>");
			var monthChart = $("<img id=funFacts_month>");
			var dayChart = $("<img id=funFacts_day>");
	
			var charts = $("<div>")
				.append(yearChart)
				.append(monthChart)
				.append(dayChart);
		
			$(chartContainer)
				.append( charts );
		
			function getChartValues( container, name, params )
			{
				var variables = {};
				variables.sorting = {
						byDate_day : {
								01: 2,
								02: 2,
								03: 2,
								04: 1,
								05: 2,
								06: 4,
								07: 1,
								08: 2,
								09: 4,
								10: 3,
								11: 3,
								12: 4,
								13: 3,
								14: 2,
								15: 1,
								16: 4,
								17: 1,
								20: 1,
								21: 6,
								23: 1,
								24: 3,
								25: 5,
								26: 1,
								27: 2,
								28: 3,
								29: 2,
								31: 1						
							},
						byDate_month : {
								01: 8,
								02: 2,
								03: 8,
								04: 5,
								05: 4,
								06: 10,
								07: 1,
								08: 1,
								09: 9,
								10: 6,
								11: 3,
								12: 9
							},
						byDate_year : {
								2004: 7,
								2005: 8,
								2006: 7,
								2007: 7,
								2008: 6,
								2009: 8,
								2010: 6,
								2011: 6,
								2012: 5,
								2013: 5,
								2014: 1						
							}
					}
				var temp = [];
				for (var item in variables.sorting[ name ])
				{
					temp.push( item );
				}
				temp.sort();

				var legends = "";
				var data = "";
				var maxValue = 0;
		
				if (params.sequence)
				{
					temp = params.sequence;
				}
				for (var x = 0; x < temp.length; x++)
				{
					var value = variables.sorting[ name ][ temp[x] ];
					if (value == undefined) value = 0;
					data += "," + value;
					legends += "|" + params.toLegend( temp[x] );
					maxValue = Math.max( value, maxValue );
				}
		//		console.log(data);

				var template = "http://chart.apis.google.com/chart?chf=bg,s,{bgColor}&chxl=0:{legends}&chco={colors}&chxr=1,0,{max}&chxt=x,y&chbh=a&chs={dimensions}&cht=bvs&chds=0,{max}&chd=t:{data}&chtt={title}";
				url = template.replace(/{dimensions}/g, Math.floor(params.width / 3) + "x" + params.height)
					 .replace(/{bgColor}/g, params.bgColor)
					 .replace(/{max}/g, maxValue)
					 .replace(/{colors}/g, params.colors)
					 .replace(/{data}/g, encodeURIComponent(data.substring(1)) )
					 .replace(/{legends}/g, encodeURIComponent(legends) )
					 .replace(/{title}/g, encodeURIComponent(params.title) );
			 
		//		console.log(url);
		
				var img = $("<img id=funFactsChart_" + name + ">")
					.attr( "src", url )
					.css("width", params.width / 3)
					.css("height", params.height)
					.css("margin-right", "10px")

				$(chartContainer)
					.append(img);
		
				return {maxValue:maxValue, legends:legends, data:data, url:url };

			}
			
			params.title = "# Dinners per Year";
			params.colors = "004970";
			params.toLegend = function(x) { x = x % 100; return "'" + ((x<10)?"0":"") + x };
			getChartValues( yearChart, "byDate_year", params ); 
	
			params.title = "Most Popluar Months";
			params.colors = "A29B76";
			params.toLegend = function(x) { v = parseInt(x, 10) - 1; return (v%2)==0 ?monthNames_abbv[v]:"" };
			getChartValues( monthChart, "byDate_month", params ); 
	
			params.title = "Most Popular Days";
			params.colors = "692F2F";
			params.sequence = ["01","02","03","04","05","06","07","08","09",10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 ];
			params.toLegend = function(x) { return ((x % 5) == 0  && x!=30) ||(x==31)||(x==1)? parseInt(x, 10) : "" };
			getChartValues( dayChart, "byDate_day", params ); 
		},

  
    };

    // Returns the View class
    return publicAPI;

} );