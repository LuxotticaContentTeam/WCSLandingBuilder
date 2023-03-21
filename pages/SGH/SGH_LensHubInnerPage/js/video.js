class Video {

    video_manager(){
        let videos = document.querySelectorAll('.ct_space .ct_video__container');
      
        videos.forEach((elem)=>{
            elem.querySelector('video').addEventListener('canplay',(e)=>{
                elem.querySelector('video').play();        
            },{ once: true })
            this.set_video_control(elem.querySelector('.ct_video__controls'),elem.querySelector('video'))
        });
    }
    

    set_video_control(controls,video){
        controls.addEventListener('click',(e)=>{
            if (video.paused){
                if(video.readyState < 3) {
                    video.load();
                }
                if(video.readyState >= 3) {
                    video.play();
                } else {
                    let waitVideoLoaded = setTimeout(()=>{
                        // console.log('video waiting..')
                        if(video.readyState < 3) {
                            video.load();
                        }
                        if(video.readyState >= 3) {
                          
                            video.play();
                            clearInterval(waitVideoLoaded);
                        }
                    }, 250)
                }
                video.addEventListener('play',()=>{
                    controls.classList.add('ct__playing')
                    video.onended = ()=>{
                        controls.classList.remove('ct__playing')
                    }
                },{once:true})
            }else{
                video.pause();
                controls.classList.remove('ct__playing')
            }
        })
    }

    init(){
        this.video_manager();
    }

}

export default Video;