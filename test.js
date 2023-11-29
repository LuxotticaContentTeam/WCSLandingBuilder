// const fs = require("fs");


// const getDirectories = source =>
// fs.readdirSync(source, { withFileTypes: true })
//   .filter(dirent => dirent.isDirectory())
//   .map(dirent => dirent.name)


// console.log(getDirectories('./pages'))
function transformJson(inputJson, languages, structure=[]) {
    function recursiveTransform(data, langJson) {
        if (typeof data === 'object' && data !== null) {
            let result = {};
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    result[key] = recursiveTransform(data[key], langJson ? langJson[key] : undefined);
                }
            }
            return result;
        } else {
            let result = {};
            for (let lang in languages) {
                console.log[data]
                if (languages.hasOwnProperty(lang)) {
                    result[lang] = langJson ? langJson[lang] : null;
                }
            }
            return result;
        }
    }

    return recursiveTransform(inputJson, languages);
}

// Example usage:
let inputJson = {
    "field1": "value1",
    "field2": "value2",
    "field3": {
        "sub_field1": "sub_value1",
        "sub_field2": "sub_value2",
        "sub_field3": "sub_value3"
    }
};

let languages = {
    'en-UK': {
        field1: 'english_value1',
        field2: 'english_value2',
        field3: {
            sub_field1: 'english_sub_value1',
            sub_field2: 'english_sub_value2',
            sub_field3: 'english_sub_value3'
        }
    },
    'en-US': {
        field1: 'english_value1',
        field2: 'english_value2',
        field3: {
            sub_field1: 'english_sub_value1',
            sub_field2: 'english_sub_value2',
            sub_field3: 'english_sub_value3'
        }
    },
    'es-ES': {
        field1: 'spanish_value1',
        field2: 'spanish_value2',
        field3: {
            sub_field1: 'spanish_sub_value1',
            sub_field2: 'spanish_sub_value2',
            sub_field3: 'spanish_sub_value3'
        }
    },
    'it-IT': {
        field1: 'italian_value1',
        field2: 'italian_value2',
        field3: {
            sub_field1: 'italian_sub_value1',
            sub_field2: 'italian_sub_value2',
            sub_field3: 'italian_sub_value3'
        }
    }
};

let outputJson = transformJson(inputJson, languages);
console.log(JSON.stringify(outputJson, null, 2));