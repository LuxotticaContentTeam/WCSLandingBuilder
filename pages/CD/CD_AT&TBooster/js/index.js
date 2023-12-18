function initLazyLoading(selector){
	if(selector==undefined) selector="lazy";
	var lazyImages = [].slice.call(document.querySelectorAll("."+selector));

	  if ("IntersectionObserver" in window) {
	    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
	      entries.forEach(function(entry) {
	        if (entry.isIntersecting) {
	          let lazyImage = entry.target;
	          if(lazyImage.getAttribute('data-src')!="" && lazyImage.getAttribute('data-src')!=undefined){
		          
		          if(lazyImage.nodeName.toLowerCase()=="img"){
		        	  lazyImage.src = lazyImage.getAttribute('data-src');
		          }
		          if(lazyImage.nodeName.toLowerCase()=="source"){
		        	  lazyImage.srcset = lazyImage.getAttribute('data-src');
		          }
		          lazyImage.classList.remove("lazy");
		          lazyImage.classList.remove("skeleton");
		          lazyImageObserver.unobserve(lazyImage);
	          }
	        }
	      });
	    });

	    lazyImages.forEach(function(lazyImage) {
	      lazyImageObserver.observe(lazyImage);
	    });
	  } else {
		  $.each($(".lazy"), function(){
			  $(this).attr("src",$(this).attr("data-src"));
		  });
	  }
	
}
initLazyLoading();
$(window).scroll( function(){
    initLazyLoading();
	booster_work__scroll();
	booster_shop__scroll();
 });

 function booster_work__scroll(){
    var ct_scroll_container = document.querySelector('#ct_booster-LP .ct_booster-work .ct_booster-work-wrapper');
    var ct_scrollbar = document.querySelector('#ct_booster-LP .ct_booster-work .ct_booster__scrollbar');
    var ct_scrollbar_cursor =  document.querySelector('#ct_booster-LP .ct_booster-work .ct_booster__scrollbar .ct_booster__scroll');
    ct_scrollbar_cursor.style.width = ct_scroll_container.offsetWidth * ct_scrollbar.offsetWidth / ct_scroll_container.scrollWidth  + "px";

    ct_scroll_container.addEventListener('scroll',()=>{
      ct_scrollbar_cursor.style.marginLeft = ct_scrollbar.scrollWidth * ct_scroll_container.scrollLeft / ct_scroll_container.scrollWidth + "px";
	});
};


function booster_shop__scroll(){
    var ct_scroll_container = document.querySelector('#ct_booster-LP .ct_booster-shop .ct_booster-shop-wrapper');
    var ct_scrollbar = document.querySelector('#ct_booster-LP .ct_booster-shop .ct_booster__scrollbar');
    var ct_scrollbar_cursor =  document.querySelector('#ct_booster-LP .ct_booster-shop .ct_booster__scrollbar .ct_booster__scroll');
	ct_scrollbar_cursor.style.width = ct_scroll_container.offsetWidth * ct_scrollbar.offsetWidth / ct_scroll_container.scrollWidth + "px";

    ct_scroll_container.addEventListener('scroll',()=>{
      ct_scrollbar_cursor.style.marginLeft = ct_scrollbar.scrollWidth * ct_scroll_container.scrollLeft / ct_scroll_container.scrollWidth + "px";
	});
};

document.addEventListener("DOMContentLoaded", function() {
    booster_work__scroll();
	booster_shop__scroll();
});

// var arrowHeight = 25;
// var viewportHeight = 200;
// var contentHeight = 600;

// var viewableRatio = viewportHeight / contentHeight; // 1/3 or 0.333333333n

// var scrollBarArea = viewportHeight - arrowHeight * 2; // 150px

// var thumbHeight = scrollBarArea * viewableRatio; // 50px