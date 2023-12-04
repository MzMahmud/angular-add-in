import { environment } from '../../environments/environment';

export function getAbsoluteUrl(relativeUrl: string) {
  const baseUrl = window.location.origin + environment.baseHref;
  return new URL(relativeUrl, baseUrl).toString();
}

export function addQueryParamToUrl(
  url: string,
  queryParamObj: Record<string, any>
) {
  const seperator = url.includes('?') ? '&' : '?';
  const urlSearchParams = new URLSearchParams(queryParamObj);
  return `${url}${seperator}${urlSearchParams.toString()}`;
}
