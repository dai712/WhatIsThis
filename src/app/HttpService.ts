import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  checkUniqueId(id: string) {
    return this.http.post('/com/checkUnique', {content: id});
  }
  createAccount(contents: any) {
    return this.http.post('/com/NewAccount', {content: contents});
  }
  login(contents: any) {
    return this.http.post('/com/login', {content: contents});
  }
  saveSchedule(contents: any) {
    return this.http.post('/com/saveSchedule', {content: contents});
  }
  getAccount(contents: string) {
    return this.http.post('/com/getAccount', {content: contents});
  }
}
