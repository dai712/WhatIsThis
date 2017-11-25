import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-grouprouting',
  templateUrl: './GroupRouting.html',
  styleUrls: ['./GroupRouting.css']
})
export class GroupRoutingComponent implements OnInit {
  pid: string;
  gid: string;
  constructor(private route: ActivatedRoute,
                          private router: Router,
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pid = params['ID'];
      this.gid = params['GID'];
      console.log(this.pid + ';;' + this.gid);
    });
  }

  routing(rout: string) {
    const link = [rout + this.pid + '/' + this.gid];
    this.router.navigate(link);
  }
}
