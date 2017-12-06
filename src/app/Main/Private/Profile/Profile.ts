import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../HttpService";
import {NgForm} from "@angular/forms";
import * as io from 'socket.io-client';

@Component({
  selector: 'app-profile',
  templateUrl: './Profile.html',
  styleUrls: ['./Profile.css']
})
export class ProfileComponent implements OnInit {
  returnAccount: any;
  @Input() id: string;
  provider: string;
  mod: boolean;
  private socket = io();
  users: Array<any>;
  constructor(private http: HttpService) {}
  ngOnInit() {
    this.returnAccount = [];
    this.returnAccount.Login = [];
    this.provider = '';
    this.mod = false;
    this.users = [];
    this.socket.on('connecting-User', (usr) => {
      this.http.getAccount(usr).subscribe(result => {
        this.users.push(result);
      });
      console.log(usr);
    });
      setTimeout(() => this.http.getAccount(this.id).subscribe(result => {
        this.returnAccount = result;
        this.provider = this.returnAccount.Login.provider;
      }), 300);
    console.log(this.provider);
  }
  modify(f: NgForm) {
    this.http.changeNickname(f.value.nick).subscribe(result => {
      this.returnAccount = result;
    });
    this.mod = false;
  }
  logout() {
   this.socket.emit(this.returnAccount);
  }

}
