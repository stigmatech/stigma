
import fs from 'fs';

const en = JSON.parse(fs.readFileSync('/Users/fleurykoyo/Documents/LoftAI/Stigma Technologies/src/dictionaries/en.json', 'utf8'));
const fr = JSON.parse(fs.readFileSync('/Users/fleurykoyo/Documents/LoftAI/Stigma Technologies/src/dictionaries/fr.json', 'utf8'));

function compareKeys(obj1, obj2, path = '') {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    for (const key of keys1) {
        if (!keys2.includes(key)) {
            console.log(`Missing key in FR: ${path}${key}`);
        } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            compareKeys(obj1[key], obj2[key], `${path}${key}.`);
        }
    }

    for (const key of keys2) {
        if (!keys1.includes(key)) {
            console.log(`Missing key in EN: ${path}${key}`);
        }
    }
}

console.log("--- Comparing Home Keys ---");
compareKeys(en.home, fr.home, 'home.');
console.log("--- Comparing Common Keys ---");
compareKeys(en.common, fr.common, 'common.');
