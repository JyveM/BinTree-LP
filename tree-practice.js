const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  // Your code here
  if(rootNode.left){
    return findMinBST(rootNode.left)
  }
  return rootNode.val;
}

function findMaxBST (rootNode) {
  // Your code here
  if(rootNode.right) {
    return findMaxBST(rootNode.right)
  }
  return rootNode.val;
}

function findMinBT (rootNode) {
  // Your code here
  let min = rootNode.val;

  if(rootNode.left) min = Math.min(min, findMinBT(rootNode.left));
  if(rootNode.right) min = Math.min(min, findMinBT(rootNode.right));

  return min;
}

function findMaxBT (rootNode) {
  let max = rootNode.val;

  if(rootNode.left) max = Math.max(max, findMaxBT(rootNode.left));
  if(rootNode.right) max = Math.max(max, findMaxBT(rootNode.right));

  return max;
}

function getHeight (rootNode) {
  // Your code here
  if(!rootNode) return -1;
  if(!rootNode.left && !rootNode.right) return 0;
  return 1 + Math.max(getHeight(rootNode.left), getHeight(rootNode.right));
}

function balancedTree (rootNode) {
  // Your code here
  let queue = [rootNode];
  while (queue.length) {
    let curr = queue.shift();

    if (Math.abs(getHeight(curr.left) - getHeight(curr.right)) <=1) {
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    } else return false
  }
  return true;
}

function countNodes (rootNode) {
  // Your code here
  if (!rootNode) return 0;
  return 1 + countNodes(rootNode.left) + countNodes(rootNode.right);
}

function getParentNode (rootNode, target) {
  if (rootNode.val === target) return null;

  let stack = [rootNode];

  while(stack.length > 0) {
    let curr = stack.pop();

    if((curr.left && curr.left.val === target) ||
       (curr.right && curr.right.val === target)) {
        return curr;
    }
    if (curr.left) stack.push(curr.left);
    if (curr.right) stack.push(curr.right);
  }
  return undefined;
}

function inOrderPredecessor (rootNode, target) {
  let curr = rootNode;
  let stack = [];
  let predecessor = null;

  while (true) {
    if(curr) {
      stack.push(curr);
      curr = curr.left;
    } else if (!curr && stack.length > 0) {
      curr = stack.pop();

      if(curr.val === target) {
        if(!predecessor) return null;
        return predecessor.val;
      }
      predecessor = curr;
      curr = curr.right;
    } else {
      break;
    }
  }

}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent

  // Undefined if the target cannot be found

  // Set target based on parent

  // Case 0: Zero children and no parent:
  //   return null

  // Case 1: Zero children:
  //   Set the parent that points to it to null

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.

  // Case 3: One child:
  //   Make the parent point to the child
  let parentNode = getParentNode(rootNode, target);

  if(parentNode === undefined) return undefined;

  let targetNode;
  let isLeftChild = false;
  if (!parentNode) {
    targetNode = rootNode;
  } else if (parentNode.left && parentNode.left.val === target) {
    targetNode = parentNode.left;
    isLeftChild = true;
  } else if (parentNode.right && parentNode.right.val === target) {
    targetNode = parentNode.right;
  } else {
    throw Error("Algorithm Error: This should never happen");
  }

  if (!parentNode && !targetNode.left && !targetNode.right) return null;

    else if (!targetNode.left && !targetNode.right){
    if (isLeftChild) parentNode.left = null;
    else parentNode.right = null;
  }

  else if (targetNode.left && targetNode.right) {
    let predecessor = inOrderPredecessor(rootNode, target);
    deleteNodeBST(rootNode, predecessor);
    targetNode.val = predecessor;
  }

  else {
    if (targetNode.left) {
      if (isLeftChild) parentNode.left = targetNode.left;
      else parentNode.right = targetNode.left;
    } else {
      if (isLeftChild) parentNode.left = targetNode.right;
      else parentNode.right = targetNode.right;
    }
  }
}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
