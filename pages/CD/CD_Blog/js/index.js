function ct_set__category(){
    let ct_category__container = document.querySelector('#ct_blog__article .ct_category__container');
    // let ct_category = ct_category__container.querySelector('h2').innerHTML.toLocaleLowerCase().trim().replace(/\s/g, '').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    let ct_category = ct_category__container.querySelector('h2').getAttribute('data-category-icon');
    ct_category__container.href = ct_category__container.href;
    ct_category__container.querySelector('svg').innerHTML = `<use xlink:href="#CD_${ct_category}"></use>`;
}

function ct_build__jsonld(){
    var ct_struc_data = 
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "id": `${location.href}`
            },
            "headline": `${document.querySelector('#ct_article__title').innerHTML.trim()}`,
            "url": `${location.href}}`,
            "datePublished": `${document.querySelector('.ct_pub__date time').getAttribute('datetime')}`,
            "dateModified": `${document.querySelector('.ct_pub__date time').getAttribute('datetime')}`,
            "author": {
                "@type": "Person",
                "name": "contactsdirect.com Editorial Team"
            },
            "publisher": {
                "@type": "Organization",
                "name": "contactsdirect.com",
            },
            "description": `${document.querySelector('.ct_article_content p').innerHTML.trim()}`
        }
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(ct_struc_data);
    document.head.appendChild(script);
}

function ct_set__footer_blog_articles(){
    let template = `
        <div class="ct_article__cta__container ct_banner ct_banner_top">
        <div class="ct_assets__container">
            <div class="ct_img__container">
                <picture class="ct_img__skeleton">
                    <source  media="(orientation: portrait) and (max-width: 768px)" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAAXNSR0IArs4c6QAAABNJREFUGFdjvOTC+p8BChiJ4wAA/FYIbbTEsjQAAAAASUVORK5CYII=">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAABOCAYAAAAkYHPNAAAAAXNSR0IArs4c6QAAAmNJREFUeF7t2TGOwlAQREH7btw/83lAIkFCBnX+auNJpqbVWr7P63E8D38ECOQFTmWQzwAAAm8BZSAIBAgoAxkgQOAj4D8DaSBAwH8GMkCAgP8MZIAAgS8BPxNEggABPxNkgAABPxNkgAABPxNkgACBOwFvBnJBgIA3AxkgQMCbgQwQIODNQAYIEPBmIAMECPwU8IAoHAQIeECUAQIEPCDKAAECHhBlgAABD4gyQICAB0QZIEDgv4CvCRJCgICvCTJAgICvCTJAgICvCTJAgICvCTJAgICvCTJAgICvCTJAgMAg4NPigGSEQEFAGRSubEcCg4AyGJCMECgIKIPCle1IYBBQBgOSEQIFAWVQuLIdCQwCymBAMkKgIKAMCle2I4FBQBkMSEYIFASUQeHKdiQwCCiDAckIgYKAMihc2Y4EBgFlMCAZIVAQUAaFK9uRwCCgDAYkIwQKAsqgcGU7EhgElMGAZIRAQUAZFK5sRwKDgDIYkIwQKAgog8KV7UhgEFAGA5IRAgUBZVC4sh0JDALKYEAyQqAgoAwKV7YjgUFAGQxIRggUBJRB4cp2JDAIKIMByQiBgoAyKFzZjgQGAWUwIBkhUBBQBoUr25HAIKAMBiQjBAoCyqBwZTsSGASUwYBkhEBBQBkUrmxHAoOAMhiQjBAoCCiDwpXtSGAQUAYDkhECBQFlULiyHQkMAspgQDJCoCCgDApXtiOBQUAZDEhGCBQElEHhynYkMAgogwHJCIGCgDIoXNmOBAYBZTAgGSFQEFAGhSvbkcAgoAwGJCMECgLKoHBlOxIYBJTBgGSEQEHgBU6Mo5+gIgDRAAAAAElFTkSuQmCC" alt="structure image">
                </picture>
                <picture class="ct_img">
                    <source  media="(orientation: portrait) and (max-width: 768px)" srcset="https://media.contactsdirect.com/BLOG/CD_GeneralBanner_Blog_M.jpg">
                    <img src="https://media.contactsdirect.com/BLOG/CD_GeneralBanner_Blog_D.jpg" fetchpriority="high" alt="Hero banner image">
                </picture>
            </div>
        </div>
        <div class="ct_text__overlay ct_text__overlay_left ct_text__overlay__tab__100">
            <div>
                <p class="ct_article__cta__container__title">We’ve got your eyes covered</p>
                <p class="ct_article__cta__container__desc">
                    Find everything you need from top contact lens<br> brands to solutions for fresh, happy eyes.
                </p>
            </div>
            <div class="ct_cta__container">
                <a class="ct_cta ct_cta__white" href="/contacts" data-element-id="x_HP_article_CTA_01" data-description="Shop contacts">SHOP CONTACTS</a>
                <a class="ct_cta ct_cta__white" href="/solutions" data-element-id="x_HP_article_CTA_01" data-description="Shop solutions">Shop SOLUTIONS</a>
            </div>
        </div>
    </div>
    <div class="ct_article__disclaimer">
        Our website content, products, and services are for informational purposes only. ContactsDirect does not provide medical advice, diagnosis, or treatment. Information on the website, apps, newsletter, and products, developed in collaboration with licensed medical professionals and external contributors, including text, graphics, images, and other material, is provided solely for informational purposes and does not constitute medical advice or diagnosis or treatment. You should seek medical care and consult your doctor or pharmacist for any specific health or product issues. Never disregard professional medical advice or delay seeking medical treatment because of information you have read on ContactsDirect.com, or on sites linking to or from ContactsDirect.com.
    </div>
    `;
    document.querySelector(".ct_space #ct_blog__article .ct_article_footer").innerHTML = template;
}

document.addEventListener("DOMContentLoaded", function() {
   ct_set__category();
   ct_set__footer_blog_articles();
   ct_build__jsonld();
});