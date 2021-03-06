// Category View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../routers/mobileRouter",
	"../models/CategoryModel",
	"../models/PreferenceModel",
	"../models/DataModel",
	"../models/TwitterModel",
	"../models/PulseModel",
	"../views/SwipeDelete",
	"../views/Share",
	"tagcanvas"
], function( $, Backbone, Mobile, CategoryModel, Preferences, DataModel, TwitterModel, Pulse, SwipeDelete, Share, TagCanvas ) {

    // Extends Backbone.View
    var CategoryView = Backbone.View.extend( {

		timelineTemplate : _.template($("script#timelineItem").html()),
			
        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            this.collection.on( "added", this.render, this );

        },
						
		drillDown : function( targetPerson, myCollection, options ) {
				var self = this;
				var person = undefined;
				var tweetfeed = undefined;
				var timestamp = new Date().getTime();
					
				var dfd_drillInitialized = $.Deferred();
				
				$(".drilldown-header-iconicView").hide();
				$(".drilldown-header-textView").show();
				if (targetPerson &&  myCollection)
				{
					DataModel.models.drillDown = _.filter( myCollection.models, function( entry, index ) {
							return entry.get("person").sortName() === targetPerson;
						});
					
					var categoryClass = DataModel.models.drillDown.length > 0 ? DataModel.models.drillDown[0].attributes.categoryClass :  myCollection.type;
					var sortName = targetPerson.sortName()

					person = _.find( DataModel.models.people, function( entry, key ) {
								return  (entry.name.toLowerCase().indexOf( sortName.toLowerCase()) > 0);
							});

					var processID = new Date().getTime();
					
					if (person)
					{
						if (person.party)
						{
							categoryClass = (person.party === 'D') ? "dtweets" : "rtweets";
						}
						
						tweetfeed = TwitterModel.loadPersonTweets(person.key, timestamp);
						$.when( tweetfeed, dfd_drillInitialized )
							.done(function( tweetfeedArgs, initArgs ) {
								var tweetCollection = tweetfeedArgs[0];
								var req_timeStamp = tweetfeedArgs[1];
								
								var showMoreTweets = $("#drillDown").find(".timeline_linkToMore");
								if (showMoreTweets.length > 0)
									{
										$(showMoreTweets)
											.show();
											
										var feedSearchCnt = self.prepareTimeline( tweetCollection, { categoryClass : categoryClass, secondaryThreshold : Preferences.constants.day });
										var itemTemplate = _.template( $( "script#forpiaItems" ).html(), { "collection": tweetCollection, "viewportSize" : Preferences.viewportSize, "templateFn" : self.timelineTemplate, searchCnt : feedSearchCnt } );
										$("#drillDown").find("#tweetfeed")
											.empty()
											.html(itemTemplate);
											
										$("#drillDown").find(".timeline_share" ).on('click', function() {
												var id = $(this).attr("data-id");
												Share.clickHandler( tweetCollection.models[ id ], $("#sharePanel_drillDown") );
											});

										if (person.twitterPageURL) 
										{
											$("#drillDown").find(".timeline_linkToMore")
												.show()
												.on('click', function() {
														window.open(person.twitterPageURL, '_blank');
														return false; // cancel original event to prevent form submitting
													}); ;
										}
										
										$("body").find(".drillsearchcnt").text( feedSearchCnt );

									}
								});
					}
					
					if (options && options.singleHeader)
					{

						if (categoryClass === "dtweets"  ||  categoryClass === "rtweets")
						{
							options.singleHeader = (categoryClass === "dtweets") ? "images/dem.png" : "images/rep.png";
							$(".drilldown-header-icon").attr({src : options.singleHeader});
							$(".drilldown-header-iconicView").show();
							$(".drilldown-header-textView").hide();
						}
						options.singleHeader = false;
					}
				}

				$.CategoryRouter.drillDownView.collection.drillDown = $.extend({
						targetPerson : targetPerson,
						person	: person,
						url : person ? person.url : false,
						tweetfeed :  person ? tweetfeed : undefined,
						timestamp : timestamp
					}, options );
					
				$.CategoryRouter.drillDownView.collection.models = DataModel.models.drillDown;
				// Triggers the custom `added` method (which the Category View listens for)
                $.CategoryRouter.drillDownView.collection.trigger( "added" );

				var drillsearchcnt = 0;
				_.each( DataModel.models.drillDown, function( entry, index ) {
					var attr = entry.attributes;
						if (self.matchSearchTerms( entry ))
						{
							drillsearchcnt++;
							attr.searchMatchClass = "searchMatch";
						}
					});

				$("body").find(".drilltweeter").text( targetPerson );
				$("body").find(".drilltweetcnt").text( DataModel.models.drillDown.length );
				$("body").find(".drillsearchcnt").text( drillsearchcnt );
				
				messageFromProfile( "#drillDown?" + targetPerson );
				
				$.mobile.changePage( "#drillDown" , { reverse: false, changeHash: false, fromHashChange:true } );
				location.hash = location.hash.replace(/\#.*$/, "#drilldown");
				
				dfd_drillInitialized.resolve();
				
				return $.CategoryRouter.drillDownView.collection.drillDown;
			},
			
		removeSearchItem : function( listitem ) {
				var searchCollection = $.CategoryRouter.searchView.collection;
				var cid = $(listitem).attr("data-id");
				var model = searchCollection.get( cid );
				searchCollection.remove( model );
                listitem.remove();
 				var list = $(listitem).closest("[data-role='listview']");
				$( list ).listview( "refresh" );
				
				DataModel.updateSearchModel( searchCollection );
			},
			
		gather : function( models, searchStr, filter) {
				var s = searchStr.toLowerCase().trim().split(",");
				var demCnt = 0;
				var repCnt = 0;
				var drillDown = _.filter( models, function( entry, index ) {
						var desc = entry.get("person") + " " + entry.get("description");
						var found = false;
						_.find(s, function(term) {
								term = term.trim();
								if (term.length === 0)
								{
									return;
								}
								var match = desc.toLowerCase().indexOf( term );
								if (match >= 0)
								{
									if (entry.get("categoryClass") === "rtweets") repCnt++
									else demCnt++;
									found = true;
								}
						});
						return found;
					});
				return { drillDown : drillDown, demCnt : demCnt, repCnt : repCnt };
			},
			
		matchSearchTerms : function( item ) {
				var self = this;
				var found = undefined;
				var searchCollection = $.CategoryRouter.searchView.collection;
				_.each( searchCollection.models, function( entry, index ) {
						var attr = entry.attributes;
						var results = self.gather( [ item ], attr.type );
						if (results.demCnt  ||  results.repCnt)
						{
							found = found || { demCnt : results.demCnt, repCnt : results.repCnt, cid : entry.cid ||  entry.id  };
						}
					});
				return found;
			},
			
		countSearchTweets : function() {
				var self = this;
				var searchCollection = $.CategoryRouter.dailyView.collection;
				return self.loadSearchCollection( searchCollection, function() {
							_.each( self.collection.models, function( entry, index ) {
									var attr = entry.attributes;
									var results = self.gather( searchCollection.models, attr.type );
									attr.counts = { demCnt : results.demCnt, repCnt : results.repCnt, cid : entry.cid ||  entry.id  } ;
								});
						});
			},
			
		search : function( searchStr, filter ) {
				var self = this;
				var searchCollection = $.CategoryRouter.dailyView.collection;
				return self.loadSearchCollection( searchCollection, function() {
							var results = self.gather( searchCollection.models, searchStr, filter);
							DataModel.models.drillDown = results.drillDown;
						
							self.drillDown( searchStr, undefined, {dualHeader : true, demCnt : results.demCnt, repCnt : results.repCnt } );
					});
			},
			
		loadSearchCollection : function ( targetCollection, callback) {
				var dfd_searchCollection =  $.Deferred();
				// If there are no collections in the current Category View
				if (!targetCollection.length) {

					// Show's the jQuery Mobile loading icon
					$.mobile.loading( "show" );

					targetCollection.options.silent = true; 
					
					// Fetches the Collection of Category Models for the current Category View
					dfd_searchCollection = targetCollection.fetch();
				}
				else
				{
					dfd_searchCollection.resolve();
				}
				
				dfd_searchCollection
					.done( function() {
							targetCollection.options.silent = false; 
							callback();
						});
				
				return dfd_searchCollection;
			},
			
		prepareTimeline : function( viewCollection, options ) {
				options = options || {};
				
				var threshold = options.threshold ||  Preferences.constants.hour;
				var secondaryThreshold = options.secondaryThreshold ||  threshold;

				var searchCnt = 0;
				var self = this;
				var lastHourBreak = undefined;
				var lastDay = undefined;
				_.each( viewCollection.models, function( entry, index ) {
						var attr = entry.attributes;
						attr.id = index;
						attr.categoryClass = options.categoryClass  ||  attr.categoryClass;


						attr.hourBreak = false;
						
						var diff=lastHourBreak ? lastHourBreak.getTime() - attr.timestamp.getTime() : 0;
						console.log(lastHourBreak,attr.timestamp,  diff, threshold, diff/Preferences.constants.hour);

						if (lastHourBreak === undefined ||  lastHourBreak.getTime() - attr.timestamp.getTime() > threshold )
						{
							
							attr.hourBreak = true;
							attr.hour_formatted = 
								new Date( attr.timestamp ).format("mmmm dd, yyyy") + 
								" at " + 
								new Date( attr.timestamp ).format("h tt");
								
							lastHourBreak = new Date( attr.timestamp.getFullYear(), attr.timestamp.getMonth(), attr.timestamp.getDate(), attr.timestamp.getHours() + 1);
							lastDay = lastDay  ||  lastHourBreak.getDate();
							
							if ( lastHourBreak.getDate() != lastDay )
							{
								threshold = secondaryThreshold;
								lastHourBreak = new Date( lastHourBreak.getFullYear(), lastHourBreak.getMonth(), lastHourBreak.getDate() + 1);
								attr.hour_formatted = 
									new Date( attr.timestamp ).format("mmmm dd, yyyy");
							}
						}
						attr.numDaysOld  = lastDay - lastHourBreak.getDate();
							
						if (self.matchSearchTerms( entry ))
						{
							searchCnt++;
							attr.searchMatchClass = "searchMatch";
						}
						
					});
				return searchCnt;
			},
			
		bios : function( bioKey ) {
				var self = this;
				var targetBio = _.filter( DataModel.models.bios, function( entry, index ) {
						return entry.bio.key === bioKey;
					});
					
				if (targetBio.length)
				{
					self.loadSearchCollection( $.CategoryRouter.dailyView.collection, function() {
							self.drillDown( targetBio[0].bio.sortName, $.CategoryRouter.dailyView.collection, {singleHeader : true} );
						});
				}
				
			},
			
        // Renders all of the Category models on the UI
        render: function() {

			var self = this;
			
			var searchCnt = 0;
			var templateFn = undefined;
			var templateName = self.collection.templateName  ||  "script#categoryItems";

			var filteredModels = undefined;
			var viewCollection = self.collection;
			
			var dfds = [];
			if (viewCollection.options.style === "search")
			{
				dfds.push( this.countSearchTweets() );
			}
			if (viewCollection.options.style === "bios")
			{
				if (Preferences.repSearch === "tweetsOnly")
				{
					filteredModels = _.filter( viewCollection.models, function( entry, index ) {
							return entry.get("tweetCnt") !== undefined;
						});
				}

				$("#bioFilter_controlGroup").trigger('create');
				var radioButtons = this.$el.find("input[type='radio']").filter("[name='bioFilter']");
				$(radioButtons).unbind( "change" );
				if (filteredModels  &&  filteredModels.length === 0)
				{
					radioButtons.filter("#all")
						.attr("checked", "checked");

					$(radioButtons)
						.attr("disabled", "true")
						.checkboxradio("refresh");
					filteredModels = undefined;
				}
				else
				{
					radioButtons.filter("#" + Preferences.repSearch).attr("checked", "checked");
					$(radioButtons).checkboxradio("refresh");
					$(radioButtons).bind( "change", function(event, ui) {
						Preferences.repSearch = $(this).attr("id");
						self.render();	
						self.$el.find("ul").listview('refresh');
					
						$.mobile.changePage( "#bios" , { reload : true, reverse: false, changeHash: false } );
					});	
				}		
			}
			
			
			if (viewCollection.options.style === "timeline")
			{
				templateFn = this.timelineTemplate;

				searchCnt = self.prepareTimeline( viewCollection );
				
			}

			var savedModels = viewCollection.models;
			if (filteredModels)
			{
				viewCollection.models = filteredModels;
			}
			
			var tweetList = this.$el.find("#tweetList");
			if (tweetList.length > 0)
			{
				this.template = _.template( $( "script#tweetList" ).html(), { "collection": viewCollection, "viewportSize" : Preferences.viewportSize, searchCnt : searchCnt } );
				$(tweetList)
					.empty()
					.html(this.template);
			}

			if (Preferences.viewportSize.type === "small")
			{ 
				$(this.$el).find("[data-platformResize='true']")
					.attr( "data-iconpos", "notext");
			}
						
			this.template = _.template( $( templateName ).html(), { "collection": viewCollection, "viewportSize" : Preferences.viewportSize, "templateFn" : templateFn, searchCnt : searchCnt } );
			
 			if (filteredModels)
			{
				viewCollection.models = savedModels;
			}

			if (viewCollection.options.style === "ctweets")
			{
				this.template = DataModel.models.ctweets;
			}
			
           // Renders the view's template inside of the current listview element
			this.$el.find("ul")
				.empty()
				.html(this.template);

			DataModel.updateCounts();
			
			if (document.location.href.gup( "debugInfo"))
			{
				$(".debugInfo")
					.show();
			}
			else
			{
				$(".debugInfo")
					.hide();
			}
			
			if (viewCollection.options.style === "search")
			{
				SwipeDelete.addHandlers( this.$el );
			}

			if (viewCollection.options.style === "ctweets")
			{
				$('#myCanvasContainer').hide();
//				this.template = DataModel.models.ctweets;
				if (document.location.href.gup( "tagcanvas"))
				{
					$("#tags").empty().append(DataModel.models.tagcanvas);
					
					if(!$('#myCanvas').tagcanvas({
					  textColour: '#ff0000',
					  outlineColour: '#ff00ff',
					  reverse: true,
					  depth: 0.8,
					  maxSpeed: 0.05,
//					  shape : "vcylinder"
					},'tags')) {
					  // something went wrong, hide the canvas container
					  $('#myCanvasContainer').hide();
					}

					$('#myCanvasContainer').show();
					this.$el.find("ul").hide();
					var header = this.$el.find("ul").find("h2");
					$('#myCanvasContainer')
						.prepend( header );
				}
			}
			
			// http://stackoverflow.com/questions/15468265/jquery-mobile-dialog-and-backbone-js
			this.$el.find('a[data-rel="popup"]').on('click', function(event) {
					event.preventDefault();
					event.stopImmediatePropagation();
					var target = $(this).attr("href");
					var popup = self.$el.find('div[data-role="popup"]').filter(target);
					$(popup)
						.popup({
								afteropen: function( event, ui ) {
									$('#searchTerm').focus();
								}
							})
						.popup('open', { positionTo: "window" });

			});
				
			this.$el.find('form[name="addSearchTerm"]').find('input[name="addSearchTerm"]').on('click', function(event) {
					event.preventDefault();
					event.stopImmediatePropagation();

					var form = $(this).closest("form");
					var searchField = $(form).find('input[name="searchTerm"]');
					var searchText  = $(searchField).val() || "";
					searchText = searchText.trim();
					var target = "#addSearchTerm";
					self.$el.find('div[data-role="popup"]').filter(target).popup('close');
					if (searchText.length > 0)
					{
						viewCollection.add( { "category": "search", "type": searchText, createdOn : new Date() , counts : { demCnt : 0, repCnt : 0 }}, {silent: true} );
						
						DataModel.updateSearchModel( viewCollection );

						self.render();	
						self.$el.find("ul").listview('refresh');
					}
				});
				
			this.$el.find(".timeline_share" ).on('click', function() {
					var id = $(this).attr("data-id");
					Share.clickHandler( viewCollection.models[ id ], $("#sharePanel_timeline") );
				});

			// http://stackoverflow.com/questions/8357756/jquery-mobile-forcing-refresh-of-content
			this.$el.find(".timeline")
				.css({"border-color" : "#ddd"});
				
			this.$el.find(".timeline_person").on('click', function() {
					var id = $(this).attr("data-id");
					var targetPerson = viewCollection.models[ id ].get("person").sortName();
				
					self.drillDown( targetPerson, viewCollection, {singleHeader : true} );
				
					return false; // cancel original event to prevent form submitting
				}); 


			this.$el.find(".tweetCloudItem").on('click', function() {
					var elem = $(this);
					
					$(elem).addClass("tweetCloudItemPress");
						
					setTimeout( function() {
							$(elem).removeClass("tweetCloudItemPress");

							var searchStr = $(elem).text();
							self.search( searchStr );

						}, 500);
			
					return false; // cancel original event to prevent form submitting
				}); 
			
			this.$el.find(".searchItem").on('click', function() {
					var id = $(this).attr("data-id");
					var searchStr = $(this).closest("li").find(".topic").text();

					self.search( searchStr, id );
			
					return false; // cancel original event to prevent form submitting
				}); 
			
			Pulse.makePulseCharts( this );
			
            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return CategoryView;

} );