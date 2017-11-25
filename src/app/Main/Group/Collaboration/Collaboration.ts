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
  pid: string;
  gid: string;
  printid: string;
  broad: Socketmsg;
  private sub: any;
  private socket = io();
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.broad = new Socketmsg();
    this.sub = this.route.params.subscribe(params => {
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
  sendModify() {
    this.broad.content = this.msg;
    this.broad.pid = this.pid;
    this.broad.gid = this.gid;
    this.socket.emit('add-message', this.broad);
  }

}

