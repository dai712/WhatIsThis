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

  changePfileAccess(contents: any) {
    return this.http.post('/com/changePfileAccess', {content: contents});
  }
  addTask(Task: any) {
    return this.http.post('/com/addTask', {content: Task});
  }
  getAllTask(gid: any) {
    return this.http.post('com/allTask', {content: gid});
  }
  deleteTask(Task: any) {
    return this.http.post('com/deleteTask', {content: Task});
  }
  changeTask(Task: any) {
    return this.http.post('com/changeTask', {content: Task});
  }
  changeNickname(contents: any) {
    return this.http.post('/com/changeNickname', {content: contents});
  }
  getAllUsers() {
    return this.http.get('/com/getAllUsers');
  }
  getGroupDetail(contents: any) {
    return this.http.post('/com/getGroupDetail', {content: contents});
  }
  catUserFiles(contents: any) {
    return this.http.post('/com/catUserFiles', {content: contents});
  }
  createGFiles(contents: any) {
    return this.http.post('/com/createGFiles', {content: contents});
  }
  deleteGFiles(contents: any) {
    return this.http.post('/com/removeGFiles', {content: contents});
  }


  createDoc(contents: any) {
    return this.http.post('/com/createDoc', {content: contents});
  }
  getDoc(contents: any) {
    return this.http.post('/com/getDoc', {content: contents});
  }
  changeDoc(contents: any) {
    return this.http.post('/com/changeDoc', {content: contents});
  }
  deleteDoc(contents: any) {
    return this.http.post('/com/deleteDoc', {content: contents});
  }
  saveDoc(contents: any) {
    return this.http.post('/com/saveDoc', {content: contents});
  }
}
