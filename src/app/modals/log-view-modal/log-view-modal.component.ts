import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchService } from 'src/app/shared/branch/branch.service';
import { ToastService } from 'src/app/toasts-container/toast-service';

@Component({
  selector: 'app-log-view-modal',
  templateUrl: './log-view-modal.component.html',
  styleUrls: ['./log-view-modal.component.css']
})
export class LogViewModalComponent {

  public log: string = "";
  public jobID: string = "";
  @ViewChild('modalData', { static: false }) modalData: ElementRef | undefined;

  constructor(private modalService: NgbModal, private branch: BranchService, private toasts: ToastService) {

  }

  show(jobID: string){
    this.branch.getlog(jobID).subscribe(ok => {
      if (ok !== undefined){
        this.jobID = jobID;
        this.log = "";
        ok.forEach(v => this.log += v + "<br>");
        this.modalService.open(this.modalData, {fullscreen: true, scrollable: true});
      } else {
        this.toasts.s_err("Log is not (yet) available!");
      }
    })
  }
}
