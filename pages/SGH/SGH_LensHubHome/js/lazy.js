export const lazyLo = function() {
    var windowTop = $(window).scrollTop() ;
    
    $('.ct_space .lazy-lo:not(.lazy-loaded)').each(function(){
        if ( windowTop > $(this).offset().top - ( window.innerHeight * 2 ) ) {
            if ($(this).is('video')) {
                if($(this).attr('data-video-src-tab') == undefined){
                    if (window.ct_current__device === "M"){
                        if ($(this).attr('data-video-src-mob') != undefined ){
                            $(this).addClass('ct_m__video')
                            $(this).attr('poster', $(this).attr('data-poster-mob'));
                            $(this).attr('src', $(this).attr('data-video-src-mob'));
                        }else{
                            $(this).addClass('ct_d__video')
                            $(this).attr('poster', $(this).attr('data-poster-desk'));
                            $(this).attr('src', $(this).attr('data-video-src-desk'));
                        }
                        
                    }else{
                        if (window.document.documentMode && $(this).attr('data-poster-desk-ie') != undefined && $(this).attr('data-poster-desk-ie').length > 0) { //set poster for IE
                            $(this).addClass('ct_ie__video')
                            $(this).attr('poster', $(this).attr('data-poster-desk-ie'));
                        }else{
                            $(this).addClass('ct_d__video')
                            $(this).attr('poster', $(this).attr('data-poster-desk'));
                            $(this).attr('src', $(this).attr('data-video-src-desk'));
                        }
                    }
                }else{
                    if (ct_get__device_type() === 'mob'){ //mobile
                        if ($(this).attr('data-video-src-mob') != undefined ){
                            $(this).addClass('ct_m__video')
                            $(this).attr('poster', $(this).attr('data-poster-mob'));
                            $(this).attr('src', $(this).attr('data-video-src-mob'));
                        }else{
                            $(this).addClass('ct_d__video')
                            $(this).attr('poster', $(this).attr('data-poster-desk'));
                            $(this).attr('src', $(this).attr('data-video-src-desk'));
                        }
                    }else{
                        if (ct_get__device_type() === 'tab'){//tablet
                            $(this).addClass('ct_t__video')
                            $(this).attr('poster', $(this).attr('data-poster-tab'));
                            $(this).attr('src', $(this).attr('data-video-src-tab'));
                        }else{//desktop
                            if (window.document.documentMode && $(this).attr('data-poster-desk-ie') != undefined && $(this).attr('data-poster-desk-ie').length > 0) { //set poster for IE
                                $(this).addClass('ct_ie__video')
                                $(this).attr('poster', $(this).attr('data-poster-desk-ie'));
                            }else{
                                $(this).addClass('ct_d__video')
                                $(this).attr('poster', $(this).attr('data-poster-desk'));
                                $(this).attr('src', $(this).attr('data-video-src-desk'));
                            }
                        }

                    }
                }
            }
            else 
           
            if ( $(this).is('picture') ) {
                 
                $(this).find('source').each(function(){
                    $(this).attr('srcset', $(this).attr('data-image-src'));                   
                })
                $('img',this).attr({
                    'src': $('img',this).attr('data-image-src'),
                    'srcset':$('img',this).attr('data-image-srcset')
                });
            } 
           
            if ( $(this).is('img') ) {
                $(this).attr('src', $(this).attr('data-image-src'));  
            }
            $(this).addClass('lazy-loaded');
        }
    });
}