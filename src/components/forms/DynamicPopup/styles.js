export const stylesFile = {
  container:
    "my-1 p-1 border-2 border-[#d5e0d5] rounded-lg transition-all duration-300",
  headerContainer:
    "flex cursor-pointer container flex-row justify-between items-center",
  headerText: "font-bold text-[22px]",
  hoverEffect: "hover:border-black hover:border",
  formContainer: (open) => (open ? "w-full max-w-4xl m-auto" : "hidden"),
  buttonText: (Edit) =>
    `${Edit ? "inline" : "hidden"} color font-bold cursor-pointer`,
  toggleButton: "color font-bold px-2 cursor-pointer",
  formEditState: (Edit) => (Edit ? "cursor-auto" : "pointer-events-none"),
};
