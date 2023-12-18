// ---------------------------------------------- IS MOBILE
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







// ---------------------------------------------- OBJECT FIT COVER IMAGE
var ct_img__cover = function(){
    $('.ct_img__cover').each(function(){
        $(this).find('img').css('display', 'none');
        $(this).css('background-image', 'url('+$(this).find('img').attr('data-original')+')');
    });
}
// Detect objectFit support
if('objectFit' in document.documentElement.style === false) {
    ct_img__cover();
}







// ---------------------------------------------- SHOPPABLE IMAGES
var ct_page__products = {
    elements: []
}

var ct_show_panels = function(ct_this){
    $(ct_this).toggleClass('ct_show');
}
var ct_hide_panels = function(ct_this){
    $(ct_this).removeClass('ct_show');
}


var ct_is_view = function(){

    let ct_windowTop = $(window).scrollTop();

    $('.ct_container .ct_shopimg').each(function(){

        if ( ct_windowTop > $(this).offset().top + $(this).height() - window.innerHeight ) {

            if ( ct_windowTop < $(this).offset().top + $(this).height() ) {
                if ( !$(this).hasClass('ct_inview') ) {
                    $(this).addClass('ct_inview');
                }
            } else {
                if ( $(this).hasClass('ct_inview') ) {
                    $(this).removeClass('ct_inview');

                    $(this).find('.ct_shopimg__container').removeClass('ct_show');
                }
            }
        } else {
            if ( $(this).hasClass('ct_inview') ) {
                $(this).removeClass('ct_inview');
                $(this).find('.ct_shopimg__container').removeClass('ct_show');

            }
        }
    });

}

var ct_message__oos = '<strong>Coming back soon</strong> This frame is in <br>high demand';

var ct_printProducts = function( ct_json__products, ct_element ){

    var ct_template__shop_container = document.getElementById('ct_template__shopimg_container').innerHTML;
    var ct_template__shop_item = document.getElementById('ct_template__shopimg_item').innerHTML;

    for (let element in ct_element.elements) {

        let ct_shopimg__container = $('.ct_container .ct_shopimg[data-shopimg-id="'+element+'"] .ct_assets__container');

        $(ct_shopimg__container).append(ct_template__shop_container);

        let ct_shopimg__container_products = $(ct_shopimg__container).find('.ct_pin__container');

        for (let product in ct_element.elements[element]) {

            let ct_shopimg__pin = ct_element.elements[element][product];

            let ct_json__prod = ct_json__products.filter(function(e){return e.upc == ct_shopimg__pin.upc})[0];


            if ( ct_json__prod ){

                if ( ct_is_mobile() ) {
                    var ct_position__left = ct_shopimg__pin.left.mob ? ct_shopimg__pin.left.mob : ct_shopimg__pin.left;
                    var ct_position__top = ct_shopimg__pin.top.mob ? ct_shopimg__pin.top.mob : ct_shopimg__pin.top;
                    var ct_position__panel = ct_shopimg__pin.panel_position.mob ? ct_shopimg__pin.panel_position.mob : ct_shopimg__pin.panel_position;
                } else {
                    var ct_position__left = ct_shopimg__pin.left.desk ? ct_shopimg__pin.left.desk : ct_shopimg__pin.left;
                    var ct_position__top = ct_shopimg__pin.top.desk ? ct_shopimg__pin.top.desk : ct_shopimg__pin.top;
                    var ct_position__panel = ct_shopimg__pin.panel_position.desk ? ct_shopimg__pin.panel_position.desk : ct_shopimg__pin.panel_position;
                }

                // oos panel class
                if ( ct_json__prod.unavailable === 'true' ) {
                    var ct_oos = 'ct_panel__oos';
                    ct_json__prod.pdpURL = 'javascript:void(0)';
                } else {
                    var ct_oos = '';
                }

                // price pst
                if ( ct_json__prod.promotionalFlag === 0 ) {
                    var ct_current__price = 'From <span class="ct_price__normal">' + ct_json__prod.price.replace(' ', '') + '</span>';
                } else {
                    var ct_current_percentage = Math.round( ((100 - ((parseInt(ct_json__prod.price.replace('$ ',''))/parseInt(ct_json__prod.listPrice.replace('$ ','')))*100))/5)*5);
                    var ct_current__price = 'From <span class="ct_price__pst">' + ct_json__prod.listPrice.replace(' ', '') + '</span> <span class="ct_price__normal">' + ct_json__prod.price.replace(' ', '') + '</span> <span class="ct_price__percentage">' + ct_current_percentage + '% Off</span>';
                }

            } else {
                var ct_oos = 'ct_panel__oos_full';
                var ct_current__price = '';
                ct_json__prod = {
                    pdpURL: 'javascript:void(0)',
                    upc: 'oos',
                    brand: ''
                };
            }

            let ct_this__item = ct_template__shop_item
                .replace('{{left}}', ct_position__left + '%' )
                .replace('{{top}}', ct_position__top + '%' )
                .replace('{{panel_position}}', ct_position__panel )
                .replace('{{delay}}', (Number(product) / 5) + 's' )
                .replace('{{pdpURL}}', ct_json__prod.pdpURL )
                .replace('{{oos}}', ct_oos )
                .replace('{{section}}', element )
                .replace('{{description}}', ct_json__prod.upc )
                .replace('{{label}}', ct_json__prod.upc + ' shop now' )
                .replace('{{brand}}', ct_json__prod.brand )
                .replace('{{name}}', ct_json__prod.name )
                .replace('{{price}}', ct_current__price )
                .replace('{{message}}', ct_message__oos );


            $(ct_shopimg__container_products).append( ct_this__item );

        }

    }

}


