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
  login() {
    return this.http.get('/com/login');
  }
  saveSchedule(contents: any) {
    return this.http.post('/com/saveSchedule', {content: contents});
  }
  getAccount(contents: string) {
    return this.http.post('/com/getAccount', {content: contents});
  }
  createGroup(contents: any) {
    return this.http.post('/com/createGroup', {content: contents});
  }
  searchAllGroups() {
    return this.http.get('/com/searchAllGroup');
  }
  joinGroup(contents: any) {
    return this.http.post('/com/joinGroup', {content: contents});
  }
  withdrawGroup(contents: any) {
    return this.http.post('/com/withdrawGroup', {content: contents});
  }
  removeGroup(contents: any) {
    return this.http.post('/com/removeGroup', {content: contents});
  }
  te(contents: any) {
    return this.http.post('/com/fileupload', {content: contents});
  }
  createPfile(contents: any) {
    return this.http.post('/com/createPfile', {content: contents});
  }
  deletePfile(contents: any) {
    return this.http.post('/com/deletePfile', {content: contents});
  }
  getPfileAccess(contents: any) {
    return this.http.post('/com/getAccess', {content: contents});
  }
  changePfileAccess(contents: any){
    return this.http.post('/com/changePfileAccess', {content: contents});
  }
}
