function tb_init(a){$(a).click(function(){var a=this.title||this.name||null,b=this.href||this.alt,c=this.rel||!1;return tb_show(a,b,c),this.blur(),!1})}function tb_show(a,b,c){try{"undefined"==typeof document.body.style.maxHeight?($("body","html").css({height:"100%",width:"100%"}),$("html").css("overflow","hidden"),null===document.getElementById("TB_HideSelect")&&($("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>"),$("#TB_overlay").click(tb_remove))):null===document.getElementById("TB_overlay")&&($("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>"),$("#TB_overlay").click(tb_remove)),$("#TB_overlay").addClass(tb_detectMacXFF()?"TB_overlayMacFFBGHack":"TB_overlayBG"),null===a&&(a=""),$("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>"),$("#TB_load").show();var d,e="pagename=conditions";-1!==b.indexOf("?")?(d=b.substr(0,b.indexOf("?")),e=b.substr(b.indexOf("?")+1,b.length-b.indexOf("?"))):d=b;var f=/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/,g=d.toLowerCase().match(f);if(".jpg"==g||".jpeg"==g||".png"==g||".gif"==g||".bmp"==g){if(TB_PrevCaption="",TB_PrevURL="",TB_PrevHTML="",TB_NextCaption="",TB_NextURL="",TB_NextHTML="",TB_imageCount="",TB_FoundURL=!1,c)for(TB_TempArray=$("a[@rel="+c+"]").get(),TB_Counter=0;TB_Counter<TB_TempArray.length&&""===TB_NextHTML;TB_Counter++){{TB_TempArray[TB_Counter].href.toLowerCase().match(f)}TB_TempArray[TB_Counter].href!=b?TB_FoundURL?(TB_NextCaption=TB_TempArray[TB_Counter].title,TB_NextURL=TB_TempArray[TB_Counter].href,TB_NextHTML="<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>"):(TB_PrevCaption=TB_TempArray[TB_Counter].title,TB_PrevURL=TB_TempArray[TB_Counter].href,TB_PrevHTML="<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>"):(TB_FoundURL=!0,TB_imageCount="Image "+(TB_Counter+1)+" of "+TB_TempArray.length)}imgPreloader=new Image,imgPreloader.onload=function(){function d(){return $(document).unbind("click",d)&&$(document).unbind("click",d),$("#TB_window").remove(),$("body").append("<div id='TB_window'></div>"),tb_show(TB_PrevCaption,TB_PrevURL,c),!1}function e(){return $("#TB_window").remove(),$("body").append("<div id='TB_window'></div>"),tb_show(TB_NextCaption,TB_NextURL,c),!1}imgPreloader.onload=null;var f=tb_getPageSize(),g=f[0]-150,h=f[1]-150,i=imgPreloader.width,j=imgPreloader.height;i>g?(j*=g/i,i=g,j>h&&(i*=h/j,j=h)):j>h&&(i*=h/j,j=h,i>g&&(j*=g/i,i=g)),TB_WIDTH=i+30,TB_HEIGHT=j+60,$("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+b+"' width='"+i+"' height='"+j+"' alt='"+a+"'/></a><div id='TB_caption'>"+a+"<div id='TB_secondLine'>"+TB_imageCount+TB_PrevHTML+TB_NextHTML+"</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div>"),$("#TB_closeWindowButton").click(tb_remove),""!==TB_PrevHTML&&$("#TB_prev").click(d),""!==TB_NextHTML&&$("#TB_next").click(e),document.onkeydown=function(a){keycode=null==a?event.keyCode:a.which,27==keycode?tb_remove():190==keycode?""!=TB_NextHTML&&(document.onkeydown="",e()):188==keycode&&""!=TB_PrevHTML&&(document.onkeydown="",d())},tb_position(),$("#TB_load").remove(),$("#TB_ImageOff").click(tb_remove),$("#TB_window").css({display:"block"})},imgPreloader.src=b}else{var h=b.replace(/^[^\?]+\??/,""),i=tb_parseQuery(h);TB_WIDTH=1*i.width+30||630,TB_HEIGHT=1*i.height+40||440,ajaxContentW=TB_WIDTH-30,ajaxContentH=TB_HEIGHT-45,-1!=b.indexOf("TB_iframe")?(urlNoQuery=b.split("TB_"),$("#TB_iframeContent").remove(),"true"!=i.modal?$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+a+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+e+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(1e3*Math.random())+"' onload='tb_showIframe()' style='width:"+(ajaxContentW+29)+"px;height:"+(ajaxContentH+17)+"px;' > </iframe>"):($("#TB_overlay").unbind(),$("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+e+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(1e3*Math.random())+"' onload='tb_showIframe()' style='width:"+(ajaxContentW+29)+"px;height:"+(ajaxContentH+17)+"px;'> </iframe>"))):"block"!=$("#TB_window").css("display")?"true"!=i.modal?$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+a+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>"):($("#TB_overlay").unbind(),$("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>")):($("#TB_ajaxContent")[0].style.width=ajaxContentW+"px",$("#TB_ajaxContent")[0].style.height=ajaxContentH+"px",$("#TB_ajaxContent")[0].scrollTop=0,$("#TB_ajaxWindowTitle").html(a)),$("#TB_closeWindowButton").click(tb_remove),-1!=b.indexOf("TB_inline")?($("#TB_ajaxContent").append($("#"+i.inlineId).children()),$("#TB_window").unload(function(){$("#"+i.inlineId).append($("#TB_ajaxContent").children())}),tb_position(),$("#TB_load").remove(),$("#TB_window").css({display:"block"})):-1!=b.indexOf("TB_iframe")?(tb_position(),$.browser.safari&&($("#TB_load").remove(),$("#TB_window").css({display:"block"}))):$("#TB_ajaxContent").load(b+="&random="+(new Date).getTime(),function(){tb_position(),$("#TB_load").remove(),tb_init("#TB_ajaxContent a.thickbox"),$("#TB_window").css({display:"block"})})}i.modal||(document.onkeyup=function(a){keycode=null==a?event.keyCode:a.which,27==keycode&&tb_remove()})}catch(j){}}function tb_showIframe(){$("#TB_load").remove(),$("#TB_window").css({display:"block"})}function tb_remove(){return $("#TB_imageOff").unbind("click"),$("#TB_closeWindowButton").unbind("click"),$("#TB_window").fadeOut("fast",function(){$("#TB_window,#TB_overlay,#TB_HideSelect").trigger("unload").unbind().remove()}),$("#TB_load").remove(),"undefined"==typeof document.body.style.maxHeight&&($("body","html").css({height:"auto",width:"auto"}),$("html").css("overflow","")),document.onkeydown="",document.onkeyup="",!1}function tb_position(){$("#TB_window").css({marginLeft:"-"+parseInt(TB_WIDTH/2,10)+"px",width:TB_WIDTH+"px"}),jQuery.browser.msie&&jQuery.browser.version<7||$("#TB_window").css({marginTop:"-"+parseInt(TB_HEIGHT/2,10)+"px"})}function tb_parseQuery(a){var b={};if(!a)return b;for(var c=a.split(/[;&]/),d=0;d<c.length;d++){var e=c[d].split("=");if(e&&2==e.length){var f=unescape(e[0]),g=unescape(e[1]);g=g.replace(/\+/g," "),b[f]=g}}return b}function tb_getPageSize(){var a=document.documentElement,b=window.innerWidth||self.innerWidth||a&&a.clientWidth||document.body.clientWidth,c=window.innerHeight||self.innerHeight||a&&a.clientHeight||document.body.clientHeight;return arrayPageSize=[b,c]}function tb_detectMacXFF(){var a=navigator.userAgent.toLowerCase();return-1!=a.indexOf("mac")&&-1!=a.indexOf("firefox")?!0:void 0}var tb_pathToImage=siteUrl+"/images/icons/loading.gif";$(document).ready(function(){tb_init("a.thickbox, area.thickbox, input.thickbox"),imgLoader=new Image,imgLoader.src=tb_pathToImage});