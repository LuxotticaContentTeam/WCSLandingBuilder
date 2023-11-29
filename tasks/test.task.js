const pkg = require('../package.json');
const fs = require("fs");

const startJson = require('../test/startJSON.json');
const { getDirectories } = require('./utils');

const getLangJson = (langs) => {
   let trad = {};
   langs.forEach(lang => {
      trad[lang] = JSON.parse(fs.readFileSync(`./test/langs/${lang}/${lang}.json`, 'utf8'));
   });
   return trad
     
}

const buildResultJson = (inputJson,languages)=> {
   function recursiveTransform(data, langJson,prevKey=[]) {
      if (typeof data === 'object' && data !== null) {
         console.log(prevKey)
         if (Array.isArray(data)){
            let result = [];
            data.forEach((elem,i)=>{
               result.push(recursiveTransform(elem, langJson,[...prevKey,i]))
            })
           return result;
         }else{
            let result = {};
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                 
                    result[key] = recursiveTransform(data[key], langJson,[...prevKey,key]);
                }
            }
            return result;

         }
      } else {
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

   // console.log(langsJson)
   let resultJson = JSON.stringify(buildResultJson(startJson,langsJson));
   // console.log(buildResultJson(startJson,langsJson))
   fs.writeFileSync('./test/result/resultJSON.json', resultJson);
}