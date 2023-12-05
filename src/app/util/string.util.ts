import { environment } from '../../environments/environment';

export function getAbsoluteUrl(relativeUrl: string) {
  return urlPathJoin(window.location.origin, environment.baseHref, relativeUrl);
}

function removeLeadingAndTrailingSlash(s: string) {
  return s.replace(RegExp('^/'), '').replace(RegExp('/$'), '');
}

function urlPathJoin(...paths: string[]) {
  return paths
    .map(removeLeadingAndTrailingSlash)
    .filter((part) => part.length > 0)
    .join('/');
}

export function addQueryParamToUrl(
  url: string,
  queryParamObj: Record<string, any>
) {
  const seperator = url.includes('?') ? '&' : '?';
  const urlSearchParams = new URLSearchParams(queryParamObj);
  return `${url}${seperator}${urlSearchParams.toString()}`;
}
