var id5_customShowableContacts=15;InPageSearch={filteredLenses:[],sortedLenses:[],timeout:2e3,shownItems:id5_customShowableContacts,toBeShown:id5_customShowableContacts,userSearch:void 0,sortingValue:"",searchTriggerer:function(){$("#id5_loadingSpinner").show(),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){InPageSearch.search(!1)},this.timeout)},onLoadSearch:function(){null!==sessionStorage.getItem("inPageSearchTerm")&&($("#ID5_InPageSearch").attr("value",JSON.parse(sessionStorage.getItem("inPageSearchTerm"))),this.search(!1))},initialize:function(){this.userSearch=$("#ID5_InPageSearch").val(),this.shownItems=id5_customShowableContacts,this.toBeShown=id5_customShowableContacts,$("#filteredRes_showMore").hide()},search:function(e){void 0!=window.CONTACTS_MAP&&(e||this.userSearch!==$("#ID5_InPageSearch").val())&&(this.initialize(),this.hideShowContactsList(e),0==this.filteredLenses.length&&this.generateFilteredArray(),this.searchInArray(),this.sortBy(),this.showResults(),this.addQueryToSessionStorage(),utagFiller.setInPageSearch(this.userSearch,"Contacts")),$("#id5_loadingSpinner").hide()},generateFilteredArray:function(){for(var e in CONTACTS_MAP)this.filteredLenses.push(e);$(".facet-options > li .facet-subnav").each(function(){var e=$(this).attr("data-facet-name"),t=[];if($(this).find(".active").each(function(){t.push($(this).attr("data-encodedlabel").toLowerCase())}),t.length>0)for(var s=0;s<InPageSearch.filteredLenses.length;){for(var i=!1,r=0;r<t.length&&!i;r++)CONTACTS_MAP[InPageSearch.filteredLenses[s]][e].toLowerCase()==t[r]&&(i=!0);i?s++:InPageSearch.filteredLenses.splice(s,1)}})},searchInArray:function(){this.sortedLenses=[];for(var e=this.userSearch.toLowerCase().split(" "),t=0;t<this.filteredLenses.length;t++)if(void 0!==CONTACTS_MAP[this.filteredLenses[t]].name){var s=CONTACTS_MAP[this.filteredLenses[t]].name+" $8$ "+CONTACTS_MAP[this.filteredLenses[t]].manuf;s=s.toLowerCase();for(var i=!0,r=0;r<e.length&&i;r++)s.indexOf(e[r])<0&&(i=!1);i&&this.sortedLenses.push(this.filteredLenses[t])}},chooseSortingValue:function(e){var t=$(".sort-by-dropdown .active").attr("data-sort");$("._sortBy_"+t).toggleClass("hide"),$("._sortBy_"+e).toggleClass("hide"),$(".sort-by-dropdown .active").attr("data-sort",e),$(".sort-by-dropdown .active").text($("._sortBy_"+e+" a").text()),$(".sort-by-options").toggleClass("hide"),this.search(!0)},openSortingChoice:function(){$(".accordion-menu").toggleClass("active"),$(".sort-by-options").toggleClass("hide")},sortBy:function(){this.sortingValue=$(".sort-by-dropdown .active").attr("data-sort"),"bestSeller"==this.sortingValue?this.sortedLenses.sort(this.compareByBestseller(this.sortingValue)):"name"==this.sortingValue?this.sortedLenses.sort(this.compareByName(this.sortingValue)):"newest"==this.sortingValue?this.sortedLenses.sort(this.compareByPublishedDate("pubDate")):"highLow"==this.sortingValue?this.sortedLenses.sort(this.compareByPrice(!1)):"lowHigh"==this.sortingValue&&this.sortedLenses.sort(this.compareByPrice(!0))},compareByName:function(e){return function(t,s){return CONTACTS_MAP[t][e].toLowerCase()>CONTACTS_MAP[s][e].toLowerCase()?1:CONTACTS_MAP[t][e].toLowerCase()<CONTACTS_MAP[s][e].toLowerCase()?-1:0}},getPriceByCode:function(e,t){var s=0;for(key in DISCOUNTS_MAP[e])parseInt(key)>s&&(s=key);return t?DISCOUNTS_MAP[e].r:DISCOUNTS_MAP[e][s].u},compareByPrice:function(e){return function(t,s){var i=0,r=parseInt(InPageSearch.getPriceByCode(t,!1)),a=parseInt(InPageSearch.getPriceByCode(s,!1));return r>a?i=1:r<a&&(i=-1),e||(i*=-1),i}},compareByBestseller:function(e){return function(t,s){var i=0,r=CONTACTS_MAP[t][e],a=CONTACTS_MAP[s][e];return r>a?i=-1:r<a&&(i=1),i}},compareByPublishedDate:function(e){return function(t,s){var i=0,r=new Date(CONTACTS_MAP[t][e].replace(/-/g,"/")),a=new Date(CONTACTS_MAP[s][e].replace(/-/g,"/"));return r>a?i=-1:r<a&&(i=1),i}},hideShowContactsList:function(e){e||"undefined"!=this.userSearch&&null!=this.userSearch&&""!=this.userSearch?($(".filteredContactsList").fadeIn(),$(".basicContactsList").fadeOut(),$(".filteredContactsList").addClass("isVisible")):($(".filteredContactsList").fadeOut(),$(".basicContactsList").fadeIn(),$(".filteredContactsList").removeClass("isVisible"),this.setNewResultsCounts(!1)),$("#Search_Area_div .filteredContactsList .results_grid").empty()},showResults:function(){for(var e=$("#Search_Area_div .filteredContactsList .item_container"),t=$("#Search_Area_div .filteredContactsList .results_grid"),s=0;s<this.sortedLenses.length;s++){var i=e.clone().appendTo(t),r=this.sortedLenses[s];i.find(".brand-name").text(CONTACTS_MAP[r].name);var a=CONTACTS_MAP[r].manuf.toLowerCase();i.find(".names").text(a.charAt(0).toUpperCase()+a.slice(1)),i.find(".catEntryThumbnail").attr("data-pubDate",CONTACTS_MAP[r].pubDate),i.find(".item").attr("data-partnumber",r);var n="/to-us/"+CONTACTS_MAP[r].url;i.find(".productImagePdpLink").attr("href",n),i.find(".__prjid5_price span.productPriceSpan").text("$"+this.getPriceByCode(r,!0)),i.find(".productImagePdpLink img").attr("src","https://assets.targetoptical.com/extra/image/TargetOptical/contacts/"+r.toUpperCase()+"_fr.png?imwidth="),isBestDeal(r)&&i.find(".badge-bestdeal-pdp").show(),s<this.shownItems&&i.fadeIn("1000")}this.sortedLenses.length>this.shownItems&&$("#filteredRes_showMore").show(),$(".filteredContactsList").hasClass("isVisible")&&this.setNewResultsCounts(!0),$("#Search_Area_div .filteredContactsList .results_grid .item_container").each(function(){manageListItem(discountedPricesManager,this)})},showMore:function(){$("#Search_Area_div .filteredContactsList .results_grid .item_container").each(function(e){e>=InPageSearch.shownItems&&e<InPageSearch.toBeShown+InPageSearch.shownItems&&$(this).fadeIn("1000")}),this.shownItems+=this.toBeShown,this.shownItems>=this.sortedLenses.length&&$("#filteredRes_showMore").hide(),this.setNewResultsCounts(!0)},addQueryToSessionStorage:function(){sessionStorage.setItem("inPageSearchTerm",JSON.stringify(this.userSearch))},setNewResultsCounts:function(e){if(e){this.shownItems>this.sortedLenses.length&&(this.shownItems=this.sortedLenses.length),$("#currentResults .items-shown").text(this.shownItems),$(".resultsNumber .total-items").text(this.sortedLenses.length);var t=this.toBeShown,s=this.sortedLenses.length-this.shownItems;t>s&&(t=s),$("#filteredRes_showMore .__prjid5_loadable").text(t),$("#filteredRes_showMore .__prjid5_showable").text(s)}else $("#currentResults .items-shown").text(parseInt($("input#beginIndexCount").val())),$(".resultsNumber .total-items").text(parseInt($("input#resultsLeft").val())+parseInt($("input#pageSize").val()))}},$(window).load(function(){id5_customShowableContacts=parseInt($("#pageSizeForShowMore").text()),InPageSearch.onLoadSearch()});
//# sourceMappingURL=inPageSearch_mob.js.map