class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add a node at the end of the list
  append(data) {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.size++;
  }

  // Add a node at a specific index
  insertAt(data, index) {
    if (index < 0 || index > this.size) {
      return console.log("Index out of bounds");
    }

    const newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let previous = null;
      let currentIndex = 0;

      while (currentIndex < index) {
        previous = current;
        current = current.next;
        currentIndex++;
      }

      newNode.next = current;
      previous.next = newNode;
    }

    this.size++;
  }

  // Remove a node from a specific index
  removeFrom(index) {
    if (index < 0 || index >= this.size) {
      return console.log("Index out of bounds");
    }

    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    if (index === 0) {
      this.head = current.next;
    } else {
      while (currentIndex < index) {
        previous = current;
        current = current.next;
        currentIndex++;
      }

      previous.next = current.next;
    }

    this.size--;
    return current.data;
  }

  // Find the index of a node with specific data
  indexOf(data) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  // Print the list
  printList() {
    let current = this.head;
    let list = "";

    while (current) {
      list += current.data + " -> ";
      current = current.next;
    }

    list += "null";
    console.log(list);
  }

  // Get the size of the list
  getSize() {
    return this.size;
  }
}
function Count(list) {
  let temp = list;
  let count = 0;
  while (temp !== null) {
    count++;
    temp = temp.next;
  }
  return count;
}
var removeNthFromEnd = function (head, n) {
  let temp = head;
  let count = Count(head) - n;
  while (temp !== null) {
    if (Count(head) > 1) {
      if (count === 1) {
        temp.next = temp.next.next;
      }
    } else {
      if (count < 1) {
        temp.data = temp.next;
      }
    }
    count--;
    temp = temp.next;
  }
  return head;
};

// Example usage:
const list = new LinkedList();
list.append(10);
// list.append(20);
// list.append(30);
list.printList(); // Output: 10 -> 20 -> 30 -> null
console.log(removeNthFromEnd(list.head, 1));
