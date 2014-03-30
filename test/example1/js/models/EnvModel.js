// Enviornment Model
// ==============

// Includes file dependencies
define([
	"jquery",
], function( $ ) {

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
		
	    return result;

} );