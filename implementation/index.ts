import { TranslateNode, TreeNode, RedBlackTree } from './redBlackTree';

import { BilingualDictionary } from './BilingualDictionary';
import * as fs from 'fs';

let tree = new RedBlackTree()
tree.insert(new TranslateNode('11', ''))
tree.insert(new TranslateNode('2', ''))
tree.insert(new TranslateNode('14', ''))
tree.insert(new TranslateNode('1', ''))
tree.insert(new TranslateNode('7', ''))
tree.insert(new TranslateNode('5', ''))
tree.insert(new TranslateNode('8', ''))
tree.insert(new TranslateNode('15', ''))
tree.printTree()

// Console output
//  R---- 14-(BLACK)
//       L---- 11-(BLACK)
//      |     L---- 1-(RED)
//       R---- 5-(RED)
//            L---- 2-(BLACK)
//           |     L---- 15-(RED)
//            R---- 7-(BLACK)
//                 R---- 8-(RED)

// let tree = new RedBlackTree()
// tree.insert(new TranslateNode('a', ''))
// tree.insert(new TranslateNode('b', ''))
// tree.insert(new TranslateNode('e', ''))
// tree.insert(new TranslateNode('d', ''))
// tree.insert(new TranslateNode('c', ''))
// tree.insert(new TranslateNode('f', ''))
// tree.insert(new TranslateNode('g', ''))
// tree.insert(new TranslateNode('h', ''))
// tree.insert(new TranslateNode('i', ''))
// tree.insert(new TranslateNode('j', ''))
// tree.printTree()

// Console log output
// R---- d-(BLACK)
// L---- b-(BLACK)
// |     L---- a-(BLACK)
// |     R---- c-(BLACK)
// R---- f-(BLACK)
//      L---- e-(BLACK)
//      R---- h-(RED)
//           L---- g-(BLACK)
//           R---- i-(BLACK)
//                R---- j-(RED)


// Testing English to Chinese and Chinese to English translation
let dict = new BilingualDictionary();
const fileInput = fs.readFileSync('Translate.txt', 'utf-8');
const words:string[] = fileInput.split("\r\n")

for (const word of words) {
  const translate: string[] = word.split(" ");

  dict.addTranslation(translate[0], translate[1]);
}

console.log(dict.search("curiosity"));
console.log(dict.search("好奇心"));
console.log(dict.searchChinese("炮塔"));
console.log(dict.search('啊'));

// Console output
// <ref *2> TreeNode {
//   key: TranslateNode { word: 'curiosity', translated: '好奇心' },
//   parent: <ref *1> TreeNode {
//     key: TranslateNode { word: 'curiously', translated: '好奇地' },
//     parent: TreeNode {
//       key: [TranslateNode],
//       parent: [TreeNode],
//       left: [Circular *1],
//       right: [TreeNode],
//       color: 0
//     },
//     left: [Circular *2],
//     right: TreeNode {
//       key: [TranslateNode],
//       parent: [Circular *1],
//       left: [TreeNode],
//       right: [TreeNode],
//       color: 1
//     },
//     color: 1
//   },
//   left: TreeNode {
//     key: TranslateNode { word: '', translated: '' },
//     parent: undefined,
//     left: undefined,
//     right: undefined,
//     color: 1
//   },
//   right: TreeNode {
//     key: TranslateNode { word: '', translated: '' },
//     parent: undefined,
//     left: undefined,
//     right: undefined,
//     color: 1
//   },
//   color: 1
// }
// <ref *2> TreeNode {
//   key: TranslateNode { word: '好奇心', translated: 'curiosity' },
//   parent: <ref *1> TreeNode {
//     key: TranslateNode { word: '好色', translated: 'carnalize' },
//     parent: TreeNode {
//       key: [TranslateNode],
//       parent: [TreeNode],
//       left: [Circular *1],
//       right: [TreeNode],
//       color: 1
//     },
//     left: [Circular *2],
//     right: TreeNode {
//       key: [TranslateNode],
//       parent: [Circular *1],
//       left: [TreeNode],
//       right: [TreeNode],
//       color: 1
//     },
//     color: 0
//   },
//   left: TreeNode {
//     key: TranslateNode { word: '好奇地', translated: 'curiously' },
//     parent: [Circular *2],
//     left: TreeNode {
//       key: [TranslateNode],
//       parent: undefined,
//       left: undefined,
//       right: undefined,
//       color: 1
//     },
//     right: TreeNode {
//       key: [TranslateNode],
//       parent: undefined,
//       left: undefined,
//       right: undefined,
//       color: 1
//     },
//     color: 0
//   },
//   right: TreeNode {
//     key: TranslateNode { word: '好汉', translated: 'bawcock' },
//     parent: [Circular *2],
//     left: TreeNode {
//       key: [TranslateNode],
//       parent: undefined,
//       left: undefined,
//       right: undefined,
//       color: 1
//     },
//     right: TreeNode {
//       key: [TranslateNode],
//       parent: undefined,
//       left: undefined,
//       right: undefined,
//       color: 1
//     },
//     color: 0
//   },
//   color: 1
// }
// <ref *2> TreeNode {
//   key: TranslateNode { word: '炮塔', translated: 'cupola' },
//   parent: <ref *1> TreeNode {
//     key: TranslateNode { word: '炖蹄筋', translated: 'cowheel' },
//     parent: TreeNode {
//       key: [TranslateNode],
//       parent: [TreeNode],
//       left: [TreeNode],
//       right: [Circular *1],
//       color: 0
//     },
//     left: TreeNode {
//       key: [TranslateNode],
//       parent: undefined,
//       left: undefined,
//       right: undefined,
//       color: 1
//     },
//     right: [Circular *2],
//     color: 1
//   },
//   left: TreeNode {
//     key: TranslateNode { word: '', translated: '' },
//     parent: undefined,
//     left: undefined,
//     right: undefined,
//     color: 1
//   },
//   right: TreeNode {
//     key: TranslateNode { word: '', translated: '' },
//     parent: undefined,
//     left: undefined,
//     right: undefined,
//     color: 1
//   },
//   color: 0
// }
// undefined


// tree.printTree();
// console.log(tree.search('你好'))
// console.log(tree.heightOfTree(tree.root, 0))
// console.log(tree.numNodes)
// console.log(tree.search('chainbridge'))
// console.log(tree.search('haha'))
// console.log(tree.getBlackHeight())