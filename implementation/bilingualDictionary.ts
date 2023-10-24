import { RedBlackTree, TranslateNode } from "./redBlackTree";

export class BilingualDictionary {
  enToCnTree: RedBlackTree;
  cnToEnTree: RedBlackTree;

  constructor() {
    this.enToCnTree = new RedBlackTree();
    this.cnToEnTree = new RedBlackTree();
  }

  addTranslation(english: string, chinese: string) {
    const translateNodeEnToCn = new TranslateNode(english, chinese);
    const translateNodeCnToEn = new TranslateNode(chinese, english);

    this.enToCnTree.insert(translateNodeEnToCn);
    this.cnToEnTree.insert(translateNodeCnToEn);
  }

  deleteTranslation(key: string) {
    const enRoot = this.enToCnTree.root;
    const cnRoot = this.cnToEnTree.root;

    const search1 = this.enToCnTree.search(key);
    const search2 = this.cnToEnTree.search(key);

    const test = search1 && search2 === undefined ? 1 : 0;

    let result1 = false;
    let result2 = false;

    if (test == 1 && search1 !== undefined) {
      // the key is a word in the English dictionary that translates to Chinese
      const english = new TranslateNode(search1.key.word, '');
      const chinese = new TranslateNode(search1.key.translated, '');
      result1 = this.enToCnTree.delete(enRoot, english);
      result2 = this.cnToEnTree.delete(cnRoot, chinese);
    }
    else if (test == 0 && search2 !== undefined) {
      // the key is a word in the Chinese dictionary that translates to English
      const english = new TranslateNode(search2.key.translated, '');
      const chinese = new TranslateNode(search2.key.word, '');
      result1 = this.enToCnTree.delete(enRoot, english);
      result2 = this.cnToEnTree.delete(cnRoot, chinese);
    }

    return result1 && result2;
  }

  search(key: string) {
    const result1 = this.searchEnglish(key);
    const result2 = this.searchChinese(key);
    
    return result1 == undefined ? result2 : result1;
  }

  searchEnglish(key: string) {
    return this.enToCnTree.search(key);
  }

  searchChinese(key: string) {
    return this.cnToEnTree.search(key);
  }
}