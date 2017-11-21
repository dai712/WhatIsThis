import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './Menu.html',
  styleUrls: ['./Menu.css']
})
export class MenuComponent {
  click: number;
  clickPrivate() {
    this.click = 1;
  }
  clickGroup() {
    this.click = 2;
  }
  clickSearch() {
    this.click = 3;
  }
}
