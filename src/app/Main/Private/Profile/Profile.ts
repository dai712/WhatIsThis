import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../HttpService";

@Component({
  selector: 'app-profile',
  templateUrl: './Profile.html',
  styleUrls: ['./Profile.css']
})
export class ProfileComponent implements OnInit {
  returnAccount: any;
  @Input() id: string;
  constructor(private http: HttpService) {}
  ngOnInit() {
    this.returnAccount = [];
    this.returnAccount.Login = [];
    console.log(this.id);
    setTimeout(() => {
      this.http.getAccount(this.id).subscribe(result => this.returnAccount = result);
    }, 100);
    // this.http.getAccount(this.id).subscribe(result => this.returnAccount = result);
  }

}
