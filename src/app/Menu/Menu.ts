import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpService} from "../HttpService";

@Component({
  selector: 'app-menu',
  templateUrl: './Menu.html',
  styleUrls: ['./Menu.css']
})
export class MenuComponent implements OnInit {
  @Input() ID: string;
  currentAccount: any;
  clickroute: boolean;
  constructor( private router: Router,
               private http: HttpService) { }
  ngOnInit() {
    this.clickroute = false;
    this.ID = '';
    this.http.login().subscribe(
      result => {
        this.currentAccount = result;
        console.log(this.currentAccount);
        this.ID = this.currentAccount.id;
      }
    );
  }
  routing(rout: string) {
    console.log(this.ID);
    if (this.ID === '') {
      alert('not login');
    } else {
      const link = [rout + this.ID];
      this.router.navigate(link);
    }
  }

}
