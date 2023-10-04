export const Analytics = {
  
    init:function(){
        document.querySelectorAll('[data-tracking-id]').forEach(elem=>elem.addEventListener('click',()=>{
                Analytics.analyticsPush({
                    'id':'Click',
                    'Tracking_Type': 'link',
                    'data_element_id': elem.dataset.trackingId.replaceAll(' ',''),
                    'data_description':elem.dataset.trackingDescription.replaceAll(' ',''),
                    
                })
            })
        )

    },
    analyticsPush:function(data,delay) {
        if (window.tealium_data2track){
            if(delay){
                setTimeout(function(){
                    tealium_data2track.push(data)
                },delay)
            }else{
                tealium_data2track.push(data)
            }
          
        }else{
            console.log(data)
        }
    }
}