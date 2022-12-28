import Tree from './bst.js';

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.print();
console.log(tree.getHeight(tree.getRoot())); // 4
console.log(tree.getDepth(tree.getRoot())); // 4
tree.insert(6);
tree.print();
tree.delete(4);
tree.print();
console.log(tree.find(6));
tree.levelOrder((node) => {
    console.log(node.data);
});
console.log('============================');
tree.inorder((node) => {
    console.log(node.data);
});
console.log('============================');
tree.preorder((node) => {
    console.log(node.data);
});
console.log(tree.isBalanced()); // true
tree.insert(-1);
tree.insert(-2);
console.log(tree.isBalanced()); // false

tree.print();
tree.rebalance();
console.log('=================');
tree.print();
console.log(tree.isBalanced()); // true