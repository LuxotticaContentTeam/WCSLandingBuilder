/*const clipbox = document.querySelector(".clipbox");
const dragger = document.querySelector(".clipbox .dragger");
const first   = document.querySelector(".clipbox .primary__img");

let drag = false;

const draggerWidth = dragger.getBoundingClientRect().width;

const clipboxDimensions = {
	width: clipbox.getBoundingClientRect().width,
	left: clipbox.getBoundingClientRect().left
};

const handleStartDrag = () => {
	drag = true;
	dragger.classList.add("dragger--active");
	dragger.style.pointerEvents = "none";
};

const handleStopDrag = () => {
	drag = false;
	dragger.style.pointerEvents = "auto";
	dragger.classList.remove("dragger--active");	
	clipbox.style.cursor = "auto";
};

const handleImgReveal = e => {
	e.preventDefault();
	e.offsetX = e.offsetX || e.targetTouches[0].pageX - clipboxDimensions.left;
	if(drag && e.offsetX < clipboxDimensions.width && e.offsetX > 0) {
		clipbox.style.cursor = "ew-resize";
		dragger.style.left = e.offsetX - draggerWidth / 2 + "px";
		first.style.width = e.offsetX + "px";
	}
};

document.addEventListener("DOMContentLoaded", () => {
    dragger.addEventListener("mousedown", handleStartDrag);
    dragger.addEventListener("touchstart", handleStartDrag);

    clipbox.addEventListener("mouseup", handleStopDrag);
    clipbox.addEventListener("touchend", handleStopDrag);

    clipbox.addEventListener("mousemove", handleImgReveal);
    clipbox.addEventListener("touchmove", handleImgReveal);
});
*/
const clipbox = document.querySelector(".clipbox");
const dragger = document.querySelector(".clipbox .dragger");
const first   = document.querySelector(".clipbox .primary__img");

let drag = false;

const draggerWidth = dragger.getBoundingClientRect().width;

const clipboxDimensions = {
	width: clipbox.getBoundingClientRect().width,
	left: clipbox.getBoundingClientRect().left
};

const handleStartDrag = () => {
	drag = true;
	dragger.classList.add("dragger--active");
	dragger.style.pointerEvents = "none";
};

const handleStopDrag = () => {
	drag = false;
	dragger.style.pointerEvents = "auto";
	dragger.classList.remove("dragger--active");	
	clipbox.style.cursor = "auto";
};

const handleImgReveal = e => {
	e.preventDefault();
	e.offsetX = e.offsetX || e.targetTouches[0].pageX - clipboxDimensions.left;
	if(drag && e.offsetX < clipboxDimensions.width && e.offsetX > 0) {
		clipbox.style.cursor = "ew-resize";
		dragger.style.left = e.offsetX - draggerWidth / 2 + "px";
		first.style.width = e.offsetX + "px";
	}
};

dragger.addEventListener("mousedown", handleStartDrag);
dragger.addEventListener("touchstart", handleStartDrag);

clipbox.addEventListener("mouseup", handleStopDrag);
clipbox.addEventListener("touchend", handleStopDrag);

clipbox.addEventListener("mousemove", handleImgReveal);
clipbox.addEventListener("touchmove", handleImgReveal);