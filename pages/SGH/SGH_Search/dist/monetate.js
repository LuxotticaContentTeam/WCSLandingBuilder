(
  ()=>{
    var script = document.createElement("script");
    script.className = `ct_wow__search__index_script`;
    script.type = "text/javascript";
    script.setAttribute("defer", "defer");
    script.src = "https://media.sunglasshut.com/2023/utility/WOW/search/js/index.min.js";
    script.addEventListener("load", function() {
      console.log(`WOW SEARCH - index script loaded :)`);
    });
    document.body.appendChild(script);}
)();