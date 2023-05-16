// $(".ct_nav__container ul").animate({scrollLeft: $('li#contactscare').position().left - ($('li#contactscare').width()/2) }, 500);

function ct_filter__articles(category){
    document.querySelector('#ct_blog .ct_articles').style.opacity = 0;
    let ct_articles = document.querySelectorAll('#ct_blog .ct_article');
    setTimeout(()=>{
       
        ct_articles.forEach(article=>{
            if(article.dataset.category.includes(category) || category == 'all' ){
                article.classList.remove('ct_art_hidden');
            }else{
                article.classList.add('ct_art_hidden');
            }
        });
        lazyLo();
        document.querySelector('#ct_blog .ct_articles').style.opacity = 1;
    },200)
    
}

function ct_nav__handler(){
    let ct_nav__button = document.querySelectorAll('.ct_nav__container button');
    ct_nav__button.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            if(!e.target.classList.contains('ct_active')){
                document.querySelector('.ct_nav__container .ct_active').classList = '';
                e.target.classList = 'ct_active';
                ct_filter__articles(e.target.dataset.category);
            }
        });
    })
}

function ct_getCategory(category){
    let result;
    switch(category){
        case 'contactscare':
            result = "Contacts Care"
            break;
        case "contactstypes":
            result = "Contacts Types"
            break;
        case "eyehealth":
            result = "Eye Health"
            break;
        case "guideshowto":
            result = "Guides & How to"
            break;
    }
    return result;
}

function  ct_load__article(){
    let ct_articles_container = document.querySelector('.ct_articles');
    let ct_dom_articles = document.querySelectorAll('#ct_blog .ct_article.ct_loading');
    let current_article
    ct_blog_articles.forEach((article,i)=>{
        if (i < 4){
            ct_dom_articles[i].setAttribute('data-category',article.category);
            ct_dom_articles[i].querySelector('.ct_text__badge').setAttribute('data-category', article.category);
            ct_dom_articles[i].querySelector('.ct_text__badge svg').innerHTML = "<use xlink:href='#CD_" + article.category + "'></use>"
            ct_dom_articles[i].querySelector('.ct_text__badge span').innerHTML = ct_getCategory(article.category[0]);
            ct_dom_articles[i].querySelector('a').href = location.origin + "/"+article.url;
            ct_dom_articles[i].querySelector('a').setAttribute('aria-label',article.url); 
            ct_dom_articles[i].querySelector('a').dataset.description = article.url; 
            if (!ct_is_mobile()){
                ct_dom_articles[i].querySelector('img.ct_article_img').src = article.img;
            }else{
                ct_dom_articles[i].querySelector('img.ct_article_img').src = article.imgmob;
            }
            ct_dom_articles[i].querySelector('img.ct_article_img').alt = article.title;
           
            ct_dom_articles[i].querySelector('h2').innerHTML = article.title;
            ct_dom_articles[i].querySelector('p').innerHTML = article.desc;
            ct_dom_articles[i].classList.remove("ct_loading");
        }else{
            current_article =  `
            <div class="ct_article ct_loaded" data-category="${article.category}">
                <a href="${location.origin + location.pathname+"/"+article.url}" aria-label="${article.url}" data-description="${article.url}" data-element-id="X_X_Blog_CTA">
                    <div class="ct_img__container">
                        <picture>
                            <source media="(max-width:1024px)" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAFCAYAAACJmvbYAAAAAXNSR0IArs4c6QAAABNJREFUGFdj/P///38GHIBxACQBlgQT8nbCiHIAAAAASUVORK5CYII=">
                            <img class="ct_skeleton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAAXNSR0IArs4c6QAAABBJREFUGFdj/P///38GIAAAGfgD/vZGlWAAAAAASUVORK5CYII=" alt="skeleton">
                        </picture>
                        <img class="lazy ct_article_img" data-src="${!ct_is_mobile() ? article.img:article.imgmob }" alt="${article.title}">
                    </div>
                    <div class="ct_text">
                        <div class="ct_text__badge" data-category="${article.category}">
                            <svg class="ct_icon" width="14" height="14" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <use xlink:href="#CD_${article.category}"></use>
                            </svg>
                            <span>${ct_getCategory(article.category[0])}</span>
                        </div>
                        <h2 class="ct_lh__1-5 ct_font__bold ct_mb__20 ct_mb__mob__10">${article.title}</h2>
                        <p>${article.desc}</p>
                        <span class="ct_font__bold ">Continue reading</span>
                    </div>
                </a>
            </div>`
            ct_articles_container.innerHTML+=current_article;
        }
    });
}

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

function nav_letter__scroll(){
    var nav_scoll_percentage;
    var ct_nav = document.querySelector('#ct_blog .ct_nav__container ul');
    var ct_nav_scrollbar =  document.querySelector('#ct_blog .ct_nav__scrollbar .ct_nav__scroll');
    ct_nav.addEventListener('scroll',()=>{
        nav_scoll_percentage = ct_nav.scrollLeft / (ct_nav.scrollWidth-ct_nav.offsetWidth) * 100; 
        ct_nav_scrollbar.style.marginLeft = (ct_nav.offsetWidth - 190)/100*nav_scoll_percentage+'px'
    });
  
}

function ct_is_mobile(){ 
    if ($(window).width() > 1024){
        return false;
    }else{
        if ($(window).width() === 1024){
            if ( window.innerHeight > window.innerWidth){
                return true
            }
            else{ 
                return false 
            }
        }else{
            return true
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    //ct_nav__handler();
    ct_load__article();
    initLazyLoading();
    if(ct_is_mobile()){
        nav_letter__scroll();
    }
});