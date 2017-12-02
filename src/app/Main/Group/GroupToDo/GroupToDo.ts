import { Component, OnInit } from '@angular/core';
import {debugOutputAstAsTypeScript} from '@angular/compiler';
import { TaskForm } from './TaskForm';
import { HttpService } from '../../../HttpService';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-grouptodo',
  templateUrl: './GroupToDo.html',
  styleUrls: ['./GroupToDo.css']
})

export class GroupToDoComponent implements OnInit {
  pid: string;
  gid: string;
  newTask: TaskForm;
  todoTask: TaskForm;
  trelloList: any;
  todoList: any;
  doingList: any;
  doneList: any;
  temp: any;
  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) {
    this.todoList = new Array();
    this.doingList = new Array();
    this.doneList = new Array();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pid = params['ID'];
      this.gid = params['GID'];
      console.log(this.pid + ';;' + this.gid);
    });
    this.httpService.getAllTask(this.gid).subscribe(result => {
      console.log(result);
      this.trelloList = result;
      console.log(this.trelloList);
      for (let i = 0; i < this.trelloList.length; i++) {
        console.log(this.trelloList[i]);
        switch (this.trelloList[i].status) {
          case 'todo':
            this.todoList.push(this.trelloList[i]);
            break;
          case 'doing':
            this.doingList.push(this.trelloList[i]);
            break;
          case 'done':
            this.doneList.push(this.trelloList[i]);
        }
      }
    });
  }
  addTask(f: NgForm) {
    if (f.value.title === '' && f.value.content === '') {
      alert('제목, 내용이 비어있습니다.');
      return;
    } else {
      this.newTask = new TaskForm();
      this.newTask.title = f.value.title;
      this.newTask.content = f.value.content;
      this.newTask.status = 'todo';
      this.newTask.gid = this.gid;
      console.log(this.newTask);
      this.httpService.addTask(this.newTask).subscribe(result => {
        this.temp = result;
        console.log(this.temp);
      });
    }
    parent.location.reload();
  }
  deleteTask(task) {
    const deletedTask = new Array();
    deletedTask.push(this.gid);
    deletedTask.push(task);
    console.log(deletedTask);
    this.httpService.deleteTask(deletedTask).subscribe();
    parent.location.reload();
  }
  toDolist(task: any) {
    const changedTask = new Array(); // gid, curTask, newTask
    changedTask.push(this.gid);
    changedTask.push(task);
    changedTask.push('todo');
    this.httpService.changeTask(changedTask).subscribe();
    parent.location.reload();
  }
  toDoing(task: any) {
    const changedTask = new Array(); // gid, curTask, newstatus
    changedTask.push(this.gid);
    changedTask.push(task);
    changedTask.push('doing');
    this.httpService.changeTask(changedTask).subscribe();
    parent.location.reload();
  }
  toDone(task: any) {
    const changedTask = new Array(); // gid, curTask, newstatus
    changedTask.push(this.gid);
    changedTask.push(task);
    changedTask.push('done');
    this.httpService.changeTask(changedTask).subscribe();
    parent.location.reload();
  }
}
