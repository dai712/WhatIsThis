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
}
