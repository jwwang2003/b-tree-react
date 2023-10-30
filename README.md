# Experiment Details

**Project 1: Chinese-English Dictionary based on Binary Search Tree**

**Summary:**
The project, due on October 29, 2023, focuses on applying the concepts of Red-Black Trees and B-Trees to build an English-Chinese dictionary. The assignment comprises the implementation of both Red-Black Trees and B-Trees, along with various functionalities including insertion, deletion, search, and preorder printing.

**Requirements:**

**3.1 Functions:**
- Implement Red-Black Trees and B-Trees, including INSERT, DELETE, SEARCH, and PREORDER PRINT methods.
- The branch number of B-Tree should be easily adjustable, with an initial suggestion of 10.

**3.1.1 PREORDER PRINT:**
- Display the tree using PREORDER traversal to a file, replacing numbers with words for Red-Black Trees.
- Example output for Red-Black Tree:
```
level=0 child=0 5(BLACK)
  level=1 child=0 3(BLACK)
    level=2 child=0 1(RED)
      level=3 child=0 null
      level=3 child=1 null
    level=2 child=1 null
  level=1 child=1 7(BLACK)
    level=2 child=0 6(RED)
      level=3 child=0 null
      level=3 child=1 null
    level=2 child=1 null
```
- Example output for B-Tree (with branch number 4):
```
level=0 child=0 /5/
  level=1 child=0 /1/3/
  level=1 child=1 /6/7/
```

**3.1.2 INSERT/DELETE:**
1. Process a batch of words from a file, with operations (INSERT or DELETE) specified in the file.
2. Handle single-word insertions or deletions.
3.1.3 SEARCH:
1. Search for words within a specified range and provide their meanings.
2. Look up the meaning of a single word.

**3.2 Analysis Work:**
- Compare insertion and deletion operations for both tree types by analyzing the time spent for each operation.

**4. Design:**
- Create a flexible program that allows users to import command files.
- Implement a user-friendly interface for managing dictionary operations, including initialization, single-word insertions/deletions, and tree selection.
- Provide functionality to search for words and their meanings.

# Brief analysis

The runtime analysis of a 2-3-4 tree, which is a type of self-balancing tree, can be summarized as follows:

1. **Search Operation**:
   - In the average case, searching for a specific element in a 2-3-4 tree has a time complexity of O(log n), where n is the number of elements in the tree. This is because the tree is balanced, and you can eliminate half of the nodes at each level of the tree.
   - In the worst case, the search operation can take O(log n) time as well, but it might require more comparisons if you need to traverse multiple nodes in a 4-node before reaching the target element.

2. **Insertion and Deletion Operations**:
   - The average case time complexity for insertion and deletion operations in a 2-3-4 tree is also O(log n). This is because these operations require you to search for the element's position first and then perform the necessary adjustments to maintain the tree's balance.
   - In the worst case, insertion and deletion can take O(log n) time as well, but if you need to perform tree restructuring, it may involve additional operations that are still logarithmic.

3. **Splitting and Merging Nodes**:
   - When you need to split a 4-node into two 2-nodes or merge two 2-nodes into a 4-node, these operations take O(1) time because they involve a fixed number of steps.

The runtime analysis of a 2-3-4 tree is similar to other balanced search trees like AVL or Red-Black trees. The key operations (search, insert, delete) have an average and worst-case time complexity of O(log n) due to the self-balancing properties of the tree. However, the constant factors involved in tree restructuring may vary, making it slightly less efficient than some other self-balancing tree structures in practice.

The runtime analysis of Red-Black trees, which are a type of self-balancing binary search tree, can be summarized as follows:

1. **Search Operation**:
   - In the average case, searching for a specific element in a Red-Black tree has a time complexity of O(log n), where n is the number of elements in the tree. This is because the tree is balanced, and you can eliminate half of the nodes at each level of the tree.
   - In the worst case, the search operation can take O(log n) time as well, similar to balanced binary search trees like AVL trees.

2. **Insertion and Deletion Operations**:
   - The average case time complexity for insertion and deletion operations in a Red-Black tree is also O(log n). These operations involve searching for the element's position and then adjusting the tree to maintain the Red-Black properties.
   - In the worst case, insertion and deletion operations can take O(log n) time, just like search operations.

