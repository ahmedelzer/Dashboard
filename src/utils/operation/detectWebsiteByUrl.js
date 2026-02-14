export function detectWebsiteByUrl(url, configDoc) {
  for (const [key, config] of Object.entries(configDoc)) {
    if (!config.detectWebsite) continue;

    const { matchType, patterns } = config.detectWebsite;
    if (!patterns || !patterns.length) continue;

    if (matchType === "regex") {
      const matched = patterns.some((pattern) => {
        const regex = new RegExp(pattern, "i");
        return regex.test(url);
      });

      if (matched) {
        return {
          websiteKey: key,
          config,
        };
      }
    }

    if (matchType === "contains") {
      const matched = patterns.some((p) => url.includes(p));
      if (matched) {
        return {
          websiteKey: key,
          config,
        };
      }
    }
  }

  return null;
}
