import { Component } from '@angular/core';
import { BranchService } from 'src/app/shared/branch/branch.service';

@Component({
  selector: 'app-user-mgr',
  templateUrl: './user-mgr.component.html',
  styleUrls: ['./user-mgr.component.css']
})
export class UserMgrComponent {
  constructor(public branch: BranchService){

  }
}