3. **Rotation and Color-Flipping Operations**:
   - Red-Black trees use rotations and color-flipping operations to maintain balance. These operations have a constant time complexity, typically O(1). This means they take a fixed number of steps regardless of the tree's size.

The runtime analysis of Red-Black trees is similar to other self-balancing binary search trees like AVL trees. The key operations (search, insert, delete) have an average and worst-case time complexity of O(log n) due to the self-balancing properties of the tree. The constant factors involved in tree rotations and color-flipping are small, making Red-Black trees an efficient choice for maintaining balance in a binary search tree.

Each algorithm, Red-Black trees and 2-3-4 trees, has its advantages in specific scenarios, and the choice between them depends on the characteristics and requirements of your application. Here are scenarios where one algorithm may be advantageous over the other:

Advantages of Red-Black Trees:
1. **Memory Efficiency**: Red-Black trees typically have lower memory overhead compared to 2-3-4 trees. If memory usage is a critical concern, Red-Black trees might be a better choice.

2. **Widespread Support**: Red-Black trees are more commonly implemented in standard libraries and programming languages, making them a practical choice for many applications.

3. **Ease of Implementation**: Red-Black trees are simpler to implement and maintain than 2-3-4 trees, which can be advantageous in situations where code simplicity and maintainability are priorities.

Advantages of 2-3-4 Trees:
1. **Reduced Height**: 2-3-4 trees have the potential to be shorter and wider than Red-Black trees, which can lead to faster search operations in practice, particularly when used in-memory.

2. **Balancing and Splitting**: If your application frequently involves splitting nodes or dealing with a large number of nodes with varying degrees (2-nodes, 3-nodes, and 4-nodes), 2-3-4 trees may offer more efficient balancing mechanisms.

3. **Range Queries**: 2-3-4 trees can be advantageous for range queries as they can store multiple elements in a single node. This can reduce the number of nodes that need to be traversed when looking for elements within a certain range.

4. **Databases and Disk Storage**: 2-3-4 trees can be more advantageous for on-disk storage scenarios, such as in database systems, due to their wider nodes and reduced height, which minimizes the number of disk I/O operations.

The choice between Red-Black trees and 2-3-4 trees should consider factors like memory usage, ease of implementation, the specific types of operations your application needs to perform (search, insert, delete, range queries), and whether the data structure will primarily be used in-memory or for on-disk storage. Both trees are capable of maintaining balanced structures, but their characteristics and performance trade-offs make them more suitable for different use cases.

When implementing a dictionary (associative array) using either Red-Black trees or 2-3-4 trees, there are several factors to consider, and the choice may depend on your specific use case and priorities. Here are some points to help you decide:

1. **Search Performance**:
   - Both Red-Black trees and 2-3-4 trees offer O(log n) time complexity for search operations. In most practical scenarios, the performance difference between the two in terms of search is minimal.

2. **Insertion and Deletion**:
   - Both structures maintain balanced trees and offer similar time complexities for insertion and deletion (O(log n)).

3. **Memory Overhead**:
   - Red-Black trees typically have lower memory overhead compared to 2-3-4 trees, as they only require two colors per node. If memory efficiency is a concern, Red-Black trees might be preferred.

4. **Range Queries**:
   - If your dictionary needs to perform frequent range queries (e.g., finding all keys within a specific range), 2-3-4 trees might be slightly more efficient because they can store multiple elements in one node, reducing the number of nodes to traverse.

5. **Ease of Implementation**:
   - Red-Black trees are generally easier to implement and maintain due to their simplicity. If you want a straightforward and well-documented solution, Red-Black trees are a good choice.

6. **Existing Libraries and Language Support**:
   - Red-Black trees are more commonly available in standard libraries and programming languages, making them a practical choice when such support is needed.

7. **Disk Storage**:
   - If your dictionary is primarily for on-disk storage, 2-3-4 trees are often more efficient due to their wide nodes, which can reduce the number of disk I/O operations.

In summary, both Red-Black trees and 2-3-4 trees can be used to implement dictionaries effectively, and the choice depends on your specific requirements. For most in-memory scenarios with balanced dictionaries, Red-Black trees are a widely accepted and straightforward choice. If you have specific performance or memory constraints, or if you frequently need to perform range queries, 2-3-4 trees might be a more efficient option.


