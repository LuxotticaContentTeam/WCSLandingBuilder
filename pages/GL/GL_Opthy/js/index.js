console.log('%c WCS LANDING BUILDER IT\'S WORKING','background:green;color:white;border-radius:8px;padding:4px;');

/* FAQ Collapsed */
function ct_FAQ__collapsed(){
    let ct_faq = document.querySelectorAll(".ct_faq .ct_qa");
    ct_faq.forEach(function(el){ el.querySelector(".ct_q").addEventListener("click", () => {
        var ct_a = el.querySelector(".ct_a");
        if (el.classList.contains("ct_close")){
            var height = ct_a.children[0].offsetHeight;
            ct_a.style.height = height + 'px';
        } else
            ct_a.style.height = '0px';
        el.classList.toggle("ct_close");
    });
    });
};

document.addEventListener("DOMContentLoaded", () => {
    ct_FAQ__collapsed();
});


