export interface TranslateNodeInterface {
  word: string;
  translated: string;
}

export class TranslateNode implements TranslateNodeInterface {
  word: string;
  translated: string;

  constructor(word: string, translated: string) {
    this.word = word;
    this.translated = translated;
  }
}

export interface TreeNodeInterface {
  key: TranslateNodeInterface;
  parent?: TreeNodeInterface | undefined;
  children?: (TreeNodeInterface | undefined)[];
  color: number;
}

export class TreeNode implements TreeNodeInterface{
  // color = 0 -> red
  // color = 1 -> black

  key: TranslateNode;
  parent: TreeNode | undefined; // pointer to parent
  // left: TreeNode | undefined;   // pointer to left tree node
  // right: TreeNode | undefined;  // pointer to right tree node
  children: (TreeNode | undefined)[];
  color: number;

  constructor(key: TranslateNode) {
    this.key = key;
    this.parent = undefined;
    this.children = [];
    // this.children[0] = undefined;
    // this.children[1] = undefined;
    // this.left = undefined;
    // this.right = undefined;
    this.color = 0;             // all tree nodes are red by defualt
  }
}

export class RedBlackTree {
  nil: TreeNode;
  root: TreeNode;
  numNodes: number;

  constructor() {
    this.nil = new TreeNode(new TranslateNode("", ""));
    this.nil.color = 1;           // root and nil are black
    this.root = this.nil;
    this.numNodes = 0;
  }
  
  search(key: string) {
    let node = this.root;

    while (node !== this.nil) {
      // keep traversing the tree as long as the end of the tree is not met
      
      if (node.key.word === key) return node;
      else if (key < node.key.word) node = node.children[0]!;   // we can garentee that these are NOT undefined because of how we insert new elements
      else if (key > node.key.word) node = node.children[1]!;
    }
  }

  insert(key: TranslateNode) {
    let newNode: TreeNode = new TreeNode(key);
    newNode.children[0] = this.nil;
    newNode.children[1] = this.nil;
    let node = this.root;
    let parent = undefined;

    // FIRST -- find the appropriate parent
    while (node !== this.nil) {
      parent = node;
      
      if (newNode.key.word < node.key.word) {
        node = node.children[0]!;
      } else {
        node = node.children[1]!;
      }
    }
    newNode.parent = parent;

    if (parent == undefined) {
      // CASE: Parent is the root
      newNode.color = 1;
      this.root = newNode;
      this.numNodes++;
      return;
    } else if (newNode.key.word < parent.key.word) {
      parent.children[0] = newNode;
    } else {
      // (parent.key.getWord() < newNode.key.getWord())
      parent.children[1] = newNode;
    }

    // We can conlude that if parent == undefined passes, newNode.parent = parent gets
    // assigned a NON undefined parent
    if (newNode.parent?.parent == undefined) {
      this.numNodes++;
      return;
    }

    this.insertFix(newNode)
    this.numNodes++;
  }

  insertFix(newNode: TreeNode) {
    while (newNode != this.root && newNode.parent!.color == 0) {
      let parentIsLeft = false;
      let uncle: TreeNode | undefined = undefined;

      if (newNode.parent == newNode.parent?.parent?.children[0]) {
        uncle = newNode.parent!.parent!.children[1]
        parentIsLeft = true
      } else {
        uncle = newNode.parent!.parent!.children[0];
      }

      if (uncle?.color == 0) {
        newNode.parent!.color = 1;
        uncle.color = 1;
        newNode.parent!.parent!.color = 0;
        newNode = newNode.parent!.parent!
      } else {
        if (parentIsLeft && newNode == newNode.parent?.children[1]) {
          newNode = newNode.parent;
          this.leftRotate(newNode);
        } else if (!parentIsLeft && newNode == newNode.parent?.children[0]) {
          newNode = newNode.parent;
          this.rightRotate(newNode);
        }

        if (parentIsLeft) {
          newNode.parent!.color = 1;
          newNode.parent!.parent!.color = 0;
          this.rightRotate(newNode.parent!.parent!);
        } else {
          newNode.parent!.color = 1;
          newNode.parent!.parent!.color = 0;
          this.leftRotate(newNode.parent!.parent!);
        }
      }
    }

    this.root.color = 1;
  }

