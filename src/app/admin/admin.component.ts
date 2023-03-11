import { Component } from '@angular/core';
import { BranchService } from '../shared/branch/branch.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(public branch: BranchService){

  }
}
