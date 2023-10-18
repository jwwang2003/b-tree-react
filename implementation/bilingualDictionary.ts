import { RedBlackTree, TreeNode, TranslateNode } from "./redBlackTree";

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