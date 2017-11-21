import {Component, OnInit, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor( private router: Router,
               private zone: NgZone) { }
  ngOnInit() {
  }
  clickLogo() {
    alert('click logo');
    const link = [''];
    this.router.navigate(link);
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }
}
