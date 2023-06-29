export const videoManager = {
    videos:[],
    init:function(){
        this.videos = document.querySelectorAll('.ct_double_content .ct_video__container');
        this.set_video_control(this.videos)
    },
    set_video_control(videos){
        videos.forEach((video_container)=>{
            let video = video_container.querySelector('video');
            let controls = video_container.querySelector('.ct_video__controls')
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
        })
       
    }
}

