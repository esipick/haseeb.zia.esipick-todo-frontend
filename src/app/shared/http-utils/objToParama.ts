import { HttpParams } from '@angular/common/http';

export function objToParams(obj: any): string {
  let params = new HttpParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined && value !== null && value !='') {
        params = params.set(key, value.toString());
      }
    }
  }
  return params.toString().length > 0 ?  '?'+params: '';
}