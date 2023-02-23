import { Component } from '@angular/core';
import { BranchService } from '../shared/branch/branch.service';
import { map } from 'rxjs/operators';
import { Package } from '../shared/classes/package';
import { Subscription } from 'rxjs';
import { EventService, EventType } from '../shared/event/event.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {

  public packages?: Package[];
  private subscription: Subscription;

  constructor(public branch: BranchService, private events: EventService){
    this.subscription = this.events.emitter.subscribe(event => {
      if (event == EventType.DATA_REFRESH){
        this.updateData();
      }
    });
    this.updateData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPkgDepsString(pkg: Package): string{
    let res = "";
    if (pkg.dependencies === undefined)
      return res;

    for (let dep of pkg.dependencies){
      res += dep + " ";
    }

    return res;
  }

  updateData(){
    console.debug("[PACKAGES] Refreshing data...");

    this.branch.request("packagelist")
      .subscribe(data => {
        this.packages = data.payload; //Create the packages array
        this.packages?.sort((a, b) => a.name?.localeCompare(b.name)) //Sort the packages by name
      });
  }

}
