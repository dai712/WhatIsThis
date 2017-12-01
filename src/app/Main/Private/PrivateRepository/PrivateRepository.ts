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
  Privatelist: any;
  loaded: number;
  currentLoc: string;
  loc: Array<string>;
  constructor(public http: HttpClient,
              public https: HttpService,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.loaded = 0;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['ID'];
    });
    this.loc = [];
    this.refresh();
  }
  init() {
    this.filesToUpload = [];
    this.text = '';
    this.temp = '';
    this.Privatelist = [];
    this.loaded = 0;
    this.loc = [];
    const DataForm: any = new FormData();
    DataForm.append('loc', './uploads/Private/' + this.id);
  //  this.http.post('/refreshLoc/', DataForm).subscribe();
  }
  refresh() {

    this.FormData3 = new FormData();
    this.FormData3.append('loc', this.loc.toString() + this.id);
    console.log(this.loc.toString() + this.id);
    this.FormData3.append('id', this.id);
    this.http.post('/getPrivate/', this.FormData3).subscribe(
      result => this.temp = result
    );
    setTimeout(() => {
      console.log(this.temp);
      if (isUndefined(this.temp) || this.temp.length === 0 ) {
        this.loaded = 2;
        return;
      }
      this.currentLoc = this.temp[0];
      var temp2 = this.currentLoc.split('AjouTeam');
      console.log(temp2[1]);
      var temp3 = temp2[1].split('\\');
      console.log(temp3);
      this.loc = [];
      for (let i = 3 ; i < temp3.length - 1 ; i ++) {
        this.loc.push(temp3[i]);
      }
      var toArray = new Array();
      this.Privatelist = [];
      toArray = [];
      for (let i = 0 ; i < this.temp.length ; i++) {
        toArray.push(this.temp[i].split('\\'));
        console.log(toArray[i][toArray[i].length - 1]);
        this.Privatelist.push(toArray[i][toArray[i].length - 1]);
        console.log(this.Privatelist);
        this.loaded = 1;
      }

    }, 1000);
    this.init();
  }
  upload() {

    if (this.filesToUpload.length === 0) {
      alert('파일이 선택되지 않았습니다.');
      return;
    }
    const formData: any = new FormData();
    const formData2: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    formData.append('uploads[]', files[0], files[0]['name']);
    formData2.append('id', this.id);
    this.https.te(formData).subscribe();

    this.http.post('/uploads/', formData)
      .subscribe(result => console.log('files', result));
    alert('업로드 완료!');
    this.refresh();
    this.filesToUpload = [];
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
   // this.product.photo = fileInput.target.files[0]['name'];
  }

  watchFile() {
  }
  deleteFile(target: string) {
    const formData: any = new FormData();
    formData.append('loc', './uploads/Private/' + this.id + '/' + target);
    alert('삭제하시겠습니까?');
    this.http.post('/delete', formData).subscribe();
    this.refresh();
  }
  makeDir(f: NgForm) {

    const formData: any = new FormData();
    formData.append('loc', './uploads/Private/' + this.id + '/' + f.value.dir);
    console.log('./uploads/Private/' + this.id + f.value.dir);
    this.http.post('/makeDir', formData).subscribe();
    this.refresh();
  }
}
