class DragImage {

    constructor(clipbox, dragger, first, draggerWidth) {
        this.drag = false;
        this.clipbox = clipbox;
        this.dragger = dragger;
        this.first = first;
        this.draggerWidth = draggerWidth;
        // this.clipbox = document.querySelector(".clipbox");
        // this.dragger = document.querySelector(".clipbox .dragger");
        // this.draggerWidth = this.dragger.getBoundingClientRect().width;
        // this.first   = document.querySelector(".clipbox .primary__img");
        // this.clipboxDimensions = {
        //     width: this.clipbox.getBoundingClientRect().width,
        //     left: this.clipbox.getBoundingClientRect().left
        // };
    }

    handleStartDrag() {
        this.drag = true;
        this.dragger.classList.add("dragger--active");
        this.dragger.style.pointerEvents = "none";
    };

    handleStopDrag() {
        this.drag = false;
        this.dragger.style.pointerEvents = "auto";
        this.dragger.classList.remove("dragger--active");	
        this.clipbox.style.cursor = "auto";
    };

    handleImgReveal = e => {
        e.preventDefault();
        //e.offsetX = e.offsetX || e.targetTouches[0].pageX - clipboxDimensions.left;
        if(this.drag && e.offsetX < this.clipboxDimensions.width && e.offsetX > 0) {
            this.clipbox.style.cursor = "ew-resize";
            this.dragger.style.left = e.offsetX - draggerWidth / 2 + "px";
            this.first.style.width = e.offsetX + "px";
        }
    };

    // init() {

    //     window.addEventListener('DOMContentLoaded', () => {
    //         dragger.addEventListener("mousedown", this.handleStartDrag(dragger));
    //         dragger.addEventListener("touchstart", this.handleStartDrag(dragger));

    //         clipbox.addEventListener("mouseup", this.handleStopDrag(dragger, clipbox));
    //         clipbox.addEventListener("touchend", this.handleStopDrag(dragger, clipbox));

    //         clipbox.addEventListener("mousemove", this.handleImgReveal);
    //         clipbox.addEventListener("touchmove", this.handleImgReveal);
    //     });
    // }
}
export default DragImage;