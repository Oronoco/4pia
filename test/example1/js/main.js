// Sets the require.js configuration for your application.

function removeFromGlobal(name, force) 
{
    var ptr = this[name];
    try
	{
        delete this[name];
    }
	catch (e)
	{
        this[name] = undefined;
    }
    return ptr;
}

require.config( {

	// 3rd party script alias names
	paths: {

		// Core Libraries
		"jquery": "../../libs/js/jquery-1.10.2.min",
		"datejs": "../../libs/js/date",
		"numeral" : '../../libs/js/numeral',
		"class": '../../libs/js/my.class',
        "tbd" : '../../libs/js/tbd',
		"jstorage": "../../libs/js/jstorage",
		"dataGen" : '../../js/dataGen',
		"tagcanvas" : '../../libs/js/tagcanvas/jquery.tagcanvas.min',
		"jquerymobile": "../../libs/js/jquerymobile/jquery.mobile-1.4.2.min",
		"highcharts": "../../libs/js/highcharts/js/highcharts",
		"highcharts_more": "../../libs/js/highcharts/js/highcharts-more",
		"highcharts_funnel": "../../libs/js/highcharts/js/modules/funnel",
		"underscore": "../../libs/js/lodash.min",
		"backbone": "../../libs/js/backbone.min",
		"md5": "../../libs/js/md5",

	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {

       'md5': {
            exports: 'CryptoJS',
        },
      'highcharts_more': {
            deps:["highcharts"]
        },
       'highcharts_funnel': {
            deps:["highcharts"]
        },
      'tbd': {
            exports: 'tbd',
            init: function() {
//                return removeFromGlobal('tbd');
            }
        },
		"backbone": {
			"deps": [ "underscore", "jquery" ],
			"exports": "Backbone"
		}

	}

});

// Includes File Dependencies
require([
	"jquery",
	"backbone",
	"js/routers/mobileRouter",
	"js/models/DataModel",
	"js/models/PreferenceModel",
	"underscore",
	'md5', 
	"jstorage"
], function ( $, Backbone, Mobile, DataModel, Preferences, _, CryptoJS ) {
	$( document ).on( "mobileinit",


		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function () {

			// Clear history
			history.pushState("", document.title, window.location.pathname
															   + window.location.search);
			//http://stackoverflow.com/questions/17962378/white-page-when-loading-while-using-jquery-mobile
			var splashDelay = (fourPIAsplashStartTime.getTime() + Preferences.splashTime) - new Date().getTime();
			var dfd_splashDelay = $.Deferred();
			setTimeout(function() {
						dfd_splashDelay.resolve(true);
					}, splashDelay
				);
					
			dfd_splashDelay
				.done(function() {
					$("body")
						.removeClass( "splash" );
						
					// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
					$.mobile.linkBindingEnabled = false;

					// Disabling this will prevent jQuery Mobile from handling hash changes
					$.mobile.hashListeningEnabled = false;
	
$.mobile.ajaxEnabled            = false;
$.mobile.linkBindingEnabled     = false;
$.mobile.hashListeningEnabled   = false;
$.mobile.pushStateEnabled       = false;
$.mobile.changePage.defaults.changeHash = false;
				
					
					function updateDebugInfo() {

						var viewportSize = document.location.href.gup("viewportSize");
						if (!viewportSize)
						{
							Preferences.viewportSize = {};
							_.each( Preferences.viewportLimits, function(entry) {
									if (window.innerWidth < entry.limit) Preferences.viewportSize = entry;
								});
						}
							
						if (document.location.href.gup("debugInfo"))
						{
							$(".debugInfo")
								.show();
						}
						else
						{
							$(".debugInfo")
								.hide();
						}

						$("body")
							.attr({"env-viewport-size" : Preferences.viewportSize.type, "env-width" : window.innerWidth, "env-height" : window.innerHeight})
							.addClass( "env-viewport-" + Preferences.viewportSize.type);
							
						if (Preferences.viewportSize.type === "small")
						{
							$("[data-icon='refresh']")
								.attr( "data-iconpos", "notext");
						}

						$(".env-viewport-size").text( Preferences.viewportSize.type );
						$(".env-viewport-width").text( window.innerWidth );
						$(".env-viewport-height").text( window.innerHeight );
					}		

					updateDebugInfo();
					
					messageFromProfile( "#splashDelay:" + splashDelay );
			});

		}
	)

	require( [ "jquerymobile" ], function () {

		// Instantiates a new Backbone.js Mobile Router
		this.router = new Mobile.CategoryRouter();
	});
	
 $(document).on('click', '#submit', function() { // catch the form's submit event
		if (true ||  $('#username').val().length > 0 && $('#password').val().length > 0){
			// Send data to server through the ajax call
			// action is functionality we want to call and outputJSON is our data
			           
			messageFromProfile( "#user:" + $('#username').val() );

				// Show's the jQuery Mobile loading icon
			$.mobile.loading( "show" );

			var credentials = { name : $('#username').val(), pwd : $('#password').val() };
			
			var key = JSON.stringify( credentials );
			var hash = CryptoJS.MD5( key );
			Preferences.storageAuthKey = hash.toString(CryptoJS.enc.Hex);

			$("[data-icon='back']")
				.attr( "data-iconpos", "notext");
				
			DataModel.loadFAUXdata( function() {
					$.mobile.changePage( "#categories" , { reverse: false, changeHash: false } );
				}, 0);
				
		} else {
			alert('Please fill all necessary fields');
		}           
		return false; // cancel original event to prevent form submitting
	});    
});
