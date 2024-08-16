const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  // Your code here
  let min = rootNode.val
  let curr = rootNode
  while(curr.left){
    curr = curr.left
  }
  min = curr.val;
  return min;
}

function findMaxBST (rootNode) {
  // Your code here
  let max = rootNode.max;
  let curr = rootNode;
  while(curr.right) {
    curr = curr.right
  }
  max = curr.val;
  return max
}

function findMinBT (rootNode) {
  let hold = [rootNode]
  let min = rootNode.val

  while(hold.length > 0){
    let curr = hold.pop()
    if(curr.val < min) min = curr.val

    if(curr.left) hold.push(curr.left);
    if(curr.right) hold.push(curr.right)
  }
  return min;
}

function findMaxBT (rootNode) {

  let hold = [rootNode]
  let max = rootNode.val

  while(hold.length > 0){
    let curr = hold.pop()
    if(curr.val > max) max = curr.val

    if(curr.left) hold.push(curr.left);
    if(curr.right) hold.push(curr.right)
  }
  return max;
}

function getHeight (rootNode) {


  if (!rootNode) return -1;
  if (!rootNode.left && !rootNode.right) return 0;
  return 1 + Math.max(getHeight(rootNode.left), getHeight(rootNode.right));
  // if(rootNode === null) return -1;
  // if(rootNode.left === null && rootNode.right === null) return 0;


  // let  height = 0
  // let sum = 0
  // let stack = [rootNode]

  // while (stack.length > 0) {


  //   let currentNode = stack.pop();

  //   // console.log(currentNode.val);
  //   if (currentNode.left){
  //     stack.push(currentNode.left);
  //     sum++
  //   } else if (currentNode.right){
  //     stack.push(currentNode.right);
  //     sum++

  //   }if(currentNode.left === null && currentNode.right === null){
  //     if(sum > height) {
  //       height = sum;
  //       console.log(height);
  //     }
  //     sum = 1
  //   }
  // }
  // return height;
}

function balancedTree (rootNode) {

  let queue = [rootNode];
  while (queue.length) {
    let curr = queue.shift();

    if (Math.abs(getHeight(curr.left) - getHeight(curr.right)) <= 1) {
      if (curr.left) queue.push(curr.left)
      if (curr.right) queue.push(curr.right)
    } else return false
  }
  return true
  // if(rootNode === null) return;
  // let leftHeight
  // let rightHeight
  // if(rootNode.left){
  //   leftHeight = getHeight(rootNode.left);
  // }
  // if(rootNode.right){
  //   rightHeight = getHeight(rootNode.right)
  // }
  // if(leftHeight === rightHeight) return true;
  // return false;

}

function countNodes (rootNode) {
  if (!rootNode) return -1;
  if (!rootNode.left && !rootNode.right) return 0;
  let sum = 0

  let arr = [rootNode];

  while(arr.length > 0){
    let curr = arr.pop();
    sum++
    if(curr.left){
      arr.push(curr.left)
    }
    if(curr.right){
      arr.push(curr.right)
    }
  }
  return sum;

}

function getParentNode (rootNode, target) {
  if(rootNode.val === target) return null;

  let stack = [rootNode];

  while(stack.length > 0){
    let curr = stack.pop();
    if(curr.left && curr.left.val === target) return curr;
    if(curr.right && curr.right.val === target) return curr;

    if(curr.left)stack.push(curr.left);
    if(curr.right) stack.push(curr.right);
  }
  return undefined;
}

function inOrderPredecessor (rootNode, target) {
  let curr = rootNode;
  let stack = [];
  let predecessor = null;

  while(true){

    if(curr) {
      stack.push(curr);
      curr = curr.left;
    } else if (!curr && stack.length > 0) {
      curr = stack.pop();

      if(curr.val === target) {
        if (!predecessor) return null;
        return predecessor.val;
      }
      predecessor = curr;
      curr = curr.right;
    } else break;
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
  let parent = getParentNode(rootNode, target);

  if(parent === undefined) return undefined;

  let targetNode;
  let isLeftChild = false;
  if(!parent) {
    targetNode = rootNode;
  } else if (parent.left && parent.left.val === target){
    targetNode = parent.left;
    isLeftChild = true;
  }else if (parent.right && parent.right.val === target){
    targetNode = parent.right;
  } else {
    throw new Error("Algorithm Error: This should never happen")
  }

  if(!parent && !targetNode.left && !targetNode.right) return null;

  else if (!targetNode.left && !targetNode.right) {
    if(isLeftChild) parent.left = null;
    else parent.right = null;
  }

  else if(targetNode.left && targetNode.right) {
    let predecessor = inOrderPredecessor(rootNode, target);
    deleteNodeBST(rootNode, predecessor);
    targetNode.val = predecessor;
  }

  else {
    if(targetNode.left) {
      if(isLeftChild) parent.left = targetNode.left;
      else parent.right = targetNode.left;
    } else {
      if(isLeftChild) parent.left = targetNode.right;
      else parent.right = targetNode.right
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
