// import React from "react";
// import {
//   TreeList,
//   RemoteOperations,
//   Column,
//   Editing,
//   Button,
// } from "devextreme-react/tree-list";
// import "whatwg-fetch";

// const dataSource = {
//   async load(loadOptions) {
//     const parentIdsParam = loadOptions.parentIds;
//     console.log(loadOptions);

//     const url = new URL("https://js.devexpress.com/Demos/Mvc/api/treeListData");
//     if (parentIdsParam) {
//       parentIdsParam.forEach((id) => {
//         url.searchParams.append("parentIds", id);
//       });
//     }
//     const result = await fetch(url.toString());
//     if (result.status === 200) {
//       return result.json();
//     }
//     throw new Error("Data Loading Error");
//   },
// };
// const customizeText = (e) => {
//   if (e.value !== null) {
//     return `${Math.ceil(e.value / 1024)} KB`;
//   }
//   return null;
// };
// const allowDeleting = (e) => e.row.data.ID !== 1;
// const onEditorPreparing = (e) => {
//   // if (e.dataField === "Head_ID" && e.row.data.ID === 1) {
//   //   e.editorOptions.disabled = true;
//   //   e.editorOptions.value = null;
//   // }
// };
// const onInitNewRow = (e) => {
//   console.log(e);

//   e.data.Head_ID = 1;
// };
// const popupOptions = {
//   title: "Employee Info",
//   showTitle: true,
//   // width: 700,
// };
// const Test = () => (
//   <TreeList
//     id="treelist"
//     dataSource={dataSource}
//     showBorders={true}
//     keyExpr="id"
//     parentIdExpr="parentId"
//     hasItemsExpr="hasItems"
//     // columns={[{dataField:}]}
//     columnAutoWidth={true}
//     showRowLines={true}
//     rootValue=""
//     onEditorPreparing={onEditorPreparing}
//     onInitNewRow={onInitNewRow}
//   >
//     <RemoteOperations filtering={true} />
//     {/* <Editing
//       mode="row"
//       allowAdding={true}
//       allowUpdating={true}
//       allowDeleting={true}
//     /> */}
//     <Editing
//       allowUpdating={true}
//       allowDeleting={allowDeleting}
//       allowAdding={true}
//       popup={popupOptions}
//       mode="popup"
//     />
//     <Column dataField="name" />
//     <Column width={100} customizeText={customizeText} dataField="size" />
//     <Column width={150} dataField="createdDate" dataType="date" />
//     <Column width={150} dataField="modifiedDate" dataType="date" />
//     <Column type="buttons">
//       <Button name="edit" />
//       <Button name="delete" />
//     </Column>
//   </TreeList>
// );
// export default Test;
//todo how to handle treeList
//1- make popup display with formContainer and take the row when popup submitting made as in table
import React, { useState } from "react";
import {
  TreeList,
  Editing,
  Column,
  ValidationRule,
  Lookup,
  Button,
} from "devextreme-react/tree-list";
// export const employees = [
//   {
//     ID: 1,
//     Head_ID: 0,
//     Full_Name: "John Heart",
//     Prefix: "Mr.",
//     Title: "CEO",
//     City: "Los Angeles",
//     State: "California",
//     Email: "jheart@dx-email.com",
//     Skype: "jheart_DX_skype",
//     Mobile_Phone: "(213) 555-9392",
//     Birth_Date: "1964-03-16",
//     Hire_Date: "1995-01-15",
//   },
//   {
//     ID: 2,
//     Head_ID: 1,
//     Full_Name: "Samantha Bright",
//     Prefix: "Dr.",
//     Title: "COO",
//     City: "Los Angeles",
//     State: "California",
//     Email: "samanthab@dx-email.com",
//     Skype: "samanthab_DX_skype",
//     Mobile_Phone: "(213) 555-2858",
//     Birth_Date: "1966-05-02",
//     Hire_Date: "2004-05-24",
//   },
//   {
//     ID: 3,
//     Head_ID: 1,
//     Full_Name: "Arthur Miller",
//     Prefix: "Mr.",
//     Title: "CTO",
//     City: "Denver",
//     State: "Colorado",
//     Email: "arthurm@dx-email.com",
//     Skype: "arthurm_DX_skype",
//     Mobile_Phone: "(310) 555-8583",
//     Birth_Date: "1972-07-11",
//     Hire_Date: "2007-12-18",
//   },
//   {
//     ID: 4,
//     Head_ID: 1,
//     Full_Name: "Robert Reagan",
//     Prefix: "Mr.",
//     Title: "CMO",
//     City: "Bentonville",
//     State: "Arkansas",
//     Email: "robertr@dx-email.com",
//     Skype: "robertr_DX_skype",
//     Mobile_Phone: "(818) 555-2387",
//     Birth_Date: "1974-09-07",
//     Hire_Date: "2002-11-08",
//   },
//   {
//     ID: 5,
//     Head_ID: 1,
//     Full_Name: "Greta Sims",
//     Prefix: "Ms.",
//     Title: "HR Manager",
//     City: "Atlanta",
//     State: "Georgia",
//     Email: "gretas@dx-email.com",
//     Skype: "gretas_DX_skype",
//     Mobile_Phone: "(818) 555-6546",
//     Birth_Date: "1977-11-22",
//     Hire_Date: "1998-04-23",
//   },
//   {
//     ID: 6,
//     Head_ID: 3,
//     Full_Name: "Brett Wade",
//     Prefix: "Mr.",
//     Title: "IT Manager",
//     City: "Reno",
//     State: "Nevada",
//     Email: "brettw@dx-email.com",
//     Skype: "brettw_DX_skype",
//     Mobile_Phone: "(626) 555-0358",
//     Birth_Date: "1968-12-01",
//     Hire_Date: "2009-03-06",
//   },
//   {
//     ID: 7,
//     Head_ID: 5,
//     Full_Name: "Sandra Johnson",
//     Prefix: "Mrs.",
//     Title: "Controller",
//     City: "Beaver",
//     State: "Utah",
//     Email: "sandraj@dx-email.com",
//     Skype: "sandraj_DX_skype",
//     Mobile_Phone: "(562) 555-2082",
//     Birth_Date: "1974-11-15",
//     Hire_Date: "2005-05-11",
//   },
//   {
//     ID: 8,
//     Head_ID: 4,
//     Full_Name: "Ed Holmes",
//     Prefix: "Dr.",
//     Title: "Sales Manager",
//     City: "Malibu",
//     State: "California",
//     Email: "edwardh@dx-email.com",
//     Skype: "edwardh_DX_skype",
//     Mobile_Phone: "(310) 555-1288",
//     Birth_Date: "1973-07-14",
//     Hire_Date: "2005-06-19",
//   },
//   {
//     ID: 9,
//     Head_ID: 3,
//     Full_Name: "Barb Banks",
//     Prefix: "Mrs.",
//     Title: "Support Manager",
//     City: "Phoenix",
//     State: "Arizona",
//     Email: "barbarab@dx-email.com",
//     Skype: "barbarab_DX_skype",
//     Mobile_Phone: "(310) 555-3355",
//     Birth_Date: "1979-04-14",
//     Hire_Date: "2002-08-07",
//   },
//   {
//     ID: 10,
//     Head_ID: 2,
//     Full_Name: "Kevin Carter",
//     Prefix: "Mr.",
//     Title: "Shipping Manager",
//     City: "San Diego",
//     State: "California",
//     Email: "kevinc@dx-email.com",
//     Skype: "kevinc_DX_skype",
//     Mobile_Phone: "(213) 555-2840",
//     Birth_Date: "1978-01-09",
//     Hire_Date: "2009-08-11",
//   },
//   {
//     ID: 11,
//     Head_ID: 5,
//     Full_Name: "Cindy Stanwick",
//     Prefix: "Ms.",
//     Title: "HR Assistant",
//     City: "Little Rock",
//     State: "Arkansas",
//     Email: "cindys@dx-email.com",
//     Skype: "cindys_DX_skype",
//     Mobile_Phone: "(818) 555-6655",
//     Birth_Date: "1985-06-05",
//     Hire_Date: "2008-03-24",
//   },
//   {
//     ID: 12,
//     Head_ID: 8,
//     Full_Name: "Sammy Hill",
//     Prefix: "Mr.",
//     Title: "Sales Assistant",
//     City: "Pasadena",
//     State: "California",
//     Email: "sammyh@dx-email.com",
//     Skype: "sammyh_DX_skype",
//     Mobile_Phone: "(626) 555-7292",
//     Birth_Date: "1984-02-17",
//     Hire_Date: "2012-02-01",
//   },
//   {
//     ID: 13,
//     Head_ID: 10,
//     Full_Name: "Davey Jones",
//     Prefix: "Mr.",
//     Title: "Shipping Assistant",
//     City: "Pasadena",
//     State: "California",
//     Email: "davidj@dx-email.com",
//     Skype: "davidj_DX_skype",
//     Mobile_Phone: "(626) 555-0281",
//     Birth_Date: "1983-03-06",
//     Hire_Date: "2011-04-24",
//   },
//   {
//     ID: 14,
//     Head_ID: 10,
//     Full_Name: "Victor Norris",
//     Prefix: "Mr.",
//     Title: "Shipping Assistant",
//     City: "Little Rock",
//     State: "Arkansas",
//     Email: "victorn@dx-email.com",
//     Skype: "victorn_DX_skype",
//     Mobile_Phone: "(213) 555-9278",
//     Birth_Date: "1986-07-23",
//     Hire_Date: "2012-07-23",
//   },
//   {
//     ID: 15,
//     Head_ID: 10,
//     Full_Name: "Mary Stern",
//     Prefix: "Ms.",
//     Title: "Shipping Assistant",
//     City: "Beaver",
//     State: "Utah",
//     Email: "marys@dx-email.com",
//     Skype: "marys_DX_skype",
//     Mobile_Phone: "(818) 555-7857",
//     Birth_Date: "1982-04-08",
//     Hire_Date: "2012-08-12",
//   },
//   {
//     ID: 16,
//     Head_ID: 10,
//     Full_Name: "Robin Cosworth",
//     Prefix: "Mrs.",
//     Title: "Shipping Assistant",
//     City: "Los Angeles",
//     State: "California",
//     Email: "robinc@dx-email.com",
//     Skype: "robinc_DX_skype",
//     Mobile_Phone: "(818) 555-0942",
//     Birth_Date: "1981-06-12",
//     Hire_Date: "2012-09-01",
//   },
//   {
//     ID: 17,
//     Head_ID: 9,
//     Full_Name: "Kelly Rodriguez",
//     Prefix: "Ms.",
//     Title: "Support Assistant",
//     City: "Boise",
//     State: "Idaho",
//     Email: "kellyr@dx-email.com",
//     Skype: "kellyr_DX_skype",
//     Mobile_Phone: "(818) 555-9248",
//     Birth_Date: "1988-05-11",
//     Hire_Date: "2012-10-13",
//   },
//   {
//     ID: 18,
//     Head_ID: 9,
//     Full_Name: "James Anderson",
//     Prefix: "Mr.",
//     Title: "Support Assistant",
//     City: "Atlanta",
//     State: "Georgia",
//     Email: "jamesa@dx-email.com",
//     Skype: "jamesa_DX_skype",
//     Mobile_Phone: "(323) 555-4702",
//     Birth_Date: "1987-01-29",
//     Hire_Date: "2012-10-18",
//   },
//   {
//     ID: 19,
//     Head_ID: 9,
//     Full_Name: "Antony Remmen",
//     Prefix: "Mr.",
//     Title: "Support Assistant",
//     City: "Boise",
//     State: "Idaho",
//     Email: "anthonyr@dx-email.com",
//     Skype: "anthonyr_DX_skype",
//     Mobile_Phone: "(310) 555-6625",
//     Birth_Date: "1986-02-19",
//     Hire_Date: "2013-01-19",
//   },
//   {
//     ID: 20,
//     Head_ID: 8,
//     Full_Name: "Olivia Peyton",
//     Prefix: "Mrs.",
//     Title: "Sales Assistant",
//     City: "Atlanta",
//     State: "Georgia",
//     Email: "oliviap@dx-email.com",
//     Skype: "oliviap_DX_skype",
//     Mobile_Phone: "(310) 555-2728",
//     Birth_Date: "1981-06-03",
//     Hire_Date: "2012-05-14",
//   },
//   {
//     ID: 21,
//     Head_ID: 6,
//     Full_Name: "Taylor Riley",
//     Prefix: "Mr.",
//     Title: "Network Admin",
//     City: "San Jose",
//     State: "California",
//     Email: "taylorr@dx-email.com",
//     Skype: "taylorr_DX_skype",
//     Mobile_Phone: "(310) 555-7276",
//     Birth_Date: "1982-08-14",
//     Hire_Date: "2012-04-14",
//   },
//   {
//     ID: 22,
//     Head_ID: 6,
//     Full_Name: "Amelia Harper",
//     Prefix: "Mrs.",
//     Title: "Network Admin",
//     City: "Los Angeles",
//     State: "California",
//     Email: "ameliah@dx-email.com",
//     Skype: "ameliah_DX_skype",
//     Mobile_Phone: "(213) 555-4276",
//     Birth_Date: "1983-11-19",
//     Hire_Date: "2011-02-10",
//   },
//   {
//     ID: 23,
//     Head_ID: 6,
//     Full_Name: "Wally Hobbs",
//     Prefix: "Mr.",
//     Title: "Programmer",
//     City: "Chatsworth",
//     State: "California",
//     Email: "wallyh@dx-email.com",
//     Skype: "wallyh_DX_skype",
//     Mobile_Phone: "(818) 555-8872",
//     Birth_Date: "1984-12-24",
//     Hire_Date: "2011-02-17",
//   },
//   {
//     ID: 24,
//     Head_ID: 6,
//     Full_Name: "Brad Jameson",
//     Prefix: "Mr.",
//     Title: "Programmer",
//     City: "San Fernando",
//     State: "California",
//     Email: "bradleyj@dx-email.com",
//     Skype: "bradleyj_DX_skype",
//     Mobile_Phone: "(818) 555-4646",
//     Birth_Date: "1988-10-12",
//     Hire_Date: "2011-03-02",
//   },
//   {
//     ID: 25,
//     Head_ID: 6,
//     Full_Name: "Karen Goodson",
//     Prefix: "Miss",
//     Title: "Programmer",
//     City: "South Pasadena",
//     State: "California",
//     Email: "kareng@dx-email.com",
//     Skype: "kareng_DX_skype",
//     Mobile_Phone: "(626) 555-0908",
//     Birth_Date: "1987-04-26",
//     Hire_Date: "2011-03-14",
//   },
//   {
//     ID: 26,
//     Head_ID: 5,
//     Full_Name: "Marcus Orbison",
//     Prefix: "Mr.",
//     Title: "Travel Coordinator",
//     City: "Los Angeles",
//     State: "California",
//     Email: "marcuso@dx-email.com",
//     Skype: "marcuso_DX_skype",
//     Mobile_Phone: "(213) 555-7098",
//     Birth_Date: "1982-03-02",
//     Hire_Date: "2005-05-19",
//   },
//   {
//     ID: 27,
//     Head_ID: 5,
//     Full_Name: "Sandy Bright",
//     Prefix: "Ms.",
//     Title: "Benefits Coordinator",
//     City: "Denver",
//     State: "Colorado",
//     Email: "sandrab@dx-email.com",
//     Skype: "sandrab_DX_skype",
//     Mobile_Phone: "(818) 555-0524",
//     Birth_Date: "1983-09-11",
//     Hire_Date: "2005-06-04",
//   },
//   {
//     ID: 28,
//     Head_ID: 6,
//     Full_Name: "Morgan Kennedy",
//     Prefix: "Mrs.",
//     Title: "Graphic Designer",
//     City: "San Fernando Valley",
//     State: "California",
//     Email: "morgank@dx-email.com",
//     Skype: "morgank_DX_skype",
//     Mobile_Phone: "(818) 555-8238",
//     Birth_Date: "1984-07-17",
//     Hire_Date: "2012-01-11",
//   },
//   {
//     ID: 29,
//     Head_ID: 28,
//     Full_Name: "Violet Bailey",
//     Prefix: "Ms.",
//     Title: "Jr Graphic Designer",
//     City: "La Canada",
//     State: "California",
//     Email: "violetb@dx-email.com",
//     Skype: "violetb_DX_skype",
//     Mobile_Phone: "(818) 555-2478",
//     Birth_Date: "1985-06-10",
//     Hire_Date: "2012-01-19",
//   },
//   {
//     ID: 30,
//     Head_ID: 5,
//     Full_Name: "Ken Samuelson",
//     Prefix: "Dr.",
//     Title: "Ombudsman",
//     City: "St. Louis",
//     State: "Missouri",
//     Email: "kents@dx-email.com",
//     Skype: "kents_DX_skype",
//     Mobile_Phone: "(562) 555-9282",
//     Birth_Date: "1972-09-11",
//     Hire_Date: "2009-04-22",
//   },
// ];
const BaseTree = () => {
  const employees = [
    // { ID: 1, Name: "CEO", Head_ID: null },
    // { ID: 2, Name: "Manager A", Head_ID: 1 },
    // { ID: 3, Name: "Manager B", Head_ID: 1 },
    // { ID: 4, Name: "Employee A1", Head_ID: 2 },
    // { ID: 5, Name: "Employee A2", Head_ID: 2 },
    // { ID: 6, Name: "Employee B1", Head_ID: 3 },
    // { ID: 7, Name: "Employee B2", Head_ID: 3 },
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

  return (
    <TreeList
      dataSource={employees}
      onRowClick={handleRowClick}
      onRowInserting={handleRowInserting}
      onRowUpdating={handleRowInserting}
      id="employees"
      columnAutoWidth={true}
      showRowLines={true}
      showBorders={true}
      defaultExpandedRowKeys={[1, 2]}
      keyExpr="ID"
      parentIdExpr="Head_ID"
    >
      <Editing allowUpdating allowAdding allowDeleting mode="popup" />
      {/* <Column dataField="Full_Name" /> */}
      {/* <Column dataField="Name" /> */}
      {/* <Column dataField="City" /> */}
      {/* Add other columns as needed */}
    </TreeList>
  );
};
export default BaseTree;
