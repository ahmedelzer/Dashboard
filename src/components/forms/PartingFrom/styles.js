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
  validFile: "relative border-2 p-2 rounded !border-green-500", // Add this style for valid files
  fileControls: "flex justify-between items-center",
  deleteIcon: "cursor-pointer text-red-500",
  pagination: "flex justify-center mt-4",
  paginationButton: "px-4 py-2 border rounded",
  hiddenInput: "hidden",
  label: "cursor-pointer w-[100%]",
};
