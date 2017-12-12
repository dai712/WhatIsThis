import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpService} from "../../HttpService";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-group',
  templateUrl: './Group.html',
  styleUrls: ['./Group.css']
})
export class GroupComponent implements OnInit {
  id: string;
  private sub: any;
  group: Array<boolean>;
  groupForm: Array<any>;
  grouplist: any;
  grouplist2: any;
  grouplist3: any;
  clickdetail: boolean;
  groupmaster : string;
  constructor(public http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService
              ) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['ID'];
    });
    this.clickdetail = false;
    this.group = [];
    this.groupForm = [];
    this.grouplist = '';
    this.grouplist2 = '';
    this.grouplist3 = '';
    for (let i = 0 ; i < 3 ; i++) {
      this.group[i] = false;
    }
  }

  openGroup(num: number) {
    for (let i = 0 ; i < this.group.length ; i++) {
      this.group[i] = false;
    }
    this.group[num] = true;
    if (num === 1) {
      this.list();
    } else if (num === 2) {
      this.joinedGroup();
    }
  }
  create(f: NgForm) {
    this.groupForm = [];
    const formData: any = new FormData();
    var gid;
    if (f.value.id === '') {
      alert('그룹명을 입력해주세요');
      return;
    }
    this.groupForm.push(f.value.id);
    this.groupForm.push(this.id);
    this.httpService.createGroup(this.groupForm).subscribe(
      result => gid = result
    );
    setTimeout(() => {
      gid = gid._id;
      formData.append('id', gid);
      formData.append('loc', './uploads/Group/' + gid);
      this.http.post('/joinMakeDir/', formData).subscribe();
    }, 1000);
    alert('생성 완료');
  }
  search(f: NgForm) {
      this.groupForm = [];
      this.grouplist2 = [];
      for (let i = 0 ; i < this.grouplist.length ; i ++ ) {
        if (this.grouplist[i].id.match(f.value.search)) {
          this.grouplist2.push(this.grouplist[i]);
        }
      }
  }
  list() {
    this.httpService.searchAllGroups().subscribe(result => {
      this.grouplist = [];
      this.grouplist2 = [];
      this.grouplist = result;
      this.grouplist2 = result;
    });
  }
  clickSearchedGroup(clicked: any) {
    const joinGroup = [];
    let message = '';
    joinGroup.push(clicked);
    joinGroup.push(this.id);

    console.log(clicked);
    const conf = confirm('선택한 그룹에 가입하시겠습니까?');
    if (conf === true) {
      this.httpService.joinGroup(joinGroup).subscribe(result => {
        alert(result);
      });
    } else {
    }
  }
  joinedGroup() {
    this.grouplist3 = [];
    this.list();
    setTimeout(() => {
      console.log('서치시작');
      console.log( this.grouplist.length );
      for (let i = 0 ; i < this.grouplist.length ; i ++ ) {
        for (let j = 0 ; j < this.grouplist[i].Members.length ; j ++ ) {
          if ( this.grouplist[i].Members[j] === this.id) {
            this.grouplist3.push(this.grouplist[i]);
          }
        }
      }}, 1500);
  }
  removeJoinedGroup(clicked: any) {
    console.log(clicked);
    const reGroup = [];
    reGroup.push(clicked);
    reGroup.push(this.id);
    const conf = confirm('선택한 그룹에서 탈퇴하시겠습니까?');
    if ( conf === true ) {
      for (let i = 0 ; i < this.grouplist.length ; i ++ ) {
        if (this.grouplist[i].Members[0] === this.id) {
          const conf2 = confirm('당신은 그 그룹의 그룹장입니다. 탈퇴시 삭제됩니다. 계속하시겠습니까?');
          if (conf2 === true) {
              this.httpService.removeGroup(reGroup).subscribe();
              alert('탈퇴 및 삭제 완료');
              setTimeout(() => {
                this.joinedGroup();
              }, 1000);
              return;
          }
        }
      }
      this.httpService.withdrawGroup(reGroup).subscribe();
      alert('탈퇴 완료');
      setTimeout(() => {
        this.joinedGroup();
      }, 1000);
    }
  }

  enterJoinedGroup(clicked: any) {
    console.log(this.id);
    const link = ['/grouprouting/' + this.id + '/' + clicked];
    this.router.navigate(link);
  }

  getGroupDetail(clicked: any) {
    let temp: any;
    console.log(clicked.Members[0]);
    this.httpService.getAccount(clicked.Members[0]).subscribe(result => {
      temp = result;
      this.groupmaster = temp.Login.nickname;
    });

    console.log(clicked);
  }
}
