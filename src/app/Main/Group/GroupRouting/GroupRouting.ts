import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../../HttpService";

@Component({
  selector: 'app-grouprouting',
  templateUrl: './GroupRouting.html',
  styleUrls: ['./GroupRouting.css']
})
export class GroupRoutingComponent implements OnInit {
  pid: string;
  gid: string;
  group: any;
  members: any;
  loaded: boolean;
  constructor(private route: ActivatedRoute,
                          private router: Router,
              private https: HttpService,
  ) {}
  ngOnInit() {
    this.members = [];
    this.route.params.subscribe(params => {
      this.pid = params['ID'];
      this.gid = params['GID'];
      console.log(this.pid + ';;' + this.gid);
    });
    this.https.getGroupDetail(this.gid).subscribe(result => {
      this.group = result;
      this.refresh();
    });
  }

  refresh() {
    this.members = [];
    this.loaded = false;
    for (let i = 0 ; i < this.group.Members.length ; i++) {
      this.https.getAccount(this.group.Members[i]).subscribe(result => {
        this.members.push(result);
      });
    }
    this.loaded = true;
  }

  routing(rout: string) {
    const link = [rout + this.pid + '/' + this.gid];
    this.router.navigate(link);
  }
}
