import { Component } from '@angular/core';
import { BranchService } from '../shared/branch/branch.service';
import { map } from 'rxjs/operators';
import { Package } from '../shared/classes/package';
import { Subscription } from 'rxjs';
import { EventService, EventType } from '../shared/event/event.service';
import { SearchService } from '../shared/search/search.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {

  private raw_packages?: Package[];
  public packages?: Package[];
  private subscription: Subscription;

  private cur_filter: string = "";
  private search_sub: Subscription;

  constructor(public branch: BranchService, private events: EventService, private search: SearchService) {
    this.subscription = this.events.emitter.subscribe(event => {
      if (event == EventType.DATA_CHANGED) {
        this.update_data();
      }
    });
    this.search_sub = this.search.emitter.subscribe(term => {
      this.cur_filter = term;

      if (this.raw_packages)
        this.packages = this.filter(this.raw_packages);
    });
    this.update_data();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.search_sub.unsubscribe();
  }

  getPkgDepsString(pkg: Package): string {
    let res = "";
    if (pkg.dependencies === undefined)
      return res;

    for (let dep of pkg.dependencies) {
      res += dep + " ";
    }

    return res;
  }

  update_data() {
    console.debug("[PACKAGES] Refreshing data...");

    this.raw_packages = this.branch.pkg_list;
    this.packages = this.filter(this.raw_packages);
  }

  filter(list: Package[]) {
    //Filter and sort by name
    return list.filter((v) => v.name.toLowerCase().indexOf(this.cur_filter.toLowerCase()) > -1).sort((a, b) => a.name.localeCompare(b.name));
  }

}
