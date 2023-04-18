
const ct_blog_articles = [
    {
        category:["eyewellness","glassesFitting"],
        url: "article1",
        img:"http://media.contactsdirect.com/2020/BLOG/CD_Lifestyle-image-BuyMoreSave-800.jpg",
        imgmob:"https://via.placeholder.com/700x500",
        title:"Can you wear colored contacts over regular contacts?",
        desc: "Can you use contact solution as eye drops? If you wear contacts, at some point, you’ve found yourself questioning whether you can put contact solution in your eyes. Generally, it would make sense. You wash your contacts in it, so why shouldn’t you be able to use it as a rinse? Unfortunately, while it may work as a short-term remedy, it can do much more harm than good.",
    },
    {
        category:["glassesTypes"],
        url: "article1",
        img:"http://media.contactsdirect.com/2020/BLOG/CD_Lifestyle-image-Most20Popular-800.jpg",
        imgmob:"https://via.placeholder.com/700x500",
        title:"Can you wear colored contacts over regular contacts?",
        desc: "If you already wear contact lenses, you most likely already have a favorite brand of lenses. However, if you are thinking about making the switch from glasses to contacts and becoming a contact lens wearer, you probably would like to know information about each of the top contact brands.",
    },
    {
        category:["GuidesHowto"],
        url: "article1",
        img:"http://media.contactsdirect.com/2020/BLOG/CD_Lifestyle-image-Most20Popular-800.jpg",
        imgmob:"https://via.placeholder.com/700x500",
        title:"Daily vs monthly contact lenses: which are better for you?",
        desc: "When deciding between daily vs. monthly contacts, consider factors like cost and how often you'll wear them. There are hundreds of options and features to choose from. For the novice contact lens wearer, it can be daunting to decide.",
    },
    {
        category:["glassesFitting"],
        url: "article1",
        img:"https://media.contactsdirect.com/2022/VARIE/BLOG/Doubt_D.jpg",
        imgmob:"https://via.placeholder.com/700x500",
        title:"Contact lens fitting: procedure, cost and follow up",
        desc: "Contacts afford their wearers freedom that glasses cannot match. And as contact lenses become more advanced and affordable, you may be thinking about making the switch. If you’ve been considering getting contacts, the first step is speaking with your optometrist.",
    },
    {
        category:["eyecare"],
        url: "article1",
        img:"https://media.contactsdirect.com/2020/BLOG/CD_Lifestyle-image-CLFitting-800px.jpg",
        imgmob:"https://via.placeholder.com/700x500",
        title:"Eye irritation from contacts: causes and remedies",
        desc: "To fully enjoy the freedom and comfort of your contact lenses, have a regular cleaning regime. It is essential for good eye health. Find out how to keep your contacts clean and disinfected and keep your eyes healthy!",
    },
    {
        category:["eyecare","insurance"],
        url: "article1",
        img:"https://media.contactsdirect.com/2022/VARIE/BLOG/Clean_D.jpg",
        imgmob:"https://via.placeholder.com/700x500",
        title:"Best contact lens solutions of 2022",
        desc: "Aside from deciding what type of contact lenses are best for your eyes, one of the most difficult decisions for contact lens-wearers is choosing the best type of contact solution. Everyone’s eyes are unique and require different care practices, thus, there is no one best contact solution brand. When you ask your eye doctor about what solution is best for you, it's good to know the benefits and shortcomings of the different kinds of contact lens solutions on the market.",
    },
    {
        category:["insurance"],
        url: "article1",
        img:"https://media.contactsdirect.com/2021/Blog/Release_5/What_age_should_children_start_wearing_contacts_D.png",
        imgmob:"https://via.placeholder.com/700x500",
        title:"Can you swim with contacts? All you need to know",
        desc: "During a warm afternoon, there is nothing more refreshing than the thought of jumping into the swimming pool to cool down and relax. When you wear contact lenses, you might wonder, Is it safe to swim in my contact lenses?",
    },
    {
        category:["insurance"],
        url: "article1",
        img:"https://media.contactsdirect.com/2021/Blog/Release10/41_What_happens%20_if_you_sleep_with_contacts_D.jpg",
        imgmob:"https://via.placeholder.com/700x500",
        title:"Do contact lenses expire?",
        desc: "Each box of contact lenses you buy has an expiration date based on the manufacture date. The quality of food deteriorates over time. The same is true of contact lenses. Although daily and monthly contact lenses don’t spoil as quickly, they can go bad under certain circumstances. Keeping track of the expiration date of your contact lenses and adhering to the information below is key to avoiding any eye infections or other symptoms from expired contacts.",
    },
    {
        category:["lenses"],
        url: "article1",
        img:"https://media.contactsdirect.com/2022/VARIE/BLOG/Swim_D.jpg",
        imgmob:"https://via.placeholder.com/700x500",
        title:"What are the Best Contact Lenses Type to wear?",
        desc: "Colored contact lenses can be an aesthetically interesting alternative to traditional contact lenses. These kinds of lenses are designed to completely change or intensify the natural color of the eye and are available to fit most kinds of prescriptions for vision correction. There is a wide selection of colored contacts available on the market that are designed to achieve the specific aesthetic appeal you are trying to achieve, as well as correct your vision, so that wearing colored contacts doesn’t mean you have to sacrifice the clarity of vision that your traditional prescription contacts provide you.",
    },
   


]

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

function ct_filterd_url(){
    
    if (!!location.hash){
        let ct_url_category = location.hash.replace('#','');
        document.querySelector(`#ct_blog .ct_nav__container button[data-category="${ct_url_category}"]`).classList.add('ct_active')
        ct_filter__articles(ct_url_category)
        location.hash = '';
    }else{
        document.querySelector(`#ct_blog .ct_nav__container button[data-category="all"]`).classList.add('ct_active')
    }
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

function  ct_load__article(){
    let ct_articles_container = document.querySelector('.ct_articles');
    let ct_dom_articles = document.querySelectorAll('#ct_blog .ct_article.ct_loading');
    let current_article
    ct_blog_articles.forEach((article,i)=>{
        if (i < 4){
            ct_dom_articles[i].setAttribute('data-category',article.category);
            ct_dom_articles[i].querySelector('a').href = location.origin + location.pathname+"/"+article.url;
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
                        <img class="lazy-lo ct_article_img" data-image-src="${!ct_is_mobile() ? article.img:article.imgmob }" alt="${article.title}">
                    </div>
                    <div class="ct_text">
                        <h2 class="ct_font__xl ct_lh__1-5 ct_font__bold ">${article.title}</h2>
                        <p class="ct_font__s ct_lh__1-5 ">${article.desc}</p>
                        <span class="ct_font__bold ">Continue reading</span>
                    </div>
                </a>
            </div>`
            ct_articles_container.innerHTML+=current_article;
        }
        
      
    });
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
    ct_nav__handler();
    ct_load__article();
    //ct_filterd_url();
    if(ct_is_mobile()){
        nav_letter__scroll();
    }
});