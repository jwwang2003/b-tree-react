import { BTree } from "./BTree";

export class BTreeBilingualDictionary {
  enToCnTree;
  cnToEnTree;

  constructor() {
    this.enToCnTree = new BTree();
    this.cnToEnTree = new BTree();
  }

  addTranslation(english, chinese) {
    const translateNodeEnToCn = [english, chinese];
    const translateNodeCnToEn = [chinese, english];

    this.enToCnTree.add(translateNodeEnToCn);
    this.cnToEnTree.add(translateNodeCnToEn);
  }

  deleteTranslation(key) {
    const enRoot = this.enToCnTree._root;
    const cnRoot = this.cnToEnTree._root;

    const search1 = this.enToCnTree.search(key);
    const search2 = this.cnToEnTree.search(key);

    const test = search1 && search2 === null ? 1 : 0;

    let result1 = false;
    let result2 = false;

    if (test == 1 && search1 !== null) {
      // the key is a word in the English dictionary that translates to Chinese
      // const english = new TranslateNode(search1.keys[0], '');
      // const chinese = new TranslateNode(search1.keys[1], '');
      result1 = this.enToCnTree.delete(enRoot, [search1.keys[0], '']);
      result2 = this.cnToEnTree.delete(cnRoot, [search1.keys[1], '']);
    }
    else if (test == 0 && search2 !== null) {
      // the key is a word in the Chinese dictionary that translates to English
      // const english = new TranslateNode(search2.keys[1], '');
      // const chinese = new TranslateNode(search2.keys[0], '');
      result1 = this.enToCnTree.delete(enRoot, [search1.keys[1], '']);
      result2 = this.cnToEnTree.delete(cnRoot, [search1.keys[0], '']);
    }

    return result1 && result2;
  }

  search(key) {
    const result1 = this.searchEnglish(key);
    const result2 = this.searchChinese(key);
    
    return result1 == undefined ? result2 : result1;
  }

  searchEnglish(key) {
    return this.enToCnTree.search(key);
  }

  searchChinese(key) {
    return this.cnToEnTree.search(key);
  }
}