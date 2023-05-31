
function ct_wow__search__download_script(url,name){
  var script = document.createElement("script");
  script.className = `ct_wow__search__${name}_script`;
  script.type = "text/javascript";
  script.src = url;
  script.addEventListener("load", function() {
    console.log(`WOW SEARCH - ${name} script loaded :)`);
    return new Promise((resolve, reject) => {
      resolve("Hi! ");
    });
  });
  document.body.appendChild(script);
}


async function ct_wow__search__download_scripts(){
    let promise = await Promise.all([
      ct_wow__search__download_script('./json/data.js','dati'),
      ct_wow__search__download_script('./js/main.min.js','core'),
  ]);
  return new Promise((resolve, reject) => {
      resolve("Scripts Loaded!");
  });
 
} 
window.ct_wow__search__config = {
  selector:'body'
}
window.ct_wow__search__start = async function(){
  if (!window.ct_wow__search_structure?.container){
    console.log('waiting..')
    await ct_wow__search__download_scripts()
    console.log('waited')
  }else{
    window.ct_wow__search_structure.init({reopen:true});
  }
}
  
  