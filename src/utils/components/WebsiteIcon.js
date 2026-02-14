import React from "react";

const WebsiteIcon = ({ url, size = 32, className = "" }) => {
  if (!url) return null;

  let domain = "";

  try {
    domain = new URL(url).hostname;
  } catch (error) {
    console.error("Invalid URL:", url);
    return null;
  }

  // Google favicon API (works for most websites)
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

  return (
    <img
      src={faviconUrl}
      alt={`${domain} icon`}
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: "6px" }}
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/32?text=🌐";
      }}
    />
  );
};

export default WebsiteIcon;
