import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../contexts/Language";
import { baseURL } from "../../request";
import TypeFile from "../../components/forms/PartingFrom/TypeFile";
import { getUrlType } from "../operation/getUrlType";
import WebsiteIcon from "./WebsiteIcon";

const DisplayIframe = ({ url, width = "100%" }) => {
  const { localization, Right } = useContext(LanguageContext);

  const [ogData, setOgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const getDomain = (link) => {
    try {
      return new URL(link).hostname.replace("www.", "");
    } catch {
      return "";
    }
  };

  useEffect(() => {
    if (!url || !isValidUrl(url)) return;

    const fetchOgData = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${baseURL}/i-marketer1/Scraping/fetch-og?uri=${encodeURIComponent(
            url,
          )}`,
        );

        if (!res.ok) throw new Error("Failed to fetch OG data");

        const data = await res.json();
        setOgData(data);
      } catch (err) {
        console.error(err);
        setError(
          localization.inputs.linkView.invalidURL || "Failed to fetch preview",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOgData();
  }, [url, localization.inputs.linkView.invalidURL]);

  if (!url || !isValidUrl(url)) {
    return (
      <div
        style={{
          width,
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <p style={{ margin: 0 }}>{localization.inputs.linkView.invalidURL}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          width,
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <p style={{ margin: 0 }}>Loading preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width,
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <p style={{ margin: 0 }}>{error}</p>
      </div>
    );
  }

  if (!ogData) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width,
        display: "block",
        textDecoration: "none",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* Preview Media */}
      {ogData.media && (
        <div
          style={{
            width: "100%",
            height: "150px",
            position: "relative", // make container relative
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* Website Icon */}
          <div
            style={{
              position: "absolute",
              top: "8px",
              [Right ? "right" : "left"]: "8px",
              zIndex: 2,
            }}
          >
            <WebsiteIcon url={url} size={32} />
          </div>

          {/* Media Preview */}
          <div style={{ width: "100%", height: "100%", zIndex: 1 }}>
            <TypeFile
              file={ogData.media}
              title={ogData.title}
              type={getUrlType(ogData.media)}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div
        style={{
          padding: "12px",
          backgroundColor: "#fff",
          position: "relative",
          zIndex: 3,
        }}
        className="bg-opacity-50"
      >
        <p
          style={{
            margin: "0 0 6px",
            fontSize: "12px",
            color: "#777",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          {getDomain(url)}
        </p>

        <h4
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: "700",
            color: "#111",
            lineHeight: "1.4",
          }}
        >
          {ogData.title || "No title"}
        </h4>

        <p
          style={{
            margin: "6px 0 0",
            fontSize: "13px",
            color: "#555",
            lineHeight: "1.4",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {ogData.description || "No description"}
        </p>
      </div>
    </a>
  );
};

export default DisplayIframe;
