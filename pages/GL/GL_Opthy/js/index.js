document.addEventListener("DOMContentLoaded", () => {
    const ct_tab_btns = document.querySelectorAll(".tab-btn");
    const ct_tab_content = document.querySelectorAll(".tab-content");

    ct_tab_btns.forEach((item) => {
        item.addEventListener("click", activeTab);
    });

    function activeTab(item) {
        const btn = item.currentTarget;
        const content = btn.dataset.content;
        ct_tab_content.forEach((item) => {item.classList.remove("ct_tab_active");});
        ct_tab_btns.forEach((item) => {item.classList.remove("ct_tab_active");});
        document.querySelector("#" + content).classList.add("ct_tab_active");
        btn.classList.add("ct_tab_active");
    }

    const ct_download = document.querySelectorAll(".ct_opthy__download");
    ct_download.forEach((item) => {item.addEventListener("click", openModal);});


    function openModal(){
        var modal = document.querySelector(".ct_space.ct_opthy__modal");
        var clone_modal =  modal.cloneNode(true);
        
        document.querySelector("body").insertAdjacentElement("beforeend", clone_modal);
        
        var html = document.querySelector('html');
        var scrollPosition = window.pageYOffset;
        html.style.overflow = 'hidden';
        
        clone_modal.style.display = "block";
        var clone_wrapper = clone_modal.querySelector(".ct_opthy__modal__wrapper")
        clone_wrapper.style.top = scrollPosition + "px";
        clone_modal.classList.add("ct_opthy__modal__visible");
        clone_wrapper.classList.add("ct_fadeIn");

        const ct_modal__close = document.querySelectorAll(".ct_space.ct_opthy__modal .ct_opthy__modal__close");
        ct_modal__close.forEach((item) => {item.addEventListener("click", closeModal);});
    }

    function closeModal(){
        var clone_modal =  document.querySelector(".ct_opthy__modal__visible");
        clone_modal.querySelector(".ct_opthy__modal__wrapper").classList.add("ct_fadeOut");

        setTimeout(() => {
            clone_modal.remove();
            var html = document.querySelector('html');
            html.style.overflow = 'auto';
        }, 800);
    }
});