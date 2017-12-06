import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from '../HttpService';
import {IdForm} from '../IdForm';
import {HttpClient} from "@angular/common/http";
import * as io from 'socket.io-client';

@Component({
  selector: 'app-login',
  templateUrl: './Login.html',
  styleUrls: ['./Login.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean;
  isJoin: boolean;
  isIdChecked: boolean;
  createID: IdForm;
  currentAccount: any;  // 접속중인 account
  newAccount: IdForm;
  private socket = io();
  @Output() notifytoApp = new EventEmitter<any>();
  constructor(public http: HttpClient,
              private httpService: HttpService) {}
  ngOnInit() {
    this.isLogin = false;
    this.createID = new IdForm();
    this.isIdChecked = false;
    this.currentAccount = '';
    this.httpService.login().subscribe(
      result => this.currentAccount = result,
    );
    setTimeout(() => {
      if (this.currentAccount) {
        console.log(this.currentAccount);
      } else {
        this.socket.emit('connectUser', this.currentAccount.id);
        this.isLogin = true;
      }
      this.SignUp();
    }, 1000);

  }

  SignUp() {
    this.socket.emit('connectUser', this.currentAccount.id);
    console.log(this.currentAccount);
    this.createID.id = this.currentAccount.id;
    this.createID.email = this.currentAccount.emails[0].value;
    this.createID.provider = this.currentAccount.provider;
    console.log('프로바이더 : ' + this.currentAccount.provider);
      if (this.currentAccount.displayName) {
        this.createID.nickname = this.currentAccount.displayName;
      } else if (this.currentAccount.name.givenName !== '') {
        this.createID.nickname = this.currentAccount.name.givenName;
      } else {
        this.createID.nickname = this.currentAccount.id;
      }
      this.saveDB();
    }

  saveDB() {
    console.log(this.currentAccount.id);
    this.httpService.checkUniqueId(this.currentAccount.id).subscribe(result => {
      if (result) {
        const DataForm: any = new FormData();
        DataForm.append('loc', './uploads/Private/' + this.currentAccount.id);
        this.isIdChecked = true;
        this.httpService.createAccount(this.createID).subscribe();
        this.http.post('/joinMakeDir/', DataForm).subscribe();
      } else {
      }
    });
    console.log(this.currentAccount.id);
    this.notifytoApp.emit(this.currentAccount.id);

    this.socket.emit('connectUser', this.currentAccount.id);
  }
}
