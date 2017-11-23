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
  id: string;
  printid: string;
  broad: Socketmsg;
  private sub: any;
  private socket = io();
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.broad = new Socketmsg();
    this.sub = this.route.params.subscribe(params => {
      this.id = params['ID'];
    });
    this.socket.on('chat-message', (data) => {
      this.msg = data.content;
      this.printid = data.id;
    });
  }
  sendModify() {
    this.broad.content = this.msg;
    this.broad.id = this.id;
    this.socket.emit('add-message', this.broad);
  }

}

