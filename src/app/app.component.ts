import {Component, OnInit, NgZone, Input, EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isStart: number;
  @Input() fromLoginId: string;
  @Output() notifytoMenu = new EventEmitter<any>();
  constructor( private router: Router,
               private zone: NgZone) { }
  ngOnInit() {
    this.isStart = 0;
  }
  clickLogo() {
    alert('메인홈페이지로 돌아갑니다.');
    const link = [''];
    this.router.navigate(link);
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }
  onNotifyfromLogin(id: any) {
    console.log(id);
    this.fromLoginId = id;
    this.notifytoMenu.emit(id);
    if (id) {
      this.isStart = 1;
    } else {
      this.isStart = 0;
    }
  }
}
