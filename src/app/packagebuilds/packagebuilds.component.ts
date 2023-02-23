import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { BranchService } from '../shared/branch/branch.service';
import { Package } from '../shared/classes/package';
import { EventService, EventType } from '../shared/event/event.service';

@Component({
  selector: 'app-packagebuilds',
  templateUrl: './packagebuilds.component.html',
  styleUrls: ['./packagebuilds.component.css']
})
export class PackagebuildsComponent {
  public pkgbuilds?: string[];
  public packages?: Package[];
  subscription: Subscription;

  constructor(public branch: BranchService, private router: Router, private events: EventService){
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

  pkgIsBuilt(name: string): boolean{
    let pkg = this.packages?.find(p => p.name == name);
    return pkg !== undefined;
  }

  getVersionByPkgName(name: string): string{
    let pkg = this.packages?.find(p => p.name == name);
    if (pkg === undefined){
      return "NOT BUILT";
    }
  
    return pkg.version;
  }

  getRelVersionByPkgName(name: string): string{
    let pkg = this.packages?.find(p => p.name == name);
    if (pkg === undefined){
      return "NOT BUILT";
    }
  
    return pkg.real_version.toString();
  }

  updateData(){
    console.debug("[PACKAGEBUILDS] Refreshing data...");

    this.branch.request("packagebuildlist")
      .subscribe(data => {
        this.pkgbuilds = data.payload;
        this.pkgbuilds?.sort((a, b) => a?.localeCompare(b)) //Sort the pkgbuilds by name
      })
    this.branch.request("packagelist")
      .subscribe(data => {
        this.packages = data.payload;
      })
  }

  openPkgBuild(name: string){
    console.log("Switching to editor to edit packagebuild " + name)
    this.router.navigate(["editor", name])
  }
}
