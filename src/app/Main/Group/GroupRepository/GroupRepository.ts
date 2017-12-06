import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../../../HttpService";
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-grouprepository',
  templateUrl: './GroupRepository.html',
  styleUrls: ['./GroupRepository.css']
})
export class GroupRepositoryComponent implements OnInit {
  gid: any;
  loc: any;
  groupFileList: any;
  groupDirList: any;
  filesToUpload: Array<File> = [];
  changingDir: Array<string>;
  constructor(public http: HttpClient,
              public https: HttpService,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.groupDirList = [];
    this.groupFileList = [];
    this.route.params.subscribe(params => {
      this.gid = params['GID'];
    });
    this.changingDir = [];
    this.changingDir.push(this.gid);
    this.loc = './uploads/Group/' + this.gid;
    this.refresh();
  }

  refresh() {
    this.groupDirList = [];
    this.groupFileList = [];
    const formData: any = new FormData();
    formData.append('loc', this.loc);
    this.http.post('/getPrivate/', formData).subscribe(result => {
      console.log(result);
      let temp: any = result;
      const test = this.loc.substring(1, this.loc.length).replace(/\//g, '\\') + '\\';
      for (let i = 0 ; i < temp.length ; i++) {
        const temp2 = temp[i].split(test);
        if (temp2[1].indexOf('.') === -1) {
          this.groupDirList.push(temp2[1]);
        } else {
          this.groupFileList.push(temp2[1]);
        }
      }
    });
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  upload() {
    if (this.filesToUpload.length === 0) {
      alert('파일이 선택되지 않았습니다.');
      return;
    }
    const formData: any = new FormData();
    const formData2: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    const create: Array<string> = [];
    formData.append('uploads[]', files[0], files[0]['name']);
    formData2.append('id', this.gid);

    create.push(this.loc + '/' + files[0]['name']);
    create.push(this.gid);

    this.https.createPfile(create).subscribe();
    this.http.post('/uploads/', formData)
      .subscribe(result => console.log('files', result));
    alert('업로드 완료!');
    this.refresh();
    this.filesToUpload = [];
  }
  makeDir(f: NgForm) {
    if (f.value.dir === '') {
      alert('디렉토리 이름을 설정해주세요');
      return;
    }
    const formData: any = new FormData();
    formData.append('loc', this.loc + '/' +  f.value.dir);
    this.http.post('/makeDir', formData).subscribe();
    this.refresh();
  }
  deleteFile(target: string) {
    const formData: any = new FormData();
    const del: Array<string> = [];
    console.log(this.loc);
    formData.append('loc', this.loc + '/' + target);
    del.push(this.loc + '/' + target);
    del.push(this.gid);
    alert('삭제하시겠습니까?');
    console.log(del);

    this.https.deleteGFiles(del).subscribe();
    this.http.post('/delete', formData).subscribe();
    this.refresh();
  }
  changeDir(index: number) {
    const targetPath: Array<string> = [];
    for (let i = 0 ; i < index + 1 ; i++) {
      targetPath.push(this.changingDir[i]);
    }
    this.changingDir = targetPath;
    let path = '';
    for (let i = 0 ; i < targetPath.length ; i++) {
      path += '/' + targetPath[i];
    }
    this.loc = './uploads/Group' + path;
    console.log(this.loc);
    this.refresh();
  }
  enterDir(target: any) {
    this.changingDir.push(target);
    this.loc += '/' + target;
    console.log(this.changingDir);
    console.log(this.loc);
    this.refresh();
  }
}
