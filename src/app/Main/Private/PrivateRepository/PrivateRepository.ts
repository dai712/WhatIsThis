import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../../../HttpService";
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {NgForm} from "@angular/forms";




@Component({
  selector: 'app-privaterepository',
  templateUrl: './PrivateRepository.html',
  styleUrls: ['./PrivateRepository.css']
})
export class PrivateRepositoryComponent implements OnInit {
  filesToUpload: Array<File> = [];
  text: string;
  id: string;
  private sub: any;
  FormData3: FormData;
  temp: any;
  PrivateFilelist: any;
  PrivateDirlist: any;
  loaded: number;
  currentLoc: string;
  loc: string;
  changingDir: Array<string>;
  accessList: any;
  constructor(public http: HttpClient,
              public https: HttpService,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.loaded = 0;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['ID'];
    });
    this.loc = './uploads/Private/' + this.id;
    this.currentLoc = this.id;
    this.changingDir = [];
    this.changingDir.push(this.id);
    this.PrivateFilelist = [];
    this.PrivateDirlist = [];
    this.accessList = [];
    this.refresh();
  }
  init() {
    this.filesToUpload = [];
    this.text = '';
    this.temp = '';
  //  this.PrivateFilelist = [];
  //  this.PrivateDirlist = [];
    this.loaded = 0;
  //  this.loc = [];
  //  const DataForm: any = new FormData();
  //  DataForm.append('loc', './uploads/Private/' + this.id);
  //  this.http.post('/refreshLoc/', DataForm).subscribe();
  }
  refresh() {
    this.FormData3 = new FormData();
    this.FormData3.append('loc', this.loc);
    this.accessList = [];
    this.PrivateDirlist = [];
    this.PrivateFilelist = [];
    this.http.post('/getPrivate/', this.FormData3).subscribe(
      result => {
        this.temp = result;
        if (isUndefined(this.temp) || this.temp.length === 0 ) {
          this.loaded = 2;
          return;
        }
        const test = this.loc.substring(1, this.loc.length).replace(/\//g, '\\') + '\\';
        const Access: Array<any> = [];
        for (let i = 0; i < this.temp.length ; i++) {
          const temp2 = this.temp[i].split(test);
          console.log(temp2);
          if (temp2[1].indexOf('.') === -1) {
            this.PrivateDirlist.push(temp2[1]);
          } else {
            this.PrivateFilelist.push(temp2[1]);
            Access.push(this.loc + '/' + temp2[1]);
          }
          this.loaded = 1;
        }
        this.https.getPfileAccess(Access).subscribe(
          result2 => {
            this.accessList = result2;
            console.log(this.accessList);
          }
        );
      }
    );
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
    formData2.append('id', this.id);

    create.push(this.loc + '/' + files[0]['name']);
    create.push(this.id);
    console.log(create[0]);

    this.https.createPfile(create).subscribe();
    this.http.post('/uploads/', formData)
      .subscribe(result => console.log('files', result));
    alert('업로드 완료!');
    this.refresh();
    this.filesToUpload = [];
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  watchFile(target: string) {
    const formData: any = new FormData();
    formData.append('loc', this.loc + '/' + target);
   // this.http.post('/download', formData).subscribe();
  }
  enterDir(target: any) {
    this.changingDir.push(target);
    this.loc += '/' + target;
    console.log(this.changingDir);
    console.log(this.loc);
    this.refresh();
  }
  deleteFile(target: string) {
    const formData: any = new FormData();
    const del: Array<string> = [];
    formData.append('loc', './uploads/Private/' + this.id + '/' + target);
    del.push(target);
    del.push(this.id);
    alert('삭제하시겠습니까?');

    this.http.post('/delete', formData).subscribe();
    this.https.deletePfile(del).subscribe();
    this.refresh();
  }
  makeDir(f: NgForm) {
    const formData: any = new FormData();
    formData.append('loc', this.loc + '/' +  f.value.dir);
    this.http.post('/makeDir', formData).subscribe();
    this.refresh();
  }
  changeAccess(target: string) {
  }
  changeDir(index: number) {
    const targetPath: Array<string> = [];
    console.log(index);
    for (let i = 0 ; i < index + 1 ; i++) {
      targetPath.push(this.changingDir[i]);
    }
    this.changingDir = targetPath;
    let path = '';
    for (let i = 0 ; i < targetPath.length ; i++) {
      path += '/' + targetPath[i];
    }
    this.loc = './uploads/Private' + path;
    console.log(this.loc);
    this.refresh();
  }
}
