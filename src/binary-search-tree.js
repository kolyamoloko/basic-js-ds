const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
    this.Node = class {
      constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
      }
    };
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const node = this.treeRoot;

    if (node === null) {
      this.treeRoot = new this.Node(data);
      return;
    }
    const searchPlace = (node) => {
      if (data < node.data) {
        if (node.left === null) {
          node.left = new this.Node(data);
          return;
        } else {
          return searchPlace(node.left);
        }
      } else if (data > node.data) {
        if (node.right === null) {
          node.right = new this.Node(data);
          return;
        } else {
          return searchPlace(node.right);
        }
      } else {
        return null;
      }
    };
    return searchPlace(node);
  }

  has(data) {
    const node = this.treeRoot;
    if (node === null) return false;

    let findData = function (node) {
      if (data === node.data) {
        return true;
      } else if (data < node.data) {
        if (node.left !== null) {
          return findData(node.left);
        } else {
          return false;
        }
      } else if (data > node.data) {
        if (node.right !== null) {
          return findData(node.right);
        } else {
          return false;
        }
      }
    };
    return findData(node);
  }

  find(data) {
    const node = this.treeRoot;
    if (node === null) return null;

    let findData = function (node) {
      if (data === node.data) {
        return node;
      } else if (data < node.data) {
        if (node.left !== null) {
          return findData(node.left);
        } else {
          return null;
        }
      } else if (data > node.data) {
        if (node.right !== null) {
          return findData(node.right);
        } else {
          return null;
        }
      }
    };
    return findData(node);
  }

  remove(data) {
    const removeNode = function (node, data) {
      if (node === null) return null;
      if (data === node.data) {
        if (node.left === null && node.right === null) {
          return null;
        } else if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        } else {
          let tempNode = node.right;

          while (tempNode.left !== null) {
            tempNode = tempNode.left;
          }
          node.data = tempNode.data;
          node.right = removeNode(node.right, tempNode.data);
          return node;
        }
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.treeRoot = removeNode(this.treeRoot, data);
  }

  min() {
    const node = this.treeRoot;
    if (node === null) return null;
    const searchMin = (node) => {
      if (node.left === null) {
        return node.data;
      } else {
        return searchMin(node.left);
      }
    };
    return searchMin(node);
  }

  max() {
    const node = this.treeRoot;
    if (node === null) return null;
    const searchMax = (node) => {
      if (node.right === null) {
        return node.data;
      } else {
        return searchMax(node.right);
      }
    };
    return searchMax(node);
  }
};