// ----------------------------------- TELECOMANDO
function ct_center_Telecomando() {
    if ($(window).width() > 1024){
        /*Center if offset top is lower than 0*/
        var ct_TelecomandoTop = $('.ct_telecomando').offset().top;

        if (ct_TelecomandoTop <= 0 ) {
            $('.ct_telecomando').offset({ top: 40 });
        } else {
            $('.ct_telecomando').css('top','50%');
        }
    }
}

function ct_Toggle_Telecomando() {

    //ct_center_Telecomando();

  	/*Open Telecomando*/
    $('.ct_overlay__telecomando').addClass('ct_showTelecomando');
    $( ".ct_telecomando_tile:nth-child(1)" ).addClass('ct_telecomando_active');
  	$('body').css('position','fixed');
    $('.cx-widget.cx-side-button-group').hide();

  	/*Close Telecomando*/
  	$('.ct_close_telecomando').click(function () {
  	    $('.ct_overlay__telecomando').removeClass('ct_showTelecomando');
  			$('body').css('position','unset');
        $('.cx-widget.cx-side-button-group').show();
  	});

    /*Hover on tiles*/
    $( ".ct_telecomando_tile" ).hover(function() {
        $( ".ct_telecomando_tile" ).removeClass('ct_telecomando_active');
    });

  	$(document).mouseup(function (e) {
  			var popup = $('.ct_container.ct_telecomando');
  			if (!$('.ct_container.ct_telecomando').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
  				    $('.ct_overlay__telecomando').removeClass('ct_showTelecomando');
  				        $('body').css('position','unset');
            $('.cx-widget.cx-side-button-group').show();
  			}
  	});

  }


// ----------------------------------- CANADA SCRIPT
function ct_canada_cta_align() {
    $('.ct_container a').each(function (i,e) {
        var ct_url_ca = $(this).attr('href');
        var ct_view_ca = $(this).html();

        ct_url_ca = ct_url_ca.replace("lc-us", "lc-ca");

        $(this).attr('href', ct_url_ca);
        $(this).html(ct_view_ca.replace('shop ', 'view '));

    });
}

$(window).on('load', function(){

    if ( typeof(ct_page__products) !== 'undefined' ) {

        for (var element in ct_page__products.elements) {

            let ct_current__url = window.origin+'/ajaxSearchDisplayView?storeId='+window.CommonContextsJS.storeId+'&catalogId='+window.CommonContextsJS.catalogId+'&langId=-1&pageSize=10&orderBy=1&searchTerm='+ct_page__products.elements[element].searchRule;

            $.ajax({
                type: 'GET',
                url: ct_current__url,
                dataType: 'html',
                success: function(html){

                    var ct_products = JSON.parse(html);

                    ct_printProducts( ct_products.products.products.product, ct_page__products.elements[element] );

                    console.log('%cProducts printed', "background: green; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");

                }
            });
        }


        ct_is_view();

        $(window).scroll(function(){

            ct_is_view();

        });

    }

    // ------------------- HEADER CAROUSEL HIDE 1st SLIDE ON DESKTOP
    if ($(window).width() > 1024){
        $('#top_header_carousel').on('init', function(event, slick){
            slick.removeSlide(0);
        });
    }


    // CANADA SCRIPT INIT
    var storeId = window.CommonContextsJS.storeId;
    var catId = window.CommonContextsJS.catalogId;

    if ( storeId == '10852' && catId == '11652') {
        ct_canada_cta_align();
    }

});

// ------------------ TELECOMANDO CENTER ON RESIZE
$(window).on('load resize', function() {
    //ct_center_Telecomando();
});