In conclusion, the runtime analysis of 2-3-4 trees and Red-Black trees reveals that both data structures offer efficient and balanced solutions for various applications, each with its own strengths and advantages.

2-3-4 trees maintain balance through node splitting and merging, making them particularly suitable for scenarios that involve frequent changes in node degrees, range queries, and on-disk storage. Their reduced height can also lead to faster in-memory search operations.

Red-Black trees, on the other hand, offer simplicity, memory efficiency, and widespread support in standard libraries and programming languages. They are often a practical choice when ease of implementation and memory usage are priorities, and they perform well in most common scenarios.

The choice between these two data structures should be guided by your specific use case and priorities. Consider factors like memory efficiency, range query requirements, ease of implementation, and existing library support. Additionally, whether your data structure will be used primarily in-memory or for on-disk storage can significantly influence the decision.

Ultimately, both 2-3-4 trees and Red-Black trees provide reliable solutions for implementing dictionaries (associative arrays), and your choice should align with your application's unique demands.

# Experiment Results

![](./images/btree_time%20.png)

BTree Average -> 4.19-4.7ms


# Code Documentation

Here's the documentation and descriptions for the methods in the provided TypeScript class, `RedBlackTree`:

### RedBlackTree Class

#### Properties

- `nil`: A reference to the sentinel node, which is always black.
- `root`: A reference to the root node of the Red-Black Tree.
- `numNodes`: A counter to keep track of the number of nodes in the tree.

#### Constructor

- `constructor()`: Initializes the Red-Black Tree with an empty root and a black sentinel node.

#### Search

- `search(key: string)`: Searches for a node with the given key (word) in the tree and returns the node if found. If not found, returns `undefined`.

#### Insert

- `insert(key: TranslateNode)`: Inserts a new node with the specified key (word) into the Red-Black Tree while maintaining Red-Black Tree properties. The `key` parameter should be an instance of `TranslateNode`.

#### Insert Fix

- `insertFix(newNode: TreeNode)`: Restores the Red-Black Tree properties after insertion by performing rotations and color adjustments.

#### Delete

- `delete(node: TreeNode, key: TranslateNode)`: Deletes a node with the specified key from the Red-Black Tree. The `key` parameter should be an instance of `TranslateNode`. It returns `true` if the deletion is successful and `false` if the key is not found in the tree.

#### Delete Fix

- `deleteFix(node: TreeNode)`: Restores the Red-Black Tree properties after deletion by performing rotations and color adjustments.

#### Minimum

- `minimum(node: TreeNode)`: Returns the node with the minimum key (word) in the tree, starting from the given node.

#### Maximum

- `maximum(node: TreeNode)`: Returns the node with the maximum key (word) in the tree, starting from the given node.

#### Transplant

- `rbTransplant(u: TreeNode, v: TreeNode)`: Replaces node `u` with node `v` in the Red-Black Tree.

#### Left Rotate

- `leftRotate(node: TreeNode)`: Performs a left rotation on the subtree rooted at the given node to maintain Red-Black Tree properties.

#### Right Rotate

- `rightRotate(node: TreeNode)`: Performs a right rotation on the subtree rooted at the given node to maintain Red-Black Tree properties.

#### Height of Tree

- `heightOfTree(node: TreeNode, sum: number)`: Calculates and returns the height of the Red-Black Tree. The `node` parameter represents the current node being considered, and `sum` accumulates the height.

#### Get Black Height

- `getBlackHeight()`: Calculates and returns the black height of the Red-Black Tree, i.e., the number of black nodes on any path from the root to a leaf.

#### Print Tree

- `printTree()`: Returns an array that represents the structure of the Red-Black Tree. Each entry in the array provides information about the nodes, their colors, and relationships.

#### Print Preorder

- `printPreorder(node: TreeNode, level: number, side: number, result: string[])`: Traverses the tree in a pre-order manner, printing each node's information along with its level and the child side (0 for left, 1 for right) into the provided `result` array.

#### Print Inorder

- `printInorder(node: TreeNode, result: string[])`: Traverses the tree in an in-order manner, printing the word and translation of each node into the `result` array.

