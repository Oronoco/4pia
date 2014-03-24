// http://demos.jquerymobile.com/1.3.0/docs/examples/swipe/swipe-list.html#demo-page&ui-state=dialog
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../routers/mobileRouter" 
], function( $, Backbone ) {

	function addHandlers( self )
	{
	    // If it's not a touch device...
	    if ( ! $.mobile.support.touch ) {
	        // Remove the class that is used to hide the delete button on touch devices
	        $(self).find( "#list" ).removeClass( "touch" );
	        // Click delete split-button to remove list item
	
			var items = $(self).find(".delete" );
		 	$( items ).off( "click" );
	        $( items ).on( "click", function() {
//	            var listitem = $( this ).parent( "li.ui-li" );
	            var listitem = $( this ).parent( "li" );
	            confirmAndDelete( listitem );
	        });
	    }
	}
		
	function confirmAndDelete( listitem, transition ) 
	{
        // Highlight the list item that will be removed
        listitem.addClass( "ui-btn-down-d" );
        // Inject topic in confirmation popup after removing any previous injected topics
		var topicText = listitem.find( ".topic" ).text();
		
        $( "#confirm .topic" ).find("strong").text( topicText );;
//	        listitem.find( ".topic" ).clone().insertAfter( "#question" );
        // Show the confirmation popup
        $( "#confirm" ).popup( "open" );
        // Proceed when the user confirms
        $( "#confirm #yes" ).on( "click", function() {
            // Remove with a transition
            if ( transition ) {
                listitem
                    // Remove the highlight
                    .removeClass( "ui-btn-down-d" )
                    // Add the class for the transition direction
                    .addClass( transition )
                    // When the transition is done...
                    .on( "webkitTransitionEnd transitionend otransitionend", function() {
                        // ...the list item will be removed

						$.CategoryRouter.searchView.removeSearchItem( listitem );
					
                        // ...the list will be refreshed and the temporary class for border styling removed
                       var list = $(listitem).closest("[data-role='listview']");
					   $( list ).find( ".ui-li.border" ).removeClass( "border" );
                    })
                    // During the transition the previous list item should get bottom border
                    .prev( "li.ui-li" ).addClass( "border" );
            }
            // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
            else {
				$.CategoryRouter.searchView.removeSearchItem( listitem );
            }
        });
        // Remove active state and unbind when the cancel button is clicked
        $( "#confirm #cancel" ).on( "click", function() {
            listitem.removeClass( "ui-btn-down-d" );
            $( "#confirm #yes" ).off();
        });
    };
	
	//Swipe Delete
	 $( document ).on( "pageinit", "#search", function() {
	 
	 	var self = this;

	    // Swipe to remove list item
	    $( document ).on( "swipeleft swiperight", "#list li.ui-li", function( event ) {
	        var listitem = $( this ),
	            // These are the classnames used for the CSS transition
	            dir = event.type === "swipeleft" ? "left" : "right",
	            // Check if the browser supports the transform (3D) CSS transition
	            transition = $.support.cssTransform3d ? dir : false;
	            confirmAndDelete( listitem, transition );
	    });

	});

	var publicAPI = {
			addHandlers : function (self) {
					addHandlers(self);
				}
		};
		
    // Returns the publicAPI class
    return publicAPI;

} );