export default function convertImageToBase64(imageSource) {
  return new Promise((resolve, reject) => {
    if (typeof imageSource === "string") {
      if (imageSource.startsWith("blob:")) {
        // Handle blob URL
        fetch(imageSource)
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
              const base64Data = reader.result;
              const [, base64String] = base64Data.split(";base64,");
              resolve(base64String); // Resolve the base64 string
            };
            reader.onerror = (error) => reject(error); // Reject on error
          })
          .catch((error) => reject(error)); // Reject on fetch error
      } else {
        // Handle regular URLs
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = imageSource;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const base64Data = canvas.toDataURL("image/jpeg");
          const [, base64String] = base64Data.split(";base64,");
          resolve(base64String); // Resolve the base64 string
        };
        image.onerror = (error) =>
          reject("Error loading image from URL: " + error);
      }
    } else {
      reject("Invalid image source"); // Reject if input is not a valid string
    }
  });
}
