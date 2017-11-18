import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from '../HttpService';
import {IdForm} from '../IdForm';

@Component({
  selector: 'app-login',
  templateUrl: './Login.html',
  styleUrls: ['./Login.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean;
  createID: IdForm;
  constructor(private httpService: HttpService) {}
  ngOnInit() {
    this.createID = new IdForm();
  }
  login() {
    alert('로그인 버튼 누름');
    this.isLogin = true;
  }
  logout() {
    alert('로그아웃 버튼 누름');
    this.isLogin = false;
  }
  onLogin(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    this.createID.id = f.value.id;
    this.createID.password = f.value.password;
    this.createID.nickname = '민우';
    this.httpService.creNew(this.createID).subscribe();
  }
}
