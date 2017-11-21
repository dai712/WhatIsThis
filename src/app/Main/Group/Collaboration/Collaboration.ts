import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-collaboration',
  templateUrl: './Collaboration.html',
  styleUrls: ['./Collaboration.css']
})
export class CollaborationComponent implements OnInit {
  @Input() msg;
  private socket = io();
  ngOnInit() {
    this.socket.on('chat-message', (data) => {
      this.msg = data;
    });
  }
  sendModify() {
    this.socket.emit('add-message', this.msg);
  }

}

