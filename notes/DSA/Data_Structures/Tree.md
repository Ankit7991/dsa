# Tree

## August 25
### Postorder traversal
It's a type of DEPTH FIRST TRAVERSAL

Where 
	you recursively visit all the child nodes (or neighbors) 
	of a node 
	before visiting the node itsel     f

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


# Tree Algorithms

## FLOOD FILL
**Flood Fill** is an algorithm used to fill a contiguous region of a grid 
with a new color or value starting from a given cell. 

It explores all connected cells with the same initial value and replaces them with the new value.

### Approach
- **DFS Approach**: Recursively replace the target color starting from a cell and move to adjacent cells if they have the same target color.
- **BFS Approach**: Use a queue to iteratively replace the target color starting from a cell and enqueue adjacent cells with the same target color.

### Use Cases of Flood Fill

- **Image Editing**: Fill areas with color.
- **Maze Solving**: Find connected paths.
- **Game Maps**: Paint regions or terrains.
- **Connectivity Checking**: Identify connected components.
- **Region Labeling**: Group similar regions in data.
- **Pattern Recognition**: Detect contiguous patterns.
- **Graph Exploration**: Traverse connected nodes in graphs.
