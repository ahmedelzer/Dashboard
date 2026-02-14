export const cleanUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  return url.split("?")[0].split("#")[0];
};

export const getExtensionFromUrl = (url) => {
  const cleaned = cleanUrl(url);
  if (!cleaned) return "";

  const parts = cleaned.split(".");
  if (parts.length < 2) return "";

  return parts.pop().toLowerCase();
};

export const getUrlType = (url) => {
  if (!url) return "unknown";

  const ext = getExtensionFromUrl(url);

  const imageExt = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"];
  const videoExt = ["mp4", "webm", "ogg", "mov", "mkv"];
  const audioExt = ["mp3", "wav", "aac", "flac", "m4a"];
  const docExt = ["pdf"];

  if (imageExt.includes(ext)) return "image";
  if (videoExt.includes(ext)) return "video";
  if (audioExt.includes(ext)) return "audio";
  if (docExt.includes(ext)) return "pdf";

  // fallback detection (for URLs without extensions)
  const lowered = url.toLowerCase();

  if (lowered.includes("youtube.com") || lowered.includes("youtu.be"))
    return "youtube";

  if (lowered.includes("vimeo.com")) return "vimeo";

  return "unknown";
};
