const pkg = require('../package.json');
const fs = require("fs");

const startJson = require('../test/startJSON.json');
const { getDirectories } = require('./utils');



const getLangJson = (langs) => {
   let trad = {};
   langs.forEach(lang => {
      trad[lang] = JSON.parse(fs.readFileSync(`./test/langs/${lang}/${lang}.json`, 'utf8'));
   });
   console.log(trad)
   return trad
     
}


/**
 * 
 * @param { Object } inputJson - json sent to smartling
 * @param { Object } languages - object generate from all the country json returned by smartling
 * 
 * @returns merged json with all langs
 */
const buildResultJson = (inputJson,languages)=> {
   function recursiveTransform(data, langJson,prevKey=[]) {
      if (typeof data === 'object' && data !== null) { //check if current field is an object or just a string
         console.log(prevKey)
         if (Array.isArray(data)){ //checking if it's an array or an object
            let result = [];
            data.forEach((elem,i)=>{ 
               result.push(recursiveTransform(elem, langJson,[...prevKey,i])) //if it's an array it's stored the current index, if is an object it's stored the current key
            })
           return result;
         }else{
            let result = {};
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    result[key] = recursiveTransform(data[key], langJson,[...prevKey,key]); //storing the current key, to use them to retrieve the value from lang json
                }
            }
            return result;

         }
      } else { //if is just a string, for each lang, insert the corrisponding value from the lang-lang.json file
          let result = {};
          for (let lang in languages) {
               let langValue =langJson[lang];
              if (languages.hasOwnProperty(lang)) {
                  prevKey.forEach(key=>{ 
                     langValue = langValue[key]
                  })
                  result[lang] = langJson ? langValue : null;
              }
          }
          return result;
      }
   }

  return recursiveTransform(inputJson, languages);
}

module.exports = async function newTask(){
   let langsJson = getLangJson(getDirectories('./test/langs'));

   
   let resultJson = JSON.stringify(buildResultJson(startJson,langsJson));
   
   fs.writeFileSync('./test/result/resultJSON.json', resultJson);
}