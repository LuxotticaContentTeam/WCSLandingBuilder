//tealium universal tag - utag.1342 ut4.0.202310091003, Copyright 2023 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'all':1,'view':1};u.initialized=false;u.map={"_sm_1342_1":"account_id"};u.extend=[function(a,b){try{b['_sm_1342_1']="GTM-WLHM6RF";}catch(e){utag.DB(e);}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={"account_id":"GTM-WLHM6RF","base_url":"https://www.googletagmanager.com/gtm.js?id="
};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'granted',analytics_storage:'granted',});gtag("set","ads_data_redaction",true);gtag('set','url_passthrough',true);u.loader_cb=function(){u.initialized=true;b.event=a
dataLayer.push(b)
};if(!u.initialized){u.loader({"type":"script","src":u.data.base_url+u.data.account_id,"cb":u.loader_cb,"loc":"script","id":'utag_1342'});}else{u.loader_cb();}
}};utag.o[loader].loader.LOAD(id);})("1342","luxottica.sunglasshutnew");}catch(error){utag.DB(error);}