  delete(node: TreeNode, key: TranslateNode) {
    let z = this.nil;

    while (node !== this.nil) {
      if (node.key.word == key.word) {
        z = node;
      }

      if (node.key.word <= key.word) {
        node = node.children[1]!;
      } else {
        node = node.children[0]!;
      }
    }

    if (z === this.nil) {
      console.log("Cannot find key in the tree")
      return false;
    }
      
    let y = z;
    let x: TreeNode;
    let ogColor = y.color;

    if (z.children[0] === this.nil) {
      x = z.children[1]!;
      this.rbTransplant(z, z.children[1]!);
    }
    else if (z.children[1] === this.nil) {
      x = z.children[0]!;
      this.rbTransplant(z, z.children[0]!);
    }
    else {
      y = this.minimum(z.children[1]!);
      ogColor = y.color;
      x = y.children[1]!;

      if (y.parent === z) {
        x!.parent = y;
      } 
      else {
        this.rbTransplant(y, y.children[1]!);
        y.children[1] = z.children[1];
        y.children[1]!.parent = y;
      }

      this.rbTransplant(z, y);
      y.children[0] = z.children[0];
      y.children[0]!.parent = y;
      y.color = z.color;
    }

    if (ogColor == 1) {
      this.deleteFix(x);
    }

    return true;
  }

  deleteFix(node: TreeNode) {
    while (node != this.root && node.color == 1) {
      if (node == node.parent!.children[0]) {
        let s = node.parent!.children[1]!;

        if (s.color == 0) {
          s.color = 1;
          node.parent!.color = 0;
          this.leftRotate(node.parent!);
          s = node.parent!.children[1]!;
        }

        if (s.children[0]!.color == 1 && s.children[1]!.color == 1) {
          s.color = 0;
          node = node.parent!;
        }
        else {
          if (s.children[1]!.color == 1) {
            s.children[0]!.color = 1;
            s.color = 0;
            this.rightRotate(s);
            s = node.parent!.children[1]!;
          }

          s.color = node.parent!.color;
          node.parent!.color = 1;
          s.children[1]!.color = 1;
          this.leftRotate(node.parent!);
          node = this.root;
        }
      } else {
        let s = node.parent!.children[1]!;

        if (s.color == 0) {
          s.color = 1;
          node.parent!.color = 0;
          this.rightRotate(node.parent!);
          s = node.parent!.children[0]!;
        }

        if (s.children[1]!.color == 1 && s.children[0]!.color == 1) {
          s.color = 0;
          node = node.parent!;
        }
        else {
          if (s.children[0]!.color == 1) {
            s.children[1]!.color = 1;
            s.color = 0;
            this.leftRotate(s);
            s = node.parent!.children[0]!;
          }

          s.color = node.parent!.color;
          node.parent!.color = 1;
          s.children[0]!.color = 1;
          this.rightRotate(node.parent!);
          node = this.root!;
        }
      }
    }

    node.color = 1;
  }

  minimum(node: TreeNode) {
    while (node.children[0] != this.nil) {
      node = node.children[0]!;
    }
    return node;
  }

  maximum(node: TreeNode) {
    while (node.children[1] != this.nil) {
      node = node.children[0]!;
    }
    return node;
  }

  rbTransplant(u: TreeNode, v: TreeNode) {
    if (u.parent == undefined) {
      this.root = v;
    }
    else if (u.key.word == u.parent.children[0]!.key.word) {
      u.parent.children[0] = v;
    } 
    else {
      u.parent.children[1] = v;
    }
    v.parent = u.parent;
  }
  
  leftRotate(node: TreeNode) {
    let y = node.children[1]!;
    node.children[1] = y.children[0];

    if (y.children[0] !== this.nil)
      y.children[0]!.parent = node;

    y.parent = node.parent;

    if (node.parent === undefined)
      this.root = y
    else if (node == node.parent.children[0])
      node.parent.children[0] = y;
    else
      node.parent.children[1] = y;

    y.children[0] = node
    node.parent = y
  }

