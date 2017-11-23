import {Component, Injectable, OnInit} from '@angular/core';
import {DataTableModule, SharedModule} from "primeng/primeng";
import {NgForm} from "@angular/forms";
import {Table} from "./Table";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../../HttpService";
import {isUndefined} from "util";

@Component({
  selector: 'app-privateschedule',
  templateUrl: './PrivateSchedule.html',
  styleUrls: ['./PrivateSchedule.css']
})
@Injectable()
export class PrivateScheduleComponent implements OnInit {
  days: Array<any>;
  time: Array<any>;
  time2: Array<any>;
  printtime: Array<any>;
  seltime: Array<any>;
  Schedules: Table;
  input: Array<any>;

  test: any;

  id: string;
  constructor(private route: ActivatedRoute,
              private httpService: HttpService) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['ID'];
    });
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
    this.Schedules.id = this.id;
    this.seltime = [];
    this.httpService.getAccount(this.id).subscribe(result => {
      this.test = result;
      console.log(this.test.Schedule.length);
      if (this.test.Schdule.length === 0) {
        console.log('없음');
      }
    });
  }
  clicktime(row: number, col: number) {
    this.input = [];
    console.log(row + '/' + col);
    if (this.seltime.length !== 0) {
      if (this.seltime[this.seltime.length - 1][1] !== col) {
        this.seltime = [];
      } else if (this.seltime[this.seltime.length - 1][0] + 1 < row
                  || this.seltime[this.seltime.length - 1][0] - 1 > row ) {
        this.seltime = [];
      }
    }
    for (let i = 0 ; i < this.Schedules.time.length ; i++) {
      for (let j = 0; j < this.Schedules.time[i].length; j++) {
        if (row === this.Schedules.time[i][j][0] && col === this.Schedules.time[i][j][1]) {
          alert('중복 선택하였습니다.');
          return;
        }
      }
    }
    this.input.push(row, col);
    this.seltime.push(this.input);
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
  clear() {
    this.seltime = [];
  }
  submit(input: NgForm) {
    console.log(this.Schedules);
    if (input.value.subject === '') {
      alert('과목명을 입력해주세요');
      return;
    } else if (this.seltime.length === 0) {
      alert('시간표를 선택해주세요');
      return;
    } else {
      this.Schedules.time.push(this.seltime);
      this.Schedules.subjects.push(input.value.subject);
      console.log(this.Schedules);
    }
  }
  saveSchedule() {
    this.httpService.saveSchedule(this.Schedules).subscribe();
    console.log('세이브');
  }
}
