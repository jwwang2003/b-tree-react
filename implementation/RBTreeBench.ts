import { BilingualDictionary } from './bilingualDictionary';
import { BTreeBilingualDictionary } from './bTreeBilingualDictionary';
import { performance } from 'perf_hooks';
import * as fs from 'fs';

let dict = new BilingualDictionary();
// let bDict = new BTreeBilingualDictionary;

const firstInput = fs.readFileSync('bench/1_initial.txt', 'utf-8');
const initalWords:string[] = firstInput.split("\r\n");
let _initialWords: string[][] = [];
for(let i = 1; i < initalWords.length; ++i) {
  const translate: string[] = initalWords[i].trim().split(" ");
  _initialWords.push(translate);
}

const secondInput = fs.readFileSync('bench/2_delete.txt', 'utf-8');
const deleteWords:string[] = secondInput.split("\r\n");
let _deleteWords: string[][] = [];
for(let i = 1; i < deleteWords.length; ++i) {
  const translate: string[] = deleteWords[i].trim().split(" ");
  _deleteWords.push(translate);
}

const thirdInput = fs.readFileSync('bench/2_delete.txt', 'utf-8');
const insertWords:string[] = thirdInput.split("\r\n");
let _insertWords: string[][] = [];
for(let i = 1; i < insertWords.length; ++i) {
  const translate: string[] = insertWords[i].trim().split(" ");
  _insertWords.push(translate);
}

let counter = 0;

for(let i = 0; i < 100; ++i) {
  dict = new BilingualDictionary();
  const start = performance.now();
  for(let i = 1; i < _initialWords.length; ++i) {
    // console.log(_initialWords[i]);
    dict.addTranslation(_initialWords[i][0], _initialWords[i][1]);
  }

  // console.log('initial complete');
  
  for(let i = 1; i < _deleteWords.length; ++i) {
    // console.log(_deleteWords[i]);
    // dict.deleteTranslation(_deleteWords[i][0]);
  }
  
  // console.log('deleting complete');

  for(let i = 1; i < _deleteWords.length; ++i) {
    dict.addTranslation(_insertWords[i][0], _insertWords[i][1]);
  }

  // console.log('inserting complete');

  const end = performance.now();
  counter += end - start;
}

console.log(`Average time taken to execute function is ${counter/100}ms.`);
