export const generateUrl = (path: string) => {
  const baseUrl = process.env.BASE_API_URL;

  const cleanedBaseUrl = baseUrl!.replace(/\/+$/, "");
  const cleanedPath = path.replace(/^\/+/, "");

  return `${cleanedBaseUrl}/${cleanedPath}`;
};
