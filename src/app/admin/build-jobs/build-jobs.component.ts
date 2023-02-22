import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { BranchService } from 'src/app/shared/branch/branch.service';
import { Job } from 'src/app/shared/classes/job';
import { EventService, EventType } from 'src/app/shared/event/event.service';

@Component({
  selector: 'app-build-jobs',
  templateUrl: './build-jobs.component.html',
  styleUrls: ['./build-jobs.component.css']
})
export class BuildJobsComponent {

  public queued_jobs?: Job[];
  public running_jobs?: Job[];
  public completed_jobs?: Job[];
  subscription?: Subscription;
  events_subscription: Subscription;

  constructor(public branch: BranchService, private events: EventService){
    this.events_subscription = this.events.emitter.subscribe(type => {
      if (type = EventType.DATA_REFRESH){
        this.updateData();
      }
    });
  }

  ngOnInit() {
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.updateData());
    this.updateData();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe;
    this.events_subscription.unsubscribe();
  }

  updateData(){
    this.branch.request("joblist")
      .subscribe(data => {
        console.log("Updating data");
        this.queued_jobs = data.payload.queued_jobs;
        this.running_jobs = data.payload.running_jobs;
        this.completed_jobs = data.payload.completed_jobs;
      })
  }
}
