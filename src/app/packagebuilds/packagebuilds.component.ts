import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { BranchService } from '../shared/branch/branch.service';
import { Package } from '../shared/classes/package';
import { EventService, EventType } from '../shared/event/event.service';
import { SearchService } from '../shared/search/search.service';

@Component({
  selector: 'app-packagebuilds',
  templateUrl: './packagebuilds.component.html',
  styleUrls: ['./packagebuilds.component.css']
})
export class PackagebuildsComponent {
  public raw_pkgbuilds?: string[];
  public pkgbuilds?: string[];

  public packages?: Package[];
  subscription: Subscription;

  private cur_filter: string = "";
  private search_sub: Subscription;

  constructor(public branch: BranchService, private router: Router, private events: EventService, private searchService: SearchService) {
    this.subscription = this.events.emitter.subscribe(event => {
      if (event == EventType.DATA_CHANGED) {
        this.update_data();
      }
    });
    this.search_sub = this.searchService.emitter.subscribe(term => {
      this.cur_filter = term;

      if (this.raw_pkgbuilds)
        this.pkgbuilds = this.filter(this.raw_pkgbuilds);
    });

    this.update_data();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.search_sub.unsubscribe();
  }

  pkgIsBuilt(name: string): boolean {
    let pkg = this.packages?.find(p => p.name == name);
    return pkg !== undefined;
  }

  getVersionByPkgName(name: string): string {
    let pkg = this.packages?.find(p => p.name == name);
    if (pkg === undefined) {
      return "NOT BUILT";
    }

    return pkg.version;
  }

  getRelVersionByPkgName(name: string): string {
    let pkg = this.packages?.find(p => p.name == name);
    if (pkg === undefined) {
      return "NOT BUILT";
    }

    return pkg.real_version.toString();
  }

  update_data() {
    console.debug("[PACKAGEBUILDS] Refreshing data...");

    this.packages = this.branch.pkg_list;

    this.raw_pkgbuilds = this.branch.pkgbuild_list;
    this.pkgbuilds = this.filter(this.raw_pkgbuilds);
  }

  filter(list: string[]) {
    //Filter and sort by name
    return list.filter((v) => v.toLowerCase().indexOf(this.cur_filter.toLowerCase()) > -1).sort((a, b) => a?.localeCompare(b));
  }

  openPkgBuild(name: string) {
    console.log("Switching to editor to edit packagebuild " + name)
    this.router.navigate(["editor", name])
  }
}
