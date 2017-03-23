var userAgent = navigator.userAgent, 
rMsie = /(msie\s|trident.*rv:)([\w.]+)/, 
rFirefox = /(firefox)\/([\w.]+)/, 
rOpera = /(opera).+version\/([\w.]+)/, 
rChrome = /(chrome)\/([\w.]+)/, 
rSafari = /version\/([\w.]+).*(safari)/; 
var browser; 
var version; 
var ua = userAgent.toLowerCase(); 
function uaMatch(ua){ 
 var match = rMsie.exec(ua); 
 if(match != null){ 
 return { browser : "IE", version : match[2] || "0" }; 
 } 
 var match = rFirefox.exec(ua); 
 if (match != null) { 
 return { browser : match[1] || "", version : match[2] || "0" }; 
 } 
 var match = rOpera.exec(ua); 
 if (match != null) { 
 return { browser : match[1] || "", version : match[2] || "0" }; 
 } 
 var match = rChrome.exec(ua); 
 if (match != null) { 
 return { browser : match[1] || "", version : match[2] || "0" }; 
 } 
 var match = rSafari.exec(ua); 
 if (match != null) { 
 return { browser : match[2] || "", version : match[1] || "0" }; 
 } 
 if (match != null) { 
 return { browser : "", version : "0" }; 
 } 
} 
var browserMatch = uaMatch(userAgent.toLowerCase()); 
if (browserMatch.browser){ 
 browser = browserMatch.browser; 
 version = browserMatch.version; 
} 
//document.write(browser+version);
if(browser == 'IE'){
	if(version<10){
		alert('朋友，欢迎您访问本站！你正在使用'+browser+version+'版本浏览器访问本站，如果你使用IE10以上版本，或者谷歌、火狐等浏览器打开的话，效果更佳,体验更好：)');
	}
}
