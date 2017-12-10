import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-collaboration',
  templateUrl: './Collaboration.html',
  styleUrls: ['./Collaboration.css'],
})
export class CollaborationComponent implements OnInit {
  @Input() msg;
  pid: string;
  gid: string;

  constructor(private router: Router,
    private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pid = params['ID'];
      this.gid = params['GID'];
    });
  }
  routing(rout: string) {
    if (this.pid === '') {
      alert('not login');
    } else {
      const link = [rout + this.pid + '/' + this.gid];
      this.router.navigate(link);
    }
  }
}

