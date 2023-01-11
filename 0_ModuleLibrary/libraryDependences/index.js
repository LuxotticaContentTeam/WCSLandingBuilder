document.addEventListener("DOMContentLoaded", function() {
  
    $('.ct_banner__container').each((i,banner)=>{
      
        $(banner).after(`
            <div class="banner_code_container" >
            <button onclick="hide_code()"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.4441 0L16.0006 12.4448L3.55588 0L0 3.5556L12.4447 16.0008L0 28.4448L3.55588 32L16.0006 19.5556L28.4441 32L32 28.4448L19.5553 16.0008L32 3.5556L28.4441 0Z" fill="black"/>
                </svg>
            </button>

            <pre>
            <code class="language-markup">
                ${$(banner).html()}
            </code>
            </pre>
            </div>
        `)
    })
    var code_section = document.querySelectorAll('code');
    code_section.forEach((code_section,e)=>{
        code_section.innerHTML =  code_section.innerHTML.replaceAll('<','&lt;');
        
    })

    $('.ct_show_code').click(function(){
        $('html,body').css('overflow','hidden')
        $(this).parents('section').find('.banner_code_container').toggleClass('show')
    });
    
    $('.banner_code_container').click(function(){
        hide_code();
    });
    $('.banner_code_container pre').click((e)=>{
        e.stopPropagation();
    })

    $('.ct_color').click(function(){
        let color = $(this).css('background-color');
        let classList = $(this)[0].classList;
        $('#color').html(rgb2hex(color) +' | <span style="display:inline-block;margin-left:5px;text-transform: lowercase;"> '+ classList[1].toLowerCase()+'</span>' );
      
    })
});

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

function hide_code(){
    $('html,body').css('overflow','auto');
    $('.banner_code_container.show').toggleClass('show');
}
