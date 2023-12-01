export function getAbsoluteUrl(relativeUrl: string) {
  const baseUrl = window.location.origin;
  return new URL(relativeUrl, baseUrl).toString();
}