#### Print Postorder

- `printPostorder(node: TreeNode, result: string[])`: Traverses the tree in a post-order manner, printing the word and translation of each node into the `result` array.

#### Print Inorder with Range

- `printInorder2(node: TreeNode, startNode: TreeNode, endNode: TreeNode, result: string[], startFound: boolean[])`: Traverses the tree in an in-order manner, printing the word and translation of nodes within a specified range defined by `startNode` and `endNode`. The `startFound` array is used to control the range printing.

This class provides methods for maintaining a Red-Black Tree, a type of self-balancing binary search tree. The tree is used to store and manage nodes with `TranslateNode` values. The tree ensures that Red-Black Tree properties are maintained during insertions and deletions. The provided methods allow for various tree operations and tree structure visualization.

## RB Tree

Here's the documentation and descriptions for each of the methods in the provided code:

1. `arrayOfSize(size)`: This is a helper function that creates and returns an array of a specified size filled with `null` values.

2. `BTreeNode`: This is the constructor function for a B-tree node. It initializes the node with properties to keep track of the number of keys, an array of keys, and an array of child nodes.

3. `isLeaf()`: A method of the `BTreeNode` class that checks if the node is a leaf node (has no children). It returns a boolean value indicating whether the node is a leaf.

4. `isFull()`: A method of the `BTreeNode` class that checks if the node is full (contains the maximum number of keys). It returns a boolean value indicating whether the node is full.

5. `keyCount()`: A method of the `BTreeNode` class that returns the number of keys currently stored in the node.

6. `add(key)`: A method of the `BTreeNode` class used to add a key to the node. If the node is a leaf and not full, the key is inserted directly. If the node is not a leaf, it recursively traverses the tree to find the appropriate child node for insertion.

7. `insertKey(key)`: A method of the `BTreeNode` class used to insert a key into the node. It performs an insertion sort on the keys to maintain them in sorted order.

8. `insertSplit(split)`: A method of the `BTreeNode` class used to insert a split node when splitting a full node. It correctly updates the keys and child nodes to accommodate the new split.

9. `getChildContaining(key)`: A method of the `BTreeNode` class that finds the child node containing the specified key. It's used during insertion to determine the next child to traverse.

10. `split(key, keyRightChild)`: A method of the `BTreeNode` class that splits a full node into two nodes, with the given key as the median key. It returns an object containing the left node, median key, and right node.

11. `remove(key)`: A method of the `BTreeNode` class used to remove a key from the node. It handles cases where the node is a leaf or not, and it rebalances the tree as needed.

12. `rebalance(childIndex)`: A method of the `BTreeNode` class that rebalances a child node if its key count falls below a certain threshold.

13. `mergeChilds(leftIndex)`: A method of the `BTreeNode` class used to merge two child nodes and their keys when one of the children has fewer keys.

14. `extractMax()`: A method of the `BTreeNode` class that extracts the maximum key from the node, which is used during removal.

15. `indexOfKey(key)`: A method of the `BTreeNode` class that finds the index of a key within the node.

16. `removeKey(key)`: A method of the `BTreeNode` class used to remove a key from a leaf node.

17. `toString(indentOpt)`: A method of the `BTreeNode` class that returns a string representation of the node, including its keys and child nodes, with optional indentation for a more readable tree structure.

18. `BTreeNode.fromSplit(split)`: A static method of the `BTreeNode` class that creates a new node from a split operation.

19. `BTree`: This is the constructor function for a B-tree. It initializes the tree with a root node.

20. `add(key)`: A method of the `BTree` class that adds a key to the tree. It delegates the operation to the root node, and if the root splits, it updates the root.

21. `remove(key)`: A method of the `BTree` class that removes a key from the tree. It delegates the operation to the root node, and if the root becomes empty, it updates the root.

22. `toString()`: A method of the `BTree` class that returns a string representation of the entire B-tree.

23. `search(key)`: A method of the `BTree` class that allows you to search for a specific key in the tree. It starts the search from the root node.

24. `inorderPrint2(startNode, endNode)`: A method of the `BTree` class that returns an array of keys in the tree within a specified range (between `startNode` and `endNode`).

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
