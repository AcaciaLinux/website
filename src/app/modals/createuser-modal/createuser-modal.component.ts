import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchService } from 'src/app/shared/branch/branch.service';
import { ToastService } from 'src/app/toasts-container/toast-service';

@Component({
  selector: 'app-createuser-modal',
  templateUrl: './createuser-modal.component.html',
  styleUrls: ['./createuser-modal.component.css']
})
export class CreateuserModalComponent {

  public hideLoginButton: boolean = false;
  public closeModal: string = "Close Modal!";
  @ViewChild('btnLogin', { static: false }) btnLogin: ElementRef<HTMLButtonElement> | undefined;

  constructor(private modalService: NgbModal, public branchService: BranchService, private toasts: ToastService) { }

  public show(modalData: any) {
    this.modalService.open(modalData, { ariaLabelledBy: 'modal-basic-title' });
  }

  //Calls BranchService::creatuser and dismisses the dialog
  adduser(username: string, password: string, passwordrepeat: string) {
    if (password != passwordrepeat) {
      this.toasts.s_err("Passwords need to match!");
      return;
    }

    this.branchService.createuser(username, password).subscribe(
      res => {
        if (res == "") {
          this.toasts.s_ok("Created user " + username);

          //Dismiss the dialog
          this.modalService.dismissAll();
        } else {
          this.toasts.s_err("Failed to create user " + username + ": " + res);
        }
      }
    );
  }
}
