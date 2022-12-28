class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    #root;
    
    constructor(arr) {
        this.buildTree(arr);
    }
    
    buildTreeRec(arr) {
        if (arr.length <= 0) return null;
        
        let node = new Node(arr[Math.floor(arr.length / 2)]);
        
        node.left = this.buildTreeRec(arr.slice(0, Math.floor(arr.length / 2)));
        node.right = this.buildTreeRec(arr.slice(Math.floor(arr.length / 2 + 1), arr.length));
        
        return node;
    }
    
    buildTree(arr) {
        // Filter out any duplicates and sort the array
        arr = arr.filter((value, index) => {
            return arr.indexOf(value) === index;
        });
        arr.sort((a, b) => a - b);
        
        this.#root = this.buildTreeRec(arr);
    }
    
    getRoot() {
        return this.#root;
    }
    
    prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
    
    print() {
        this.prettyPrint(this.#root);
    }
    
    getHeight(node) {
        if (!node) return 0;
        
        let left = this.getHeight(node.left);
        let right = this.getHeight(node.right);
        
        return (Math.max(left, right) + 1);
    }
    
    getDepth(node, root = this.#root) {
        if (!node) return 0;
        
        let left = this.getDepth(node.left, node);
        let right = this.getDepth(node.right, node);
        
        return Math.max(left, right) + 1;
    }
    
    insertRec(value, node) {
        
    }
    
    insert(value) {
        this.insertRec(value, this.#root);
    }
}

export default Tree;