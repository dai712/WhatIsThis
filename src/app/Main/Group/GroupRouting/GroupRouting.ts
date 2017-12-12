import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../../HttpService";
import {Table} from "../../Private/PrivateSchedule/Table";
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

  days: Array<any>;
  time: Array<any>;
  time2: Array<any>;
  printtime: Array<any>;
  seltime: Array<any>;
  Schedules: Table;
  input: Array<any>;
  displaySubjectIndex: any;
  test: any;
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

    // this.delIndex=-1;
    this.displaySubjectIndex=0;
    this.printtime = [];
    for (let i = 9 ; i < 21 ; i++) {
      this.printtime.push(i + '시');
      this.printtime.push(i + '시 반');
    }

    this.days = [
      {day: '월요일'},
      {day: '화요일'},
      {day: '수요일'},
      {day: '목요일'},
      {day: '금요일'},
    ];

    this.time2 = [ 1, 2, 3, 4, 5
    ];

    this.time = [];
    for (let i = 1 ; i < 25 ; i++ ) {
      this.time.push(i);
    }
    this.Schedules = new Table();
    this.Schedules.id = '';
    this.Schedules.time = [];
    this.Schedules.subjects = [];
    this.Schedules.id = this.targetmember.Login.id;
    this.seltime = [];
    this.https.getAccount(this.targetmember.Login.id).toPromise().then(result => {
        this.test = result;
        return this.test;
      }
    ).then(result => {
        if (result.Schedule.length === 0) {
        } else {
          this.Schedules.time = result.Schedule[0].time;
          this.Schedules.subjects = result.Schedule[0].subjects;
          console.log(this.Schedules);
        }
      }
    );
  }
  testTime(row: number, col: number) {
    for (let i = 0 ; i < this.seltime.length ; i++ ) {
      if (row === this.seltime[i][0]  && col === this.seltime[i][1]) {
        return true;
      }
    }
    for (let i = 0 ; i < this.Schedules.time.length ; i++) {
      for (let j = 0 ; j < this.Schedules.time[i].length ; j++) {
        if (row === this.Schedules.time[i][j][0]  && col === this.Schedules.time[i][j][1]) {
          return true;
        }
      }
    }
    return false;
  }
  testSubject(row: number, col: number) {
    for (let i = 0 ; i < this.Schedules.time.length ; i++) {
      for (let j = 0 ; j < this.Schedules.time[i].length ; j++) {
        if (row === this.Schedules.time[i][j][0]  && col === this.Schedules.time[i][j][1]) {

          this.displaySubjectIndex=i;
          return true;
        }
      }
    }
    return false;
  }
}
