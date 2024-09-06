export function ExtractIDFromPath(path) {
  // Remove leading and trailing slashes, if any
  const trimmedPath = path.replace(/^\/|\/$/g, "");

  // Split the path into segments
  const segments = trimmedPath.split("/");

  // The last segment is the ID
  const id = segments[segments.length - 1];

  return id;
}
