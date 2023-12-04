import { environment } from '../../environments/environment';

export function getAbsoluteUrl(relativeUrl: string) {
  const fullUrl = `${window.location.origin}/${environment.baseHref}/${relativeUrl}`;
  return fullUrl.replaceAll(/\/{2,}/g, '/');
}

export function addQueryParamToUrl(
  url: string,
  queryParamObj: Record<string, any>
) {
  const seperator = url.includes('?') ? '&' : '?';
  const urlSearchParams = new URLSearchParams(queryParamObj);
  return `${url}${seperator}${urlSearchParams.toString()}`;
}
