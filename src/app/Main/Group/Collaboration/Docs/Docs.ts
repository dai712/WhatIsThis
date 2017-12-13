import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from "../../../../HttpService";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-docs',
  templateUrl: './Docs.html',
  styleUrls: ['./Docs.css'],
})

export class DocsComponent implements OnInit {
  pid: string;
  account: any;
  gid: string;
  content: string;
  editorContent: string;
  isselected: boolean;
  docList: any;
  targetDoc: any;
  private socket = io();
  public pos: any;
  changing: any;
  changename: boolean;
  deleted: boolean;
  public options: Object = {
    placeholder: 'Edit Me',
    events : {
      'froalaEditor.focus' : function(e, editor) {
      },
      'froalaEditor.contentChanged' : function(e, editor) {
        this.pos = editor.selection.get();
        console.log(editor);
      },
      'froalaEditor.save.save' : function(e, editor) {
        console.log(e);
      }
    }
  };
  constructor(private route: ActivatedRoute,
              private https: HttpService) {
  }
  ngOnInit() {
    this.isselected = false;
    this.changename = false;
    this.deleted = false;
    this.route.params.subscribe(params => {
      this.pid = params['ID'];
      this.gid = params['GID'];
      this.https.getAccount(this.pid).subscribe(result => {
        this.account = result;
      });
    });
    this.socket.on('chat-message', (data) => {
      if (data[5] === true) {
        alert('삭제된 문서입니다.');
        this.isselected = false;
        this.refresh();
      }else if (data[1] === this.gid && data[2] === this.targetDoc._id) {
        this.targetDoc = data[4];
        this.changing = data[3];
        this.editorContent = data[0];
      }

      console.log('받음' + this.editorContent);
    });
    this.refresh();
  }
  emitContent() {
   setTimeout(() => {
     const form = new Array();
     form.push(this.editorContent);
     form.push(this.gid);
     form.push(this.targetDoc._id);
     form.push(this.account.Login.nickname);
     form.push(this.targetDoc);
     form.push(this.deleted);
     console.log(form);
      this.socket.emit('add-message', form);
    }, 500);
    console.log('보냄' + this.editorContent);
  }
  newDoc() {
    const form = new Array();
    form.push(this.gid);
    form.push('새 문서');
    this.https.createDoc(form).subscribe(result => {
      console.log(result);
      alert('생성 완료!');
    });
    this.refresh();
  }
  deleteDoc() {
    const form = new Array();
    form.push(this.gid);
    form.push(this.targetDoc._id);

    this.https.deleteDoc(form).subscribe();
    alert('삭제되었습니다.');

    this.isselected = false;
    this.deleted = true;
    this.emitContent();
    this.refresh();
  }
  saveDoc() {
  const form = new Array();
  form.push(this.gid);
  form.push(this.targetDoc._id);
  form.push(this.editorContent);

  this.https.saveDoc(form).subscribe();
  alert('저장 완료');
  }
  modify(f: NgForm) {
    console.log(f.value.nick);
    const form = new Array();
    form.push(this.gid);
    form.push(this.targetDoc._id);
    form.push(f.value.nick);

    this.https.changeDoc(form).subscribe();
    this.targetDoc.name = f.value.nick;
    this.changename = false;
    this.emitContent();
  }
  refresh() {
    this.https.getDoc(this.gid).subscribe(result => {
      this.docList = result;
    });
  }
  docClick(target: any) {
    console.log(target);
    this.isselected = true;
    this.deleted = false;
    this.targetDoc = target;
    this.editorContent = this.targetDoc.content;
  }
}
