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

function  ct_init_load__article(){
    let ct_dom_articles = document.querySelectorAll('#ct_blog .ct_article.ct_loading');
    ct_blog_articles.forEach((article,i)=>{
        if (i < 6){
            ct_dom_articles[i].setAttribute('data-category',article.category);
            ct_dom_articles[i].querySelector('.ct_text__badge').setAttribute('data-category', article.category);
            ct_dom_articles[i].querySelector('.ct_text__badge svg').innerHTML = "<use xlink:href='#CD_" + article.category + "'></use>"
            ct_dom_articles[i].querySelector('.ct_text__badge span').innerHTML = ct_getCategory(article.category[0]);
            ct_dom_articles[i].querySelector('a').href = location.origin + "/"+article.url;
            ct_dom_articles[i].querySelector('a').setAttribute('aria-label',article.url); 
            ct_dom_articles[i].querySelector('a').dataset.description = article.url; 
            if (!ct_is_mobile())
                ct_dom_articles[i].querySelector('img.ct_article_img').src = article.img;
            else
                ct_dom_articles[i].querySelector('img.ct_article_img').src = article.imgmob;
            
            ct_dom_articles[i].querySelector('img.ct_article_img').alt = article.title;
           
            ct_dom_articles[i].querySelector('h2').innerHTML = article.title;
            ct_dom_articles[i].querySelector('p').innerHTML = article.desc;
            ct_dom_articles[i].classList.remove("ct_loading");
        }
    });
}

function  ct_load__article(){
    let ct_articles_container = document.querySelector('.ct_articles');
    let current_article;
    let ct_articles = "";
    ct_blog_articles.forEach((article,i)=>{
        if (i >= 6){
            current_article =  `
            <div class="ct_article ct_loaded" data-category="${article.category}">
                <a href="${location.origin + "/"+article.url}" aria-label="${article.url}" data-description="${article.url}" data-element-id="X_X_Blog_CTA">
                    <div class="ct_img__container">
                        <picture>
                            <source media="(max-width:1024px)" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAFCAYAAACJmvbYAAAAAXNSR0IArs4c6QAAABNJREFUGFdj/P///38GHIBxACQBlgQT8nbCiHIAAAAASUVORK5CYII=">
                            <img class="ct_skeleton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAAXNSR0IArs4c6QAAABBJREFUGFdj/P///38GIAAAGfgD/vZGlWAAAAAASUVORK5CYII=" alt="skeleton">
                        </picture>
                        <img class="lazy-lo ct_article_img" data-src="${!ct_is_mobile() ? article.img:article.imgmob }" alt="${article.title}">
                    </div>
                    <div class="ct_text">
                        <div class="ct_text__badge" data-category="${article.category}">
                            <svg class="ct_icon" width="14" height="14" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <use xlink:href="#CD_${article.category}"></use>
                            </svg>
                            <span>${ct_getCategory(article.category[0])}</span>
                        </div>
                        <h2 class="ct_lh__1-5 ct_font__bold">${article.title}</h2>
                        <p>${article.desc}</p>
                        <span class="ct_font__bold">Continue reading</span>
                    </div>
                </a>
            </div>`
            ct_articles+=current_article;
        }
    });
    ct_articles_container.insertAdjacentHTML("beforeend", ct_articles);
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
            if ( window.innerHeight > window.innerWidth)
                return true
            else
                return false 
        }else
            return true
    }
}

function nav_scrollTo_category(){
    var ct_category = window.location.pathname.slice(1);
    $('#ct_blog .ct_nav__container ul').animate({scrollLeft: $('li#'+ ct_category).position().left - ($('li#'+ ct_category).width()/2) });
}

function ct_lazyLoading(){
    var windowTop = window.window.scrollY;
    let ct_entries = document.querySelectorAll('.ct_space .lazy-lo:not(.lazy-loaded)');
    ct_entries.forEach((element,i)=>{
        if (windowTop > element.getBoundingClientRect().top - (window.innerHeight * 2) ) {
            if (element.nodeName.toLowerCase() === 'img') {
                element.src = element.getAttribute('data-src');
                element.classList.add('lazy-loaded');
            }
        }
    });
};

window.addEventListener("scroll", (event) => {ct_lazyLoading();});

document.addEventListener("DOMContentLoaded", function() {
    ct_init_load__article();
    ct_load__article();
    ct_lazyLoading();

    if(ct_is_mobile()){
        nav_letter__scroll();
        nav_scrollTo_category();
    } 
});