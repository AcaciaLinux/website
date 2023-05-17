import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/shared/branch/branch.service';
import { EventService, EventType } from 'src/app/shared/event/event.service';

@Component({
  selector: 'app-jobs-controls',
  templateUrl: './jobs-controls.component.html',
  styleUrls: ['./jobs-controls.component.css']
})
export class JobsControlsComponent {

  constructor(private router: Router, private branch: BranchService, private events: EventService) {

  }

  do_clear_completed() {
    this.branch.checkauth().subscribe(auth => {
      if (auth) {
        this.branch.clearcompletedjobs().subscribe(ok => {
          if (ok) {
            this.events.push(EventType.DATA_REFRESH);
          }
        });
      }
    });
  }

  do_cancel_queue() {
    this.branch.checkauth().subscribe(auth => {
      if (auth) {
        this.branch.cancelqueuedjobs().subscribe(ok => {
          if (ok) {
            this.events.push(EventType.DATA_REFRESH);
          }
        });
      }
    });
  }

  shouldShow() {
    return this.router.url.includes("jobs") && this.branch.config.authKey != '';
  }

}
