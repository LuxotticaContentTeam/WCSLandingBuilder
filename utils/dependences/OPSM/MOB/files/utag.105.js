//tealium universal tag - utag.105 ut4.0.202309250934, Copyright 2023 Tealium.com Inc. All Rights Reserved.
if(typeof utag.ut=="undefined"){utag.ut={};}
utag.ut.libloader2=function(o,a,b,c,l){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=o.src;if(o.id){b.id=o.id};if(typeof o.cb=='function'){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}}
l=o.loc||'head';c=a.getElementsByTagName(l)[0];if(c){if(l=='script'){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}
utag.DB("Attach to "+l+": "+o.src)}}
try{(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1};u.initialized=false;u.data={};u.data.google_conversion_id="979897593";u.data.google_conversion_label="";u.data.pagetype="other";u.data.value="";u.data.google_remarketing_only=true;u.data.base_url="//www.googleadservices.com/pagead/conversion_async.js";u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f,g;g={};u.data.google_custom_params={};for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
g.google_conversion_id=u.data.google_conversion_id;if(u.data.google_conversion_label){g.google_conversion_label=u.data.google_conversion_label;}
u.data.prod=u.data.prod||(typeof b._cprod!="undefined"?b._cprod.slice(0):[]);u.data.value=u.data.value||b._csubtotal;u.data.google_custom_params={ecomm_prodid:u.data.prod,ecomm_pagetype:u.data.pagetype,ecomm_totalvalue:u.data.value};g.google_custom_params=u.data.google_custom_params;if(u.data.google_remarketing_only){g.google_remarketing_only=u.data.google_remarketing_only;}
u.gac_callback=function(){window.google_trackConversion(g);}
if(!u.initialized){u.initialized=true;utag.ut.libloader2({src:u.data.base_url,cb:u.gac_callback});}else{u.gac_callback();}}}
utag.o[loader].loader.LOAD(id);})('105','luxottica.opsm');}catch(e){}
