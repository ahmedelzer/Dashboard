export const styles = {
  container:
    "flex justify-around p-4 space-x-4 items-center lg:items-start flex-col lg:flex-row",
  tableContainer: "w-full lg:w-[calc(50%-50px)] p-4 border rounded",
  buttonContainer:
    "flex flex-row lg:!flex-col justify-between lg:!justify-center items-center lg:space-y-4 w-[100px] my-2 lg:!my-0 self-center",
  button: "px-2 py-4 lg:!px-4 lg:!py-2 bg text-white rounded-full",
  smallScreenIcon: "lg:hidden",
  largeScreenIcon: "hidden lg:block",
};
// styles.js

export const stylesFile = {
  container: "p-4",
  gridContainer:
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
  fileItem: "relative border p-2 rounded",
  validFile: "relative border-1 p-2 rounded border-color",
  fileControls: "flex justify-between items-center",
  deleteIcon: "cursor-pointer text-red-500",
  pagination: "flex justify-center mt-4",
  paginationButton: "px-4 py-2 border rounded",
  hiddenInput: "hidden",
  label: "cursor-pointer w-[100%]",
  fileListContainer: "flex overflow-x-auto whitespace-nowrap gap-4 py-2 mb-4",
  fileScroll: "inline-block w-1/2 min-w-[200px] border p-2 rounded",
  parentFileContainer: "border rounded mb-2",
  buttonsContainer: "flex justify-end my-2",
};

export const stylesWaringPop = {
  modalContainer: "border rounded-lg shadow relative",
  closeButtonContainer: "flex justify-end p-2",
  closeButton:
    "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center",
  icon: "w-5 h-5",
  contentContainer: "p-6 pt-0 text-center",
  warningIcon: "w-20 h-20 text-red-600 mx-auto",
  messageText: "font-normal text-gray-500 mt-5 mb-6",
  confirmButton:
    "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2",
  cancelButton:
    "text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center",
};
export const panelActionsStyle = {
  containerWithButton: "w-full relative mt-12",
  buttonContainer: "flex justify-end items-center absolute bottom-0 right-0",
  button: "pop mr-2",
};
export const buttonContainerStyle = {
  container: "flex justify-end",
  button: "pop mx-2", // Apply shared styles for buttons
  lastButton: "pop", // Specific styles for the last button (if different)
};
