function ct_set__category(){
    let ct_category__container = document.querySelector('#ct_blog__article .ct_category__container');
    // let ct_category = ct_category__container.querySelector('h2').innerHTML.toLocaleLowerCase().trim().replace(/\s/g, '').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    let ct_category = ct_category__container.querySelector('h2').getAttribute('data-category-icon');
    ct_category__container.href = ct_category__container.href + `#${ct_category}`
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
                "name": "Glasses.com Editorial Team"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Glasses.com",
            },
            "description": `${document.querySelector('.ct_article_content p').innerHTML.trim()}`
        }
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(ct_struc_data);
    document.head.appendChild(script);
}

// Icon Sprite import
function ct_import__sprite(){
    $.ajax({
        type: 'GET',
        url: "https://media.contactsdirect.com/utilities/sprite_02.svg",
        crossDomain: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function(html){
            $("body").append(html.replace('<svg ', '<svg style="display:none;width:0;height:0;"'));
            console.log('%cSVG sprite success', "background: green; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");
        },
        error: function(){
            console.log('%cSVG sprite error', "background: red; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
   //ct_import__sprite();
   ct_set__category();
   ct_build__jsonld();
});