import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationResponse } from '../models/authentication.models';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {
  genericError = `Some Error occcured, Please contact Administrator for the Errors`;

  constructor(public http: HttpClient) { }

  // TODO find out how to make it generic, add logging and error handling
  get<T>(url: string, params?: {}){
    // withCredentials flag must be set here instead of just as a parameter since internally angular uses it before asigning it as a header
    return this.http.get<T>(url, { withCredentials: true, params: params });
  }

  // todo same for this
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
