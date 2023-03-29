import { ActivatedRouteSnapshot, ParamMap } from '@angular/router';

export const extractParams = (
  route: ActivatedRouteSnapshot,
  params: Map<string, string> = new Map<string, string>()
): Map<string, string> => {
  if (route.paramMap) {
    addParamMap(params, route.paramMap);
  } else {
    addParams(params, route.params);
  }
  for (const child of route.children) {
    extractParams(child, params);
  }
  return params;
};

export const addParams = (
  params: Map<string, string>,
  values: { [index: string]: string }
): Map<string, string> => {
  if (values) {
    for (const key of Object.keys(values)) {
      params.set(key, values[key]);
    }
  }
  return params;
};

export const addParamMap = (
  params: Map<string, string>,
  values: ParamMap
): Map<string, string> => {
  if (values) {
    for (const key of values.keys) {
      params.set(key, values.get(key));
    }
  }
  return params;
};
