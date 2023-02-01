import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { BranchService } from '../shared/branch/branch.service';
import { Package } from '../shared/classes/package';

@Component({
  selector: 'app-packagebuilds',
  templateUrl: './packagebuilds.component.html',
  styleUrls: ['./packagebuilds.component.css']
})
export class PackagebuildsComponent {
  public pkgbuilds?: string[];
  public packages?: Package[];
  subscription?: Subscription;

  constructor(public branch: BranchService){

  }

  ngOnInit() {
    const source = interval(15000);
    this.subscription = source.subscribe(val => this.updateData());
    this.updateData();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe;
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
    this.branch.request("packagebuildlist")
      .subscribe(data => {
        console.log("Updating data");
        this.pkgbuilds = data.payload;
      })
    this.branch.request("packagelist")
      .subscribe(data => {
        console.log("Updating data");
        this.packages = data.payload;
      })
  }
}
