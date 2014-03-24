// Pulse Model
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"highcharts",
	"dataGen",
	"../routers/mobileRouter",
	"../models/CategoryModel",
	"../models/PreferenceModel",
	"../models/DataModel",
	"tagcanvas",
	"highcharts_more",
	"highcharts_funnel"
], function( $, Backbone, HighCharts, DataGen, Mobile, CategoryModel, Preferences, DataModel, TagCanvas ) {

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
		
		DataGenFAUXhourlyData : function( lo, hi, date  ) {
				var data = [];
				date = date || new Date();
				date = new Date( date.getFullYear(), date.getMonth(), date.getDay() );
				
				for (var hour = 0; hour < 24; hour++) {
						data.push([
								Date.UTC( date.getFullYear(), date.getMonth(), date.getDay(), hour ),
								DataGen.utils.range( lo, hi )()
							])
					}
				return data;
			},
			
		makePulseCharts : function ( view, person )
		{
			var self = this;
			var pulseContainer = $(view.$el).find(".pulse-chart-container");
			
			if (!pulseContainer  ||  pulseContainer.length === 0)
			{
				return;
			}
			
			var drillCollection = $.CategoryRouter.drillDownView.collection;
			var person = undefined;
			if (drillCollection  &&  drillCollection.drillDown)
			{
				person = drillCollection.drillDown.person;
			}
			
			var charts = $(pulseContainer).find(".pulse-chart");
			_.each( charts, function( entry ) {
					var chartType = $(entry).attr("data-type");
					var func = self[ chartType ];
					var div;
					if (func)
					{
						div = func.apply( self, [view, entry, person, person ? person.sortName : undefined ] );
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
		
		dailyTweets : function( view, elem, person, personName  ) {
				var chartContainer = $("<div>")
					.css({
							"max-width" : window.innerWidth,
							"width" : window.innerWidth,
							"height" : "140px",
							"margin" : "0 auto"
						});
				
				var range = { hi : 10, lo : 0 };
				var series = [{
					name: 'Dem',
					color: '#232066',
					data: this.DataGenFAUXhourlyData( 0, 10, new Date( 2014, 2, 10) ),
					stack: 'dem'
				}, {
					name: 'Rep',
					color: '#E91D0E',
					data: this.DataGenFAUXhourlyData( 0, 10, new Date( 2014, 2, 10) ),
					stack: 'rep'
				}, {
					name: personName,
					color: '#f99600',
					data: this.DataGenFAUXhourlyData( 0, 10, new Date( 2014, 2, 10) ),
					stack: personName
				}];
				
				if (personName === undefined)
				{
					series.length = 2;
				}
				
				$(function () {
						$(chartContainer).highcharts({

							chart: {
								type: 'column'
							},

							title: {
								text: 'Daily Tweets'
							},

							xAxis: {
								 type: 'datetime'
							},

							yAxis: {
								allowDecimals: false,
								min: 0,
								title: {
									text: 'Tweets'
								}
							},

							tooltip: {
								enabled : false,
								shared : true,
								xformatter: function() {
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

							series: series
						});
					});
					
				return chartContainer;
			},
			
		followers : function( view, elem, person, personName ) {
				var chartContainer = $("<div>")
					.css({
							"max-width" : window.innerWidth,
							"width" : window.innerWidth,
							"height" : "140px",
							"margin" : "0 auto"
						});
						
				var range = { hi : 12345, lo : 50000 };
				var series = [{
					name: 'Dem',
					color: '#232066',
					data: this.DataGenFAUXhourlyData( 12345, 50000 ),
					stack: 'dem'
				}, {
					name: 'Rep',
					color: '#E91D0E',
					data: this.DataGenFAUXhourlyData( 12345, 50000 ),
					stack: 'rep'
				}, {
					name: personName,
					color: '#f99600',
					data: this.DataGenFAUXhourlyData( 12345, 50000 ),
					stack: personName
				}];
				
				if (personName === undefined)
				{
					series.length = 2;
				}
				$(function () {
						$(chartContainer).highcharts({

							chart: {
            					zoomType: 'xy'
							},

							title: {
								text: 'Daily Followers'
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
								enabled : false,
								shared : true,
								xformatter: function() {
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

							series: series
						});
					});
				
				return chartContainer;
			},
		funnel : function( view, elem, person, personName ) {
				var chartContainer = $("<div>")
					.css({
							"max-width" : window.innerWidth,
							"width" : window.innerWidth,
							"height" : "240px",
							"margin" : "0 auto"
						});
						
				$(function () {
						$(chartContainer).highcharts({
						chart: {
							type: 'funnel',
							marginRight: 100
						},
						title: {
							text: 'Tweet Funnel',
							x: -50
						},
						plotOptions: {
							series: {
								dataLabels: {
									enabled: true,
									format: '<b>{point.name}</b> ({point.y:,.0f})',
									color: 'black',
									softConnector: true
								},
								neckWidth: '30%',
								neckHeight: '25%'
								
								//-- Other available options
								// height: pixels or percent
								// width: pixels or percent
							}
						},
						tooltip: {
							enabled : false,
						},
						legend: {
							enabled: false
						},
						series: [{
							name: 'Unique users',
							data: [
								['Followers',   15654],
								['Retweets',       4064],
								['New Followers', 1987],
								['New Media',    976],
								['Tweets',    846]
							]
						}]
					});
					});
				
				return chartContainer;
			},
			
		gauge : function( view, elem, person, personName ) {
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
								type: 'gauge',
								plotBorderWidth: 1,
								plotBackgroundColor: {
									linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
									stops: [
										[0, '#FFF4C6'],
										[0.3, '#FFFFFF'],
										[1, '#FFF4C6']
									]
								},
								plotBackgroundImage: null,
								height: 200
							},
						
							title: {
								text: '4PIA meter'
							},
							
							pane: [{
								startAngle: -45,
								endAngle: 45,
								background: null,
								center: ['25%', '145%'],
								size: 300
							}, {
								startAngle: -45,
								endAngle: 45,
								background: null,
								center: ['75%', '145%'],
								size: 300
							}],	    		        
						
							yAxis: [{
								min: -20,
								max: 6,
								minorTickPosition: 'outside',
								tickPosition: 'outside',
								labels: {
									rotation: 'auto',
									distance: 20
								},
								plotBands: [{
									from: 0,
									to: 6,
									color: '#C02316',
									innerRadius: '100%',
									outerRadius: '105%'
								}],
								pane: 0,
								title: {
									text: 'VU<br/><span style="font-size:8px">Tweet Activity</span>',
									y: -40
								}
							}, {
								min: -20,
								max: 6,
								minorTickPosition: 'outside',
								tickPosition: 'outside',
								labels: {
									rotation: 'auto',
									distance: 20
								},
								plotBands: [{
									from: 0,
									to: 6,
									color: '#C02316',
									innerRadius: '100%',
									outerRadius: '105%'
								}],
								pane: 1,
								title: {
									text: 'VU<br/><span style="font-size:8px">Follower Activity</span>',
									y: -40
								}
							}],
							
							plotOptions: {
								gauge: {
									dataLabels: {
										enabled: false
									},
									dial: {
										radius: '100%'
									}
								}
							},
								
						
							series: [{
								data: [-20],
								yAxis: 0
							}, {
								data: [-20],
								yAxis: 1
							}]
						
						},
						
						// Let the music play
						function(chart) {
							setInterval(function() {
								var left = chart.series[0].points[0],
									right = chart.series[1].points[0],
									leftVal, 
									inc = (Math.random() - 0.5) * 3;
						
								leftVal =  left.y + inc;
								rightVal = leftVal + inc / 3;
								if (leftVal < -20 || leftVal > 6) {
									leftVal = left.y - inc;
								}
								if (rightVal < -20 || rightVal > 6) {
									rightVal = leftVal;
								}
						
								left.update(leftVal, false);
								right.update(rightVal, false);
								chart.redraw();
						
							}, 500);
						
						});
					});
					
				return chartContainer;
			}
    };

    // Returns the View class
    return publicAPI;

} );