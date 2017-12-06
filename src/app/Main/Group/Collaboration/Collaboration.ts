import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {ActivatedRoute, Router} from '@angular/router';
import {Socketmsg} from './Socketmsg';

@Component({
  selector: 'app-collaboration',
  templateUrl: './Collaboration.html',
  styleUrls: ['./Collaboration.css']
})
export class CollaborationComponent implements OnInit {
  @Input() msg;
  caretPos: number = 0;
  pid: string;
  gid: string;
  printid: string;
  broad: Socketmsg;
  private socket = io();
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.broad = new Socketmsg();
    this.route.params.subscribe(params => {
      this.pid = params['ID'];
      this.gid = params['GID'];
    });
    this.socket.on('chat-message', (data) => {
      if ( data.gid === this.gid) {
        this.msg = data.content;
        this.printid = data.pid;
      }
    });
  }
  sendModify(oField) {
    if (oField.selectionStart || oField.selectionStart === '0') {
      this.caretPos = oField.selectionStart;
    }
    console.log(this.caretPos);
    this.broad.content = this.msg;
    this.broad.pid = this.pid;
    this.broad.gid = this.gid;
    this.socket.emit('add-message', this.broad);
  }

}

