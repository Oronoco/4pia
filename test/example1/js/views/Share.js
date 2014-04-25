// http://demos.jquerymobile.com/1.3.0/docs/examples/swipe/swipe-list.html#demo-page&ui-state=dialog
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/PreferenceModel",
	"../models/DataModel",
	"../routers/mobileRouter" 
], function( $, Backbone, Preferences, DataModel ) {

	var hashTagRegEx = /(#|＃)([a-z0-9_\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u024f\u0253-\u0254\u0256-\u0257\u0300-\u036f\u1e00-\u1eff\u0400-\u04ff\u0500-\u0527\u2de0-\u2dff\ua640-\ua69f\u0591-\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05d0-\u05ea\u05f0-\u05f4\ufb12-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4f\u0610-\u061a\u0620-\u065f\u066e-\u06d3\u06d5-\u06dc\u06de-\u06e8\u06ea-\u06ef\u06fa-\u06fc\u0750-\u077f\u08a2-\u08ac\u08e4-\u08fe\ufb50-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\u200c-\u200c\u0e01-\u0e3a\u0e40-\u0e4e\u1100-\u11ff\u3130-\u3185\ua960-\ua97f\uac00-\ud7af\ud7b0-\ud7ff\uffa1-\uffdc\u30a1-\u30fa\u30fc-\u30fe\uff66-\uff9f\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u3041-\u3096\u3099-\u309e\u3400-\u4dbf\u4e00-\u9fff\u20000-\u2a6df\u2a700-\u2b73f\u2b740-\u2b81f\u2f800-\u2fa1f]*[a-z_\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u024f\u0253-\u0254\u0256-\u0257\u0300-\u036f\u1e00-\u1eff\u0400-\u04ff\u0500-\u0527\u2de0-\u2dff\ua640-\ua69f\u0591-\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05d0-\u05ea\u05f0-\u05f4\ufb12-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4f\u0610-\u061a\u0620-\u065f\u066e-\u06d3\u06d5-\u06dc\u06de-\u06e8\u06ea-\u06ef\u06fa-\u06fc\u0750-\u077f\u08a2-\u08ac\u08e4-\u08fe\ufb50-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\u200c-\u200c\u0e01-\u0e3a\u0e40-\u0e4e\u1100-\u11ff\u3130-\u3185\ua960-\ua97f\uac00-\ud7af\ud7b0-\ud7ff\uffa1-\uffdc\u30a1-\u30fa\u30fc-\u30fe\uff66-\uff9f\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u3041-\u3096\u3099-\u309e\u3400-\u4dbf\u4e00-\u9fff\u20000-\u2a6df\u2a700-\u2b73f\u2b740-\u2b81f\u2f800-\u2fa1f][a-z0-9_\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u024f\u0253-\u0254\u0256-\u0257\u0300-\u036f\u1e00-\u1eff\u0400-\u04ff\u0500-\u0527\u2de0-\u2dff\ua640-\ua69f\u0591-\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05d0-\u05ea\u05f0-\u05f4\ufb12-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4f\u0610-\u061a\u0620-\u065f\u066e-\u06d3\u06d5-\u06dc\u06de-\u06e8\u06ea-\u06ef\u06fa-\u06fc\u0750-\u077f\u08a2-\u08ac\u08e4-\u08fe\ufb50-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\u200c-\u200c\u0e01-\u0e3a\u0e40-\u0e4e\u1100-\u11ff\u3130-\u3185\ua960-\ua97f\uac00-\ud7af\ud7b0-\ud7ff\uffa1-\uffdc\u30a1-\u30fa\u30fc-\u30fe\uff66-\uff9f\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u3041-\u3096\u3099-\u309e\u3400-\u4dbf\u4e00-\u9fff\u20000-\u2a6df\u2a700-\u2b73f\u2b740-\u2b81f\u2f800-\u2fa1f]*)/gi;
	
	var tweetSample = "Tweet from '{person}'!"
	var emailSample = "Hi.\n\nI recently read this tweet from '{person}'.  In the tweet, it says \n\n\"{description}\"\n\nRead more and then tell me what you think at:\n\n{twitterPageURL}\n\nEnjoy!"
	var emailAddress = "interested_friend@email.com";
	var input = "#hasta #mañana #babהַ";
	var matches1 = input.match(/#([^#]+)[\s,;]*/g);
	var matches2 = input.match(/\B#\w*[a-zA-Z]+\w*/g);
	var matches3 = input.match(/\s+#(\w+)/g);
	var matches4 = input.match( hashTagRegEx );

//	debugger;
	
	input = "#face #Fa!ce something #1am#1 #1 #919 #jifdosaj somethin#idfsjoa 9#9#98 9#9f9j#9jlasdjl #jflfdsajl34 #343239 #jkf #a #1j3rj3";
	var matches1 = input.match(/#([^#]+)[\s,;]*/g);
	var matches2 = input.match(/\B#\w*[a-zA-Z]+\w*/g);
	var matches3 = input.match(/\s+#(\w+)/g);
	var matches4 = input.match(hashTagRegEx);


	/////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	////////////////////////////////////////////////////////////////////////////////////
	function sendWindowOpen( type, url, msg  )
	{
		if (msg === undefined)
		{
			msg = "";
		}
		else
		{
			msg = " " + msg.trim();
		}

		window.open( url );
		messageFromProfile( type + msg );
	}


	/////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	////////////////////////////////////////////////////////////////////////////////////
	Array.prototype.toHTMLFromWildCardText = function ()
	{
		var s = "";
		for (var x = 0; x < this.length; x++)
		{
			s += this[x] + "<br>";
		}

		return s.toHTMLFromWildCardText();
	}

	/////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//
	////////////////////////////////////////////////////////////////////////////////////
	String.prototype.toHTMLFromWildCardText = function( variables )
	{
		variables = variables || {};
	
		var s = this.replace(/\\n/g, "<br>" );

		var wildcards = s.match(/\{([^\}]*)\}/g);
		if (wildcards != undefined)
		{
			for (var x = 0; x < wildcards.length; x++)
			{
				var target = /\{([^\}]*)\}/.exec( wildcards[x] );
				var replacement = variables[ target[1] ];

				if (replacement === undefined)
				{
					var ops = target[1].split(",");
					var style = {};
					for (var index = 0; index < ops.length; index++)
					{
						var operation = ops[ index ];
						var segments = operation.split("=");
						if (segments.length === 1)
						{
							replacement = "</span>";
							continue;
						}
						operation = segments[0].toLowerCase();
						if (operation.substring(0, 4) === "size")
						{
							style["font-size"] = segments[1] + "px";
						}
						if (operation.substring(0, 5) === "color")
						{
							var c = colors[ segments[1] ].getRGB();
							if (c != undefined)
							{
								c = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
							}
							else
							{
								c = colors[ segments[1] ];
							}

							style["color"] = c;
						}
						if (operation.substring(0, 5) === "style")
						{
							style["font-style"] = segments[1];
						}
						if (operation.substring(0, 5) === "align")
						{
							style["text-align"] = segments[1];
						}

					}

					if (replacement === undefined)
					{
						var styleStr = "";
						for (var item in style)
						{
							styleStr += ";" + item + ":" + style[item];
						}
						if (styleStr != "")
						{
							replacement = "<span style='" + styleStr.substring(1) + "'>";
						}
					}
				}
				if (replacement != undefined)
				{
	//				console.log( target[0] + " " + replacement );
					var myregexp = new RegExp( "\{" + target[1] + "\}", "g" );
					s = s.replace(myregexp, replacement);
				}
			}
	//		console.log(wildcards);
		}
		return s;
	};

	function getSiteVariables(entry)
	{
		var hashTags = entry.get("description").match(hashTagRegEx);
		var targetPerson = entry.get("person").sortName();

		var person = _.find( DataModel.models.people, function( entry, key ) {
				return  (entry.name.toLowerCase().indexOf( targetPerson.toLowerCase()) > 0);
			});

		var variables = {
				twitterPageURL : undefined,
				targetPerson : targetPerson,
				person : entry.attributes.person,
				description : entry.attributes.description,
				model : person,
				hashTags : hashTags
			};
	
		if (person)
		{
			variables.related = person.key;
			variables.twitterPageURL = person.twitterPageURL;
		}
		return variables;
	}
	
	var siteCallbacks = {	
	
			googleImage1 : function( searchText, orig, entry ) {
						searchText = entry.get("cardContent");
						// https://www.google.com/search?q=rome+photos&source=lnms&tbm=isch
						var url = "https://www.google.com/search?q=" + searchText + "&tbm=isch";
						sendWindowOpen("search", url, this.title + ":" + searchText)
					},
			googleImage2 : function( searchText, orig, entry ) {
						searchText = entry.get("cardContent");
						// https://www.google.com/search?q=rome+photos&source=lnms&tbm=isch
						var url = "https://www.google.com/searchbyimage?site=search&image_url=" + searchText + "&sa=X";
						sendWindowOpen("search", url, this.title + ":" + searchText)
					},
			google : function( searchText, orig, entry ) {
						var url = "http://www.google.com//#sclient=psy&hl=en&site=&source=hp&q=" + searchText + "&aq=f&aqi=g3g-s1g1&aql=f&oq=&pbx=1&bav=on.2,or.r_gc.r_pw.";
						sendWindowOpen("search", url, this.title + ":" + searchText)
					},
			yahoo	: function( searchText, orig, entry ) {
						var url = "http://search.yahoo.com/search?p=" + searchText + "&toggle=1&cop=mss&ei=UTF-8";
						sendWindowOpen("search", url, this.title + ":" + searchText)
					},
			bing   	: function( searchText, orig, entry ) {
						var url = "http://www.bing.com/search?q=" + searchText + "&go=&form=QBLH&qs=n&sk=&sc=8-6";
						sendWindowOpen("search", url, this.title + ":" + searchText)
					},
			twitter : function( searchText, orig, entry ) {
						var url = "https://twitter.com/search?q=" + searchText + "&src=typd";
						sendWindowOpen("search", url, this.title + ":" + searchText)
					},
			defaultCallback : function( searchText, orig, entry ) {
						alert("Not Implemented");
					},
			faceBook : function( searchText, orig, entry ) {
						$("#facebook_like")
							.toggle();
					},
			tweet   : function( searchText, orig, entry ) {
						var variables = getSiteVariables( entry );

						var tweet = tweetSample.toHTMLFromWildCardText( variables );
						var url = "http://twitter.com/share?"
							+ "url=" + encodeURIComponent(variables.twitterPageURL)
							+ "&hashtags=" + encodeURIComponent((variables.hashTags || []).join(","))
							+ "&related=" + encodeURIComponent(variables.related)
							+ "&text=" + encodeURIComponent(tweet);

		/*
		<a href="http://twitter.com/share" class="twitter-share-button"
		data-url="http://dev.twitter.com/pages/tweet_button"
		data-via="your_screen_name"
		data-text="Checking out this page about Tweet Buttons"
		data-related="anywhere:The Javascript API"
		data-count="vertical">Tweet</a>
		*/
						sendWindowOpen("social", url, "Twitter:" + variables.person);
						messageFromProfile("tweet " + variables.person);
					},
			email : function( searchText, orig, entry ) {
						var variables = getSiteVariables( entry );

						var subject = "Email about tweet from " + variables.targetPerson;
						subject = encodeURIComponent(subject);
						
						var body_message = emailSample.toHTMLFromWildCardText( variables );
						body_message = body_message.split("<br>").join( "%0d" );
						body_message = body_message.split("\n").join( "%0d" );
						body_message = body_message.replace(/{{/g, "").replace(/}}/g, "");
						body_message = encodeURIComponent(body_message);
						body_message = body_message.split("%250d").join( "%0d" );
						var mailto_link = 'mailto:' + emailAddress +  '?subject=' + subject + '&body=' + body_message;
		//console.log(mailto_link);
						window.location.href = mailto_link;

						messageFromProfile("email " + subject);
				}

		};
		
	var siteOptions = {
			description : false,
			message : [
					{
						id		: "msg_tweet",
						title	: "Tweet",
						label	: "Tweet",
						url	  	: "images/shareLogos/logo_tweet.png",
						callback: siteCallbacks.tweet
					},
					{
						id		: "msg_retweet",
						title	: "Retweet",
						label	: "Retweet",
						url	  	: "images/shareLogos/logo_retweet.png",
					},
					{
						id		: "msg_faceBook",
						title	: "Facebook",
						label	: "Facebook",
						url	  	: "images/shareLogos/otherLogo_facebook.png",
						callback: siteCallbacks.faceBook
					},
					{
						id		: "msg_email",
						title	: "Email to a friend",
						label	: "Email",
						url	  	: "images/shareLogos/otherLogo_email.png",
						callback: siteCallbacks.email
					},
				],
			image : [
					{
						id		: "img_pinterest",
						title	: "PInterest",
						label	: "PInterest",
						url	  	: "images/shareLogos/logo_pinterest.png",
					},
					{
						id		: "img_instagram",
						title	: "InstaGram",
						label	: "InstaGram",
						url	  	: "images/shareLogos/logo_instagram.png",
					},
					{
						id		: "img_flickr",
						title	: "Flickr",
						label	: "Flickr",
						url	  	: "images/shareLogos/logo_flickr.png",
					},
				],
			search : [
					{
						id		: "search_twitter",
						title	: "Twitter",
						label	: "Twitter",
						url	  	: "images/shareLogos/otherLogo_twitter.png",
						requires: [ "hasHashTags" ],
						callback: siteCallbacks.twitter
					},
					{
						id		: "search_google",
						title	: "Google",
						label	: "Google",
						url	  	: "images/shareLogos/logo_google.png",
						requires: [ "hasHashTags" ],
						callback: siteCallbacks.google
					},
					{
						id		: "search_yahoo",
						title	: "Yahoo!",
						label	: "Yahoo!",
						url		: "images/shareLogos/logo_yahoo.png",
						requires: [ "hasHashTags" ],
						callback: siteCallbacks.yahoo
					},
					{
						id		: "search_bing",
						title	: "Bing",
						label	: "Bing",
						url		: "images/shareLogos/logo_bing.png",
						requires: [ "hasHashTags" ],
						callback: siteCallbacks.bing
					},
					{
						id		: "search_googleImage1",
						title	: "Google",
						label	: "Google Image Search",
						url	  	: "images/shareLogos/logo_googleImage1	.png",
						requires: [ "hasImageTags" ],
						callback: siteCallbacks.googleImage1
					},
					{
						id		: "search_googleImage2",
						title	: "Google",
						label	: "Google Similar Image Search",
						url	  	: "images/shareLogos/logo_googleImage2.png",
						requires: [ "hasImageTags" ],
						callback: siteCallbacks.googleImage2
					},
				]
		};
		
	var siteOptionsLookup = {};
	_.each( siteOptions, function( category ) {
			if (category)
			{
				_.each( category, function( entry ) {
						entry.implemented = (entry.callback !== undefined);
						siteOptionsLookup[ entry.id ] = entry;
					});
			}
		});
			

	var publicAPI = {
			addFaceBook : function( container, entry ) {
			
					var variables = getSiteVariables( entry );

					var dim = {w:250,h:70};

					var likeURL = "http://www.facebook.com/plugins/like.php?"
						+ "href=" + encodeURIComponent( variables.twitterPageURL )
						+ "&amp;layout=standard"
						+ "&amp;show_faces=false"
						+ "&amp;width=" + dim.w
						+ "&amp;height=" + dim.h
						+ "&amp;action=like"
						+ "&amp;colorscheme=light"
						+ "&amp;font=arial";
	//https://developers.facebook.com/docs/plugins/like-button/#faqlayouts
	//console.log(likeURL);
					var like = $("<iframe id=facebook_like>")
						.css({
								"position" : "absolute",
								"top" :  0,
								"left" : 0,
								"float" : "left",
								"background-color" : "lightGray",
								"width" : dim.w,
								"height" : dim.h
							})
						.attr("width", dim.w )
						.attr("height", dim.h )
						.attr("src", likeURL )
						.attr("frameborder", 0)
						.attr("allowTransparency", true)
						.hide();
						
					container
						.css({
								"position" : "relative",
							})
						.append( like )

				},
			clickHandler : function( entry, sharePanel) {
					//entry.attributes.cardContent = "https://pbs.twimg.com/media/BjwSHM4CAAE1J9O.jpg";
					
					sharePanel = sharePanel || $("#sharePanel_timeline");
					
					var cardContent = entry.get("cardContent");
					
					var hashTags = entry.get("description").match(hashTagRegEx);
					var requirements = { 
							hasImageTags : cardContent ? true : false, 
							hasHashTags  : hashTags  &&  (hashTags.length > 0) ? true : false
						};

					_.each( siteOptionsLookup, function( entry ) {
							entry.enabled = true;
							if (entry.requires)
							{
								_.each( entry.requires, function( flag ) {
										entry.enabled = requirements[ flag ];
									});
							}
						});
					
					var myOptions = {};
					_.each( siteOptions, function( category, key ) {
							var cnt = 0;
							_.each( category, function( entry ) {
									if (entry.enabled !== false)
									{
										cnt++;
									}
								});
							if (cnt > 0)
							{
								myOptions[ key ] = category;
							}
						});
						
					var shareTemplate = _.template( $( "script#shareItem" ).html(), { "viewportSize" : Preferences.viewportSize, category : entry.attributes, siteOptions : myOptions, hashTags : hashTags } );
					$(sharePanel).find("#content")
						.empty()
						.html(shareTemplate);
					
					$(sharePanel).find(".sharePanel_icon").filter("[data-implemented='false']")
						.css({
								opacity : 0.15
							});
					
					var selectedMatch = 0;
					var myselect = $(sharePanel).find("#select-hashTags");
					if (myselect.length > 0)
					{
						myselect[0].selectedIndex = selectedMatch;
					}
					
					$(sharePanel).find(".sharePanel_icon").on('click', function() {
							var siteEntry = siteOptionsLookup[ $(this).attr("data-id") ];
							var searchText = "";
							if (myselect.length > 0)
							{
								var selectedIndex = myselect[0].selectedIndex;
								searchText = encodeURIComponent( hashTags[selectedIndex]  || "" );
							}
							
							var callback = siteEntry.callback ||  siteCallbacks.defaultCallback;
							if (callback)
							{
								callback.call( this, searchText.makeSearchText(), searchText, entry );
							}
			
							return false; // cancel original event to prevent form submitting
						}); 
					publicAPI.addFaceBook( $("#faceBookContainer"), entry );
					
					$(sharePanel).trigger( "updatelayout" );
					$(sharePanel).panel( "open"  );
				}
		};
		
    // Returns the publicAPI class
    return publicAPI;

} );