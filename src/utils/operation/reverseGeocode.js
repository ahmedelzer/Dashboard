/**
 * Performs reverse geocoding using OpenStreetMap (Nominatim API)
 * Works for all platforms: Web, iOS, Android (Expo / React Native)
 */
export async function reverseGeocode(lat, lng) {
  try {
    // OpenStreetMap Nominatim endpoint
    const endpoint = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    // ✅ Use fetch for all platforms (Expo supports it natively)
    const response = await fetch(endpoint, {
      headers: {
        "User-Agent": "YourAppName/1.0 (expo)",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Reverse geocode failed: ${response.status}`);
    }

    const data = await response.json();
    const address = data?.address || {};

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.county ||
      address.state ||
      "";

    const country = address.country || "";
    const countryIsoCode = address.country_code
      ? address.country_code.toUpperCase()
      : "";

    return {
      city,
      country,
      countryIsoCode,
      fullAddress: data?.display_name || "",
      raw: data, // optional (for debugging)
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error);

    return {
      city: "",
      country: "",
      countryIsoCode: "",
      fullAddress: "",
      raw: null,
    };
  }
}
