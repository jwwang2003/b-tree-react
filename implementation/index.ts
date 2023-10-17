import { TranslateNode, TreeNode, RedBlackTree } from './redBlackTree';

import * as fs from 'fs';

const input = fs.readFileSync('EN-US-Dictionary.txt', 'utf-8');
const words:string[] = input.split("\n")

let tree = new RedBlackTree()
// tree.insert('11')
// tree.insert('2')
// tree.insert('14')
// tree.insert('1')
// tree.insert('7')
// tree.insert('5')
// tree.insert('8')
// tree.insert('15')
// tree.insert('a')
// tree.insert('b')
// tree.insert('e')
// tree.insert('d')
// tree.insert('c')
// tree.insert('f')
// tree.insert('g')
// tree.insert('h')
// tree.insert('i')
// tree.insert('j')

for (const word of words) {
  tree.insert(word);
}

tree.printTree();
console.log(tree.heightOfTree(tree.root, 0))
console.log(tree.numNodes)
console.log(tree.search('啊'))
console.log(tree.getBlackHeight())

console.log("Hello world!");