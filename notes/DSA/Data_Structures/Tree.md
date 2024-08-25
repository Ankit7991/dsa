# Tree

## August 25
### Postorder traversal

#### Leetcode https://leetcode.com/problems/binary-tree-postorder-traversal
Given the root of a binary tree, return the postorder traversal of its nodes' values.

```
Tree:
       10
      /  \
     5    20
    / \   / \
   1   8 15  25
       / \
      12  18

Output:

[1, 8, 5, 12, 18, 15, 25, 20, 10]
```

#### Code:
```
var postorderTraversal = function(root) {
    let result = [];

    function traverse(node) {
        if (node === null) return;
        traverse(node.left);
        traverse(node.right);

        result.push(node.val);
    }

    traverse(root);

    return result;
};
```


