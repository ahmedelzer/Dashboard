function updateTree(tree, newValues, oldValues) {
  const { text: newKey, value: newValue } = oldValues;
  const { parentId } = oldValues;

  // Access the target subtree based on parentId
  function traverseAndEdit(node, targetKey) {
    if (node.hasOwnProperty(targetKey)) {
      const oldSubtree = node[targetKey];

      // Clone the subtree, replacing the old key with the new key and value
      const updatedSubtree = { ...oldSubtree };
      const oldKey = newValues.text;

      if (updatedSubtree.hasOwnProperty(oldKey)) {
        updatedSubtree[newKey] = newValue;
        delete updatedSubtree[oldKey];
      }

      // Return only the updated subtree
      return { [targetKey]: updatedSubtree };
    }

    // Recursively look for the targetKey
    for (let key in node) {
      if (typeof node[key] === "object" && node[key] !== null) {
        const result = traverseAndEdit(node[key], targetKey);
        if (result) return result;
      }
    }
    return null;
  }

  return traverseAndEdit(tree, parentId) || tree; // Return only the updated subtree or original tree if not found
}

// Example usage
const tree = {
  modal: {
    header: "Fetch Image from URL",
    button: {
      fetch: "Fetch Image",
      cancel: "Cancel",
    },
  },
  input: {
    placeholder: "Enter image URL",
  },
  error: {
    invalidUrl: "Invalid URL format",
    fetchError: "Error fetching image",
    notImage: "URL does not point to an image",
    fetchFailed: "Failed to fetch image: {status}",
  },
};

const newValues = {
  text: "placeholder",
  value: "Enter image URL",
};

const oldValues = {
  id: "1.4.2.1",
  parentId: "input",
  text: "placeholderEdited",
  expanded: false,
  value: "Enter text",
};

const updatedTree = updateTree(tree, newValues, oldValues);
console.log(updatedTree);
