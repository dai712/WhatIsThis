import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../HttpService";
import {WindowRef} from "../../window";
import {ActivatedRoute} from "@angular/router";
import {isUndefined} from "util";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './Search.html',
  styleUrls: ['./Search.css']
})
export class SearchComponent implements OnInit {
  results: any;
  check: any;
  clickname: boolean;
  cprofile: boolean;
  cfile: boolean;
  cschedule: boolean;
  id: string;
  User: any;
  groups: Array<any>;
  str: string;
  Filelist: Array<string>;
  FileAccess: any;
  searchList : any;
  constructor(private route: ActivatedRoute,
              private http: HttpService,
              private winRef: WindowRef
              ) {}
  ngOnInit() {
    this.clickname = false;
    this.cprofile = false;
    this.cfile = false;
    this.cschedule = false;
    this.groups = [];
    this.Filelist = [];
    this.str = '이 회원의 진행중인 팀프로젝트는';
    this.route.params.subscribe(params => {
      this.id = params['ID'];
    });
    setTimeout(() => {
      this.refresh();
    }, 300);
  }
  refresh() {
    this.http.getAllUsers().subscribe(result => {
      this.results = result;
      this.searchList = result;

    });
    this.http.getAccount(this.id).subscribe(result => {
      this.User = result;
    });
  }
  clickSearchedUser(index: number) {

    this.check = this.searchList[index];
  }
  checkProfile() {
    this.groups = [];

        for (let i = 0 ; i < this.check.Group.length ; i++) {
          this.http.getGroupDetail(this.check.Group[i]).subscribe(result => {
            this.groups.push(result);
          });
        }

  }
  checkRepository() {
    let group = false;
    let request = [];
    this.Filelist = [];
    let temp: any;


    for (let i = 0 ; i < this.User.Group.length ; i++) {
      for (let j = 0 ; j < this.check.Group.length ; j++) {
        if (this.User.Group[i] === this.check.Group[j]) {
          group = true;
        } else {
          group = false;
        }
      }
    }
    console.log(group);
    request.push(this.check.Login.id);
    request.push(group);
    this.http.catUserFiles(request).subscribe(result => {
      this.FileAccess = result;
      temp = result;
      for ( let i = 0 ; i < temp.length ; i++) {
        let str = temp[i].split('/');
        this.Filelist.push(str[str.length - 1]);
        console.log(str);
      }
      console.log(this.Filelist);
    });

  }
  checkSchedule() {

  }
  clickedGroup(index: number) {
      console.log(this.groups[index]);
  }
  search(f: NgForm) {
    this.searchList = [];
    for (let i = 0 ; i < this.results.length ; i ++ ) {
      if (this.results[i].Login.nickname.match(f.value.search)) {
        this.searchList.push(this.results[i]);
      }
    }
    console.log(this.searchList);
  }
}
