export default function convertImageToBase64(imageSource) {
  if (typeof imageSource === "string") {
    if (imageSource.startsWith("data:image/jpeg;base64,")) {
      // If the imageSource is already a base64 string
      const base64String = imageSource.split(",")[1];
      return base64String;
    } else if (typeof imageSource === "blob") {
      // If the imageSource is a blob URL
      fetch(imageSource)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64Data = reader.result;
            const [, base64String] = base64Data.split(";base64,");
            return base64String;
          };
        })
        .catch((error) => console.error("Error fetching blob:", error));
    } else {
      // Assume it's a regular URL
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = new Image();
      image.crossOrigin = "Anonymous"; // Needed for cross-origin images
      image.src = imageSource;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const base64Data = canvas.toDataURL("image/jpeg");
        const [, base64String] = base64Data.split(";base64,");
        return base64String;
      };
      image.onerror = () =>
        console.error("Error loading image from URL:", imageSource);
    }
  } else if (imageSource instanceof File) {
    // If the imageSource is a File, assume it's a file input and read the file
    const reader = new FileReader();
    reader.readAsDataURL(imageSource);
    reader.onload = () => {
      const base64Data = reader.result;
      const [, base64String] = base64Data.split(";base64,");
      return base64String;
    };
    reader.onerror = () => console.error("Error reading file as base64");
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(imageSource);
    reader.onload = () => {
      const base64Data = reader.result;
      const [, base64String] = base64Data.split(";base64,");
      return base64String;
    };
  }
}
