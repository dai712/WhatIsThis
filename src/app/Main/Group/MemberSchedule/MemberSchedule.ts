import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Table} from "../../Private/PrivateSchedule/Table";
import {HttpService} from "../../../HttpService";
import {GroupTable} from "./GroupTable";

@Component({
  selector: 'app-groupcbt',
  templateUrl: './MemberSchedule.html',
  styleUrls: ['./MemberSchedule.css']
})
export class MemberScheduleComponent implements OnInit {
  days: Array<any>;
  time: Array<any>;
  time2: Array<any>;
  printtime: Array<any>;
  seltime: Array<any>;
  Schedules: Array<any>;
  input: Array<any>;
  group: any;
  test: any;

  id: string;
  pid: string;
  gid: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.pid = params['ID'];
      this.gid = params['GID'];
      console.log(this.pid + ';;' + this.gid);
    });
    this.route.params.subscribe(params => {
      this.id = params['ID'];
    });
    this.printtime = [];

    for (let i = 9 ; i < 21 ; i++) {
      this.printtime.push(i + ' : 00');
      this.printtime.push(i + ' : 30');
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
      this.Schedules=[];
      this.Schedules[0] = new Table();
      this.Schedules[0].id = '';
      this.Schedules[0].time = [];
      this.Schedules[0].subjects = [];
      this.Schedules[0].id = this.id;

    this.seltime = [];
    this.group=new GroupTable();
    this.group.members=[];

    this.httpService.getGroup(this.gid).toPromise().then(result => {
        this.test = result;
      // console.log("resMember0"+result.Members[0]);
        return this.test;
      }
    ).then(result => {
        if (result.length === 0) {
        } else {
          this.group=result;
          // console.log("gro"+this.group);
          // console.log("gro"+this.group.Members.length);
          // this.group.members = result.Members;
          // this.Schedules.subjects = result.Schedule[0].subjects;
          console.log("group: "+this.group);
        }
      }
    ).then(res=>{
      for(let i=0;i<this.group.Members.length;i++) {
        this.Schedules[i] = new Table();
        this.Schedules[i].id = '';
        this.Schedules[i].time = [];
        this.Schedules[i].subjects = [];
        this.Schedules[i].id = this.group.Members[i];
        this.httpService.getAccount(this.Schedules[i].id).toPromise().then(result => {
            this.test = result;
            return this.test;
          }
        ).then(result => {
            if (result.Schedule.length === 0) {
            } else {
              this.Schedules[i].time = result.Schedule[0].time;
              this.Schedules[i].subjects = result.Schedule[0].subjects;
              console.log(this.Schedules[i]);
            }
          }
        );
      }
    });

  }

  routing(rout: string) {
    const link = [rout + this.pid + '/' + this.gid];
    this.router.navigate(link);
  }

  testTime(row: number, col: number) {

    // console.log("testTime");
    for (let i = 0 ; i < this.seltime.length ; i++ ) {
      if (row === this.seltime[i][0]  && col === this.seltime[i][1]) {
        return false;
      }
    }
    for(let a=0 ; a<this.Schedules.length;a++) {
      for (let i = 0; i < this.Schedules[a].time.length; i++) {
        for (let j = 0; j < this.Schedules[a].time[i].length; j++) {
          if (row === this.Schedules[a].time[i][j][0] && col === this.Schedules[a].time[i][j][1]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
