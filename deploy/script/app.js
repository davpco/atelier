!function(a){a(function(){var b={};b.init=function(){b.retrieveData(function(a){b.renderUI(a),b.bindUI()})},b.renderUI=function(c){var d,e,f,g,h=c.length,i=0,j=-1;for(d=Math.floor(h/b.getColumnCount()),f=a("#app").find(".slideshow-vertical"),g=a(f[0]),e=0;h>e;e++)j===d&&(g=f[++i],j=0),j++,a(g).append(b.renderItem(c[e]))},b.renderItem=function(a){var c;return(c=b.getCompiledTemplate(a.type))(a)},b.bindUI=function(){a("#app").imagesLoaded(function(){b.unLockInterfaceAction(),b.initScrollAction(),b.playVideo()}),a(window).on("resize",function(){a(".vert").height(a(window).height()-80)})},b.initScrollAction=function(){for(var c,d=b.getColumnCount(),e=0,f=a("#app").find(".slideshow-vertical");d>e;)c=1===e||3===e?"backwards":"forwards",a(f[e]).simplyScroll({customClass:"vert",orientation:"vertical",auto:!0,manualMode:"loop",frameRate:24,speed:1,direction:c}),a(a(".vert")[e]).height(a(window).height()-80),e++},b.unLockInterfaceAction=function(){a("#loading-icon").hide()},b.playVideo=function(){a(".video-slide .vid").each(function(){a(this).get(0).play()})},b.retrieveData=function(a){var b=[];b=APP_CONFIG.testData.items,a(b)},b.getResolution=function(){return a(window).width()},b.getColumnCount=function(){var a=4;return b.getResolution()<768&&(a=2),a},b.getCompiledTemplate=function(c){var d,e="#item-image-template";return"image"===c?(b.imageCompiledTemplate||(source=a(e).html(),b.imageCompiledTemplate=Handlebars.compile(source)),d=b.imageCompiledTemplate):"video"===c&&(e="#item-video-template",b.videoCompiledTemplate||(source=a(e).html(),b.videoCompiledTemplate=Handlebars.compile(source)),d=b.videoCompiledTemplate),d},b.init()})}(jQuery);