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
  clickname: boolean;
  cprofile: boolean;
  cfile: boolean;
  cschedule: boolean;
  targetmember: any;
  groups: Array<any>;
  filelist: Array<any>;
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
    this.clickname = false;
    this.cprofile = false;
    this.cfile = false;
    this.cschedule = false;
    this.groups = [];
    this.filelist = [];
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
  clickMember(i: number) {
    this.targetmember = this.members[i];
  }
  checkProfile() {
    console.log(this.targetmember);
    this.groups = [];

    for (let i = 0 ; i < this.targetmember.Group.length ; i++) {
      this.https.getGroupDetail(this.targetmember.Group[i]).subscribe(result => {
        this.groups.push(result);
      });
    }
  }
  checkRepository() {
    this.filelist = [];
    for (let i = 0 ; i < this.targetmember.Files.length ; i++) {
      if (this.targetmember.Login.id === this.pid) {
        this.filelist.push(this.targetmember.Files[i].path);
      } else if (this.targetmember.Files[i].access === 0 || this.targetmember.Files[i].access === 2) {
        this.filelist.push(this.targetmember.Files[i].path);
      }
    }
  }
  checkSchedule() {
  }
}
