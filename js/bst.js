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
    
    insertRec(data, node) {
        if (!node) {
            node = new Node(data);
            return node;
        }
        
        if (data < node.data) node.left = this.insertRec(data, node.left);
        else if (data > node.data) node.right = this.insertRec(data, node.right);
        
        return node;
    }
    
    insert(data) {
        this.#root = this.insertRec(data, this.#root);
    }
    
    minData(node) {
        let min = node.data;
        while (node.left) {
            min = node.left.data;
            node = node.left;
        }
        return min;
    }
    
    deleteRec(data, node) {
        if (!node) return null;
        
        if (data < node.data) node.left = this.deleteRec(data, node.left);
        else if (data > node.data) node.right = this.deleteRec(data, node.right);
        else {
            if (!node.left) return node.right;
            else if (!node.right) return node.left;
            
            node.data = this.minData(node.right);
            node.right = this.deleteRec(node.data, node.right);
        }
        
        return node;
    }
    
    delete(data) {
        this.#root = this.deleteRec(data, this.#root);
    }
    
    findRec(data, node) {
        if (!node || node.data === data) return node;
        
        if (data < node.data)  return this.findRec(data, node.left);
        return this.findRec(data, node.right);
    }
    
    find(data) {
        return this.findRec(data, this.#root);
    }
}

export default Tree;