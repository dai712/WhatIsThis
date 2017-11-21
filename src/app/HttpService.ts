import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  creNew(contents: any) {
    return this.http.post('/com/createNewId', {content: contents});
  }
  getList() {
    return this.http.get('./com/getAllMemos');
  }
  checkUniqueId(id: string) {
    return this.http.post('/com/checkUnique', {content: id});
  }
  createAccount(contents: any) {
    return this.http.post('/com/NewAccount', {content: contents});
  }
  login(contents: any) {
    return this.http.post('/com/login', {content: contents});
  }
}
