import { Component } from '@angular/core';
import { BranchService } from '../shared/branch/branch.service';
import { map } from 'rxjs/operators';
import { Package } from '../shared/classes/package';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {

  public packages?: Package[];

  constructor(public branch: BranchService){

  }

  ngOnInit() {
    this.branch.request("packagelist")
      .subscribe(data => {
        this.packages = data.payload; //Create the packages array
        this.packages?.sort((a, b) => a.name?.localeCompare(b.name)) //Sort the packages by name
      })
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

}
