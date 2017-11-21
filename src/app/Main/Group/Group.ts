import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-group',
  templateUrl: './Group.html',
  styleUrls: ['./Group.css']
})
export class GroupComponent implements OnInit {
  id: string;
  private sub: any;
  constructor(private route: ActivatedRoute,
              private router: Router ) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['ID'];
    });
    console.log(this.id);
  }
  routing(rout: string) {
    const link = [rout + this.id];
    this.router.navigate(link);
  }
}
