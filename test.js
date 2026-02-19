// function updateTree(tree, newValues, oldValues) {
//   const { text: newKey, value: newValue } = oldValues;
//   const { parentId } = oldValues;

//   // Access the target subtree based on parentId
//   function traverseAndEdit(node, targetKey) {
//     if (node.hasOwnProperty(targetKey)) {
//       const oldSubtree = node[targetKey];

//       // Clone the subtree, replacing the old key with the new key and value
//       const updatedSubtree = { ...oldSubtree };
//       const oldKey = newValues.text;

//       if (updatedSubtree.hasOwnProperty(oldKey)) {
//         updatedSubtree[newKey] = newValue;
//         delete updatedSubtree[oldKey];
//       }

//       // Return only the updated subtree
//       return { [targetKey]: updatedSubtree };
//     }

//     // Recursively look for the targetKey
//     for (let key in node) {
//       if (typeof node[key] === "object" && node[key] !== null) {
//         const result = traverseAndEdit(node[key], targetKey);
//         if (result) return result;
//       }
//     }
//     return null;
//   }

//   return traverseAndEdit(tree, parentId) || tree; // Return only the updated subtree or original tree if not found
// }

// // Example usage
// const tree = {
//   modal: {
//     header: "Fetch Image from URL",
//     button: {
//       fetch: "Fetch Image",
//       cancel: "Cancel",
//     },
//   },
//   input: {
//     placeholder: "Enter image URL",
//   },
//   error: {
//     invalidUrl: "Invalid URL format",
//     fetchError: "Error fetching image",
//     notImage: "URL does not point to an image",
//     fetchFailed: "Failed to fetch image: {status}",
//   },
// };

// const newValues = {
//   text: "placeholder",
//   value: "Enter image URL",
// };

// const oldValues = {
//   id: "1.4.2.1",
//   parentId: "input",
//   text: "placeholderEdited",
//   expanded: false,
//   value: "Enter text",
// };

// const updatedTree = updateTree(tree, newValues, oldValues);
// console.log(updatedTree);
const getUniqueValues = (obj1, obj2) => {
  return Object.keys(obj2).reduce((acc, key) => {
    if (obj1[key] !== obj2[key]) {
      acc[key] = obj2[key];
    }
    return acc;
  }, {});
};

// Example Usage:
const obj1 = { name: "ahmed", age: 19 };
const obj2 = { name: "ahmed", age: 20, name2: "ashraf", name3: "ashraf" };

console.log(getUniqueValues(obj1, obj2)); // Output: { age: 20 , name2: "ashraf" }

const s = [
  {
    dashboardFormSchemaID: "d4cf9cd7-0b06-4a56-a9cc-7b518f5455e7",
    schemaType: "ServerFilesContainer",
    idField: "fileID",
    dashboardFormSchemaInfoDTOView: {
      dashboardFormSchemaID: "d4cf9cd7-0b06-4a56-a9cc-7b518f5455e7",
      schemaHeader: "Archive Files",
      addingHeader: "Add Archive File",
      editingHeader: "Edit Archive File",
    },
    dashboardFormSchemaParameters: [
      {
        dashboardFormSchemaParameterID: "4460b03b-d440-45ff-8ce5-cd517376112c",
        dashboardFormSchemaID: "d4cf9cd7-0b06-4a56-a9cc-7b518f5455e7",
        isEnable: false,
        parameterType: "text",
        parameterField: "fileID",
        parameterTitel: "File ID",
        parameterLookupTitel: "File ID",
        isIDField: true,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 0,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "6d9cb789-211a-44ce-ae7f-8a259d716e52",
        dashboardFormSchemaID: "d4cf9cd7-0b06-4a56-a9cc-7b518f5455e7",
        isEnable: true,
        parameterType: "image",
        parameterField: "fileContent",
        parameterTitel: "File Content",
        parameterLookupTitel: "File Content",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 1,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
    ],
    projectProxyRoute: "BrandingMartArchiving",
    isMainSchema: false,
    dataSourceName: "",
    propertyName: null,
    indexNumber: 0,
  },
  {
    dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
    schemaType: "Table",
    idField: "postID",
    dashboardFormSchemaInfoDTOView: {
      dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
      schemaHeader: "Post Info",
      addingHeader: "Add Post Info",
      editingHeader: "Edit Post Info",
    },
    dashboardFormSchemaParameters: [
      {
        dashboardFormSchemaParameterID: "568b28c8-a5d4-43a2-a303-da319b91276b",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: false,
        parameterType: "text",
        parameterField: "postID",
        parameterTitel: "Post ID",
        parameterLookupTitel: "Post ID",
        isIDField: true,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 0,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "b7aad2c8-c766-4dc0-8bbd-eec1e13e6a24",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: true,
        parameterType: "text",
        parameterField: "postTitle",
        parameterTitel: "Post Title",
        parameterLookupTitel: "Post Title",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 1,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "77543676-9cf0-4ff6-a422-e002c03fffb5",
        dashboardFormSchemaID: "ad9fbe73-1ef5-45fb-afec-901276f740e1",
        isEnable: true,
        parameterType: "detailsCell",
        parameterField: "displayFile",
        parameterTitel: "Display File",
        parameterLookupTitel: null,
        isIDField: false,
        lookupID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 3,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
    ],
    projectProxyRoute: "BrandingMart",
    isMainSchema: true,
    dataSourceName: "",
    propertyName: null,
    indexNumber: 0,
  },
  {
    dashboardFormSchemaID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
    schemaType: "FilesContainer",
    idField: "displayFileForPostID",
    dashboardFormSchemaInfoDTOView: {
      dashboardFormSchemaID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
      schemaHeader: "Post Files",
      addingHeader: "Add Post File",
      editingHeader: "Edit Post File",
    },
    dashboardFormSchemaParameters: [
      {
        dashboardFormSchemaParameterID: "308a4042-ae6d-4c30-8d14-df697e8f87db",
        dashboardFormSchemaID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
        isEnable: false,
        parameterType: "text",
        parameterField: "displayFileForPostID",
        parameterTitel: "DisplayFileForPostID",
        parameterLookupTitel: "DisplayFileForPostID",
        isIDField: true,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 0,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "d8287eec-9283-4d76-bb94-b6ac92d0f1a7",
        dashboardFormSchemaID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
        isEnable: false,
        parameterType: "text",
        parameterField: "postID",
        parameterTitel: "Post ID",
        parameterLookupTitel: "Post ID",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 2,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "c929e356-80a5-4423-a3d5-6b336062327a",
        dashboardFormSchemaID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
        isEnable: true,
        parameterType: "imagePath",
        parameterField: "displayFile",
        parameterTitel: "Display Files",
        parameterLookupTitel: null,
        isIDField: false,
        lookupID: "d44cabc8-ce1f-476d-9bd8-444dd6e3f67a",
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 3,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
    ],
    projectProxyRoute: "BrandingMart",
    isMainSchema: false,
    dataSourceName: "",
    propertyName: null,
    indexNumber: 0,
  },
];
