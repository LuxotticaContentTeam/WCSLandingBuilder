var monetateFiller={beginIndex:0,initMonetate:function(){window.monetateQ=window.monetateQ||[]},setPageType:function(t){window.monetateQ.push(["setPageType",t])},sendMonetate:function(){this.pushCart(),window.monetateQ.push(["trackData"])},pushCart:function(){let t=[];null!==sessionStorage.getItem("monetateProdList")&&(t=JSON.parse(sessionStorage.getItem("monetateProdList"))),t.length>0&&window.monetateQ.push(["addCartRows",t])},onHomePage:function(){this.initMonetate(),this.setPageType("main"),this.sendMonetate()},onContactsPLP:function(){this.initMonetate(),this.setPageType("contacts");var t=[];$(".item").each(function(e){if(e>=monetateFiller.beginIndex){var n=$(this).attr("data-partnumber");void 0!==n&&t.push(n)}}),this.beginIndex=$(".item").length,window.monetateQ.push(["addProducts",t]),this.sendMonetate()},onGlassesPLP:function(){this.initMonetate();var t=$("#categoryName").val().toLowerCase();-1!==t.indexOf("eyeglasses")||-1!==t.indexOf("kid")?this.setPageType("eyeglasses"):-1!==t.indexOf("sunglasses")&&this.setPageType("sunglasses");var e=[];$(".item").each(function(t){if(t>=monetateFiller.beginIndex){var n=$(this).attr("data-partnumber");void 0!==n&&e.push(n)}}),this.beginIndex=$(".item").length,window.monetateQ.push(["addProducts",e]),this.sendMonetate()},onContactsPDP:function(t){this.initMonetate(),this.setPageType("pdp_contacts"),window.monetateQ.push(["addProductDetails",[t]]),this.sendMonetate()},onGlassesPDP:function(t){switch(this.initMonetate(),$("#frameCategory").val()){case"sunglasses":this.setPageType("pdp_sunglasses");break;case"eyeglasses":this.setPageType("pdp_eyeglasses")}window.monetateQ.push(["addProductDetails",[t]]),this.sendMonetate()},onCart:function(){this.initMonetate(),this.setPageType("cart");let t=[];null!==sessionStorage.getItem("utagProducts")&&(t=$.parseJSON(sessionStorage.getItem("utagProducts")));let e=[];for(partnumber in t){var n={};n.productId=partnumber.toString(),n.quantity=t[partnumber].Units,n.unitPrice=t[partnumber].Price.toString(),n.currency="USD",e.push(n)}sessionStorage.setItem("monetateProdList",JSON.stringify(e)),this.sendMonetate()},onShippingAndBilling:function(){this.initMonetate(),this.setPageType("shipping_billing");let t=[];null!==sessionStorage.getItem("utagProducts")&&(t=$.parseJSON(sessionStorage.getItem("utagProducts")));let e=[];for(partnumber in t){var n={};n.productId=partnumber.toString(),n.quantity=t[partnumber].Units,n.unitPrice=t[partnumber].Price.toString(),n.currency="USD",e.push(n)}sessionStorage.setItem("monetateProdList",JSON.stringify(e)),this.sendMonetate()},onPayAndOrder:function(){this.initMonetate(),this.setPageType("pay_order");let t=[];null!==sessionStorage.getItem("utagProducts")&&(t=$.parseJSON(sessionStorage.getItem("utagProducts")));let e=[];for(partnumber in t){var n={};n.productId=partnumber.toString(),n.quantity=t[partnumber].Units,n.unitPrice=t[partnumber].Price.toString(),n.currency="USD",e.push(n)}sessionStorage.setItem("monetateProdList",JSON.stringify(e)),this.sendMonetate()},onCheckoutThankYou:function(){this.initMonetate(),this.setPageType("confirmation");var t=null;$("#spec_order_id").length>0&&(t=$("#spec_order_id").attr("data-order-id"));var e=$.parseJSON(sessionStorage.getItem("utagProducts")),n=[];for(partnumber in e){var s={};s.purchaseId=t,s.productId=partnumber.toString(),s.quantity=e[partnumber].Units,s.unitPrice=e[partnumber].Price.toString(),s.currency="USD",n.push(s)}window.monetateQ.push(["addPurchaseRows",n]),window.monetateQ.push(["trackData"])},onExamScheduler:function(){this.initMonetate(),this.setPageType("examScheduler"),this.sendMonetate()},onExamBooked:function(){this.initMonetate(),this.setPageType("examBooked"),this.sendMonetate()}};
//# sourceMappingURL=MonetateAPI.js.map