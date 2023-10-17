export class TranslateNode {
  word: string;
  translated: string;

  constructor(word: string, translated: string) {
    this.word = word;
    this.translated = translated;
  }
  
  getWord() {
    return this.word;
  }

  getTranslate() {
    return this.translated;
  }
}

export class TreeNode {
  // color = 0 -> red
  // color = 1 -> black

  key: string;
  parent: TreeNode | undefined; // pointer to parent
  left: TreeNode | undefined;   // pointer to left tree node
  right: TreeNode | undefined;  // pointer to right tree node
  color: number;

  constructor(key: string) {
    this.key = key;
    this.parent = undefined;
    this.left = undefined;
    this.right = undefined;
    this.color = 0;             // all tree nodes are red by defualt
  }
}

export class RedBlackTree {
  nil: TreeNode;
  root: TreeNode;
  numNodes: number;

  constructor() {
    this.nil = new TreeNode('');
    this.nil.color = 1;           // root and nil are black
    this.root = this.nil;
    this.numNodes = 0;
  }
  
  search(key: string) {
    let node = this.root;

    while (node !== this.nil) {
      // keep traversing the tree as long as the end of the tree is not met
      
      if (node.key == key) return node;
      else if (key < node.key) node = node.left!;   // we can garentee that these are NOT undefined because of how we insert new elements
      else if (key > node.key) node = node.right!;
    }
  }

  insert(key: string) {
    let newNode: TreeNode = new TreeNode(key.toLowerCase());
    newNode.left = this.nil;
    newNode.right = this.nil;
    let node = this.root;
    let parent = undefined;

    // FIRST -- find the appropriate parent
    while (node !== this.nil) {
      parent = node;
      
      if (newNode.key < node.key) {
        node = node.left!;
      } else {
        node = node.right!;
      }
    }
    newNode.parent = parent;

    if (parent == undefined) {
      // CASE: Parent is the root
      newNode.color = 1;
      this.root = newNode;
      this.numNodes++;
      return;
    } else if (newNode.key < parent.key) {
      parent.left = newNode;
    } else {
      // (parent.key < newNode.key)
      parent.right = newNode;
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

      if (newNode.parent == newNode.parent?.parent?.left) {
        uncle = newNode.parent!.parent!.right
        parentIsLeft = true
      } else {
        uncle = newNode.parent!.parent!.left;
      }

      if (uncle?.color == 0) {
        newNode.parent!.color = 1;
        uncle.color = 1;
        newNode.parent!.parent!.color = 0;
        newNode = newNode.parent!.parent!
      } else {
        if (parentIsLeft && newNode == newNode.parent?.right) {
          newNode = newNode.parent;
          this.leftRotate(newNode);
        } else if (!parentIsLeft && newNode == newNode.parent?.left) {
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
  
  leftRotate(node: TreeNode) {
    let y = node.right!;
    node.right = y.left;

    if (y.left !== this.nil)
      y.left!.parent = node;

    y.parent = node.parent;

    if (node.parent === undefined)
      this.root = y
    else if (node == node.parent.left)
      node.parent.left = y;
    else
      node.parent.right = y;

    y.left = node
    node.parent = y
  }

  rightRotate(node: TreeNode) {
    let y = node.left!;
    node.left = y.right;

    if(y.right !== this.nil)
      y.right!.parent = node;
    
    y.parent = node.parent;

    if (node.parent === undefined)
      this.root = y;
    else if (node == node.parent.left)
      node.parent.left = y;
    else
      node.parent.right = y;

    y.right = node
    node.parent = y
  }

  // Other functions
  // This method returns the height of the tree
  heightOfTree(node: TreeNode, sum: number): number {
    if (node == this.nil)
      return sum;
    return Math.max(this.heightOfTree(node.left!, sum + 1), this.heightOfTree(node.right!, sum +1));
  }

  // This method returns the black-height of the tree
  getBlackHeight() {
    let node = this.root;
    let blackHeight = 0;

    while (node != this.nil) {
      node = node.left!;
      if (node.color == 1)
        blackHeight++;
    }

    return blackHeight;
  }

  // Prints the current red black tree structure
  printTree () {
    this.printCall(this.root, "", true);
  }

  // Debugging feature
  printCall(node: TreeNode, indent: string, last: boolean) {
    if (node !== this.nil) {
      let end = ' ';
      process.stdout.write(indent + end);

      if (last) {
        // console.log("R----", end=' ');
        process.stdout.write("R----" + end);
        indent += "     ";
      } else {
        // console.log("L----", end=' ');
        process.stdout.write("L----" + end);
        indent += "|    ";
      }

      let s_color = node.color === 0 ? "RED" : "BLACK";
      console.log(node.key + "(" + s_color + ")");
      this.printCall(node.left!, indent, false);
      this.printCall(node.right!, indent, true);
    }
  }
}