import { environment } from '../../environments/environment';

export function getAbsoluteUrl(relativeUrl: string) {
  const base = removeLeadingAndTrailingSlash(window.location.origin);
  const baseHref = removeLeadingAndTrailingSlash(environment.baseHref);
  const relative = removeLeadingAndTrailingSlash(relativeUrl);
  return `${base}/${baseHref}/${relative}`;
}

function removeLeadingAndTrailingSlash(s: string) {
  return s.replace(RegExp('^/'), '').replace(RegExp('/$'), '');
}

export function addQueryParamToUrl(
  url: string,
  queryParamObj: Record<string, any>
) {
  const seperator = url.includes('?') ? '&' : '?';
  const urlSearchParams = new URLSearchParams(queryParamObj);
  return `${url}${seperator}${urlSearchParams.toString()}`;
}
