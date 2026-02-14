// pages/api/fetch-og.js
import fetch from "node-fetch";
import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Helper function: parse basic OG tags from HTML
  const parseOG = (html) => {
    const getMeta = (name) => {
      const match = html.match(
        new RegExp(
          `<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']+)["']`,
          "i",
        ),
      );
      return match ? match[1] : null;
    };

    return {
      title: getMeta("og:title"),
      description: getMeta("og:description"),
      image: getMeta("og:image"),
    };
  };

  try {
    // Try normal fetch first with 5s timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    const html = await response.text();
    const ogData = parseOG(html);

    if (!ogData.title && !ogData.description && !ogData.image) {
      throw new Error("No OG data found, fallback to Microlink");
    }

    return res.status(200).json(ogData);
  } catch (err) {
    console.log("Primary fetch failed, using Microlink fallback:", err.message);

    try {
      const microlinkRes = await axios.get(
        `https://api.microlink.io?url=${encodeURIComponent(url)}`,
      );
      const data = microlinkRes.data.data;

      return res.status(200).json({
        title: data.title || null,
        description: data.description || null,
        image: data.image?.url || null,
      });
    } catch (fallbackErr) {
      console.error("Microlink fallback failed:", fallbackErr.message);
      return res.status(500).json({ error: "Failed to fetch preview" });
    }
  }
}
