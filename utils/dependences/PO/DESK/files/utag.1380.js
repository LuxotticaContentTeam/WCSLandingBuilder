//tealium universal tag - utag.1380 ut4.0.202310091003, Copyright 2023 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={"id":id};utag.o[loader].sender[id]=u;u.ev={"view":1,"link":1};u.map={"Page_Section1":"event.Page_Section1","page_type":"event.page_type,share.content_type","Order_CancellationId":"event.Order_CancellationId","Order_PaymentType":"event.payment_type","Order_ProductsAmount":"event.value","Products_Shape_Array":"event.product_shape,product_shape","tealium_event:user_register":"sign_up","tealium_event:user_login":"login","tealium_event:search_view":"search","tealium_event:social_share":"share","tealium_event:cart_add":"add_to_cart","tealium_event:product_view":"view_item","tealium_event:checkout_delivery":"begin_checkout","tealium_event:checkout_payment":"add_shipping_info","tealium_event:category_view":"view_item_list","tealium_event:cart_view":"view_cart","tealium_event:search":"search","tealium_event:email_signup":"add_shipping_info","tealium_event:exam_question1":"book_an_appointment","tealium_event:exam_scheduler":"select_appointment_purpose","tealium_event:exam_step2":"select_appointment_slot","tealium_event:exam_confirmation":"appointment_confirmation","Products_FrameTechnology_Array":"product_frame_technology","Products_LensTechnology_Array":"product_lens_technology","Products_FrameType_Array":"products_frametype","Products_LensType_Array":"products_lenstype","Products_ModelCode_Array":"products_modelcode","Products_LensUPC_Array":"products_lens","Products_Frame_Array":"products_frame","Products_Case_Array":"products_case","Products_Size_Array":"products_size","Products_Badges_Array":"products_badges","Products_MoCo_Array":"products_moco","User_Country":"event.user_country","User_LoginStatus":"event.user_status","Search_Keyword":"event.search_term","User_LoginType":"event.method","Page_Name":"share.item_id,product_item_list_name","Page_Name:Account:History-Empty":"view_order_history","Page_Name:Account:History":"view_order_details","Products_Id_Array":"product_index","User_Email_MD5":"event.custom_user_id,customer_id,set.user_properties.custom_user_id","Order_ShippingMode":"event.shipping_tier","_csubtotal":"event.value","Content_Description:Saveforlater":"add_to_wishlist","Content_Description:Remove":"remove_from_cart","Content_Description:SUBSCRIBE":"sign_up","ga4_event:size-chart":"view_size_chart","ga4_event:my-account_profile":"view_profile_information","ga4_event:my-account_orders":"view_order_history","ga4_event:my-account_order_detail":"view_order_details","ga4_event:click-to-chat":"start_chat","event_name:exam_search":"find_store","event_name:my-account_orders":"view_order_history","ga4_clientid":"set.user_properties.custom_client_id","Order_InsuranceAmount":"event.product_insurance_amount","Order_Currency":"event.currency","item_qta":"purchase.item_quantity"};u.extend=[function(a,b){try{if(1){var path=window.location.pathname;var path_arr=path.split("/");path_arr.reverse();path_arr.pop();path_arr.pop();path_arr.reverse();b.ga4_event=path_arr.join("_")
if(b.ga4_event.search("my-account_order_")>=0){b.ga4_event="my-account_order_detail";}
if(typeof b['qp.pageName']!="undefined"&&b['qp.pageName']=="ClickToChat"){b.ga4_event="click-to-chat";}
var ga_id=utag.data['cp._ga']
var ga_id_arr=ga_id.split(".");b.ga4_clientid=ga_id_arr[ga_id_arr.length-2]+"."+ga_id_arr[ga_id_arr.length-1]
try{var my_prod_qta=b['Products_Units_Array'];b.item_qta=0;my_prod_qta.forEach(item=>{b.item_qta+=item;});}
catch(err){}}}catch(e){utag.DB(e)}}];u.send=function(utag_event,data_layer){if(u.ev[utag_event]||u.ev.all!==undefined){utag.DB("send:1380");utag.DB(data_layer);var a,b,c,d,i,j,has_purchase=false,prop;a=utag_event;b=data_layer;u.data={"base_url":"https://www.googletagmanager.com/gtag/js?id=##utag_measurement_id##","measurement_id":"G-6P80B86QTY","clear_global_vars":"false","data_layer_name":"","send_page_view":"true","order_id":"","order_total":"","order_subtotal":"","order_shipping":"","order_tax":"","order_store":"","order_currency":"","order_coupon_code":"","product_id":[],"product_name":[],"product_brand":[],"product_category":[],"product_subcategory":[],"product_addcategory3":[],"product_addcategory4":[],"product_addcategory5":[],"product_quantity":[],"product_unit_price":[],"product_discount":[],"product_coupon":[],"product_variant":[],"product_promotion_id":[],"product_promotion_name":[],"product_creative_name":[],"product_creative_slot":[],"product_location_id":[],"product_index":[],"product_item_list_name":[],"product_item_list_id":[],"product_affiliation":[],"event_queue":[],"config":{},"set":{"developer_id.dYmQxMT":true,"user_properties":{}},"event":{},"items":[]};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};utag.DB("send:1380:EXTENSIONS");utag.DB(data_layer);for(var mapping_key in utag.loader.GV(u.map)){if(data_layer[mapping_key]!==undefined&&data_layer[mapping_key]!==""){var destinations=u.map[mapping_key].split(",");for(i=0;i<destinations.length;i++){mapFunc(destinations[i].split("."),u.data,data_layer[mapping_key]);}}else{var event_destinations=mapping_key.split(":");if(event_destinations.length===2&&data_layer[event_destinations[0]]===event_destinations[1]){if(u.map[mapping_key]){u.data.event_queue=u.data.event_queue.concat(u.map[mapping_key].split(","));}}}}
utag.DB("send:1380:MAPPINGS");utag.DB(u.data);u.data.order_id=u.data.order_id||data_layer._corder||"";u.data.order_total=u.data.order_total||data_layer._ctotal||"";u.data.order_shipping=u.data.order_shipping||data_layer._cship||"";u.data.order_tax=u.data.order_tax||data_layer._ctax||"";u.data.order_store=u.data.order_store||data_layer._cstore||"";u.data.order_currency=u.data.order_currency||data_layer._ccurrency||"";u.data.order_coupon_code=u.data.order_coupon_code||data_layer._cpromo||"";u.data.customer_id=u.data.customer_id||data_layer._ccustid||"";u.data.customer_city=u.data.customer_city||data_layer._ccity||"";u.data.customer_state=u.data.customer_state||data_layer._cstate||"";u.data.customer_zip=u.data.customer_zip||data_layer._czip||"";u.data.customer_country=u.data.customer_country||data_layer._ccountry||"";if(u.data.product_id.length===0&&data_layer._cprod!==undefined){u.data.product_id=data_layer._cprod.slice(0);}
if(u.data.product_name.length===0&&data_layer._cprodname!==undefined){u.data.product_name=data_layer._cprodname.slice(0);}
if(u.data.product_brand.length===0&&data_layer._cbrand!==undefined){u.data.product_brand=data_layer._cbrand.slice(0);}
if(u.data.product_category.length===0&&data_layer._ccat!==undefined){u.data.product_category=data_layer._ccat.slice(0);}
if(u.data.product_subcategory.length===0&&data_layer._ccat2!==undefined){u.data.product_subcategory=data_layer._ccat2.slice(0);}
if(u.data.product_quantity.length===0&&data_layer._cquan!==undefined){u.data.product_quantity=data_layer._cquan.slice(0);}
if(u.data.product_unit_price.length===0&&data_layer._cprice!==undefined){u.data.product_unit_price=data_layer._cprice.slice(0);}
if(u.data.product_discount.length===0&&data_layer._cpdisc!==undefined){u.data.product_discount=data_layer._cpdisc.slice(0);}
if(utag.ut.typeOf(u.data.measurement_id)==="string"&&u.data.measurement_id!==""){u.data.measurement_id=u.data.measurement_id.replace(/\s/g,"").split(",");}
if(u.data.data_layer_name){u.data.base_url=u.data.base_url+"&l="+u.data.data_layer_name;}
if(!u.data.measurement_id){utag.DB(u.id+": Tag not fired: Required attribute measurement_id not populated");return;}
if(u.data.gtag_enable_tcf_support){window["gtag_enable_tcf_support"]=toBoolean(u.data.gtag_enable_tcf_support);}
var utmParams=["utm_source","utm_medium","utm_campaign","utm_term","utm_content"];var utmPageLocation=u.data.config.page_location||data_layer["dom.url"];var utmQuery=[];utmParams.forEach(function(paramName){if(u.data[paramName]&&utmPageLocation.indexOf(paramName+"=")===-1){utmQuery.push(paramName+"="+u.data[paramName]);}});if(utmQuery.length){u.data.config.page_location=utmPageLocation.indexOf("?")===-1?utmPageLocation+"?"+utmQuery.join("&"):utmPageLocation+"&"+utmQuery.join("&");}
u.data.event.send_to=u.data.event.send_to||u.data.measurement_id;if(u.data.customer_id){u.data.config.user_id=u.data.customer_id;}
if(toBoolean(u.data.clear_global_vars)){setGlobalProperties(u.data.config,true);for(prop in utag.loader.GV(u.data.set)){if(prop!=="developer_id.dYmQxMT"){setGlobalProperties(u.data.set,true,prop);}}}
setGlobalProperties(u.data.config,false);setGlobalProperties(u.data.set,false);if(u.data.config.send_page_view!==undefined){u.data.send_page_view=toBoolean(u.data.config.send_page_view);}
if(!u.initialized&&toBoolean(u.data.send_page_view)){u.data.event_queue.unshift("page_view");}
u.data.config.send_page_view=false;for(i=0;i<u.data.measurement_id.length;i++){if(!/^[a-zA-Z]{1}-|^[a-zA-Z]{2}-/.test(u.data.measurement_id[i])){u.data.measurement_id[i]="G-"+u.data.measurement_id[i];}
u.o("config",u.data.measurement_id[i],u.data.config);}
u.initialized=true;for(i=0;i<u.data.event_queue.length;i++){if(u.data.event_queue[i]==="purchase"||u.data.event_queue[i]==="refund"){has_purchase=true;}}
if(u.data.order_id&&!has_purchase){u.data.event_queue.push("purchase");}
for(i=0;i<u.data.event_queue.length;i++){var event_name=u.data.event_queue[i];var event_data={};event_data=JSON.parse(JSON.stringify(u.data.event));if(u.data.event.event_callback){event_data.event_callback=u.data.event.event_callback;}
if(u.data.event.non_interaction){u.data.event.non_interaction=true;}
if(u.event_map[event_name]){for(j=0;j<u.event_map[event_name].length;j++){var event_param=u.event_map[event_name][j];var event_param_value=u.std_params[event_param]?u.std_params[event_param](event_name):u.data[event_param]||"";if(event_param_value!==""){event_data[event_param]=event_param_value;}}}
Object.keys(u.map).forEach(function(mapping_from){if(u.map[mapping_from].indexOf(event_name)===0&&typeof b[mapping_from]!=="undefined"){var mapping_to=u.map[mapping_from].substring(event_name.length+1);event_data[mapping_to]=b[mapping_from];}});utag.ut.merge(event_data,u.data[event_name],0);u.o("event",event_name,event_data);}
if(!hasgtagjs()){u.scriptrequested=true;utag.ut.gtagScriptRequested=true;u.data.base_url=u.data.base_url.replace("##utag_measurement_id##",u.data.measurement_id[0]);utag.ut.loader({"type":"script","src":u.data.base_url,"cb":null,"loc":"script","id":"utag_1380","attrs":{}});}
utag.DB("send:1380:COMPLETE");}};function mapFunc(arr,obj,item){var i=arr.shift();obj[i]=obj[i]||{};if(arr.length>0){mapFunc(arr,obj[i],item);}else{obj[i]=item;}}
function toBoolean(val){val=val||"";return val===true||val.toLowerCase()==="true"||val.toLowerCase()==="on";}
function hasgtagjs(){window.gtagRename=window.gtagRename||"g4tag"||"gtag";if(utag.ut.gtagScriptRequested){return true;}
var i,s=document.getElementsByTagName("script");for(i=0;i<s.length;i++){if(s[i].src&&s[i].src.indexOf("gtag/js")>=0&&(s[i].id&&s[i].id.indexOf("utag")>-1)){return true;}}
var data_layer_name=""||"dataLayer";window[data_layer_name]=window[data_layer_name]||[];if(typeof window[window.gtagRename]!=="function"){window[window.gtagRename]=function(){window[data_layer_name].push(arguments);};var cross_track=toBoolean(""),cross_track_domains="";if(cross_track&&cross_track_domains!==""){window[window.gtagRename]("set","linker",{domains:cross_track_domains.split(","),accept_incoming:true});}
window[window.gtagRename]("js",new Date());}
return false;}
u.scriptrequested=hasgtagjs();u.initialized=false;u.o=window[window.gtagRename];function setGlobalProperties(data,reset,custom_property){var map={"user_id":{"name":"user_id","type":"exists","reset":true},"page_path":{"name":"page_path","type":"exists","reset":true},"page_title":{"name":"page_title","type":"exists","reset":true},"page_location":{"name":"page_location","type":"exists","reset":false},"developer_id.dYmQxMT":{"name":"developer_id.dYmQxMT","type":"exists","reset":false},"user_properties":{"name":"user_properties","type":"object","reset":true}},prop,subProp,g={};if(custom_property&&reset){g[custom_property]="";}
for(prop in utag.loader.GV(map)){if(reset&&map[prop].reset){if(map[prop].name==="user_properties"){for(subProp in data[prop]){if(!g[map[prop].name]){g[map[prop].name]={};}
g[map[prop].name][subProp]="";}}else{g[map[prop].name]="";}}else{if(map[prop].type==="bool"){if(data[prop]==true||data[prop]==="true"){g[map[prop].name]=true;}}
else if(map[prop].type==="exists"||map[prop].type==="object"){if(data[prop]){g[map[prop].name]=data[prop];}}}}
if(!utag.ut.isEmptyObject(g)){u.o("set",g);}}
function getItems(length){var g={},i,items=[];length=length||u.data.product_id.length||u.data.product_name.length;for(i=0;i<length;i++){g={};g.item_id=u.data.product_id[i];if(u.data.product_name[i]){g.item_name=u.data.product_name[i];}
if(u.data.product_coupon[i]){g.coupon=u.data.product_coupon[i];}
if(u.data.product_discount[i]){g.discount=u.data.product_discount[i];}
if(u.data.product_affiliation[i]){g.affiliation=u.data.product_affiliation[i];}
if(u.data.product_brand[i]){g.item_brand=u.data.product_brand[i];}
if(u.data.product_category[i]){g.item_category=u.data.product_category[i];}
if(u.data.product_subcategory[i]){g.item_category2=u.data.product_subcategory[i];}
if(u.data.product_addcategory3[i]){g.item_category3=u.data.product_addcategory3[i];}
if(u.data.product_addcategory4[i]){g.item_category4=u.data.product_addcategory4[i];}
if(u.data.product_addcategory5[i]){g.item_category5=u.data.product_addcategory5[i];}
if(u.data.product_variant[i]){g.item_variant=u.data.product_variant[i];}
if(u.data.product_unit_price[i]){g.price=u.data.product_unit_price[i];}
if(u.data.order_currency){g.currency=u.data.order_currency;}
if(u.data.product_quantity[i]){g.quantity=u.data.product_quantity[i];}
if(u.data.product_promotion_id[i]){g.promotion_id=u.data.product_promotion_id[i];}
if(u.data.product_promotion_name[i]){g.promotion_name=u.data.product_promotion_name[i];}
if(u.data.product_creative_name[i]){g.creative_name=u.data.product_creative_name[i];}
if(u.data.product_creative_slot[i]){g.creative_slot=u.data.product_creative_slot[i];}
if(u.data.product_location_id[i]){g.location_id=u.data.product_location_id[i];}
if(u.data.product_index[i]){g.index=u.data.product_index[i];}
if(u.data.product_item_list_name[i]){g.item_list_name=u.data.product_item_list_name;}
if(u.data.product_item_list_id[i]){g.item_list_id=u.data.product_item_list_id[i];}
if(typeof u.data.product_frame_color!="undefined"&&u.data.product_frame_color[i]){g.products_framecolor=u.data.product_frame_color[i];}
if(typeof u.data.product_lens_color!="undefined"&&u.data.product_lens_color[i]){g.products_lenscolor=u.data.product_lens_color[i];}
if(typeof u.data.product_frame_technology!="undefined"&&u.data.product_frame_technology[i]){g.products_frametechnology=u.data.product_frame_technology[i];}
if(typeof u.data.product_shape!="undefined"&&u.data.product_shape[i]){g.products_shape=u.data.product_shape[i];}
if(typeof u.data.product_lens_technology!="undefined"&&u.data.product_lens_technology[i]){g.products_lenstechnology=u.data.product_lens_technology[i];}
if(typeof u.data.product_insurance_amount!="undefined"&&u.data.product_insurance_amount[i]){g.product_insurance_amount=u.data.product_insurance_amount[i];}
if(typeof u.data.products_frametype!="undefined"&&u.data.products_frametype[i]){g.products_frametype=u.data.products_frametype[i];}
if(typeof u.data.products_lenstype!="undefined"&&u.data.products_lenstype[i]){g.products_lenstype=u.data.products_lenstype[i];}
if(typeof u.data.products_modelcode!="undefined"&&u.data.products_modelcode[i]){g.products_modelcode=u.data.products_modelcode[i];}
if(typeof u.data.products_lens!="undefined"&&u.data.products_lens[i]){g.products_lens=u.data.products_lens[i];}
if(typeof u.data.products_frame!="undefined"&&u.data.products_frame[i]){g.products_frame=u.data.products_frame[i];}
if(typeof u.data.products_case!="undefined"&&u.data.products_case[i]){g.products_case=u.data.products_case[i];}
if(typeof u.data.products_cloth!="undefined"&&u.data.products_cloth[i]){g.products_cloth=u.data.products_cloth[i];}
if(typeof u.data.products_size!="undefined"&&u.data.products_size[i]){g.products_size=u.data.products_size[i];}
if(typeof u.data.products_badges!="undefined"&&u.data.products_badges[i]){g.products_badges=u.data.products_badges[i];}
if(typeof u.data.products_moco!="undefined"&&u.data.products_moco[i]){g.products_moco=u.data.products_moco[i];}
items.push(g);}
return items;}
u.event_map={add_payment_info:["coupon","currency","items","payment_type","value"],add_shipping_info:["coupon","currency","items","shipping_tier","value"],add_to_cart:["currency","items","value"],add_to_wishlist:["currency","items","value"],begin_checkout:["coupon","currency","items","value"],earn_virtual_currency:["virtual_currency_name","value"],generate_lead:["currency","value"],join_group:["group_id"],level_end:["level_name","success"],level_start:["level_name"],level_up:["level","character"],login:["method"],post_score:["score","level","character"],purchase:["affiliation","coupon","currency","items","transaction_id","shipping","tax","value"],refund:["affiliation","coupon","currency","items","transaction_id","shipping","tax","value"],remove_from_cart:["currency","items","value"],search:["search_term"],select_content:["content_type","item_id"],select_item:["items","item_list_name","item_list_id"],select_promotion:["items","location_id"],share:["method","content_type","content_id"],sign_up:["method"],spend_virtual_currency:["item_name","virtual_currency_name","value"],tutorial_begin:[],tutorial_complete:[],unlock_achievement:["achievement_id"],view_cart:["currency","items","value"],view_item:["currency","items","value"],view_item_list:["items","item_list_name","item_list_id"],view_promotion:["items","location_id"],exception:["description","fatal"],screen_view:["screen_name"]};u.std_params={"transaction_id":function(){return u.data.order_id;},"affiliation":function(){return u.data.order_store;},"value":function(event){if(event.match(/timing_complete|virtual_currency/i)){return u.data.value;}
return u.data.order_total;},"currency":function(){return u.data.order_currency;},"tax":function(){return u.data.order_tax;},"shipping":function(){return u.data.order_shipping;},"coupon":function(){return u.data.order_coupon_code;},"fatal":function(){return toBoolean(u.data.fatal);},"items":function(event){if(event.match(/view_item$|select_content/)){return getItems(1);}
return getItems();},"item_id":function(){return u.data.product_id[0]?u.data.product_id[0]:"";}};utag.o[loader].loader.LOAD(id);}("1380","luxottica.sunglasshutnew"));}catch(error){utag.DB(error);}
