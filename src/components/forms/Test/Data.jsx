import { useState } from "react";
import Table from "../../../components/forms/DynamicTable/Table";
import testSchema from "./testSchema.json";
import SelectForm from "../SelectForm";
import FormContainer from "../DynamicPopup/FormContainer";
const Test = () => {
  // // Define the initial tree structure with `shortName` as the parent
  // const [treeData, setTreeData] = useState([
  //   {
  //     id: "shortName",
  //     text: "ENG_US",
  //     expanded: true,
  //     items: [],
  //   },
  // ]);

  // // Handle adding a new node
  // const handleAdd = () => {
  //   const newItem = {
  //     id: `node-${Math.random()}`, // Generate a unique id
  //     text: "New Node",
  //     parentId: "shortName",
  //   };
  //   setTreeData([...treeData, newItem]);
  // };

  // // Handle editing a node
  // const handleEdit = (nodeId, newText) => {
  //   setTreeData(
  //     treeData.map((item) =>
  //       item.id === nodeId ? { ...item, text: newText } : item
  //     )
  //   );
  // };

  // // Render the TreeView with Add and Edit buttons
  // return (
  //   <div>
  //     <Button text="Add Node" onClick={handleAdd} />

  //     <TreeView
  //       id="editable-treeview"
  //       dataStructure="plain"
  //       rootValue=""
  //       height={500}
  //       items={treeData}
  //       displayExpr="text"
  //       parentIdExpr="parentId"
  //       keyExpr="id"
  //       onItemClick={(e) => {
  //         const newText = prompt("Edit Node Text:", e.itemData.text);
  //         if (newText) {
  //           handleEdit(e.itemData.id, newText);
  //         }
  //       }}
  //     />
  //   </div>
  // );
  const initialData = [
    {
      shortName: "ENG_US",
      appInfo: {
        title: "Branding Mart",
      },
      homePage: {
        id: 1,
        text: "Home",
        path: "/home",
        icon: "home",
      },
      browser: {
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
      },
      webcam: {
        modal: {
          header: "Capture Image",
          button: {
            capture: "Capture Image",
            cancel: "Cancel",
          },
        },
      },
      drawPartionForm: {
        button: {
          cancel: "Cancel",
          edit: "Edit",
          save: "Save",
        },
      },
      fileContainer: {
        pagination: {
          buttonPrevious: "Previous",
          buttonNext: "Next",
          page: "Page",
          of: "of",
        },
        textButtonUploadValue: "upload",
        videoNotSupport: "Your browser does not support the video tag.",
        fileNotSupport: "Unsupported file type",
      },
      footer: {
        footer: {
          copyright: "Copyright © 2011-{year} {appTitle} Inc.",
          trademark:
            "All trademarks or registered trademarks are property of their respective owners.",
        },
        categories: "Categories",
        socialMedia: "Social Media",
        address: "Address",
        phoneNumber: "Phone Number",
        copyRight: "©️pagedone 2024, All rights reserved.",
      },
      inputs: {
        boolean: [
          {
            text: "Yes",
            value: true,
          },
          {
            text: "No",
            value: false,
          },
        ],
        image: {
          imageAltValue: "uploaded",
          UrlPlaceholder: "Enter image URL",
          defaultImage:
            "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
        },
        base: {
          placeholder: "Enter ",
        },
      },
      loadData: {
        loading: "Loading",
      },
      login: {
        sign: "Sign In",
        username: "Username",
        password: "Password",
        loginText: "Login",
        logoutText: "Logout",
        switchText: "Switch Account",
        forgotPassword: "Forgot password",
        rememberMeEditorOptions: {
          text: "Remember me",
          elementAttr: {
            class: "form-text",
          },
        },
      },
      panelActions: {
        button: {
          search: "Search",
          clear: "Clear",
        },
      },
      popup: {
        cancelButton: "Cancel",
        submitButton: "Done",
      },
      restPassword: {
        title: "Reset Password",
        description:
          "Please enter the email address that you used to register, and we will send you a link to reset your password via Email.",
      },
      tableTransform: {
        textButtonSkipValue: "Skip",
        textButtonFinishValue: "Finish",
        textButtonNextValue: "Next",
        parameterFieldValue: "parameterField",
      },
      waringPop: {
        deleteConfirmation: "Are you sure you want to delete this item?",
        yes: "Yes, I'm sure",
        no: "No, cancel",
      },
      messages: {},
      dateTime: {
        dxDateBox: {
          months: [
            "يناير",
            "فبراير",
            "مارس",
            "أبريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
          ],
          days: [
            "الأحد",
            "الاثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
            "السبت",
          ],
          am: "ص",
          pm: "م",
        },
        applyButtonText: "تاكيد",
        cancelButtonText: "الغاء",
        todayButtonText: "اليوم",
      },
      table: {},
      header: {
        buttonText: "sign",
        buttonUrl: "#",
      },
      loading: {
        loading: "Loading...",
      },
      landing: {
        content: {
          title: "Hello World!",
          shortDescription: "We Are Kasper We Make Art.",
          longDescription:
            "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
        },
      },
      about: {
        companyInfo: {
          PageHeading: {
            title: "about company",
            subTitle: "Get in Touch",
            desc: "In hac habitasse platea dictumst",
          },
          ourAddress: "Our Address",
          contactText: "Contact",
          addressLine1: "1230 Maecenas Street Donec Road",
          addressLine2: "New York, EEUU",
          mobile: "Mobile: +1 (123) 456-7890",
          email: "Mail: tailnext@gmail.com",
          workingHours: "Working hours",
          weekdays: "Monday - Friday: 08:00 - 17:00",
          weekends: "Saturday & Sunday: 08:00 - 12:00",
          description:
            "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis nec ipsum orci. Ut",
        },
        staff: {
          meetThe: "Meet the",
          team: "team",
          avatarAlt: "Avatar",
          name: {
            martaSmith: "Marta Smith",
          },
          position: {
            frontendDeveloper: "Frontend Developer",
          },
        },
      },
      contact: {
        companyInfo: {
          PageHeading: {
            subTitle: "Contact Us",
            title: "We'd Love to Hear From You",
            desc: "Reach out to us for any inquiries or feedback.",
          },
        },
        support: {
          title: "Technical support",
          email: "support@example.com",
          phone: "+1 234-567-89",
        },
        sales: {
          title: "Sales questions",
          email: "sales@example.com",
          phone: "+1 234-567-89",
        },
        press: {
          title: "Press",
          email: "press@example.com",
          phone: "+1 234-567-89",
        },
        bugReport: {
          title: "Bug report",
          email: "bugs@example.com",
          phone: "+1 234-567-89",
        },
      },
      services: {
        PageHeading: {
          title: "Our Services",
          subTitle: "What We Offer",
          desc: "In hac habitasse platea dictumst",
        },
      },
      portfolio: {
        PageHeading: {
          title: "Our Services",
          subTitle: "What We Offer",
          desc: "In hac habitasse platea dictumst",
        },
        headerOfWorking: "Latest Products",
      },
      notFound: {
        error: "Error",
        codeError: "404",
        message: "Sorry, we couldn't find this page.",
        backToHome: "Back to home",
      },
      comingSoon: {
        title: "Coming Soon",
        message:
          "We're working hard to bring you something amazing. Stay tuned!",
      },
      routes: [
        {
          title: "Home",
          route: "/",
          id: 1,
        },
        {
          title: "Portfolio",
          route: "/portfolio",
          id: 2,
        },
        {
          title: "About us",
          route: "/about",
          id: 3,
        },
        {
          title: "Services",
          route: "/services",
          id: 4,
        },
        {
          title: "Contact us",
          route: "/contact",
          id: 5,
        },
      ],
      form: {
        name: "Name",
        namePlaceholder: "Enter your name",
        email: "Email",
        emailPlaceholder: "Enter your email address",
        message: "Message",
        send: "Send",
      },
      home: {
        mainContentTitle: "Main Content",
      },
    },
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (e) => {
    // Get the data of the clicked row
    setSelectedRow(e.data);
    console.log("Selected row data:", e.data);
  };

  const handleRowInserting = (e) => {
    console.log("New row data being added:", e);
    // You can set initial values for the new row if needed
    // e.data = { ...e.data, Full_Name: '', ... }
  };
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
  // Utility function to check if a node is a leaf
  // const isLeaf = (nodeId) => {
  //   return !employees.some((emp) => emp.Head_ID === nodeId);
  // };
  // function flattenData(data, parentId = null, idPrefix = "1") {
  //   let result = [];
  //   let index = 1;

  //   for (let key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       const isObject = typeof data[key] === "object" && data[key] !== null;

  //       const currentNode = {
  //         id: `${idPrefix}.${index}`,
  //         parentId: parentId,
  //         text: key,
  //         value: isObject ? "" : data[key], // Set value to empty string if it's an object
  //       };

  //       result.push(currentNode);

  //       // Recursively flatten children if the value is an object
  //       if (isObject) {
  //         result = result.concat(
  //           flattenData(data[key], currentNode.id, currentNode.id)
  //         );
  //       }

  //       index++;
  //     }
  //   }

  //   return result;
  // }

  // // Flatten the provided data
  // const flattenedData = flattenData(employees);
  const flattenData = (data, parentId = null, idPrefix = "1") => {
    let result = [];
    let index = 1;

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const isObject = typeof data[key] === "object" && data[key] !== null;

        const currentNode = {
          id: `${idPrefix}.${index}`,
          parentId: parentId,
          text: key,
          expanded: false, // Set expanded to false initially for all nodes
          value: isObject ? "" : data[key],
        };

        result.push(currentNode);

        // Recursively flatten children if the value is an object
        if (isObject) {
          result = result.concat(
            flattenData(data[key], currentNode.id, `${idPrefix}.${index}`),
          );
        }

        index++;
      }
    }

    return result;
  };
  const [data, setData] = useState(flattenData(initialData[0]));
  const handleRowUpdating = (e) => {
    // setData(flattenData(initialData));
    // console.log(e, data);
    const editedRowId = e.key;
    const parentRowId = e.oldData.parentId;

    // Find the parent row
    const parentRow = data.find((item) => item.id === parentRowId);

    console.log("Edited Row:", e.oldData);
    console.log("Parent Row:", parentRow);
  };

  const treeData = flattenData(initialData[0]);
  const mainSchema = testSchema?.find((item) => item.isMainSchema);
  const subSchemas = testSchema?.filter((item) => !item.isMainSchema);
  const schema = {
    dashboardFormSchemaID: "d4cf9cd7-0b06-4a56-a9cc-7b518f5455e7",
    schemaType: "Table",
    idField: "AssetID",
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
        parameterField: "AssetID",
        parameterTitel: "AssetID",
        parameterLookupTitel: null,
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
        parameterType: "installment",
        parameterField: "minAge",
        parameterTitel: "MinAge",
        parameterLookupTitel: null,
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 1,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
    ],
    projectProxyRoute: "BrandingMartAssets",
    isMainSchema: true,
    dataSourceName: "",
    propertyName: null,
    indexNumber: 0,
  };
  return (
    // <TreeList
    //   id="collapsible-treeview"
    //   idField="id"
    //   parentIdField="parentId"
    //   dataStructure="plain"
    //   dataSource={treeData}
    //   rootValue=""
    //   // height={500}
    //   items={treeData}
    //   displayExpr="text"
    //   parentIdExpr="parentId"
    //   keyExpr="id"
    //   onRowInserting={handleRowInserting}
    //   onRowUpdating={handleRowUpdating}
    //   columnAutoWidth={true}
    //   showRowLines={true}
    //   showBorders={true}
    // >
    //   <Scrolling mode="standard" />
    //   <Editing allowUpdating={(e) => e.row.data.value !== ""} mode="row" />
    //   <Column dataField="text" caption="Name" />
    //   <Column dataField="value" caption="Value" />
    // </TreeList>
    // <BarcodeInput
    //   value={{ fieldNameBarcode: "" }}
    //   enable={true}
    //   title={"enter barcode"}
    //   fieldName={"fieldNameBarcode"}
    //   type={""}
    //   placeholder="enter barcode"
    // />
    // <FormContainer
    //   errorResult={{}}
    //   returnRow={() => {}}
    //   row={{}}
    //   tableSchema={mainSchema}
    // />
    <SelectForm
      key={mainSchema.idField}
      schema={mainSchema}
      fieldName={"displayFile"}
      includeSchemas={[
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
              dashboardFormSchemaParameterID:
                "4460b03b-d440-45ff-8ce5-cd517376112c",
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
              dashboardFormSchemaParameterID:
                "6d9cb789-211a-44ce-ae7f-8a259d716e52",
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
      ]}
      parentSchemaParameters={mainSchema.dashboardFormSchemaParameters}
      row={{}}
      title={"test"}
      isSearchingTable={false}
      subSchemas={subSchemas}
    />
  );
};

export default Test;
