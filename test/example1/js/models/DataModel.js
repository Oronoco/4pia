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

	 function parseHTML( html, categoryClass, d) 
	 {
		d = d || new Date();
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
						type : "timeline_category_" + categoryClass,
						categoryClass : categoryClass,
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
var people = {
SenatorBegich :  {
           name: 'Sen. Mark Begich',
         File:'Scripts/N-23577.html'},
lisamurkowski :  {
           name: 'Sen. Lisa Murkowski',
         File:'Scripts/N-810.html'},
repdonyoung :  {
           name: 'Rep. Don Young',
         File:'Scripts/N-.html'},
RepMarthaRoby :  {
           name: 'Rep. Martha Roby',
         File:'Scripts/N-11375.html'},
RepTerriSewell :  {
           name: 'Rep. Terri Sewell',
         File:'Scripts/N-11385.html'},
SenShelbyPress :  {
           name: 'Sen. Richard Shelby',
         File:'Scripts/N-158.html'},
RepMikeRogersAL :  {
           name: 'Rep. Mike Rogers',
         File:'Scripts/N-1590.html'},
SenatorSessions :  {
           name: 'Sen. Jeff Sessions',
         File:'Scripts/N-269.html'},
RepMoBrooks :  {
           name: 'Rep. Mo Brooks',
         File:'Scripts/N-60151.html'},
Robert_Aderholt :  {
           name: 'Rep. Robert Aderholt',
         File:'Scripts/N-654.html'},
BachusAL06 :  {
           name: 'Rep. Spencer Bachus',
         File:'Scripts/N-676.html'},
RepJoBonner :  {
           name: 'Rep. Jo Bonner',
         File:'Scripts/N-.html'},
RepRickCrawford :  {
           name: 'Rep. Rick Crawford',
         File:'Scripts/N-11275.html'},
RepTimGriffin :  {
           name: 'Rep. Tim Griffin',
         File:'Scripts/N-12231.html'},
TomCottonAR :  {
           name: 'Rep. Tom Cotton',
         File:'Scripts/N-17456.html'},
SenMarkPryor :  {
           name: 'Sen. Mark Pryor',
         File:'Scripts/N-31613.html'},
JohnBoozman :  {
           name: 'Sen. John Boozman',
         File:'Scripts/N-48793.html'},
rep_stevewomack :  {
           name: 'Rep. Steve Womack',
         File:'Scripts/N-53410.html'},
NONE_Faleomavaega :  {
           name: 'Del. Eni Faleomavaega',
         File:'Scripts/N-643.html'},
JeffFlake :  {
           name: 'Sen. Jeff Flake',
         File:'Scripts/N-10928.html'},
RepGosar :  {
           name: 'Rep. Paul Gosar',
         File:'Scripts/N-11305.html'},
RepRaulGrijalva :  {
           name: 'Rep. Raul Grijalva',
         File:'Scripts/N-130506.html'},
RepTrentFranks :  {
           name: 'Rep. Trent Franks',
         File:'Scripts/N-134680.html'},
RepSinema :  {
           name: 'Rep. Kyrsten Sinema',
         File:'Scripts/N-148261.html'},
RepKirkpatrick :  {
           name: 'Rep. Ann Kirkpatrick',
         File:'Scripts/N-148501.html'},
SenJohnMcCain :  {
           name: 'Sen. John McCain',
         File:'Scripts/N-192.html'},
RepMattSalmon :  {
           name: 'Rep. Matt Salmon',
         File:'Scripts/N-214.html'},
RepEdPastor :  {
           name: 'Rep. Ed Pastor',
         File:'Scripts/N-225.html'},
RepRonBarber :  {
           name: 'Rep. Ron Barber',
         File:'Scripts/N-56317.html'},
RepDavid :  {
           name: 'Rep. David Schweikert',
         File:'Scripts/N-61847.html'},
RepBera :  {
           name: 'Rep. Ami Bera',
         File:'Scripts/N-11253.html'},
Rep_JaniceHahn :  {
           name: 'Rep. Janice Hahn',
         File:'Scripts/N-12781.html'},
DevinNunes :  {
           name: 'Rep. Devin Nunes',
         File:'Scripts/N-129325.html'},
RepLindaSanchez :  {
           name: 'Rep. Linda Sanchez',
         File:'Scripts/N-129456.html'},
DougLaMalfa :  {
           name: 'Rep. Doug LaMalfa',
         File:'Scripts/N-130779.html'},
GOPWhip :  {
           name: 'Rep. Kevin McCarthy',
         File:'Scripts/N-130798.html'},
RepGaramendi :  {
           name: 'Rep. John Garamendi',
         File:'Scripts/N-130824.html'},
RepKarenBass :  {
           name: 'Rep. Karen Bass',
         File:'Scripts/N-142033.html'},
RepMcNerney :  {
           name: 'Rep. Jerry McNerney',
         File:'Scripts/N-146213.html'},
DorisMatsui :  {
           name: 'Rep. Doris Matsui',
         File:'Scripts/N-152468.html'},
RepHuffman :  {
           name: 'Rep. Jared Huffman',
         File:'Scripts/N-156431.html'},
JuliaBrownley :  {
           name: 'Rep. Julia Brownley',
         File:'Scripts/N-156490.html'},
RepPaulCook :  {
           name: 'Rep. Paul Cook',
         File:'Scripts/N-156561.html'},
ScottPetersSD :  {
           name: 'Rep. Scott Peters',
         File:'Scripts/N-17633.html'},
RepSwalwell :  {
           name: 'Rep. Eric Swalwell',
         File:'Scripts/N-17684.html'},
RepMarkTakano :  {
           name: 'Rep. Mark Takano',
         File:'Scripts/N-17686.html'},
RepSusanDavis :  {
           name: 'Rep. Susan Davis',
         File:'Scripts/N-1942.html'},
RepMcClintock :  {
           name: 'Rep. Tom McClintock',
         File:'Scripts/N-1944.html'},
GoCardenas :  {
           name: 'Rep. Tony Cardenas',
         File:'Scripts/N-1958.html'},
RepAdamSchiff :  {
           name: 'Rep. Adam Schiff',
         File:'Scripts/N-1974.html'},
RepJimCosta :  {
           name: 'Rep. Jim Costa',
         File:'Scripts/N-1991.html'},
RepMikeHonda :  {
           name: 'Rep. Michael Honda',
         File:'Scripts/N-2024.html'},
RepJohnCampbell :  {
           name: 'Rep. John Campbell',
         File:'Scripts/N-30172.html'},
RepJuanVargas :  {
           name: 'Rep. Juan Vargas',
         File:'Scripts/N-30173.html'},
SenFeinstein :  {
           name: 'Sen. Dianne Feinstein',
         File:'Scripts/N-347.html'},
SenatorBoxer :  {
           name: 'Sen. Barbara Boxer',
         File:'Scripts/N-358.html'},
RepThompson :  {
           name: 'Rep. Mike Thompson',
         File:'Scripts/N-369.html'},
DarrellIssa :  {
           name: 'Rep. Darrell Issa',
         File:'Scripts/N-40137.html'},
askgeorge :  {
           name: 'Rep. George Miller',
         File:'Scripts/N-436.html'},
RepJeffDenham :  {
           name: 'Rep. Jeff Denham',
         File:'Scripts/N-43682.html'},
RepMcLeod :  {
           name: 'Rep. Gloria Negrete McLeod',
         File:'Scripts/N-44060.html'},
NancyPelosi :  {
           name: 'Rep. Nancy Pelosi',
         File:'Scripts/N-447.html'},
RepBarbaraLee :  {
           name: 'Rep. Barbara Lee',
         File:'Scripts/N-458.html'},
RepJudyChu :  {
           name: 'Rep. Judy Chu',
         File:'Scripts/N-48669.html'},
RepAnnaEshoo :  {
           name: 'Rep. Anna Eshoo',
         File:'Scripts/N-514.html'},
CongressmanRuiz :  {
           name: 'Rep. Raul Ruiz',
         File:'Scripts/N-52404.html'},
RepZoeLofgren :  {
           name: 'Rep. Zoe Lofgren',
         File:'Scripts/N-536.html'},
RepSamFarr :  {
           name: 'Rep. Sam Farr',
         File:'Scripts/N-547.html'},
RepLoisCapps :  {
           name: 'Rep. Lois Capps',
         File:'Scripts/N-603.html'},
Rep_Hunter :  {
           name: 'Rep. Duncan Hunter',
         File:'Scripts/N-61714.html'},
BradSherman :  {
           name: 'Rep. Brad Sherman',
         File:'Scripts/N-625.html'},
NONE_McKeon :  {
           name: 'Rep. Howard McKeon',
         File:'Scripts/N-636.html'},
WaxmanClimate :  {
           name: 'Rep. Henry Waxman',
         File:'Scripts/N-651.html'},
RepBecerra :  {
           name: 'Rep. Xavier Becerra',
         File:'Scripts/N-652.html'},
dgvaladao :  {
           name: 'Rep. David Valadao',
         File:'Scripts/N-65483.html'},
RepRoybalAllard :  {
           name: 'Rep. Lucille Roybal-Allard',
         File:'Scripts/N-656.html'},
gracenapolitano :  {
           name: 'Rep. Grace Napolitano',
         File:'Scripts/N-657.html'},
MaxineWaters :  {
           name: 'Rep. Maxine Waters',
         File:'Scripts/N-658.html'},
RepEdRoyce :  {
           name: 'Rep. Ed Royce',
         File:'Scripts/N-662.html'},
RepGaryMiller :  {
           name: 'Rep. Gary Miller',
         File:'Scripts/N-664.html'},
KenCalvert :  {
           name: 'Rep. Ken Calvert',
         File:'Scripts/N-667.html'},
DanaRohrabacher :  {
           name: 'Rep. Dana Rohrabacher',
         File:'Scripts/N-669.html'},
LorettaSanchez :  {
           name: 'Rep. Loretta Sanchez',
         File:'Scripts/N-670.html'},
RepSpeier :  {
           name: 'Rep. Jackie Speier',
         File:'Scripts/N-812.html'},
RepLowenthal :  {
           name: 'Rep. Alan Lowenthal',
         File:'Scripts/N-838.html'},
RepTipton :  {
           name: 'Rep. Scott Tipton',
         File:'Scripts/N-152485.html'},
RepPerlmutter :  {
           name: 'Rep. Ed Perlmutter',
         File:'Scripts/N-2130.html'},
SenBennetCO :  {
           name: 'Sen. Michael Bennet',
         File:'Scripts/N-26580.html'},
RepMikeCoffman :  {
           name: 'Rep. Mike Coffman',
         File:'Scripts/N-31627.html'},
repcorygardner :  {
           name: 'Rep. Cory Gardner',
         File:'Scripts/N-49911.html'},
RepDLamborn :  {
           name: 'Rep. Doug Lamborn',
         File:'Scripts/N-5515.html'},
RepJaredPolis :  {
           name: 'Rep. Jared Polis',
         File:'Scripts/N-61715.html'},
RepDianaDeGette :  {
           name: 'Rep. Diana DeGette',
         File:'Scripts/N-680.html'},
MarkUdall :  {
           name: 'Sen. Mark Udall',
         File:'Scripts/N-681.html'},
RepJoeCourtney :  {
           name: 'Rep. Joe Courtney',
         File:'Scripts/N-130586.html'},
RepEsty :  {
           name: 'Rep. Elizabeth Esty',
         File:'Scripts/N-24115.html'},
SenBlumenthal :  {
           name: 'Sen. Richard Blumenthal',
         File:'Scripts/N-31628.html'},
jahimes :  {
           name: 'Rep. Jim Himes',
         File:'Scripts/N-61673.html'},
RepJohnLarson :  {
           name: 'Rep. John Larson',
         File:'Scripts/N-689.html'},
rosadelauro :  {
           name: 'Rep. Rosa DeLauro',
         File:'Scripts/N-691.html'},
ChrisMurphyCT :  {
           name: 'Sen. Christopher Murphy',
         File:'Scripts/N-789.html'},
EleanorNorton :  {
           name: 'Del. Eleanor Norton',
         File:'Scripts/N-644.html'},
ChrisCoons :  {
           name: 'Sen. Chris Coons',
         File:'Scripts/N-12520.html'},
SenatorCarper :  {
           name: 'Sen. Thomas Carper',
         File:'Scripts/N-9482.html'},
JohnCarneyDE :  {
           name: 'Rep. John Carney',
         File:'Scripts/N-36840.html'},
SenBillNelson :  {
           name: 'Sen. Bill Nelson',
         File:'Scripts/N-10892.html'},
Rep_Southerland :  {
           name: 'Rep. Steve Southerland II',
         File:'Scripts/N-12449.html'},
RepJeffMiller :  {
           name: 'Rep. Jeff Miller',
         File:'Scripts/N-1296.html'},
RepGusBilirakis :  {
           name: 'Rep. Gus Bilirakis',
         File:'Scripts/N-1302.html'},
RepWilson :  {
           name: 'Rep. Frederica Wilson',
         File:'Scripts/N-1309.html'},
RepRichNugent :  {
           name: 'Rep. Rich Nugent',
         File:'Scripts/N-13907.html'},
RepWebster :  {
           name: 'Rep. Daniel Webster',
         File:'Scripts/N-1465.html'},
VernBuchanan :  {
           name: 'Rep. Vern Buchanan',
         File:'Scripts/N-152540.html'},
RepCorrineBrown :  {
           name: 'Rep. Corrine Brown',
         File:'Scripts/N-164.html'},
NONE_Mica :  {
           name: 'Rep. John Mica',
         File:'Scripts/N-168.html'},
PatrickMurphyFL :  {
           name: 'Rep. Patrick Murphy',
         File:'Scripts/N-17389.html'},
RosLehtinen :  {
           name: 'Rep. Ileana Ros-Lehtinen',
         File:'Scripts/N-180.html'},
treyradel :  {
           name: 'Rep. Trey Radel',
         File:'Scripts/N-18598.html'},
NONE_Hastings :  {
           name: 'Rep. Alcee Hastings',
         File:'Scripts/N-186.html'},
JoeGarcia :  {
           name: 'Rep. Joe Garcia',
         File:'Scripts/N-20173.html'},
congbillposey :  {
           name: 'Rep. Bill Posey',
         File:'Scripts/N-2401.html'},
DWStweets :  {
           name: 'Rep. Debbie Wasserman Schultz',
         File:'Scripts/N-2449.html'},
MarioDB :  {
           name: 'Rep. Mario Diaz-Balart',
         File:'Scripts/N-2462.html'},
RepLoisFrankel :  {
           name: 'Rep. Lois Frankel',
         File:'Scripts/N-2546.html'},
marcorubio :  {
           name: 'Sen. Marco Rubio',
         File:'Scripts/N-34203.html'},
USRepKCastor :  {
           name: 'Rep. Kathy Castor',
         File:'Scripts/N-36912.html'},
RepDennisRoss :  {
           name: 'Rep. Dennis Ross',
         File:'Scripts/N-37125.html'},
AnderCrenshaw :  {
           name: 'Rep. Ander Crenshaw',
         File:'Scripts/N-41700.html'},
RepTedDeutch :  {
           name: 'Rep. Ted Deutch',
         File:'Scripts/N-52272.html'},
RepDeSantis :  {
           name: 'Rep. Ron DeSantis',
         File:'Scripts/N-56353.html'},
AlanGrayson :  {
           name: 'Rep. Alan Grayson',
         File:'Scripts/N-60210.html'},
TomRooney :  {
           name: 'Rep. Tom Rooney',
         File:'Scripts/N-61664.html'},
RepTedYoho :  {
           name: 'Ted Yoho',
         File:'Scripts/N-.html'},
RepTomGraves :  {
           name: 'Rep. Tom Graves',
         File:'Scripts/N-136564.html'},
repjohnbarrow :  {
           name: 'Rep. John Barrow',
         File:'Scripts/N-141215.html'},
JackKingston :  {
           name: 'Rep. Jack Kingston',
         File:'Scripts/N-189.html'},
SanfordBishop :  {
           name: 'Rep. Sanford Bishop Jr.',
         File:'Scripts/N-190.html'},
repjohnlewis :  {
           name: 'Rep. John Lewis',
         File:'Scripts/N-194.html'},
SaxbyChambliss :  {
           name: 'Sen. Saxby Chambliss',
         File:'Scripts/N-197.html'},
RepWestmoreland :  {
           name: 'Rep. Lynn Westmoreland',
         File:'Scripts/N-2568.html'},
RepTomPrice :  {
           name: 'Rep. Tom Price',
         File:'Scripts/N-2572.html'},
repdavidscott :  {
           name: 'Rep. David Scott',
         File:'Scripts/N-2575.html'},
AustinScottGA08 :  {
           name: 'Rep. Austin Scott',
         File:'Scripts/N-2664.html'},
RepHankJohnson :  {
           name: 'Rep. Hank Johnson',
         File:'Scripts/N-51420.html'},
RepDougCollins :  {
           name: 'Rep. Doug Collins',
         File:'Scripts/N-52181.html'},
RepPhilGingrey :  {
           name: 'Rep. Phil Gingrey',
         File:'Scripts/N-6138.html'},
RepPaulBrounMD :  {
           name: 'Rep. Paul Broun',
         File:'Scripts/N-61650.html'},
SenatorIsakson :  {
           name: 'Sen. Johnny Isakson',
         File:'Scripts/N-698.html'},
NONE_Bordallo :  {
           name: 'Del. Madeleine Bordallo',
         File:'Scripts/N-132864.html'},
RepHanabusa :  {
           name: 'Rep. Colleen Hanabusa',
         File:'Scripts/N-1314.html'},
brianschatz :  {
           name: 'Sen. Brian Schatz',
         File:'Scripts/N-1321.html'},
TulsiPress :  {
           name: 'Rep. Tulsi Gabbard',
         File:'Scripts/N-17506.html'},
maziehirono :  {
           name: 'Sen. Mazie Hirono',
         File:'Scripts/N-31644.html'},
BruceBraley :  {
           name: 'Rep. Bruce Braley',
         File:'Scripts/N-152578.html'},
SenatorCharles :  {
           name: 'Sen. Charles Grassley',
         File:'Scripts/N-248.html'},
SenatorHarkin :  {
           name: 'Sen. Tom Harkin',
         File:'Scripts/N-249.html'},
TomLatham :  {
           name: 'Rep. Tom Latham',
         File:'Scripts/N-254.html'},
SteveKingIA :  {
           name: 'Rep. Steve King',
         File:'Scripts/N-2917.html'},
daveloebsack :  {
           name: 'Rep. Dave Loebsack',
         File:'Scripts/N-61231.html'},
Raul_Labrador :  {
           name: 'Rep. Raul Labrador',
         File:'Scripts/N-157375.html'},
MikeCrapo :  {
           name: 'Sen. Michael Crapo',
         File:'Scripts/N-207.html'},
CongMikeSimpson :  {
           name: 'Rep. Mike Simpson',
         File:'Scripts/N-209.html'},
SenatorRisch :  {
           name: 'Sen. Jim Risch',
         File:'Scripts/N-3071.html'},
RepKinzinger :  {
           name: 'Rep. Adam Kinzinger',
         File:'Scripts/N-11322.html'},
RepRobinKelly :  {
           name: 'Rep. Robin Kelly',
         File:'Scripts/N-129826.html'},
RepHultgren :  {
           name: 'Rep. Randy Hultgren',
         File:'Scripts/N-1391.html'},
aaronschock :  {
           name: 'Rep. Aaron Schock',
         File:'Scripts/N-142316.html'},
RepLipinski :  {
           name: 'Rep. Daniel Lipinski',
         File:'Scripts/N-151645.html'},
RepCheri :  {
           name: 'Rep. Cheri Bustos',
         File:'Scripts/N-17356.html'},
RepSchneider :  {
           name: 'Rep. Brad Schneider',
         File:'Scripts/N-17366.html'},
SenatorDurbin :  {
           name: 'Sen. Richard Durbin',
         File:'Scripts/N-210.html'},
RepBobbyRush :  {
           name: 'Rep. Bobby Rush',
         File:'Scripts/N-212.html'},
LuisGutierrez :  {
           name: 'Rep. Luis Gutierrez',
         File:'Scripts/N-216.html'},
RepDannyDavis :  {
           name: 'Rep. Danny Davis',
         File:'Scripts/N-219.html'},
janschakowsky :  {
           name: 'Rep. Jan Schakowsky',
         File:'Scripts/N-221.html'},
RepShimkus :  {
           name: 'Rep. John Shimkus',
         File:'Scripts/N-233.html'},
RepMikeQuigley :  {
           name: 'Rep. Mike Quigley',
         File:'Scripts/N-26598.html'},
PeterRoskam :  {
           name: 'Rep. Peter Roskam',
         File:'Scripts/N-3156.html'},
SenatorKirk :  {
           name: 'Sen. Mark Kirk',
         File:'Scripts/N-40130.html'},
tammyduckworth :  {
           name: 'Rep. Tammy Duckworth',
         File:'Scripts/N-51009.html'},
RodneyDavis :  {
           name: 'Rep. Rodney Davis',
         File:'Scripts/N-56788.html'},
RepBillEnyart :  {
           name: 'Rep. Bill Enyart',
         File:'Scripts/N-58544.html'},
RepBillFoster :  {
           name: 'Rep. Bill Foster',
         File:'Scripts/N-61723.html'},
RepLarryBucshon :  {
           name: 'Rep. Larry Bucshon',
         File:'Scripts/N-12062.html'},
RepStutzman :  {
           name: 'Rep. Marlin Stutzman',
         File:'Scripts/N-134189.html'},
ToddRokita :  {
           name: 'Rep. Todd Rokita',
         File:'Scripts/N-138953.html'},
SenDonnelly :  {
           name: 'Sen. Joe Donnelly',
         File:'Scripts/N-141896.html'},
RepWalorski :  {
           name: 'Rep. Jackie Walorski',
         File:'Scripts/N-143314.html'},
SusanWBrooks :  {
           name: 'Rep. Susan Brooks',
         File:'Scripts/N-17363.html'},
RepAndreCarson :  {
           name: 'Rep. Andre Carson',
         File:'Scripts/N-20043.html'},
RepVisclosky :  {
           name: 'Rep. Peter Visclosky',
         File:'Scripts/N-237.html'},
RepLukeMesser :  {
           name: 'Rep. Luke Messer',
         File:'Scripts/N-49188.html'},
SenDanCoats :  {
           name: 'Sen. Dan Coats',
         File:'Scripts/N-66.html'},
RepToddYoung :  {
           name: 'Rep. Todd Young',
         File:'Scripts/N-.html'},
RepMikePompeo :  {
           name: 'Rep. Mike Pompeo',
         File:'Scripts/N-11361.html'},
RepLynnJenkins :  {
           name: 'Rep. Lynn Jenkins',
         File:'Scripts/N-1193.html'},
SenPatRoberts :  {
           name: 'Sen. Pat Roberts',
         File:'Scripts/N-256.html'},
JerryMoran :  {
           name: 'Sen. Jerry Moran',
         File:'Scripts/N-257.html'},
CongHuelskamp :  {
           name: 'Rep. Tim Huelskamp',
         File:'Scripts/N-3630.html'},
RepKevinYoder :  {
           name: 'Rep. Kevin Yoder',
         File:'Scripts/N-.html'},
RepKevinYoder :  {
           name: 'Rep. Kevin Yoder',
         File:'Scripts/N-.html'},
SenRandPaul :  {
           name: 'Sen. Rand Paul',
         File:'Scripts/N-11354.html'},
RepAndyBarr :  {
           name: 'Rep. Andy Barr',
         File:'Scripts/N-12012.html'},
McConnellPress :  {
           name: 'Sen. Mitch McConnell',
         File:'Scripts/N-262.html'},
RepEdWhitfield :  {
           name: 'Rep. Edward Whitfield',
         File:'Scripts/N-264.html'},
RepHalRogers :  {
           name: 'Rep. Harold Rogers',
         File:'Scripts/N-268.html'},
RepGuthrie :  {
           name: 'Rep. Brett Guthrie',
         File:'Scripts/N-3764.html'},
RepThomasMassie :  {
           name: 'Rep. Thomas Massie',
         File:'Scripts/N-39316.html'},
RepJohnYarmuth :  {
           name: 'Rep. John Yarmuth',
         File:'Scripts/N-.html'},
RepJohnYarmuth :  {
           name: 'Rep. John A. Yarmuth',
         File:'Scripts/N-.html'},
RepRichmond :  {
           name: 'Rep. Cedric Richmond',
         File:'Scripts/N-10251.html'},
RepBoustany :  {
           name: 'Rep. Charles Boustany Jr.',
         File:'Scripts/N-143034.html'},
RepFleming :  {
           name: 'Rep. John Fleming',
         File:'Scripts/N-21024.html'},
SenLandrieu :  {
           name: 'Sen. Mary Landrieu',
         File:'Scripts/N-273.html'},
USRepAlexander :  {
           name: 'Rep. Rodney Alexander',
         File:'Scripts/N-3919.html'},
SteveScalise :  {
           name: 'Rep. Steve Scalise',
         File:'Scripts/N-3950.html'},
BillCassidy :  {
           name: 'Rep. Bill Cassidy',
         File:'Scripts/N-61903.html'},
DavidVitter :  {
           name: 'Sen. David Vitter',
         File:'Scripts/N-699.html'},
USRepKeating :  {
           name: 'Rep. William Keating',
         File:'Scripts/N-12735.html'},
elizabethforma :  {
           name: 'Sen. Elizabeth Warren',
         File:'Scripts/N-17358.html'},
RepJoeKennedy :  {
           name: 'Rep. Joseph Kennedy III',
         File:'Scripts/N-18629.html'},
RepRichardNeal :  {
           name: 'Rep. Richard Neal',
         File:'Scripts/N-300.html'},
RepMcGovern :  {
           name: 'Rep. Jim McGovern',
         File:'Scripts/N-301.html'},
RepTierney :  {
           name: 'Rep. John Tierney',
         File:'Scripts/N-305.html'},
MarkeyMemo :  {
           name: 'Sen. Edward Markey',
         File:'Scripts/N-306.html'},
mikecapuano :  {
           name: 'Rep. Michael Capuano',
         File:'Scripts/N-307.html'},
RepStephenLynch :  {
           name: 'Rep. Stephen Lynch',
         File:'Scripts/N-4040.html'},
nikiinthehouse :  {
           name: 'Rep. Niki Tsongas',
         File:'Scripts/N-61697.html'},
Call_Me_Dutch :  {
           name: 'Rep. C.A. Dutch Ruppersberger',
         File:'Scripts/N-132362.html'},
RepAndyHarrisMD :  {
           name: 'Rep. Andy Harris',
         File:'Scripts/N-1362.html'},
RepJohnDelaney :  {
           name: 'Rep. John Delaney',
         File:'Scripts/N-17921.html'},
SenatorBarb :  {
           name: 'Sen. Barbara Mikulski',
         File:'Scripts/N-287.html'},
SenatorCardin :  {
           name: 'Sen. Benjamin Cardin',
         File:'Scripts/N-290.html'},
WhipHoyer :  {
           name: 'Rep. Steny Hoyer',
         File:'Scripts/N-293.html'},
ElijahECummings :  {
           name: 'Rep. Elijah Cummings',
         File:'Scripts/N-295.html'},
ChrisVanHollen :  {
           name: 'Rep. Chris Van Hollen',
         File:'Scripts/N-4275.html'},
RepJohnSarbanes :  {
           name: 'Rep. John Sarbanes',
         File:'Scripts/N-51078.html'},
repdonnaedwards :  {
           name: 'Rep. Donna Edwards',
         File:'Scripts/N-60201.html'},
chelliepingree :  {
           name: 'Rep. Chellie Pingree',
         File:'Scripts/N-10719.html'},
SenatorCollins :  {
           name: 'Sen. Susan Collins',
         File:'Scripts/N-283.html'},
RepMikeMichaud :  {
           name: 'Rep. Michael Michaud',
         File:'Scripts/N-4441.html'},
SenAngusKing :  {
           name: 'Sen. Angus King Jr.',
         File:'Scripts/N-9493.html'},
RepHuizenga :  {
           name: 'Rep. Bill Huizenga',
         File:'Scripts/N-135163.html'},
CongressmanDan :  {
           name: 'Rep. Dan Benishek',
         File:'Scripts/N-13581.html'},
RepDanKildee :  {
           name: 'Rep. Dan Kildee',
         File:'Scripts/N-17560.html'},
SenCarlLevin :  {
           name: 'Sen. Carl Levin',
         File:'Scripts/N-310.html'},
RepDaveCamp :  {
           name: 'Rep. Dave Camp',
         File:'Scripts/N-316.html'},
CandiceMiller :  {
           name: 'Rep. Candice Miller',
         File:'Scripts/N-31689.html'},
RepFredUpton :  {
           name: 'Rep. Fred Upton',
         File:'Scripts/N-318.html'},
stabenow :  {
           name: 'Sen. Debbie Stabenow',
         File:'Scripts/N-320.html'},
repsandylevin :  {
           name: 'Rep. Sander Levin',
         File:'Scripts/N-324.html'},
repjohnconyers :  {
           name: 'Rep. John Conyers Jr.',
         File:'Scripts/N-327.html'},
john_dingell :  {
           name: 'Rep. John Dingell',
         File:'Scripts/N-329.html'},
RepMikeRogers :  {
           name: 'Rep. Mike Rogers',
         File:'Scripts/N-4574.html'},
RepGaryPeters :  {
           name: 'Rep. Gary Peters',
         File:'Scripts/N-4589.html'},
RepWalberg :  {
           name: 'Rep. Tim Walberg',
         File:'Scripts/N-4679.html'},
RepKerryB :  {
           name: 'Rep. Kerry Bentivolio',
         File:'Scripts/N-54151.html'},
repjustinamash :  {
           name: 'Rep. Justin Amash',
         File:'Scripts/N-80123.html'},
repjohnkline :  {
           name: 'Rep. John Kline',
         File:'Scripts/N-10583.html'},
Tim_Walz :  {
           name: 'Rep. Tim Walz',
         File:'Scripts/N-152506.html'},
amyklobuchar :  {
           name: 'Sen. Amy Klobuchar',
         File:'Scripts/N-152558.html'},
USRepRickNolan :  {
           name: 'Rep. Rick Nolan',
         File:'Scripts/N-17617.html'},
NONE_Peterson :  {
           name: 'Rep. Collin Peterson',
         File:'Scripts/N-339.html'},
MicheleBachmann :  {
           name: 'Rep. Michele Bachmann',
         File:'Scripts/N-36577.html'},
RepErikPaulsen :  {
           name: 'Rep. Erik Paulsen',
         File:'Scripts/N-4693.html'},
BettyMcCollum04 :  {
           name: 'Rep. Betty McCollum',
         File:'Scripts/N-4822.html'},
keithellison :  {
           name: 'Rep. Keith Ellison',
         File:'Scripts/N-49040.html'},
alfranken :  {
           name: 'Sen. Al Franken',
         File:'Scripts/N-61727.html'},
LacyClayMO1 :  {
           name: 'Rep. William Lacy Clay',
         File:'Scripts/N-10338.html'},
USRepLong :  {
           name: 'Rep. Billy Long',
         File:'Scripts/N-11332.html'},
RepHartzler :  {
           name: 'Rep. Vicky Hartzler',
         File:'Scripts/N-11637.html'},
RepBlainePress :  {
           name: 'Rep. Blaine Luetkemeyer',
         File:'Scripts/N-1400.html'},
repcleaver :  {
           name: 'Rep. Emanuel Cleaver II',
         File:'Scripts/N-142984.html'},
RepJasonSmith :  {
           name: 'Rep. Jason Smith',
         File:'Scripts/N-157258.html'},
RepAnnWagner :  {
           name: 'Rep. Ann Wagner',
         File:'Scripts/N-17704.html'},
clairecmc :  {
           name: 'Sen. Claire McCaskill',
         File:'Scripts/N-31697.html'},
RoyBlunt :  {
           name: 'Sen. Roy Blunt',
         File:'Scripts/N-357.html'},
NONE_Graves :  {
           name: 'Rep. Sam Graves',
         File:'Scripts/N-4974.html'},
NONE_Sablan :  {
           name: 'Del. Gregorio Sablan',
         File:'Scripts/N-26575.html'},
SenThadCochran :  {
           name: 'Sen. Thad Cochran',
         File:'Scripts/N-341.html'},
SenatorWicker :  {
           name: 'Sen. Roger Wicker',
         File:'Scripts/N-343.html'},
BennieGThompson :  {
           name: 'Rep. Bennie Thompson',
         File:'Scripts/N-344.html'},
CongPalazzo :  {
           name: 'Rep. Steven Palazzo',
         File:'Scripts/N-497480.h'},
RepAlanNunnelee :  {
           name: 'Rep. Alan Nunnelee',
         File:'Scripts/N-5110.html'},
GreggHarper :  {
           name: 'Rep. Gregg Harper',
         File:'Scripts/N-61838.html'},
MaxBaucus :  {
           name: 'Sen. Max Baucus',
         File:'Scripts/N-361.html'},
jontester :  {
           name: 'Sen. Jon Tester',
         File:'Scripts/N-5281.html'},
SteveDaines :  {
           name: 'Rep. Steve Daines',
         File:'Scripts/N-22662.html'},
RepReneeEllmers :  {
           name: 'Rep. Renee Ellmers',
         File:'Scripts/N-12188.html'},
PatrickMcHenry :  {
           name: 'Rep. Patrick McHenry',
         File:'Scripts/N-132688.html'},
RepPittenger :  {
           name: 'Rep. Robert Pittenger',
         File:'Scripts/N-138321.html'},
GKButterfield :  {
           name: 'Rep. G.K. Butterfield',
         File:'Scripts/N-146731.html'},
RepHolding :  {
           name: 'Rep. George Holding',
         File:'Scripts/N-17538.html'},
RepRichHudson :  {
           name: 'Rep. Richard Hudson',
         File:'Scripts/N-17540.html'},
RepMarkMeadows :  {
           name: 'Rep. Mark Meadows',
         File:'Scripts/N-17599.html'},
RepWalterJones :  {
           name: 'Rep. Walter Jones',
         File:'Scripts/N-442.html'},
RepDavidEPrice :  {
           name: 'Rep. David Price',
         File:'Scripts/N-443.html'},
SenatorBurr :  {
           name: 'Sen. Richard Burr',
         File:'Scripts/N-444.html'},
HowardCoble :  {
           name: 'Rep. Howard Coble',
         File:'Scripts/N-445.html'},
RepMikeMcIntyre :  {
           name: 'Rep. Mike McIntyre',
         File:'Scripts/N-446.html'},
MelWattNC12 :  {
           name: 'Rep. Melvin Watt',
         File:'Scripts/N-452.html'},
SenatorHagan :  {
           name: 'Sen. Kay Hagan',
         File:'Scripts/N-5415.html'},
virginiafoxx :  {
           name: 'Rep. Virginia Foxx',
         File:'Scripts/N-5638.html'},
SenatorHeitkamp :  {
           name: 'Sen. Heidi Heitkamp',
         File:'Scripts/N-31710.html'},
SenJohnHoeven :  {
           name: 'Sen. John Hoeven',
         File:'Scripts/N-33536.html'},
RepKevinCramer :  {
           name: 'Rep. Kevin Cramer',
         File:'Scripts/N-151945.html'},
RepAdrianSmith :  {
           name: 'Rep. Adrian Smith',
         File:'Scripts/N-1428.html'},
JeffFortenberry :  {
           name: 'Rep. Jeff Fortenberry',
         File:'Scripts/N-143017.html'},
SenatorFischer :  {
           name: 'Sen. Deb Fischer',
         File:'Scripts/N-143124.html'},
LEETERRYNE :  {
           name: 'Rep. Lee Terry',
         File:'Scripts/N-367.html'},
Mike_Johanns :  {
           name: 'Sen. Mike Johanns',
         File:'Scripts/N-9501.html'},
RepAnnieKuster :  {
           name: 'Rep. Ann Kuster',
         File:'Scripts/N-11493.html'},
KellyAyotte :  {
           name: 'Sen. Kelly Ayotte',
         File:'Scripts/N-147826.html'},
RepSheaPorter :  {
           name: 'Rep. Carol Shea-Porter',
         File:'Scripts/N-51196.html'},
SenatorShaheen :  {
           name: 'Sen. Jeanne Shaheen',
         File:'Scripts/N-9503.html'},
RepJonRunyan :  {
           name: 'Rep. Jon Runyan',
         File:'Scripts/N-12420.html'},
ChiesaNews :  {
           name: 'Sen. Jeff Chiesa',
         File:'Scripts/N-26882.html'},
RepSires :  {
           name: 'Rep. Albio Sires',
         File:'Scripts/N-30037.html'},
RepAndrews :  {
           name: 'Rep. Robert Andrews',
         File:'Scripts/N-382.html'},
RepLoBiondo :  {
           name: 'Rep. Frank LoBiondo',
         File:'Scripts/N-383.html'},
RepChrisSmith :  {
           name: 'Rep. Christopher Smith',
         File:'Scripts/N-385.html'},
FrankPallone :  {
           name: 'Rep. Frank Pallone Jr.',
         File:'Scripts/N-387.html'},
BillPascrell :  {
           name: 'Rep. Bill Pascrell Jr.',
         File:'Scripts/N-389.html'},
USRepRodney :  {
           name: 'Rep. Rodney Frelinghuysen',
         File:'Scripts/N-393.html'},
RushHolt :  {
           name: 'Rep. Rush Holt',
         File:'Scripts/N-394.html'},
SenatorMenendez :  {
           name: 'Sen. Robert Menendez',
         File:'Scripts/N-395.html'},
RepDonaldPayne :  {
           name: 'Rep. Donald Payne Jr.',
         File:'Scripts/N-40102.html'},
RepLanceNJ7 :  {
           name: 'Rep. Leonard Lance',
         File:'Scripts/N-6493.html'},
RepGarrett :  {
           name: 'Rep. Scott Garrett',
         File:'Scripts/N-6514.html'},
SenatorTomUdall :  {
           name: 'Sen. Tom Udall',
         File:'Scripts/N-400.html'},
MartinHeinrich :  {
           name: 'Sen. Martin Heinrich',
         File:'Scripts/N-61668.html'},
RepLujanGrisham :  {
           name: 'Rep. Michelle Lujan Grisham',
         File:'Scripts/N-62219.html'},
repbenraylujan :  {
           name: 'Rep. Ben Lujan',
         File:'Scripts/N-62459.html'},
RepStevePearce :  {
           name: 'Rep. Steve Pearce',
         File:'Scripts/N-6612.html'},
RepHorsford :  {
           name: 'Rep. Steven Horsford',
         File:'Scripts/N-147484.html'},
RepJoeHeck :  {
           name: 'Rep. Joe Heck',
         File:'Scripts/N-147486.html'},
SenDeanHeller :  {
           name: 'Sen. Dean Heller',
         File:'Scripts/N-31730.html'},
SenatorReid :  {
           name: 'Sen. Harry Reid',
         File:'Scripts/N-370.html'},
MarkAmodeiNV2 :  {
           name: 'Rep. Mark Amodei',
         File:'Scripts/N-6273.html'},
dinatitus :  {
           name: 'Rep. Dina Titus',
         File:'Scripts/N-6785.html'},
RepTomReed :  {
           name: 'Rep. Tom Reed',
         File:'Scripts/N-11533.html'},
BillOwensNY :  {
           name: 'Rep. Bill Owens',
         File:'Scripts/N-11725.html'},
repmichaelgrimm :  {
           name: 'Rep. Michael Grimm',
         File:'Scripts/N-12232.html'},
TimBishopNY :  {
           name: 'Rep. Timothy Bishop',
         File:'Scripts/N-133600.html'},
RepChrisGibson :  {
           name: 'Rep. Chris Gibson',
         File:'Scripts/N-13604.html'},
YvetteClarke :  {
           name: 'Rep. Yvette Clarke',
         File:'Scripts/N-143010.html'},
RepGraceMeng :  {
           name: 'Rep. Grace Meng',
         File:'Scripts/N-159352.html'},
RepRichardHanna :  {
           name: 'Rep. Richard Hanna',
         File:'Scripts/N-23923.html'},
RepJeffries :  {
           name: 'Rep. Hakeem Jeffries',
         File:'Scripts/N-35987.html'},
RepBrianHiggins :  {
           name: 'Rep. Brian Higgins',
         File:'Scripts/N-3723.html'},
ChuckSchumer :  {
           name: 'Sen. Charles Schumer',
         File:'Scripts/N-402.html'},
RepPeteKing :  {
           name: 'Rep. Peter King',
         File:'Scripts/N-406.html'},
RepMcCarthyNY :  {
           name: 'Rep. Carolyn McCarthy',
         File:'Scripts/N-407.html'},
GregoryMeeks :  {
           name: 'Rep. Gregory Meeks',
         File:'Scripts/N-409.html'},
repjoecrowley :  {
           name: 'Rep. Joseph Crowley',
         File:'Scripts/N-410.html'},
RepJerryNadler :  {
           name: 'Rep. Jerrold Nadler',
         File:'Scripts/N-411.html'},
NydiaVelazquez :  {
           name: 'Rep. Nydia Velazquez',
         File:'Scripts/N-416.html'},
RepMaloney :  {
           name: 'Rep. Carolyn Maloney',
         File:'Scripts/N-418.html'},
cbrangel :  {
           name: 'Rep. Charles Rangel',
         File:'Scripts/N-419.html'},
RepJoseSerrano :  {
           name: 'Rep. Jose Serrano',
         File:'Scripts/N-420.html'},
RepEliotEngel :  {
           name: 'Rep. Eliot Engel',
         File:'Scripts/N-421.html'},
NitaLowey :  {
           name: 'Rep. Nita Lowey',
         File:'Scripts/N-422.html'},
louiseslaughter :  {
           name: 'Rep. Louise Slaughter',
         File:'Scripts/N-433.html'},
RepSteveIsrael :  {
           name: 'Rep. Steve Israel',
         File:'Scripts/N-46811.html'},
SenGillibrand :  {
           name: 'Sen. Kirsten Gillibrand',
         File:'Scripts/N-51447.html'},
RepDanMaffei :  {
           name: 'Rep. Dan Maffei',
         File:'Scripts/N-51644.html'},
RepChrisCollins :  {
           name: 'Rep. Chris Collins',
         File:'Scripts/N-56282.html'},
RepSeanMaloney :  {
           name: 'Rep. Sean Maloney',
         File:'Scripts/N-60738.html'},
paultonko :  {
           name: 'Rep. Paul Tonko',
         File:'Scripts/N-6865.html'},
RepJimRenacci :  {
           name: 'Rep. James Renacci',
         File:'Scripts/N-11662.html'},
RepMikeTurner :  {
           name: 'Rep. Michael Turner',
         File:'Scripts/N-130424.html'},
RepBillJohnson :  {
           name: 'Rep. Bill Johnson',
         File:'Scripts/N-13095.html'},
bradwenstrup :  {
           name: 'Rep. Brad Wenstrup',
         File:'Scripts/N-17710.html'},
RepMarciaFudge :  {
           name: 'Rep. Marcia Fudge',
         File:'Scripts/N-26451.html'},
boblatta :  {
           name: 'Rep. Bob Latta',
         File:'Scripts/N-30341.html'},
RepBobGibbs :  {
           name: 'Rep. Bob Gibbs',
         File:'Scripts/N-30356.html'},
TimRyan :  {
           name: 'Rep. Tim Ryan',
         File:'Scripts/N-30639.html'},
RepSteveChabot :  {
           name: 'Rep. Steve Chabot',
         File:'Scripts/N-459.html'},
robportman :  {
           name: 'Sen. Rob Portman',
         File:'Scripts/N-460.html'},
SpeakerBoehner :  {
           name: 'Rep. John Boehner',
         File:'Scripts/N-466.html'},
RepMarcyKaptur :  {
           name: 'Rep. Marcy Kaptur',
         File:'Scripts/N-467.html'},
SenSherrodBrown :  {
           name: 'Sen. Sherrod Brown',
         File:'Scripts/N-472.html'},
RepSteveStivers :  {
           name: 'Rep. Steve Stivers',
         File:'Scripts/N-49121.html'},
RepDaveJoyce :  {
           name: 'Rep. David Joyce',
         File:'Scripts/N-59942.html'},
Jim_Jordan :  {
           name: 'Rep. Jim Jordan',
         File:'Scripts/N-7025.html'},
TiberiPress :  {
           name: 'Rep. Pat Tiberi',
         File:'Scripts/N-7067.html'},
RepBeatty :  {
           name: 'Rep. Joyce Beatty',
         File:'Scripts/N-756.html'},
RepLankford :  {
           name: 'Rep. James Lankford',
         File:'Scripts/N-12294.html'},
tomcoleok04 :  {
           name: 'Rep. Tom Cole',
         File:'Scripts/N-137049.html'},
RepMullin :  {
           name: 'Rep. Markwayne Mullin',
         File:'Scripts/N-17382.html'},
RepJBridenstine :  {
           name: 'Rep. Jim Bridenstine',
         File:'Scripts/N-17431.html'},
InhofePress :  {
           name: 'Sen. James Inhofe',
         File:'Scripts/N-481.html'},
TomCoburn :  {
           name: 'Sen. Tom Coburn',
         File:'Scripts/N-483.html'},
FrankDLucas :  {
           name: 'Rep. Frank Lucas',
         File:'Scripts/N-487.html'},
RepBonamici :  {
           name: 'Rep. Suzanne Bonamici',
         File:'Scripts/N-156386.html'},
RonWyden :  {
           name: 'Sen. Ron Wyden',
         File:'Scripts/N-488.html'},
repgregwalden :  {
           name: 'Rep. Greg Walden',
         File:'Scripts/N-493.html'},
BlumenauerMedia :  {
           name: 'Rep. Earl Blumenauer',
         File:'Scripts/N-494.html'},
RepPeterDeFazio :  {
           name: 'Rep. Peter DeFazio',
         File:'Scripts/N-495.html'},
SenJeffMerkley :  {
           name: 'Sen. Jeff Merkley',
         File:'Scripts/N-6321.html'},
RepSchrader :  {
           name: 'Rep. Kurt Schrader',
         File:'Scripts/N-7279.html'},
DentPressShop :  {
           name: 'Rep. Charlie Dent',
         File:'Scripts/N-1163.html'},
RepTomMarino :  {
           name: 'Rep. Tom Marino',
         File:'Scripts/N-12324.html'},
KRPA12 :  {
           name: 'Rep. Keith Rothfus',
         File:'Scripts/N-12416.html'},
RepLouBarletta :  {
           name: 'Rep. Lou Barletta',
         File:'Scripts/N-131002.html'},
RepMeehan :  {
           name: 'Rep. Patrick Meehan',
         File:'Scripts/N-142876.html'},
RepFitzpatrick :  {
           name: 'Rep. Michael Fitzpatrick',
         File:'Scripts/N-150964.html'},
RepScottPerry :  {
           name: 'Rep. Scott Perry',
         File:'Scripts/N-156144.html'},
RepCartwright :  {
           name: 'Rep. Matt Cartwright',
         File:'Scripts/N-18366.html'},
GleenThompson :  {
           name: 'Rep. Glenn Thompson',
         File:'Scripts/N-30977.html'},
SenBobCasey :  {
           name: 'Sen. Bob Casey',
         File:'Scripts/N-37219.html'},
RepBillShuster :  {
           name: 'Rep. Bill Shuster',
         File:'Scripts/N-48694.html'},
RepBrady :  {
           name: 'Rep. Robert Brady',
         File:'Scripts/N-499.html'},
chakafattah :  {
           name: 'Rep. Chaka Fattah',
         File:'Scripts/N-500.html'},
SenToomey :  {
           name: 'Sen. Patrick Toomey',
         File:'Scripts/N-515.html'},
RepJoePitts :  {
           name: 'Rep. Joe Pitts',
         File:'Scripts/N-516.html'},
USRepMikeDoyle :  {
           name: 'Rep. Mike Doyle',
         File:'Scripts/N-518.html'},
MikeKellyPA :  {
           name: 'Rep. Mike Kelly',
         File:'Scripts/N-64600.html'},
RepTimMurphy :  {
           name: 'Rep. Tim Murphy',
         File:'Scripts/N-7553.html'},
JimGerlach :  {
           name: 'Rep. Jim Gerlach',
         File:'Scripts/N-7609.html'},
GoAllySchwartz :  {
           name: 'Rep. Allyson Schwartz',
         File:'Scripts/N-7627.html'},
pedropierluisi :  {
           name: 'Res. Com. Pedro Pierluisi',
         File:'Scripts/N-21560.html'},
jimlangevin :  {
           name: 'Rep. Jim Langevin',
         File:'Scripts/N-10391.html'},
SenWhitehouse :  {
           name: 'Sen. Sheldon Whitehouse',
         File:'Scripts/N-31753.html'},
SenJackReed :  {
           name: 'Sen. Jack Reed',
         File:'Scripts/N-523.html'},
RepCicilline :  {
           name: 'Rep. David Cicilline',
         File:'Scripts/N-7648.html'},
TGowdySC :  {
           name: 'Rep. Trey Gowdy',
         File:'Scripts/N-11308.html'},
RepJeffDuncan :  {
           name: 'Rep. Jeff Duncan',
         File:'Scripts/N-135701.html'},
RepMickMulvaney :  {
           name: 'Rep. Mick Mulvaney',
         File:'Scripts/N-157656.html'},
SenatorTimScott :  {
           name: 'Sen. Tim Scott',
         File:'Scripts/N-23067.html'},
RepSanfordSC :  {
           name: 'Rep. Mark Sanford Jr.',
         File:'Scripts/N-529.html'},
GrahamBlog :  {
           name: 'Sen. Lindsey Graham',
         File:'Scripts/N-531.html'},
Clyburn :  {
           name: 'Rep. James Clyburn',
         File:'Scripts/N-534.html'},
RepTomRice :  {
           name: 'Rep. Tom Rice',
         File:'Scripts/N-56025.html'},
RepJoeWilson :  {
           name: 'Rep. Joe Wilson',
         File:'Scripts/N-7954.html'},
SenJohnsonSD :  {
           name: 'Sen. Tim Johnson',
         File:'Scripts/N-537.html'},
SenJohnThune :  {
           name: 'Sen. John Thune',
         File:'Scripts/N-538.html'},
RepKristiNoem :  {
           name: 'Rep. Kristi Noem',
         File:'Scripts/N-157820.html'},
RepChuck :  {
           name: 'Rep. Chuck Fleischmann',
         File:'Scripts/N-11290.html'},
DesJarlaisTN04 :  {
           name: 'Rep. Scott DesJarlais',
         File:'Scripts/N-11683.html'},
RepFincherTN08 :  {
           name: 'Rep. Stephen Fincher',
         File:'Scripts/N-12198.html'},
repjimcooper :  {
           name: 'Rep. Jim Cooper',
         File:'Scripts/N-132966.html'},
SenBobCorker :  {
           name: 'Sen. Bob Corker',
         File:'Scripts/N-152489.html'},
MarshaBlackburn :  {
           name: 'Rep. Marsha Blackburn',
         File:'Scripts/N-1572.html'},
SenAlexander :  {
           name: 'Sen. Lamar Alexander',
         File:'Scripts/N-20000.html'},
DrPhilRoe :  {
           name: 'Rep. Phil Roe',
         File:'Scripts/N-51685.html'},
RepJohnDuncanJr :  {
           name: 'Rep. John Duncan Jr.',
         File:'Scripts/N-542.html'},
RepCohen :  {
           name: 'Rep. Steve Cohen',
         File:'Scripts/N-8123.html'},
RepDianeBlack :  {
           name: 'Rep. Diane Black',
         File:'Scripts/N-920.html'},
TXRandy14 :  {
           name: 'Rep. Randy Weber',
         File:'Scripts/N-102033.html'},
SenTedCruz :  {
           name: 'Sen. Ted Cruz',
         File:'Scripts/N-11516.html'},
RepBillFlores :  {
           name: 'Rep. Bill Flores',
         File:'Scripts/N-11947.html'},
farenthold :  {
           name: 'Rep. Blake Farenthold',
         File:'Scripts/N-11970.html'},
JoaquinCastrotx :  {
           name: 'Rep. Joaquin Castro',
         File:'Scripts/N-129521.html'},
RepHensarling :  {
           name: 'Rep. Jeb Hensarling',
         File:'Scripts/N-129613.html'},
michaelcburgess :  {
           name: 'Rep. Michael Burgess',
         File:'Scripts/N-129875.html'},
JudgeCarter :  {
           name: 'Rep. John Carter',
         File:'Scripts/N-129902.html'},
RandyNeugebauer :  {
           name: 'Rep. Randy Neugebauer',
         File:'Scripts/N-141060.html'},
JudgeTedPoe :  {
           name: 'Rep. Ted Poe',
         File:'Scripts/N-141755.html'},
McCaulPressShop :  {
           name: 'Rep. Michael McCaul',
         File:'Scripts/N-141765.html'},
replouiegohmert :  {
           name: 'Rep. Louie Gohmert',
         File:'Scripts/N-141935.html'},
ConawayTX11 :  {
           name: 'Rep. K. Michael Conaway',
         File:'Scripts/N-141944.html'},
RepVeasey :  {
           name: 'Rep. Marc Veasey',
         File:'Scripts/N-142538.html'},
RepAlGreen :  {
           name: 'Rep. Al Green',
         File:'Scripts/N-142554.html'},
RogerWilliamsTX :  {
           name: 'Rep. Roger Williams',
         File:'Scripts/N-152474.html'},
BetoORourke :  {
           name: 'Rep. Beto O\'Rourke',
         File:'Scripts/N-17624.html'},
JohnCornyn :  {
           name: 'Sen. John Cornyn',
         File:'Scripts/N-31770.html'},
RepFilemonVela :  {
           name: 'Rep. Filemon Vela',
         File:'Scripts/N-54579.html'},
SamsPressShop :  {
           name: 'Rep. Sam Johnson',
         File:'Scripts/N-555.html'},
RalphHallPress :  {
           name: 'Rep. Ralph Hall',
         File:'Scripts/N-556.html'},
PeteSessions :  {
           name: 'Rep. Pete Sessions',
         File:'Scripts/N-557.html'},
RepJoeBarton :  {
           name: 'Rep. Joe Barton',
         File:'Scripts/N-559.html'},
RepKevinBrady :  {
           name: 'Rep. Kevin Brady',
         File:'Scripts/N-561.html'},
RepLloydDoggett :  {
           name: 'Rep. Lloyd Doggett',
         File:'Scripts/N-563.html'},
RepKayGranger :  {
           name: 'Rep. Kay Granger',
         File:'Scripts/N-565.html'},
MacTXPress :  {
           name: 'Rep. Mac Thornberry',
         File:'Scripts/N-566.html'},
USRepRHinojosa :  {
           name: 'Rep. Ruben Hinojosa',
         File:'Scripts/N-568.html'},
JacksonLeeTX18 :  {
           name: 'Rep. Sheila Jackson Lee',
         File:'Scripts/N-572.html'},
LamarSmithTX21 :  {
           name: 'Rep. Lamar Smith',
         File:'Scripts/N-575.html'},
RepGeneGreen :  {
           name: 'Rep. Gene Green',
         File:'Scripts/N-584.html'},
RepEBJ :  {
           name: 'Rep. Eddie Bernice Johnson',
         File:'Scripts/N-585.html'},
OlsonPressShop :  {
           name: 'Rep. Pete Olson',
         File:'Scripts/N-61867.html'},
RepKenMarchant :  {
           name: 'Rep. Kenny Marchant',
         File:'Scripts/N-8249.html'},
RepPeteGallego :  {
           name: 'Rep. Pete Gallego',
         File:'Scripts/N-8314.html'},
CongCulberson :  {
           name: 'Rep. John Culberson',
         File:'Scripts/N-8336.html'},
RepCuellar :  {
           name: 'Rep. Henry Cuellar',
         File:'Scripts/N-8337.html'},
DonnyFerguson :  {
           name: 'Rep. Steve Stockman',
         File:'Scripts/N-88.html'},
BarackObama :  {
           name: 'President Barack Obama',
         File:'Scripts/N-3181.html'},
RepJimMatheson :  {
           name: 'Rep. Jim Matheson',
         File:'Scripts/N-10412.html'},
SenMikeLee :  {
           name: 'Sen. Mike Lee',
         File:'Scripts/N-12547.html'},
RepRobBishop :  {
           name: 'Rep. Rob Bishop',
         File:'Scripts/N-130762.html'},
RepChrisStewart :  {
           name: 'Rep. Chris Stewart',
         File:'Scripts/N-18620.html'},
SenOrrinHatch :  {
           name: 'Sen. Orrin Hatch',
         File:'Scripts/N-586.html'},
jasoninthehouse :  {
           name: 'Rep. Jason Chaffetz',
         File:'Scripts/N-62201.html'},
RepScottRigell :  {
           name: 'Rep. Scott Rigell',
         File:'Scripts/N-11538.html'},
GerryConnolly :  {
           name: 'Rep. Gerald Connolly',
         File:'Scripts/N-20152.html'},
RepRobertHurt :  {
           name: 'Rep. Robert Hurt',
         File:'Scripts/N-48754.html'},
MarkWarner :  {
           name: 'Sen. Mark Warner',
         File:'Scripts/N-48778.html'},
timkaine :  {
           name: 'Sen. Tim Kaine',
         File:'Scripts/N-48779.html'},
repbobbyscott :  {
           name: 'Rep. Robert Scott',
         File:'Scripts/N-599.html'},
RepGoodlatte :  {
           name: 'Rep. Robert Goodlatte',
         File:'Scripts/N-604.html'},
Jim_Moran :  {
           name: 'Rep. James Moran',
         File:'Scripts/N-606.html'},
GOPLeader :  {
           name: 'Rep. Eric Cantor',
         File:'Scripts/N-8543.html'},
Randy_Forbes :  {
           name: 'Rep. J. Randy Forbes',
         File:'Scripts/N-8585.html'},
RepMGriffith :  {
           name: 'Rep. Morgan Griffith',
         File:'Scripts/N-8620.html'},
RobWittman :  {
           name: 'Rep. Rob Wittman ',
         File:'Scripts/N-.html'},
RepWOLFPress :  {
           name: 'Rep. Frank Wolf ',
         File:'Scripts/N-.html'},
DelegateDonna :  {
           name: 'Del. Donna Christensen',
         File:'Scripts/N-648.html'},
SenatorLeahy :  {
           name: 'Sen. Patrick Leahy',
         File:'Scripts/N-592.html'},
SenSanders :  {
           name: 'Sen. Bernard Sanders',
         File:'Scripts/N-594.html'},
WelchForVT :  {
           name: 'Rep. Peter Welch',
         File:'Scripts/N-48818.html'},
RepRickLarsen :  {
           name: 'Rep. Rick Larsen',
         File:'Scripts/N-10416.html'},
CantwellPress :  {
           name: 'Sen. Maria Cantwell',
         File:'Scripts/N-11025.html'},
RepDelBene :  {
           name: 'Rep. Suzan DelBene',
         File:'Scripts/N-11281.html'},
RepDennyHeck :  {
           name: 'Rep. Denny Heck',
         File:'Scripts/N-12243.html'},
davereichert :  {
           name: 'Rep. Dave Reichert',
         File:'Scripts/N-142979.html'},
RepDerekKilmer :  {
           name: 'Rep. Derek Kilmer',
         File:'Scripts/N-150559.html'},
HerreraBeutler :  {
           name: 'Rep. Jaime Herrera Beutler',
         File:'Scripts/N-159647.html'},
PattyMurray :  {
           name: 'Sen. Patty Murray',
         File:'Scripts/N-611.html'},
DocHastings :  {
           name: 'Rep. Doc Hastings',
         File:'Scripts/N-616.html'},
RepJimMcDermott :  {
           name: 'Rep. Jim McDermott',
         File:'Scripts/N-619.html'},
RepAdamSmith :  {
           name: 'Rep. Adam Smith',
         File:'Scripts/N-621.html'},
cathymcmorris :  {
           name: 'Rep. Cathy McMorris Rodgers',
         File:'Scripts/N-9059.html'},
RepSeanDuffy :  {
           name: 'Rep. Sean Duffy',
         File:'Scripts/N-11537.html'},
RepRibble :  {
           name: 'Rep. Reid Ribble',
         File:'Scripts/N-11709.html'},
SenRonJohnson :  {
           name: 'Sen. Ron Johnson',
         File:'Scripts/N-13976.html'},
RepPaulRyan :  {
           name: 'Rep. Paul Ryan',
         File:'Scripts/N-630.html'},
SenatorBaldwin :  {
           name: 'Sen. Tammy Baldwin',
         File:'Scripts/N-631.html'},
RepRonKind :  {
           name: 'Rep. Ron Kind',
         File:'Scripts/N-632.html'},
NONE_Petri :  {
           name: 'Rep. Tom Petri',
         File:'Scripts/N-635.html'},
JimPressOffice :  {
           name: 'Rep. Jim Sensenbrenner',
         File:'Scripts/N-639.html'},
repmarkpocan :  {
           name: 'Rep. Mark Pocan',
         File:'Scripts/N-8894.html'},
RepGwenMoore :  {
           name: 'Rep. Gwen Moore',
         File:'Scripts/N-9147.html'},
RepShelley :  {
           name: 'Rep. Shelley Capito',
         File:'Scripts/N-11018.html'},
RepMcKinley :  {
           name: 'Rep. David McKinley',
         File:'Scripts/N-12338.html'},
Sen_JoeManchin :  {
           name: 'Sen. Joe Manchin III',
         File:'Scripts/N-46655.html'},
SenRockefeller :  {
           name: 'Sen. Jay Rockefeller',
         File:'Scripts/N-623.html'},
HouseTransInf :  {
           name: 'Rep. Nick Rahall II',
         File:'Scripts/N-627.html'},
SenJohnBarrasso :  {
           name: 'Sen. John Barrasso',
         File:'Scripts/N-135255.html'},
SenatorEnzi :  {
           name: 'Sen. Michael Enzi',
         File:'Scripts/N-641.html'},
CynthiaLummis :  {
           name: 'Rep. Cynthia Lummis',
         File:'Scripts/N-31801.html'}


};
		var b = navigator.userAgent;
		var result = {
				isGecko		: b.indexOf("Gecko") > -1 && b.indexOf("KHTML") === -1,
				isWebKit 	: (b.indexOf("WebKit") !== -1),
				isMobileSafari  : /Apple.*Mobile.*Safari/.test(b),
				isMozilla 	: (b.indexOf("Mozilla") !== -1),
				isChrome 	: (b.indexOf("Chrome") !== -1),
				isFireFox 	: (b.indexOf("Firefox") !== -1),
				isIPhone 	: (b.indexOf("iPhone") !== -1),
				isIPad 		: (b.indexOf("iPad") !== -1),
				isIPod 		: (b.indexOf("iPod") != -1),
				isOpera 	: (b.indexOf("Opera") !== -1),
				isKindle 	: (b.indexOf("Kindle") !== -1) || (b.indexOf("Silk") !== -1) || (b.indexOf("KFTT") !== -1) || (b.indexOf("KFOT") !== -1) 
					|| (b.indexOf("KFJWA") !== -1) || (b.indexOf("KFJWI") !== -1) || (b.indexOf("KFSOWI") !== -1) || (b.indexOf("KFTHWA") !== -1)
					|| (b.indexOf("KFTHWI") !== -1) || (b.indexOf("KFAPWA") !== -1) || (b.indexOf("KFAPWI") !== -1) 
					|| (b.indexOf("X11; ; U; Linux armv7l;") !== -1),
				isBlackBerry 	: (b.indexOf("BlackBerry") !== -1),
				isXBox 		: (b.indexOf("Xbox") !== -1) || (b.indexOf("XBoX") !== -1),
				isJungleBrowser : (b.indexOf("theJungle") !== -1)
			};
		result.isLocalHost	= (/^http:\/\/localhost/.test(location.href));
		result.isServerAccess	= (/^http:\/\//.test(location.href));
		var match = /(?:; ([^;)]+) Build\/.*)?\bSilk\/([0-9._-]+)\b(.*\bMobile Safari\b)?/.exec(b);
		if (match) {
			result.isKindle = true;
//			alert("Detected Silk version "+match[2]+" on device "+(match[1] || "Kindle Fire")+" in mode "+(match[3] ? "Mobile" : "Default (desktop)"));
		}
		result.isIDevice		= result.isIPhone  ||  result.isIPod  ||  result.isIPad;
		result.isMobile		= result.isIDevice  ||  result.isKindle;

		var gupUserAgent = document.location.href.gup( "userAgent");
		if ( gupUserAgent)
		{
			var values = gupUserAgent.split( "," );
			if (values[1] === "true") values[1] = true;
			if (values[1] === undefined ||  values[1] === "false") values[1] = false;
			
			result[ values[0] ] = values[1];
		}
		
		//	alert(  b);
		if (gupUserAgent)
		{
			alert( result.isIDevice + "  " + result.isKindle + "  " + result.isMobile + "  " + "X11; ; U; Linux armv7l;   " +b);
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
			markupTweetCloud : function( cloud ) {

					var pos = cloud.indexOf("<body>") + 6;
					var str = cloud.substring( pos );
					var div = $("<div>").html(str);
					var b = $(div).find("#contents");
					
					var spans = $(b).find("font").find("span");
					var sizes = {};
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
						});
						
					var maxSizes = 5;
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
							var fontSize = min + px * bucketSize;
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
					
					dataModels.ctweets = b;
					
				},
				
			loadFAUXdata : function ( callback ) {
					var self = this;
					var dfd_dnews = $.get("data/view-source 4pia.com Dnews_window.php.html");
					var dfd_rnews = $.get("data/view-source 4pia.com Rnews_window.php.html");
					
					var ctweets_debug = document.location.href.gup( "ctweets");
					
					var dfd_ctweets = $.Deferred();
					$.get("http://4pia.com/TweetCloud.php")
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

		
					var dfd_people = _.each( people, function( entry, key ) {
							entry.profileImage = "http://twitter.com/api/users/profile_image/" + key;
							entry.url = "http://4pia.com/" + entry.File;
							entry.key = key;
							entry.sortName = entry.name.sortName()
						});
					
					$.when( dfd_dnews, dfd_rnews, dfd_people, dfd_ctweets)
						.done( function(dnews, rnews, people, cloud) {
								dataModels.dtweets = parseHTML( dnews[0], "dtweets", new Date( 2014, 02, 10) );
								dataModels.rtweets = parseHTML( rnews[0], "rtweets", new Date( 2014, 02, 10) );
								
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
									
								dataModels.bios = [];
								_.each( people, function( entry, key ) {
										dataModels.bios.push( {category : "bios", bio : entry } );
									});
								dataModels.bios.sort(function(a, b) {
//										if (a.bio.sortName === "Denny Heck") return -1;
										return a.bio.sortName.localeCompare( b.bio.sortName );
									});
									
								dataModels.drillDown = [];
								dataModels.people = people;
								if (cloud !== true)
								{
									self.markupTweetCloud( cloud[0] );
								}
								$("body").find(".biocnt").text( dataModels.bios.length );
								$("body").find(".dailycnt").text( dataModels.daily.length );
								$("body").find(".rtweetcnt").text( dataModels.rtweets.length );
								$("body").find(".dtweetcnt").text( dataModels.dtweets.length );
								callback();
							});
				},
		};
		
    // Returns the Model public API
    return publicAPI;

} );