  rightRotate(node: TreeNode) {
    let y = node.children[0]!;
    node.children[0] = y.children[1];

    if(y.children[1] !== this.nil)
      y.children[1]!.parent = node;
    
    y.parent = node.parent;

    if (node.parent === undefined)
      this.root = y;
    else if (node == node.parent.children[0])
      node.parent.children[0] = y;
    else
      node.parent.children[1] = y;

    y.children[1] = node
    node.parent = y
  }

  // Other functions
  // This method returns the height of the tree
  heightOfTree(node: TreeNode, sum: number): number {
    if (node == this.nil)
      return sum;
    return Math.max(this.heightOfTree(node.children[0]!, sum + 1), this.heightOfTree(node.children[1]!, sum +1));
  }

  // This method returns the black-height of the tree
  getBlackHeight() {
    let node = this.root;
    let blackHeight = 0;

    while (node != this.nil) {
      node = node.children[0]!;
      if (node.color == 1)
        blackHeight++;
    }

    return blackHeight;
  }

  // Prints the current red black tree structure
  printTree () {
    const arr: string[] = [];
    this.printCall(this.root, "", true, arr);
    return arr;
  }

  // Debugging feature
  printCall(node: TreeNode, indent: string, last: boolean, result: string[]) {
    if (node !== this.nil) {
      let end = ' ';
      let string = '';
      string += indent + end;
      // process.stdout.write(indent + end);

      if (last) {
        // console.log("R----", end=' ');
        // process.stdout.write("R----" + end);
        string += "R----" + end;
        indent += "     ";
      } else {
        // console.log("L----", end=' ');
        // process.stdout.write("L----" + end);
        string +=  "L----" + end;
        indent += " |    ";
      }

      let s_color = node.color === 0 ? "RED" : "BLACK";
      // console.log(string + node.key.word + " - " + node.key.translated + "(" + s_color + ")");
      result.push(string + node.key.word + " - " + node.key.translated + "(" + s_color + ")");
      this.printCall(node.children[0]!, indent, false, result);
      this.printCall(node.children[1]!, indent, true, result);
    }
  }

  printPreorder(node: TreeNode, level: number, side: number, result: string[]) {
    if (node != this.nil) {
      // process.stdout.write(node.key.word + " - " + node.key.translated + " ");
      // console.log(node.key.word + " → " + node.key.translated);
      
      // result.push(node.key.word + " → " + node.key.translated);
      result.push("level=" + level + " child" + side + " " + node.key.word + " → " + node.key.translated + " " + (node.color == 0 ? "(RED)": "(BLACK)"));
      this.printPreorder(node.children[0]!, level + 1, 0, result);
      this.printPreorder(node.children[1]!, level + 1, 1, result);
    } else {
      result.push("level=" + level + " child" + side + " null");
    }
  }

  printInorder(node: TreeNode, result: string[]) {
    if (node != this.nil) {
      this.printInorder(node.children[0]!, result);
      // process.stdout.write(node.key.word + " - " + node.key.translated + " ");
      // console.log(node.key.word + " → " + node.key.translated);
      result.push(node.key.word + " → " + node.key.translated);
      this.printInorder(node.children[1]!, result);
    }
  }
 
  printPostorder(node: TreeNode, result: string[]) {
    if (node != this.nil) {
      this.printPostorder(node.children[0]!, result);
      this.printPostorder(node.children[1]!, result);
      // process.stdout.write(node.key.word + " - " + node.key.translated + " ");
      // console.log(node.key.word + " → " + node.key.translated);
      result.push(node.key.word + " → " + node.key.translated);
    }
  }

  printInorder2(node: TreeNode, startNode: TreeNode, endNode: TreeNode, result: string[], startFound: boolean[]) {
    if (node != this.nil) {
      this.printInorder2(node.children[0]!, startNode, endNode, result, startFound);
      // process.stdout.write(node.key.word + " - " + node.key.translated + " ");
      // console.log(node.key.word + " → " + node.key.translated);
      if (node == startNode) {
        startFound[0] = true;
      }
      if (startFound[0]) {
        result.push(node.key.word + " → " + node.key.translated);
      }
      if(node == endNode) {
        startFound[0] = false;
        return;
      }
      
      this.printInorder2(node.children[1]!, startNode, endNode, result, startFound);
    }
  }
}