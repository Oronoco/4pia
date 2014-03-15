// Sets the require.js configuration for your application.
function gup( str, name ) {
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( str );
		if( results === null )
			return undefined;
		else
			return results[1];
	};

			String.prototype.gup = function( name )
			{
				return gup( this, name );
			};

		String.prototype.trim = function ()
			{
				return this.replace(/^\s*/, "").replace(/\s*$/, "");
			};
			
	String.prototype.sortName = function ()
			{
				return this
					.replace(/Rep\. /i, "" )
					.replace(/Sen\. /i, "" )
					.replace(/Cong\. /i, "" )
					.replace(/President /i, "" )
					.replace(/Congressman /i, "" )
					.replace(/U.S\. Rep\. /i, "" )
					.replace(/Senator/i, "" ).trim();
			};

require.config( {

	// 3rd party script alias names
	paths: {

		// Core Libraries
		"jquery": "../../libs/js/jquery",
		"datejs": "../../libs/js/date",
		 'numeral' : '../../libs/js/numeral',
		"jquerymobile": "../../libs/js/jquerymobile/jquery.mobile-1.4.2",
		"underscore": "../../libs/js/lodash",
		"backbone": "../../libs/js/backbone",

	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {

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
	"underscore"
], function ( $, Backbone, Mobile, DataModel, _ ) {
	$( document ).on( "mobileinit",

		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function () {

			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
			
			// Clear history
			history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);

		}
	)

	require( [ "jquerymobile" ], function () {

		// Instantiates a new Backbone.js Mobile Router
		this.router = new Mobile();
	});
	
  $(document).on('click', '#submit', function() { // catch the form's submit event
		if(true ||  $('#username').val().length > 0 && $('#password').val().length > 0){
			// Send data to server through the ajax call
			// action is functionality we want to call and outputJSON is our data
			           
				messageFromProfile( "#user:" + $('#username').val() );

				// Show's the jQuery Mobile loading icon
			$.mobile.loading( "show" );

			DataModel.loadFAUXdata( function() {
					$.mobile.changePage( "#categories" , { reverse: false, changeHash: false } );
				});
				
		} else {
			alert('Please fill all necessary fields');
		}           
		return false; // cancel original event to prevent form submitting
	});    
});
