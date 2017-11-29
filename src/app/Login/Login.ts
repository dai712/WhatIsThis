import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from '../HttpService';
import {IdForm} from '../IdForm';
import {HttpClient} from "@angular/common/http";


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
  @Output() notifytoApp = new EventEmitter<any>();
  constructor(public http: HttpClient,
              private httpService: HttpService) {}
  ngOnInit() {
    this.createID = new IdForm();
    this.isIdChecked = false;
    this.currentAccount = '';
  }
  login() {
    this.init();
    this.isLogin = true;
  }
  logout() {
    this.init();
    alert('로그아웃 되었습니다.');
    this.isLogin = false;
  }
  onLogin(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    this.createID.id = f.value.id;
    this.createID.password = f.value.password;
    this.httpService.login(this.createID).subscribe(result => {
      console.log(result);
      if (!result) {
        alert('Id 혹은 비밀번호가 맞지 않습니다.');
      } else {
        this.currentAccount = result;
        console.log(this.currentAccount);
        alert('로그인성공');
        this.notifytoApp.emit(this.currentAccount._id);
      }
    });
    // this.httpService.creNew(this.createID).subscribe();
    this.init();
  }
  join() {
    // alert('회원가입 버튼 누름');
    this.init();
    this.isLogin = false;
    this.isJoin = true;
  }
  checkUnique(f: NgForm) {
    console.log(f.value.id);
    this.httpService.checkUniqueId(f.value.id).subscribe(result => {
      console.log(result);
        if (result) {
          this.isIdChecked = true;
          alert('사용가능한 아이디입니다.');
        } else {
          alert('이미 존재하는 아이디입니다.');
        }
      }
    );
  }
  onChange() {
    this.isIdChecked = false;
  }
  completeJoin(f: NgForm) {
    if (!this.isIdChecked) {
      alert('ID 중복확인을 해주세요');
      return;
    }
    var returnID: any;
    const formData: any = new FormData();
    this.newAccount = new IdForm();
    this.newAccount.id = f.value.id;
    this.newAccount.password = f.value.pw;
    this.newAccount.nickname = f.value.nickname;
    console.log(this.newAccount);
    this.httpService.createAccount(this.newAccount).subscribe(
      result => returnID = result
    );
    setTimeout(() => {
      console.log(returnID);
      returnID = returnID._id;
      formData.append('id', returnID);
      formData.append('loc', './uploads/Private/' + returnID);
      this.http.post('/joinMakeDir/', formData).subscribe();
    }, 1000);
    alert('회원가입이 완료되었습니다.');
    this.init();
  }
  init() {
    this.isLogin = false;
    this.isJoin = false;
    this.isIdChecked = false;
    this.currentAccount = '';
  }
}
