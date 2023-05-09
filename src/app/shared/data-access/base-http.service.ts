import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {
  genericError = `Some Error occcured, Please contact Administrator for the Errors`;

  constructor(public http: HttpClient) { }

  get<T>(url: string, params?: {}){
    return this.http.get<T>(url, { withCredentials: true, params: params });
  }

  post<T>(url: string, data: any) {
    return this.http.post<T>(url, data, { withCredentials: true });
  }

  put<T>(url: string, data: any) {
    return this.http.put<T>(url, data, { withCredentials: true });
  }

  delete<T>(url: string, params: any) {
    return this.http.delete<T>(url, { withCredentials: true, params: params });
  }
}
