import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './Menu.html',
  styleUrls: ['./Menu.css']
})
export class MenuComponent implements OnInit {
  @Input() ID: string;
  constructor( private router: Router) { }
  ngOnInit() {
    this.ID = '';
  }
  routing(rout: string) {
    if (this.ID === '') {
      alert('not login');
    } else {
      const link = [rout + this.ID];
      this.router.navigate(link);
    }
  }
}
